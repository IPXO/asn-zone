'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const active = theme === 'system' ? systemTheme : theme;
  const next = active === 'dark' ? 'light' : 'dark';

  return (
    <button
      onClick={() => setTheme(next!)}
      className="rounded-full border px-3 py-1.5 text-xs
                 border-gray-200 text-gray-700 hover:bg-gray-50
                 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
      title={`Switch to ${next} mode`}
    >
      {active === 'dark' ? '☾ Dark' : '☀︎ Light'}
    </button>
  );
}