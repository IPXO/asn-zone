import React from "react";

export type Column = {
  key: string;
  label: string;
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
};

export default function Table({
  columns,
  rows,
  getKey,
  emptyText = "No data",
}: {
  columns: Column[];
  rows: Record<string, any>[];
  getKey?: (row: Record<string, any>) => React.Key;
  emptyText?: string;
}) {
  if (!rows || rows.length === 0) {
    return <div className="text-sm text-gray-500">{emptyText}</div>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200/70 dark:border-white/10">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50/80 dark:bg-white/5">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200/70 dark:divide-white/10">
          {rows.map((r, i) => (
            <tr key={getKey ? getKey(r) : i} className="odd:bg-white even:bg-gray-50/40 dark:odd:bg-transparent dark:even:bg-white/5">
              {columns.map((c) => (
                <td key={c.key} className="px-3 py-2">
                  {c.render ? c.render(r[c.key], r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
