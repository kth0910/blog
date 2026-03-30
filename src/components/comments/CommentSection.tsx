'use client';

import { useState, useEffect, FormEvent } from 'react';
import { CommentRecord, CommentPostType } from '@/lib/comments';

interface CommentSectionProps {
  postType: CommentPostType;
  postId: string;
}

export function CommentSection({ postType, postId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nickname, setNickname] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isNicknameLocked, setIsNicknameLocked] = useState<boolean>(false);

  useEffect(() => {
    // Initialize comment writer info from localStorage
    const storedNickname = localStorage.getItem('blog_nickname');
    if (storedNickname) {
      setNickname(storedNickname);
    }

    const storedLocked = localStorage.getItem('blog_nickname_locked');
    if (storedLocked === 'true' && storedNickname) {
      setIsNicknameLocked(true);
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(`/api/comments/${postType}/${postId}`);
        if (!res.ok) throw new Error('Failed to fetch comments');
        const data = await res.json();
        setComments(data.comments || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load comments.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchComments();
  }, [postType, postId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isReady || !nickname.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/comments/${postType}/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname.trim(),
          content: content.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to post comment');
      }

      setComments((prev) => [...prev, data.comment]);
      setContent('');

      // Update local storage with nickname and lock status
      localStorage.setItem('blog_nickname', nickname.trim());
      if (data.nicknameLocked) {
        localStorage.setItem('blog_nickname_locked', 'true');
        setIsNicknameLocked(true);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred while posting your comment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center">
        <svg className="w-5 h-5 mr-2.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        Comments <span className="ml-2 text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">{comments.length}</span>
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-12 bg-slate-50 dark:bg-slate-800/30 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50">
        <div className="mb-4">
          <label htmlFor="nickname" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Nickname
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            disabled={isNicknameLocked || isSubmitting}
            placeholder="Enter your nickname"
            className="w-full sm:w-64 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-60 disabled:bg-slate-100 dark:disabled:bg-slate-800"
            required
            maxLength={30}
          />
          {isNicknameLocked && (
            <p className="mt-1.5 text-xs text-slate-500 flex items-center">
              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Nickname is locked after your first comment.
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Comment
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            placeholder="Leave a comment..."
            rows={3}
            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y disabled:opacity-60"
            required
            maxLength={1000}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !isReady || !nickname.trim() || !content.trim()}
            className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-white focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Posting...
              </>
            ) : (
              'Post Comment'
            )}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-slate-400"></div>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="group flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm uppercase shadow-inner">
                  {comment.nickname.charAt(0)}
                </div>
              </div>
              <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {comment.nickname}
                  </span>
                  <time className="text-xs text-slate-400 font-medium">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </time>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700/50">
            <p className="text-slate-500 dark:text-slate-400 text-sm">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </section>
  );
}
