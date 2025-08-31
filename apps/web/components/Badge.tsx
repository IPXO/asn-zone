import React from 'react';
export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-300/70 dark:border-white/15 px-2.5 py-0.5 text-xs text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-white/10">
      {children}
    </span>
  );
}
