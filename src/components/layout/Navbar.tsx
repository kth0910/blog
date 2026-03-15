'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/auth';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Insights', href: '/insights' },
    { name: 'Timeline', href: '/timeline' },
    { name: 'Archive', href: '/archive' },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setIsAdmin(false);
        return;
      }

      try {
        const idTokenResult = await currentUser.getIdTokenResult(true);
        setIsAdmin(idTokenResult.claims.admin === true);
      } catch (error) {
        console.error('Failed to verify admin status', error);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 bg-white/70 dark:bg-slate-900/80 border-b border-slate-900/10 dark:border-slate-50/[0.06]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex items-center justify-between font-semibold">
          <Link href="/" className="text-xl tracking-tight text-slate-900 dark:text-slate-100 italic font-black">
            Archive.
          </Link>

          <div className="flex items-center gap-6">
            <nav className="flex items-center space-x-6 text-sm">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`hidden md:block transition-colors ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400 font-extrabold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {isAdmin ? (
                <Link
                  href="/admin"
                  className={`hidden md:block transition-colors ${
                    pathname.startsWith('/admin')
                      ? 'text-indigo-600 dark:text-indigo-400 font-extrabold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  Dashboard
                </Link>
              ) : null}

              <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
