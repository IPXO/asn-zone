'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getGlobalSync } from '../../lib/data';
import Table from '../../components/Table';

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return function (...args: any[]) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

export default function SearchClient() {
  const g = getGlobalSync();
  const all = useMemo(
    () => [
      ...g.top.ipv4.map((r) => ({ ...r, family: 'v4' as const })),
      ...g.top.ipv6.map((r) => ({ ...r, family: 'v6' as const })),
    ],
    [g],
  );

  const [q, setQ] = useState('');
  const debouncedSetQ = debounce(setQ, 200);
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all.slice(0, 50);
    return all
      .filter(
        (r) =>
          String(r.asn).includes(s) ||
          r.name.toLowerCase().includes(s) ||
          r.org.toLowerCase().includes(s) ||
          r.country.toLowerCase().includes(s),
      )
      .slice(0, 200);
  }, [q, all]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Search</h1>
      <input
        value={q}
        onChange={(e) => debouncedSetQ(e.target.value)}
        placeholder="Search by ASN, name, org, country…"
        className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-black p-3 outline-none"
      />
      <div aria-live="polite" role="status">
        {rows.length} results
      </div>
      <Table
        columns={[
          {
            key: 'asn',
            label: 'ASN',
            render: (v) => (
              <Link className="text-indigo-600" href={`/asn/${v}`}>
                AS{v}
              </Link>
            ),
          },
          { key: 'name', label: 'Name' },
          { key: 'org', label: 'Org' },
          { key: 'country', label: 'CC' },
          { key: 'family', label: 'IP' },
        ]}
        rows={
          rows.map((r) => ({
            ...r,
            name: r.name.replace(new RegExp(q, 'gi'), (match) => `<mark>${match}</mark>`),
            org: r.org.replace(new RegExp(q, 'gi'), (match) => `<mark>${match}</mark>`),
          })) as unknown as Record<string, any>[]
        }
      />
    </div>
  );
}
