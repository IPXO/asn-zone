import { cn } from "../../lib/cn";
import React from "react";

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
};

export default function Card({ as: Tag = "div", className, children }: Props) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-gray-200/70 dark:border-white/10",
        "bg-white/60 dark:bg-white/[0.03] backdrop-blur",
        "shadow-sm",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({
  className,
  children,
}: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("px-5 py-4 border-b border-gray-200/60 dark:border-white/10", className)}>
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
}: { className?: string; children: React.ReactNode }) {
  return <div className={cn("px-5 py-5", className)}>{children}</div>;
}

export function CardFooter({
  className,
  children,
}: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("px-5 py-4 border-t border-gray-200/60 dark:border-white/10", className)}>
      {children}
    </div>
  );
}
