export default function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4 bg-gray-50 dark:bg-gray-800">
      <div className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {hint && <div className="text-xs text-gray-500">{hint}</div>}
    </div>
  );
}
