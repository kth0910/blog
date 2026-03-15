'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/auth';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Keep existing behavior: request admin claim if missing.
        let idTokenResult = await currentUser.getIdTokenResult(true);

        if (!idTokenResult.claims.admin) {
          const res = await fetch('/api/auth/set-admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idTokenResult.token}`,
            },
          });

          if (res.ok) {
            idTokenResult = await currentUser.getIdTokenResult(true);
          }
        }

        setUser(idTokenResult.claims.admin ? currentUser : null);
      } catch (error) {
        console.error('Failed to verify admin user', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading || user) {
      return;
    }

    const next = pathname ? `?next=${encodeURIComponent(pathname)}` : '';
    router.replace(`/login${next}`);
  }, [loading, user, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-pulse flex flex-col items-center gap-4 text-slate-500">
          <div className="h-8 w-8 rounded-full border-4 border-t-indigo-500 border-slate-200 animate-spin"></div>
          <p>접근 권한 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
