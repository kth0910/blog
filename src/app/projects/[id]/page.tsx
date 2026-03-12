import { getPost, getPosts } from '@/lib/api';
import { MDXRemoteWrapper } from '@/components/mdx/MDXRemoteWrapper';
import { Tag } from '@/components/common/Tag';
import Link from 'next/link';

export async function generateStaticParams() {
  const { data } = await getPosts('project', 100);
  return data.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getPost(id);
  return { title: data ? `${data.title} | Project` : 'Project Not Found' };
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getPost(id);

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

      {/* MDX Remote Content */}
      <div className="mt-8 pb-24">
        {data.content ? (
          <MDXRemoteWrapper content={data.content} />
        ) : (
          <p className="text-slate-400 italic">No content available.</p>
        )}
      </div>
    </article>
  );
}
