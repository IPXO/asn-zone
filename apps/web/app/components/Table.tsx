import React from "react";

type Column = {
  key: string;
  label: string;
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
};

export default function Table({
  columns,
  rows,
}: {
  columns: Column[];
  rows: Record<string, any>[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200/70 dark:border-white/10">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2 text-left font-medium">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200/70 dark:divide-white/10">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/60 dark:hover:bg-white/[0.04]">
              {columns.map((c) => {
                const v = (row as any)[c.key];
                return (
                  <td key={c.key} className="px-3 py-2">
                    {c.render ? c.render(v, row) : String(v ?? "")}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
