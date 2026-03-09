import { getPosts } from '@/lib/api';
import Link from 'next/link';

export const metadata = {
  title: 'Archive | All posts',
};

export default async function ArchivePage() {
  const { data: posts } = await getPosts(undefined, 100);

  // Group by year and month
  const grouped = posts.reduce((acc, post) => {
    const d = new Date(post.createdAt);
    const key = `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Archive
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          모든 기록을 시간순으로 모아봅니다.
        </p>
      </header>

      <div className="space-y-12 pl-4 md:pl-0">
        {Object.entries(grouped).map(([month, items]) => (
          <section key={month}>
            <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-200 sticky top-20 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur pb-2 z-10">
              {month}
            </h2>
            <ul className="space-y-4">
              {items.map(post => (
                <li key={post.id} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 group">
                  <time className="text-sm font-mono text-slate-400 dark:text-slate-500 flex-shrink-0 sm:w-24">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>
                  <Link 
                    href={`/${post.type}s/${post.id}`}
                    className="flex-1 text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-medium transition-colors"
                  >
                    {post.title}
                  </Link>
                  <span className="text-[10px] sm:ml-auto uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded flex-shrink-0 w-fit">
                    {post.type}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {Object.keys(grouped).length === 0 && (
          <p className="text-slate-500 italic">No posts found.</p>
        )}
      </div>
    </div>
  );
}
