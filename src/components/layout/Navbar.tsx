'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '@/lib/auth';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const idTokenResult = await currentUser.getIdTokenResult();
          setIsAdmin(!!idTokenResult.claims.admin);
        } catch (error) {
          console.error("Error getting idTokenResult", error);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Insights', href: '/insights' },
    { name: 'Timeline', href: '/timeline' },
    { name: 'Archive', href: '/archive' },
  ];

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
              
              <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
              
              <ThemeToggle />

              {/* Auth Button - Moved to far right */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="hover:text-red-500 dark:hover:text-red-400 text-slate-500 dark:text-slate-400 transition-colors"
                >
                  로그아웃
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-500 dark:text-slate-400 transition-colors font-bold"
                >
                  로그인
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
