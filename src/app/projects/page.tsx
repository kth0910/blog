import { getPosts } from '@/lib/api';
import { ProjectBlock } from '@/components/content/ProjectBlock';

export const metadata = {
  title: 'Projects | Archive',
};

export default async function ProjectsPage() {
  const { data: projects } = await getPosts('project', 20);

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
