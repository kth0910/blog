'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, loginWithGoogle } from '@/lib/auth';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setLoading(true);
        // Force refresh to ensure we have the latest custom claims
        let idTokenResult = await currentUser.getIdTokenResult(true);
        
        if (!idTokenResult.claims.admin) {
          // Attempt to assign admin claim via API if missing
          try {
            const res = await fetch('/api/auth/set-admin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idTokenResult.token}`,
              },
            });
            if (res.ok) {
              // Refresh token again after updating claim
              idTokenResult = await currentUser.getIdTokenResult(true);
            } else {
              const errorData = await res.json();
              alert(`서버 검증 실패: ${res.status} - ${errorData.error}\n\n상세: ${errorData.details || ''}`);
            }
          } catch (e: any) {
            console.error('Failed to set admin claim', e);
            alert(`API 요청 실패: ${e?.message}`);
          }
        }

        if (idTokenResult.claims.admin) {
          setUser(currentUser);
        } else {
          setUser(null);
          alert('관리자 권한이 없습니다.');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-pulse flex flex-col items-center gap-4 text-slate-500">
          <div className="h-8 w-8 rounded-full border-4 border-t-indigo-500 border-slate-200 animate-spin"></div>
          <p>인증 정보 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="p-8 pb-6 border-b border-slate-100 dark:border-slate-700/50">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">관리자 로그인</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              블로그 관리를 위해 관리자 계정으로 로그인해 주세요.
            </p>
          </div>
          <div className="p-8 bg-slate-50/50 dark:bg-slate-800/50">
            <button
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google로 계속하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
