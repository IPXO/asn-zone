'use client';
import React from 'react';

function getInitial(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  try {
    // Prefer ThemeInit's data-theme if present (pre-hydration)
    const html = document.documentElement;
    const d = (html.dataset.theme as 'light'|'dark'|undefined);
    if (d === 'light' || d === 'dark') return d;
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(getInitial);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', theme === 'dark');
    html.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
      className="rounded-md border border-gray-300/70 dark:border-white/10 px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-white/10"
      aria-label="Toggle color scheme"
    >
      {/* Suppress hydration text mismatch by deferring the label until mounted */}
      <span suppressHydrationWarning>
        {!mounted ? 'Theme' : (theme === 'dark' ? '☾ Dark' : '☼ Light')}
      </span>
    </button>
  );
}
