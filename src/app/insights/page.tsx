import { getPosts } from '@/lib/api';
import { InsightBlock } from '@/components/content/InsightBlock';

export const metadata = {
  title: 'Insights | Archive',
};

export default async function InsightsPage() {
  const { data: insights } = await getPosts('insight', 20);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Insights
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          경험에서 얻은 기술적 / 전략적 인사이트와 회고 노트입니다.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map(insight => (
          <InsightBlock key={insight.id} post={insight} />
        ))}
        {insights.length === 0 && (
          <p className="text-slate-500 italic">No insights found.</p>
        )}
      </div>
    </div>
  );
}
