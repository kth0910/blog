import { getPost, getPosts } from '@/lib/api';

export async function generateStaticParams() {
  const { data } = await getPosts('timeline', 100);
  return data.map((post) => ({
    id: post.id,
  }));
}
import { MDXRemoteWrapper } from '@/components/mdx/MDXRemoteWrapper';
import { Tag } from '@/components/common/Tag';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getPost(id);
  return { title: `${data.title} | Timeline` };
}

export default async function TimelineDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getPost(id);

  return (
    <article className="animate-in fade-in duration-700 max-w-3xl mx-auto">
      <header className="mb-10 text-center sm:text-left border-b border-slate-200 dark:border-slate-800 pb-10">
        <Link href="/timeline" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors mb-6 group">
          <svg className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Timeline
        </Link>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4">
          <Tag type="timeline">Timeline</Tag>
          <time className="text-sm font-medium text-slate-500 ml-auto sm:ml-0">
            {new Date(data.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </time>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
          {data.title}
        </h1>
      </header>

      {/* MDX Remote Content */}
      <div className="mt-8 pb-24">
        {data.content ? (
          <MDXRemoteWrapper content={data.content} />
        ) : data.summary ? (
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{data.summary}</p>
        ) : (
          <p className="text-slate-400 italic">No content available.</p>
        )}
      </div>
    </article>
  );
}
