import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">
          환영합니다, 관리자님!
        </h1>
        <p className="text-slate-500 mt-2">
          블로그의 모든 콘텐츠를 한눈에 관리하세요.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Quick Links */}
        <Link href="/admin/projects" className="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Projects</h2>
          <p className="text-sm text-slate-500">진행한 프로젝트 정보와 상세 기록을 관리합니다.</p>
        </Link>

        <Link href="/admin/insights" className="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Insights</h2>
          <p className="text-sm text-slate-500">리서치, 인사이트, 개인적인 생각들을 관리합니다.</p>
        </Link>
        
        <Link href="/admin/timeline" className="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Timeline</h2>
          <p className="text-sm text-slate-500">시간순으로 배열되는 이벤트나 기록을 관리합니다.</p>
        </Link>

        <Link href="/admin/comments" className="group p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8m-8 4h5m8 6l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Comments</h2>
          <p className="text-sm text-slate-500">방문자 댓글을 확인하고 필요 시 즉시 삭제합니다.</p>
        </Link>
      </div>

    </div>
  );
}
