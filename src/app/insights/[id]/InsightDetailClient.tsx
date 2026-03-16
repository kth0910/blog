'use client';
import { useEffect, useRef, useState } from 'react';
import { getPost, Post } from '@/lib/api';
import { MDXRemoteWrapper } from '@/components/mdx/MDXRemoteWrapper';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { Tag } from '@/components/common/Tag';
import Link from 'next/link';

export default function InsightDetailClient({ id }: { id: string }) {
  const [data, setData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(true);
  const stickyAudioRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: postData } = await getPost(id);
        setData(postData);
      } catch (error) {
        console.error('Failed to fetch insight:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!data?.audioUrl || !stickyAudioRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStickyVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(stickyAudioRef.current);
    return () => observer.disconnect();
  }, [data?.audioUrl]);

  useEffect(() => {
    if (isStickyVisible) {
      setIsAudioOpen(false);
    }
  }, [isStickyVisible]);

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
        <h1 className="text-2xl font-bold">Insight Not Found</h1>
        <Link href="/insights" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Insights</Link>
      </div>
    );
  }

  return (
    <article className="animate-in fade-in duration-700">
      <header className="mb-10 text-center sm:text-left">
        <Link href="/insights" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-6 group">
          <svg className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Insights
        </Link>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4">
          <Tag type="insight">Insight</Tag>
          <time className="text-sm font-medium text-slate-500">
            {new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
          {data.title}
        </h1>
        {data.summary && (
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-6 leading-relaxed bg-slate-100 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50">
            {data.summary}
          </p>
        )}
      </header>

      {data.audioUrl && (
        <div
          ref={stickyAudioRef}
          className="mb-12 sticky top-20 z-30 opacity-95 hover:opacity-100 transition-opacity"
        >
          <AudioPlayer src={data.audioUrl} title={`Theme: ${data.title}`} mood={data.audioMood} />
        </div>
      )}

      {/* MDX Remote Content */}
      <div className="mt-8 pb-24 border-b border-slate-200 dark:border-slate-800">
        {data.content ? (
          <MDXRemoteWrapper content={data.content} />
        ) : (
          <p className="text-slate-400 italic">No content available.</p>
        )}
      </div>
      
      {/* Conclusion / Tags block */}
      <footer className="mt-8">
        <div className="flex flex-wrap gap-2 text-sm text-slate-500 font-medium">
          {data.tags?.map(t => (
            <span key={t} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">#{t}</span>
          ))}
        </div>
      </footer>

      {data.audioUrl && !isStickyVisible && (
        <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50">
          {isAudioOpen && (
            <div className="mb-3 w-[calc(100vw-2rem)] sm:w-[360px] max-w-[360px]">
              <AudioPlayer
                src={data.audioUrl}
                title={`Theme: ${data.title}`}
                mood={data.audioMood}
                className="my-0 bg-white dark:bg-slate-900 shadow-xl"
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsAudioOpen(prev => !prev)}
            className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label={isAudioOpen ? '오디오 플레이어 닫기' : '오디오 플레이어 열기'}
            aria-expanded={isAudioOpen}
          >
            {isAudioOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            )}
          </button>
        </div>
      )}
    </article>
  );
}
