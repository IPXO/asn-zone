export default function Badge({
  children,
  tone = 'gray',
}: {
  children: React.ReactNode;
  tone?: 'gray' | 'green' | 'indigo';
}) {
  const tones: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200',
    green: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300',
    indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${tones[tone] || tones.gray}`}
    >
      {children}
    </span>
  );
}
