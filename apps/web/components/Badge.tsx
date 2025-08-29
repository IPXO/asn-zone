import { cn } from "../lib/cn";

type Variant = "neutral" | "blue" | "green" | "amber" | "red";

export default function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium";
  const variants: Record<Variant, string> = {
    neutral:
      "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-200 border border-gray-200/70 dark:border-white/10",
    blue:
      "bg-indigo-50 text-indigo-700 border border-indigo-200/70 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20",
    green:
      "bg-emerald-50 text-emerald-700 border border-emerald-200/70 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
    amber:
      "bg-amber-50 text-amber-800 border border-amber-200/70 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
    red:
      "bg-rose-50 text-rose-700 border border-rose-200/70 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20",
  };
  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}
