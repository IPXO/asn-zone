import Link from 'next/link';
import React from 'react';

type Column = {
  key: string;
  label: string;
  kind?: 'asn' | 'org' | 'country' | 'number';
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
};

export type TableProps = {
  columns: Column[];
  rows: Record<string, any>[];
};

function renderCell(c: Column, v: any, row: Record<string, any>) {
  if (c.render) return c.render(v, row);
  if (c.kind === 'number') {
    const n = Number(v);
    return Number.isFinite(n) ? n.toLocaleString('en-US') : String(v ?? '');
  }
  const s = String(v ?? '');
  if (!s) return '';
  if (c.kind === 'asn')
    return (
      <Link className="text-indigo-600" href={`/asn/${encodeURIComponent(s)}`}>
        AS{s}
      </Link>
    );
  if (c.kind === 'org')
    return (
      <Link className="text-indigo-600" href={`/org/${encodeURIComponent(s)}`}>
        {s}
      </Link>
    );
  if (c.kind === 'country')
    return (
      <Link className="text-indigo-600" href={`/country/${encodeURIComponent(s)}`}>
        {s}
      </Link>
    );
  return s;
}

export default function Table({ columns, rows }: TableProps) {
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
                    {renderCell(c, v, row)}
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
