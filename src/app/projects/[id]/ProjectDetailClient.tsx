'use client';

import { useState, useEffect, useRef } from 'react';
import { getPost, Post, incrementProjectView } from '@/lib/api';
import { MDXRemoteWrapper } from '@/components/mdx/MDXRemoteWrapper';
import { Tag } from '@/components/common/Tag';
import Link from 'next/link';

export default function ProjectDetailClient({ id }: { id: string }) {
  const [data, setData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const alreadyIncremented = useRef(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: postData } = await getPost(id);
        setData(postData);
        // Increment view count (only once per mount)
        if (!alreadyIncremented.current) {
          incrementProjectView(id);
          alreadyIncremented.current = true;
        }
      } catch (error) {
        console.error('Failed to fetch project:', error);
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
        <h1 className="text-2xl font-bold">Project Not Found</h1>
        <Link href="/projects" className="text-blue-600 hover:underline mt-4 inline-block">Back to Projects</Link>
      </div>
    );
  }

  return (
    <article className="animate-in fade-in duration-700">
      <header className="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-10">
        <Link href="/projects" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
          <svg className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Projects
        </Link>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4">
          <Tag type="project">Project</Tag>
          {data.status && (
            <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400">
              {data.status.replace('-', ' ')}
            </span>
          )}
          <time className="text-sm font-medium text-slate-500 ml-auto sm:ml-0">
            {new Date(data.createdAt).toLocaleDateString()}
          </time>
          {data.views !== undefined && (
            <div className="flex items-center text-sm font-medium text-slate-500 ml-4">
              <svg className="w-4 h-4 mr-1.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              {data.views.toLocaleString()}
            </div>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
          {data.title}
        </h1>
        {data.summary && (
           <p className="text-xl text-slate-500 mt-6 leading-relaxed">
             {data.summary}
           </p>
        )}
      </header>

      {/* MDX Remote Content */}
      <div className="mt-8 pb-24">
        {data.content ? (
          <MDXRemoteWrapper content={data.content} />
        ) : (
          <p className="text-slate-400 italic">No content available.</p>
        )}
      </div>
    </article>
  );
}
