'use client';
import { useState, useEffect } from 'react';
import { getPost, Post } from '@/lib/api';
import { MDXRemoteWrapper } from '@/components/mdx/MDXRemoteWrapper';
import { Tag } from '@/components/common/Tag';
import { CommentSection } from '@/components/comments/CommentSection';
import Link from 'next/link';

export default function TimelineDetailClient({ id }: { id: string }) {
  const [data, setData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: postData } = await getPost(id);
        setData(postData);
      } catch (error) {
        console.error('Failed to fetch timeline entry:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Timeline Not Found</h1>
        <Link href="/timeline" className="text-emerald-600 hover:underline mt-4 inline-block">Back to Timeline</Link>
      </div>
    );
  }

  return (
    <article className="animate-in fade-in duration-700 max-w-3xl mx-auto">
      <header className="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-10">
        <Link href="/timeline" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-6 group">
          <svg className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Timeline
        </Link>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4">
          <Tag type="timeline">Timeline</Tag>
          <time className="text-sm font-medium text-slate-500 ml-auto sm:ml-0">
            {new Date(data.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </time>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
          {data.title}
        </h1>
      </header>

      {/* MDX Remote Content */}
      <div className="mt-8 pb-24">
        {data.content ? (
          <MDXRemoteWrapper content={data.content} />
        ) : data.summary ? (
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{data.summary}</p>
        ) : (
          <p className="text-slate-400 italic">No content available.</p>
        )}
      </div>

      <CommentSection postType="timeline" postId={id} />
    </article>
  );
}
