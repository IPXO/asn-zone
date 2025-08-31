import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};
export default function Card({ className = '', children }: Props) {
  return (
    <div
      className={`rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
export function CardHeader({ className = '', children }: Props) {
  return (
    <div className={`px-4 py-3 border-b border-gray-200/70 dark:border-white/10 ${className}`}>
      {children}
    </div>
  );
}
export function CardContent({ className = '', children }: Props) {
  return <div className={`px-4 py-4 ${className}`}>{children}</div>;
}
