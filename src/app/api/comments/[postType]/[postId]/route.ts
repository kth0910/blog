import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomUUID } from 'node:crypto';
import {
  createComment,
  createCommentProfile,
  getCommentProfileByClientId,
  listCommentsByPost,
} from '@dataconnect/generated';
import { getPost, getProjectArticle } from '@/lib/api';
import { dataconnect } from '@/lib/firebase';
import {
  isCommentPostType,
  validateCommentContent,
  validateNickname,
} from '@/lib/comments';

const COMMENT_CLIENT_COOKIE = 'blog_comment_client_id';

interface RouteContext {
  params: Promise<{
    postType: string;
    postId: string;
  }>;
}

interface CreateCommentBody {
  clientId?: unknown;
  nickname?: unknown;
  content?: unknown;
}

export async function GET(_request: Request, context: RouteContext) {
  const { postType, postId } = await context.params;

  if (!isCommentPostType(postType)) {
    return NextResponse.json({ error: '지원하지 않는 댓글 대상입니다.' }, { status: 400 });
  }

  if (!(await commentTargetExists(postType, postId))) {
    return NextResponse.json({ error: '댓글 대상을 찾을 수 없습니다.' }, { status: 404 });
  }

  try {
    const { data } = await listCommentsByPost(dataconnect, { postType, postId });
    const comments = data.comments.map((comment) => ({
      id: comment.id,
      nickname: comment.nicknameSnapshot,
      content: comment.content,
      createdAt: comment.createdAt,
    }));

    const response = NextResponse.json({ comments });
    await ensureCommentClientCookie(response);
    return response;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return NextResponse.json({ error: '댓글을 불러오지 못했습니다.' }, { status: 500 });
  }
}

export async function POST(request: Request, context: RouteContext) {
  const { postType, postId } = await context.params;

  if (!isCommentPostType(postType)) {
    return NextResponse.json({ error: '지원하지 않는 댓글 대상입니다.' }, { status: 400 });
  }

  if (!(await commentTargetExists(postType, postId))) {
    return NextResponse.json({ error: '댓글 대상을 찾을 수 없습니다.' }, { status: 404 });
  }

  let body: CreateCommentBody;

  try {
    body = (await request.json()) as CreateCommentBody;
  } catch {
    return NextResponse.json({ error: '잘못된 요청 본문입니다.' }, { status: 400 });
  }

  const nickname = typeof body.nickname === 'string' ? body.nickname.trim() : '';
  const content = typeof body.content === 'string' ? body.content.trim() : '';

  const nicknameError = validateNickname(nickname);
  if (nicknameError) {
    return NextResponse.json({ error: nicknameError }, { status: 400 });
  }

  const contentError = validateCommentContent(content);
  if (contentError) {
    return NextResponse.json({ error: contentError }, { status: 400 });
  }

  const clientId = await getOrCreateCommentClientId();

  try {
    const profile = await ensureCommentProfile(clientId, nickname);
    const { data } = await createComment(dataconnect, {
      authorProfileId: profile.id,
      postType,
      postId,
      nicknameSnapshot: profile.nickname,
      content,
    });

    const comment = {
      id: data.comment_insert.id,
      nickname: profile.nickname,
      content,
      createdAt: new Date().toISOString(),
    };

    const response = NextResponse.json({ comment, nicknameLocked: true }, { status: 201 });
    await ensureCommentClientCookie(response, clientId);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : '댓글 저장 중 오류가 발생했습니다.';
    const status = message.includes('닉네임은 첫 댓글 작성 이후 변경할 수 없습니다.') ? 409 : 500;

    if (status === 500) {
      console.error('Failed to create comment:', error);
    }

    return NextResponse.json({ error: message }, { status });
  }
}

async function commentTargetExists(postType: string, postId: string) {
  if (postType === 'project-article') {
    const article = await getProjectArticle(postId);
    return article !== null;
  }

  const { data } = await getPost(postId);
  return data !== null && data.type === postType;
}

async function ensureCommentProfile(clientId: string, nickname: string) {
  const { data } = await getCommentProfileByClientId(dataconnect, { clientId });
  const existingProfile = data.commentProfiles[0];

  if (existingProfile) {
    if (existingProfile.nickname !== nickname) {
      throw new Error('닉네임은 첫 댓글 작성 이후 변경할 수 없습니다.');
    }

    return existingProfile;
  }

  try {
    const { data: created } = await createCommentProfile(dataconnect, { clientId, nickname });

    return {
      id: created.commentProfile_insert.id,
      clientId,
      nickname,
      lockedAt: new Date().toISOString(),
    };
  } catch (error) {
    const { data: reloaded } = await getCommentProfileByClientId(dataconnect, { clientId });
    const racedProfile = reloaded.commentProfiles[0];

    if (racedProfile) {
      if (racedProfile.nickname !== nickname) {
        throw new Error('닉네임은 첫 댓글 작성 이후 변경할 수 없습니다.');
      }

      return racedProfile;
    }

    throw error;
  }
}

async function getOrCreateCommentClientId() {
  const cookieStore = await cookies();
  return cookieStore.get(COMMENT_CLIENT_COOKIE)?.value ?? randomUUID().replace(/-/g, '');
}

async function ensureCommentClientCookie(response: NextResponse, clientId?: string) {
  const cookieStore = await cookies();
  const current = clientId ?? cookieStore.get(COMMENT_CLIENT_COOKIE)?.value;

  if (!current) {
    response.cookies.set(COMMENT_CLIENT_COOKIE, randomUUID().replace(/-/g, ''), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
    return;
  }

  if (!cookieStore.get(COMMENT_CLIENT_COOKIE)?.value) {
    response.cookies.set(COMMENT_CLIENT_COOKIE, current, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  }
}
