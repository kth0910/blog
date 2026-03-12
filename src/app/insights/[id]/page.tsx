import { getPost, getPosts } from '@/lib/api';
import { MDXRemoteWrapper } from '@/components/mdx/MDXRemoteWrapper';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { Tag } from '@/components/common/Tag';
import Link from 'next/link';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'dummy' }];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getPost(id);
  return { title: data ? `${data.title} | Insight` : 'Insight Not Found' };
}

export default async function InsightDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getPost(id);

  if (!data) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Insight Not Found</h1>
        <Link href="/insights" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Insights</Link>
      </div>
    );
  }

  return (
    <article className="animate-in fade-in duration-700">
      <header className="mb-10 text-center sm:text-left">
        <Link href="/insights" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-6 group">
          <svg className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Insights
        </Link>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4">
          <Tag type="insight">Insight</Tag>
          <time className="text-sm font-medium text-slate-500">
            {new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
          {data.title}
        </h1>
        {data.summary && (
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mt-6 leading-relaxed bg-slate-100 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50">
            {data.summary}
          </p>
        )}
      </header>

      {/* Main Theme Song Player for Insights */}
      {data.audioUrl && (
        <div className="mb-12 sticky top-20 z-30 opacity-95 hover:opacity-100 transition-opacity">
          <AudioPlayer src={data.audioUrl} title={`Theme: ${data.title}`} mood={data.audioMood} />
        </div>
      )}

      {/* MDX Remote Content */}
      <div className="mt-8 pb-24 border-b border-slate-200 dark:border-slate-800">
        {data.content ? (
          <MDXRemoteWrapper content={data.content} />
        ) : (
          <p className="text-slate-400 italic">No content available.</p>
        )}
      </div>
      
      {/* Conclusion / Tags block */}
      <footer className="mt-8">
        <div className="flex flex-wrap gap-2 text-sm text-slate-500 font-medium">
          {data.tags?.map(t => (
            <span key={t} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">#{t}</span>
          ))}
        </div>
      </footer>
    </article>
  );
}
