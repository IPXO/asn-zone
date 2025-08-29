import { cn } from "../lib/cn";
import React from "react";

export type Column = {
  key: string;
  label: string;
  render?: (value: any, row: Record<string, any>, rowIndex: number) => React.ReactNode;
};

export default function Table({
  columns,
  rows,
  className,
  dense = false,
}: {
  columns: Column[];
  rows: Record<string, any>[];
  className?: string;
  dense?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-gray-200/70 dark:border-white/10",
        "bg-white/60 dark:bg-white/[0.03] backdrop-blur",
        className
      )}
    >
      <table className="w-full text-left border-collapse">
        <thead className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={cn(
                  "border-b border-gray-200/60 dark:border-white/10 bg-white/40 dark:bg-white/[0.02]",
                  dense ? "px-3 py-2" : "px-4 py-3"
                )}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {rows.map((row, i) => (
            <tr
              key={(row.asn as string) ?? i}
              className="hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors"
            >
              {columns.map((c) => {
                const val = row[c.key];
                return (
                  <td
                    key={c.key}
                    className={cn(
                      "border-t border-gray-100/70 dark:border-white/5",
                      dense ? "px-3 py-2" : "px-4 py-3"
                    )}
                  >
                    {c.render ? c.render(val, row, i) : `${val ?? ""}`}
                  </td>
                );
              })}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className={cn(
                  "text-center text-gray-500 dark:text-gray-400",
                  dense ? "px-3 py-6" : "px-4 py-8"
                )}
              >
                No data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
