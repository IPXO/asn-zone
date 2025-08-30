import React from 'react';

export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-300/70 dark:border-white/10 bg-white dark:bg-black px-2 py-1 text-xs font-medium">
      {children}
    </span>
  );
}
