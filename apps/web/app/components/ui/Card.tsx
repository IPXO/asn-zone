import React, { ReactNode } from 'react';
import { cn } from '../../../lib/cn';

type BaseProps = {
  className?: string;
  children?: ReactNode; // children optional to avoid strict prop errors
};

export default function Card({ className, children }: BaseProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white dark:bg-black',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: BaseProps) {
  return (
    <div className={cn('px-4 py-3 border-b border-gray-200/70 dark:border-white/10', className)}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }: BaseProps) {
  return <div className={cn('px-4 py-4', className)}>{children}</div>;
}
