import Link from 'next/link';
import { Post } from '@/lib/api';
import { Card } from '../common/Card';
import { Tag } from '../common/Tag';

export function InsightBlock({ post }: { post: Post }) {
  const hasAudio = !!post.audioUrl;
  
  return (
    <Card className="relative group p-6 h-full flex flex-col">
      <Link href={`/insights/${post.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View Insight: {post.title}</span>
      </Link>
      <div className="flex justify-between items-start mb-4">
        <Tag type="insight">Insight</Tag>
        <time className="text-sm text-slate-400 dark:text-slate-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </time>
      </div>
      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {post.title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
        {post.summary}
      </p>
      
      <div className="flex flex-wrap items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4 mt-auto">
        <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-medium z-20">
          {post.tags?.map(tag => (
            <span key={tag} className="hover:text-indigo-500 transition-colors cursor-pointer relative">#{tag}</span>
          ))}
        </div>
        {hasAudio && (
          <div className="flex items-center gap-1.5 text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
            <svg className="w-3 h-3 group-hover:animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
            <span className="hidden sm:inline-block">{post.audioMood || 'Audio'}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
