export const COMMENT_POST_TYPES = ['project', 'insight', 'timeline', 'project-article'] as const;

export type CommentPostType = (typeof COMMENT_POST_TYPES)[number];

export interface CommentRecord {
  id: string;
  nickname: string;
  content: string;
  createdAt: string;
}

interface TimestampLike {
  toDate?: () => Date;
}

interface CommentDataShape {
  nickname?: unknown;
  content?: unknown;
  createdAt?: unknown;
}

export function isCommentPostType(value: string): value is CommentPostType {
  return COMMENT_POST_TYPES.includes(value as CommentPostType);
}

export function getCommentThreadId(postType: CommentPostType, postId: string): string {
  return `${postType}:${postId}`;
}

export function validateClientId(clientId: string): string | null {
  const normalized = clientId.trim();

  if (normalized.length < 12 || normalized.length > 120) {
    return '유효한 클라이언트 식별자가 필요합니다.';
  }

  if (!/^[A-Za-z0-9_-]+$/.test(normalized)) {
    return '클라이언트 식별자 형식이 올바르지 않습니다.';
  }

  return null;
}

export function validateNickname(nickname: string): string | null {
  const normalized = nickname.trim();

  if (normalized.length < 2 || normalized.length > 30) {
    return '닉네임은 2자 이상 30자 이하로 입력해 주세요.';
  }

  return null;
}

export function validateCommentContent(content: string): string | null {
  const normalized = content.trim();

  if (normalized.length < 1 || normalized.length > 1000) {
    return '댓글은 1자 이상 1000자 이하로 입력해 주세요.';
  }

  return null;
}

export function normalizeCommentRecord(id: string, data: CommentDataShape): CommentRecord {
  return {
    id,
    nickname: typeof data.nickname === 'string' ? data.nickname : 'Anonymous',
    content: typeof data.content === 'string' ? data.content : '',
    createdAt: toIsoString(data.createdAt),
  };
}

function toIsoString(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (isTimestampLike(value)) {
    return value.toDate().toISOString();
  }

  return new Date(0).toISOString();
}

function isTimestampLike(value: unknown): value is TimestampLike & { toDate: () => Date } {
  return typeof value === 'object' && value !== null && typeof (value as TimestampLike).toDate === 'function';
}
