'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteComment, listAllCommentsForAdmin, type ListAllCommentsForAdminData } from '@dataconnect/generated';
import { dataconnect } from '@/lib/firebase';
import { getPost, getProjectArticle } from '@/lib/api';

type AdminComment = ListAllCommentsForAdminData['comments'][number];

interface CommentTargetMeta {
  title: string;
  href: string | null;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [commentTargets, setCommentTargets] = useState<Record<string, CommentTargetMeta>>({});
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    void fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);

    try {
      const { data } = await listAllCommentsForAdmin(dataconnect);
      const nextComments = data.comments || [];
      setComments(nextComments);
      setCommentTargets(await buildCommentTargets(nextComments));
    } catch (error) {
      console.error(error);
      alert('댓글 목록을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 댓글을 삭제하시겠습니까?')) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteComment(dataconnect, { id });
      setComments((current) => current.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error(error);
      alert('댓글 삭제에 실패했습니다. 관리자 권한을 확인해 주세요.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">Comments 관리</h1>
          <p className="mt-2 text-slate-500">공개 댓글을 검토하고 부적절한 댓글을 삭제합니다.</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          총 {comments.length}개의 댓글
        </div>
      </header>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        {loading ? (
          <div className="p-8 text-sm text-slate-500">댓글을 불러오는 중...</div>
        ) : comments.length === 0 ? (
          <div className="p-8 text-sm text-slate-500">아직 등록된 댓글이 없습니다.</div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {comments.map((comment) => (
              <article key={comment.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-start">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                      {comment.postType}
                    </span>
                    <span>{new Date(comment.createdAt).toLocaleString('ko-KR')}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">{comment.nicknameSnapshot}</h2>
                    {commentTargets[comment.id]?.href ? (
                      <Link
                        href={commentTargets[comment.id].href!}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                      >
                        <span>{commentTargets[comment.id].title}</span>
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </Link>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                        {commentTargets[comment.id]?.title ?? '원문을 찾을 수 없음'}
                      </span>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {comment.content}
                  </p>
                </div>
                <div className="flex justify-end lg:justify-start">
                  <button
                    type="button"
                    onClick={() => void handleDelete(comment.id)}
                    disabled={deletingId === comment.id}
                    className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10"
                  >
                    {deletingId === comment.id ? '삭제 중...' : '삭제'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

async function buildCommentTargets(comments: AdminComment[]) {
  const entries = await Promise.all(
    comments.map(async (comment) => {
      const target = await resolveCommentTarget(comment);
      return [comment.id, target] as const;
    })
  );

  return Object.fromEntries(entries);
}

async function resolveCommentTarget(comment: AdminComment): Promise<CommentTargetMeta> {
  if (comment.postType === 'project-article') {
    const article = await getProjectArticle(comment.postId);

    if (!article) {
      return { title: '삭제되었거나 찾을 수 없는 프로젝트 글', href: null };
    }

    return {
      title: article.title,
      href: `/projects/${article.projectId}/articles/${article.id}`,
    };
  }

  const { data } = await getPost(comment.postId);

  if (!data) {
    return { title: '삭제되었거나 찾을 수 없는 글', href: null };
  }

  return {
    title: data.title,
    href: `/${comment.postType}/${data.id}`,
  };
}
