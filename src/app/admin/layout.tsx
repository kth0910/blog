'use client';

import Link from 'next/link';
import AdminGuard from '@/components/admin/AdminGuard';
import { logout } from '@/lib/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen min-h-screen bg-slate-50 dark:bg-slate-900 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col fixed inset-y-0">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Admin Dashboard
            </h1>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            <Link 
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/projects"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/admin/insights"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            >
              Insights
            </Link>
            <Link 
              href="/admin/timeline"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            >
              Timeline
            </Link>
            <Link 
              href="/admin/comments"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            >
              Comments
            </Link>
          </nav>
          
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => logout().then(() => window.location.href = '/')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            >
              로그아웃
            </button>
            <Link 
              href="/"
              className="mt-2 text-center block text-xs text-slate-500 hover:underline"
            >
              &larr; 블로그 메인으로
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 pl-64 w-full">
          <div className="max-w-7xl mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
