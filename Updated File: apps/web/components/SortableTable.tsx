'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

export type Column = {
  key: string;
  label: string;
  href?: (row: Record<string, any>) => string;
  format?: (value: any, row: Record<string, any>) => React.ReactNode;
};

export default function SortableTable({
  columns,
  rows,
  defaultSortKey,
  defaultSortDir = 'desc',
}: {
  columns: Column[];
  rows: Record<string, any>[];
  defaultSortKey?: string;
  defaultSortDir?: 'asc' | 'desc';
}) {
  const [sortKey, setSortKey] = useState<string>(defaultSortKey || columns[0]?.key);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(defaultSortDir);

  const sorted = useMemo(() => {
    const data = [...rows];
    const k = sortKey;
    data.sort((a, b) => {
      const av = a?.[k];
      const bv = b?.[k];
      // numeric first if both numeric
      const an = typeof av === 'number';
      const bn = typeof bv === 'number';
      let cmp = 0;
      if (an && bn) cmp = (av as number) - (bv as number);
      else cmp = String(av ?? '').localeCompare(String(bv ?? ''), 'en', { sensitivity: 'base' });
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return data;
  }, [rows, sortKey, sortDir]);

  const toggleSort = (k: string) => {
    if (k === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(k);
      setSortDir('desc');
    }
  };

  const renderCell = (col: Column, value: any, row: Record<string, any>) => {
    if (col.href) {
      return (
        <Link href={col.href(row)} className="text-indigo-600">
          {value}
        </Link>
      );
    }
    if (col.format) {
      return col.format(value, row);
    }
    return String(value ?? '');
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200/70 dark:border-white/10">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="px-3 py-2 text-left font-medium cursor-pointer select-none"
                onClick={() => toggleSort(c.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {c.label}
                  {sortKey === c.key && <span aria-hidden>{sortDir === 'asc' ? '▲' : '▼'}</span>}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200/70 dark:divide-white/10">
          {sorted.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/60 dark:hover:bg-white/[0.04]">
              {columns.map((c) => (
                <td key={c.key} className="px-3 py-2">
                  {renderCell(c, row[c.key], row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
