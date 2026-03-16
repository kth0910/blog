'use client';

import { useState, useEffect } from 'react';
import { getPosts, Post } from '@/lib/api';
import { ProjectBlock } from '@/components/content/ProjectBlock';
import { InsightBlock } from '@/components/content/InsightBlock';
import { TimelineItem } from '@/components/content/TimelineItem';
import Link from 'next/link';

export default function Dashboard() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getPosts(undefined, 8);
        setRecentPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const projects = recentPosts.filter(p => p.type === 'project').slice(0, 2);
  const insightsAndTimelines = recentPosts.filter(p => p.type !== 'project');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Think <span className="text-indigo-600 dark:text-indigo-400">→</span> Build <span className="text-indigo-600 dark:text-indigo-400">→</span> Record <span className="text-indigo-600 dark:text-indigo-400">→</span> Listen
        </h1>
        <p className="text-md text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          저의 생각과 프로젝트 과정이 시간 흐름에 따라 축적되는 공감각적 기록장입니다. <br />개발자 로그, 리서치 노트, 그리고 AI 생성 테마곡을 함께 보관합니다.
        </p>
      </section>

      {projects.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Active Projects
            </h2>
            <Link href="/projects" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <ProjectBlock key={project.id} post={project} />
            ))}
          </div>
        </section>
      )}

      {insightsAndTimelines.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Recent Logs & Insights
            </h2>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pt-4">
               {insightsAndTimelines.filter(p => p.type === 'insight').slice(0, 2).map(insight => (
                 <InsightBlock key={insight.id} post={insight} />
               ))}
            </div>
            
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-8 pl-4 sm:pl-0 sm:ml-4">
              <h3 className="text-lg font-bold text-slate-500 mb-6 uppercase tracking-wider">Timeline</h3>
              <div className="space-y-0">
                {insightsAndTimelines.filter(p => p.type === 'timeline').slice(0, 4).map(item => (
                   <TimelineItem key={item.id} post={item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
