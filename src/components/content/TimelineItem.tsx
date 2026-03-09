import Link from 'next/link';
import { Post } from '@/lib/api';
import { Tag } from '../common/Tag';

export function TimelineItem({ post }: { post: Post }) {
  return (
    <div className="relative pl-8 sm:pl-32 py-6 group">
      {/* Date sidebar (desktop) */}
      <div className="hidden sm:flex flex-col items-end absolute left-0 top-6 w-24 text-right pr-4">
        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
          {new Date(post.createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
        </span>
        <span className="text-xs text-slate-500 font-medium mt-1">
          {new Date(post.createdAt).getFullYear()}
        </span>
      </div>

      {/* Timeline line and dot */}
      <div className="absolute left-0 sm:left-28 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700/50 group-last:bottom-auto group-last:h-full"></div>
      <div className="absolute left-[-4px] sm:left-[108px] top-8 w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-slate-900 group-hover:bg-emerald-400 group-hover:border-emerald-100 dark:group-hover:border-emerald-900/30 transition-colors z-10"></div>

      {/* Content wrapper */}
      <div className="bg-white dark:bg-slate-800/60 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700/50 group-hover:border-emerald-200 dark:group-hover:border-emerald-500/30 transition-all">
        <Link href={`/timeline/${post.id}`} className="absolute inset-0 z-10">
          <span className="sr-only">View Timeline event: {post.title}</span>
        </Link>
        <div className="flex justify-between items-start mb-2">
          <Tag type="timeline">Timeline</Tag>
          {/* Mobile date */}
          <span className="sm:hidden text-xs font-semibold text-slate-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="text-lg font-bold mb-1.5 text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {post.title}
        </h3>
        {post.summary && (
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {post.summary}
          </p>
        )}
      </div>
    </div>
  );
}
