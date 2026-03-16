'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, loginWithGoogle } from '@/lib/auth';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/admin';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        return;
      }

      try {
        const idTokenResult = await currentUser.getIdTokenResult(true);
        if (idTokenResult.claims.admin) {
          router.replace(nextPath);
        }
      } catch (error) {
        console.error('Failed to verify user claims', error);
      }
    });

    return () => unsubscribe();
  }, [nextPath, router]);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const user = await loginWithGoogle();
      const idTokenResult = await user.getIdTokenResult(true);

      if (idTokenResult.claims.admin) {
        router.replace(nextPath);
        return;
      }

      setErrorMessage('관리자 권한이 없는 계정입니다.');
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('로그인에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="p-8 pb-6 border-b border-slate-100 dark:border-slate-700/50">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">관리자 로그인</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            관리자 페이지는 이 경로에서만 로그인할 수 있습니다.
          </p>
        </div>

        <div className="p-8 bg-slate-50/50 dark:bg-slate-800/50">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {loading ? '로그인 중...' : 'Google로 로그인'}
          </button>

          {errorMessage ? (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
        <div className="text-slate-500 dark:text-slate-400">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
