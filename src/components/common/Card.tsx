export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white dark:bg-slate-800/80 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/50 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
}
