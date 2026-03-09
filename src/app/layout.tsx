import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export const metadata: Metadata = {
  title: "Personal Archive",
  description: "Think → Build → Record → Listen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased selection:bg-indigo-200 selection:text-indigo-900 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-100 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Navigation Header will go here */}
          <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 bg-white/70 dark:bg-slate-900/80 border-b border-slate-900/10 dark:border-slate-50/[0.06]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-4 flex items-center justify-between font-semibold">
                <span className="text-xl tracking-tight">Archive.</span>
                <div className="flex items-center gap-6">
                  <nav className="flex space-x-6 text-sm text-slate-500 dark:text-slate-400">
                    <a href="/" className="hover:text-indigo-500 transition-colors">Home</a>
                    <a href="/projects" className="hover:text-indigo-500 transition-colors">Projects</a>
                    <a href="/insights" className="hover:text-indigo-500 transition-colors">Insights</a>
                    <a href="/timeline" className="hover:text-indigo-500 transition-colors">Timeline</a>
                  </nav>
                  <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
