import cn from 'classnames';

export default function Badge({ children, tone = 'gray' }: { children: React.ReactNode, tone?: 'gray'|'green'|'indigo' }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-gray-300/70 dark:border-white/10", {
      "bg-green-100 text-green-600": tone === 'green',
      "bg-indigo-100 text-indigo-600": tone === 'indigo',
    })}>
      {children}
    </span>
  );
}
