import { cn } from "../lib/cn";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-white/10", className)} />
  );
}
