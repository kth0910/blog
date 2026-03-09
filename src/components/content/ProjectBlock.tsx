import Link from 'next/link';
import { Post } from '@/lib/api';
import { Card } from '../common/Card';
import { Tag } from '../common/Tag';

export function ProjectBlock({ post }: { post: Post }) {
  const statusColor = post.status === 'completed' ? 'text-green-600 border-green-200 bg-green-50 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' 
    : post.status === 'in-progress' ? 'text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'
    : 'text-slate-600 border-slate-200 bg-slate-50 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20';

  return (
    <Card className="relative group p-6 h-full flex flex-col">
      <Link href={`/projects/${post.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View Project: {post.title}</span>
      </Link>
      
      <div className="flex justify-between items-start mb-4">
        <Tag type="project">Project</Tag>
        {post.status && (
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${statusColor}`}>
            {post.status.replace('-', ' ')}
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {post.title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 flex-1">
        {post.summary}
      </p>
      
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4 mt-auto">
        <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-medium">
          {post.tags?.map(tag => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </div>
    </Card>
  );
}
