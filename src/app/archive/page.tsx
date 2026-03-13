import { getPosts } from '@/lib/api';
import Link from 'next/link';

export const metadata = {
  title: 'Archive | All posts',
};

export default async function ArchivePage() {
  const { data: posts } = await getPosts(undefined, 200);

  // Group by year
  const groupedByYear = posts.reduce((acc, post) => {
    const d = new Date(post.createdAt);
    const year = `${d.getFullYear()}년`;
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 w-fit">
          Archive
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          모든 생각과 프로젝트의 발자취를 시간순으로 살펴봅니다.
        </p>
      </header>

      <div className="space-y-16">
        {Object.entries(groupedByYear).map(([year, yearItems]) => (
          <section key={year} className="relative pl-8 sm:pl-0">
            {/* Year marker */}
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-black text-slate-200 dark:text-slate-800 absolute -left-4 sm:-left-12 opacity-50 select-none">
                {year.replace('년', '')}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800 ml-4 hidden sm:block"></div>
            </div>

            <div className="space-y-8">
              {yearItems.map((post) => (
                <div key={post.id} className="group relative flex flex-col sm:flex-row gap-2 sm:gap-8 items-start">
                  <time className="text-sm font-medium font-mono text-slate-400 dark:text-slate-500 sm:w-20 pt-1">
                    {new Date(post.createdAt).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })}
                  </time>
                  
                  <div className="flex-1 space-y-1">
                    <Link 
                      href={`/${post.type}s/${post.id}`}
                      className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors block"
                    >
                      {post.title}
                    </Link>
                    {post.summary && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xl italic">
                        {post.summary}
                      </p>
                    )}
                    {post.description && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xl">
                        {post.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full border ${
                      post.type === 'project' ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50' :
                      post.type === 'insight' ? 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800/50' :
                      'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700/50'
                    }`}>
                      {post.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {Object.keys(groupedByYear).length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">아직 기록된 내용이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
