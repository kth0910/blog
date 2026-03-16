'use client';
import { useState, useEffect } from 'react';
import { getPosts, Post } from '@/lib/api';
import { InsightBlock } from '@/components/content/InsightBlock';

export default function InsightsPage() {
  const [insights, setInsights] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getPosts('insight', 20);
        setInsights(data);
      } catch (error) {
        console.error('Failed to fetch insights:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

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
