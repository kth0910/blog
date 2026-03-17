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
      
      <div className="flex justify-between items-center mb-4">
        <Tag type="project">Project</Tag>
        <div className="flex items-center gap-3">
          {post.status && (
            <span className={`hidden sm:inline-block px-2.5 py-1 text-[11px] font-bold rounded-full border uppercase tracking-wider ${statusColor}`}>
              {post.status.replace('-', ' ')}
            </span>
          )}
          <time className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            {new Date(post.startDate || post.createdAt).toLocaleDateString()}
          </time>
          {post.views !== undefined && (
            <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 font-medium">
              <svg className="w-3.5 h-3.5 mr-1 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              {post.views.toLocaleString()}
            </div>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {post.title}
      </h3>
      
      <div className="flex-1"></div>
      
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4 mt-auto">
        <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-medium">
          {(post.techStack || post.tags)?.map(tag => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </div>
    </Card>
  );
}
