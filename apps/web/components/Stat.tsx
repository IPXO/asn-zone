import { cn } from "../lib/cn";

export default function Stat({
  label,
  value,
  hint,
  delta,
  className,
}: {
  label: string;
  value: string | number;
  hint?: string;
  delta?: { dir: "up" | "down"; text: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200/70 dark:border-white/10",
        "bg-white/60 dark:bg-white/[0.03] backdrop-blur",
        "px-5 py-4",
        className
      )}
    >
      <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
      <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        {hint && <span>{hint}</span>}
        {delta && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5",
              delta.dir === "up"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-rose-500/10 text-rose-300"
            )}
          >
            {delta.dir === "up" ? "▲" : "▼"} {delta.text}
          </span>
        )}
      </div>
    </div>
  );
}
