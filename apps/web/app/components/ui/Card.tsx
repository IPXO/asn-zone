import cn from 'classnames';

export function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-4">
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4">
      {children}
    </div>
  );
}

export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div
      className={cn("rounded-md border border-gray-200/70 dark:border-white/10", className)}
    >
      <CardHeader />
      <CardContent>{children}</CardContent>
    </div>
  );
}
