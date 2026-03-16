'use client';

import { useState, useEffect } from 'react';
import { getPosts, Post } from '@/lib/api';
import { ProjectBlock } from '@/components/content/ProjectBlock';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getPosts('project', 20);
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-4xl mx-auto">
      <header className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Projects
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          진행 중인 사이드 프로젝트와 개발 일지 아카이브입니다.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map(project => (
          <ProjectBlock key={project.id} post={project} />
        ))}
        {projects.length === 0 && (
          <p className="text-slate-500 italic">No projects found.</p>
        )}
      </div>
    </div>
  );
}
