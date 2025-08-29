export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
      {children}
    </div>
  );
}
export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">{children}</div>;
}
export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
