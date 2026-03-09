import { getPosts } from '@/lib/api';
import { TimelineItem } from '@/components/content/TimelineItem';

export const metadata = {
  title: 'Timeline | Archive',
};

export default async function TimelinePage() {
  const { data: timeline } = await getPosts('timeline', 50);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-3xl mx-auto">
      <header className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Timeline
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          활동 기록 및 일정을 시간순으로 나열한 공간입니다.
        </p>
      </header>

      <div className="relative pt-6">
        <div className="space-y-0">
          {timeline.map(item => (
            <TimelineItem key={item.id} post={item} />
          ))}
          {timeline.length === 0 && (
            <p className="text-slate-500 italic pl-8 sm:pl-32 py-6">No timeline events found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
