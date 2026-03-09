export function Tag({ children, type = 'default' }: { children: React.ReactNode, type?: 'project' | 'insight' | 'timeline' | 'default' }) {
  const styles = {
    project: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/50 dark:border-blue-500/20',
    insight: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-500/20',
    timeline: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20',
    default: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
  };

  return (
    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${styles[type]} uppercase tracking-wider`}>
      {children}
    </span>
  );
}
