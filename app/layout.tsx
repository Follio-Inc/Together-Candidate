import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit"
});

export const metadata: Metadata = {
  title: "Together – Candidate Portal",
  description: "Find roles where you’re actually a fit."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="relative min-h-screen bg-[radial-gradient(circle_at_top,_#fde68a40,_transparent_60%),radial-gradient(circle_at_bottom,_#f9731640,_transparent_55%),var(--background)] text-slate-900">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="ambient-orb left-[-8%] top-[-10%] h-72 w-72 bg-amber-300/60" />
          <div className="ambient-orb right-[-10%] top-1/4 h-80 w-80 bg-amber-500/50" />
          <div className="ambient-orb bottom-[-12%] left-1/3 h-72 w-72 bg-amber-200/60" />
        </div>
        <div className="relative z-10 flex min-h-screen flex-col">
          <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 shadow-soft-glass">
                <span className="text-lg font-semibold text-slate-900">T</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-wide text-slate-900">
                  Together
                </span>
                <span className="text-xs text-slate-500">
                  Candidate Portal
                </span>
              </div>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
              <a href="/jobs" className="hover:text-slate-900">
                Browse roles
              </a>
              <a href="/dashboard" className="hover:text-slate-900">
                My applications
              </a>
            </nav>
          </header>
          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="border-t border-white/60 bg-white/40 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
              <span>© {new Date().getFullYear()} Together. All rights reserved.</span>
              <div className="flex gap-4">
                <a href="/jobs" className="hover:text-slate-800">
                  Browse roles
                </a>
                <a href="/auth/login" className="hover:text-slate-800">
                  Candidate login
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
