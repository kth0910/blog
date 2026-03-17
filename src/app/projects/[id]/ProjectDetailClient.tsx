'use client';

import { useState, useEffect, useRef } from 'react';
import { getPost, Post, incrementProjectView, getProjectArticles, ProjectArticle } from '@/lib/api';
import { MDXRemoteWrapper } from '@/components/mdx/MDXRemoteWrapper';
import { Tag } from '@/components/common/Tag';
import Link from 'next/link';

export default function ProjectDetailClient({ id }: { id: string }) {
  const [data, setData] = useState<Post | null>(null);
  const [articles, setArticles] = useState<ProjectArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const alreadyIncremented = useRef(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: postData } = await getPost(id);
        setData(postData);
        
        // Fetch articles for this project
        const projectArticles = await getProjectArticles(id);
        setArticles(projectArticles);

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

      {/* Project Overview (Primary) */}
      <section className="mt-8 pb-12 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-6">Project Overview</h2>
        <div className="prose dark:prose-invert max-w-none">
          {data.description ? (
            <MDXRemoteWrapper content={data.description} />
          ) : (
            <p className="text-slate-400 italic">상세 프로젝트 정보가 보강될 예정입니다.</p>
          )}
        </div>
      </section>

      {/* Project Articles List (Logs) */}
      <section className="mt-12 pb-24">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          Project Development Logs
        </h2>
        {articles.length > 0 ? (
          <div className="grid gap-4">
            {articles.map((article) => (
              <Link 
                key={article.id} 
                href={`/projects/${id}/articles/${article.id}`}
                className="group p-5 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-xl hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1.5">
                    <time className="text-xs text-slate-400 font-medium font-mono">
                      {new Date(article.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </time>
                    <div className="flex items-center text-[11px] text-slate-400 font-medium">
                      <svg className="w-3.5 h-3.5 mr-1 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      {article.views.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800/20 rounded-xl p-10 text-center border-2 border-dashed border-slate-200 dark:border-slate-700/50">
            <p className="text-slate-400 italic">아직 작성된 개발 로그가 없습니다.</p>
          </div>
        )}
      </section>
    </article>
  );
}
