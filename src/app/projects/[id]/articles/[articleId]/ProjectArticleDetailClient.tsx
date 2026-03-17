'use client';

import { useState, useEffect, useRef } from 'react';
import { getProjectArticle, ProjectArticle, incrementProjectArticleView } from '@/lib/api';
import { MDXRemoteWrapper } from '@/components/mdx/MDXRemoteWrapper';
import Link from 'next/link';

export default function ProjectArticleDetailClient({ projectId, articleId }: { projectId: string, articleId: string }) {
  const [data, setData] = useState<ProjectArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const alreadyIncremented = useRef(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const article = await getProjectArticle(articleId);
        setData(article);
        
        // Increment view count (only once per mount)
        if (!alreadyIncremented.current) {
          incrementProjectArticleView(articleId);
          alreadyIncremented.current = true;
        }
      } catch (error) {
        console.error('Failed to fetch project article:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [articleId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Article Not Found</h1>
        <Link href={`/projects/${projectId}`} className="text-blue-600 hover:underline mt-4 inline-block">Back to Project</Link>
      </div>
    );
  }

  return (
    <article className="animate-in fade-in duration-700 max-w-4xl mx-auto">
      <header className="mb-10 border-b border-slate-200 dark:border-slate-800 pb-10">
        <Link 
          href={`/projects/${projectId}`} 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors mb-6 group"
        >
          <svg className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to {data.projectTitle || 'Project'}
        </Link>
        
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/50 dark:border-blue-500/20 uppercase tracking-wider">
            Project Log
          </span>
          <time className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            {new Date(data.createdAt).toLocaleDateString()}
          </time>
          <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 font-medium">
            <svg className="w-3.5 h-3.5 mr-1 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            {data.views.toLocaleString()}
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          {data.title}
        </h1>
      </header>

      {/* MDX Content */}
      <div className="mt-8 pb-32">
        <MDXRemoteWrapper content={data.content} />
      </div>
    </article>
  );
}
