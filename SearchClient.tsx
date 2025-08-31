'use client';

import { useMemo, useState, useEffect } from 'react';
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

const SearchClient = () => {
  const g = getGlobalSync();
  const all = useMemo(
    () => [
      ...g.top.ipv4.map((r) => ({ ...r, family: 'v4' as const })),
      ...g.top.ipv6.map((r) => ({ ...r, family: 'v6' as const })),
    ],
    [g],
  );

  const [q, setQ] = useState('');
  const debouncedSetQ = debounce(setQ, 250);
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

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (rows.length > 0 && selectedIndex === null) {
      setSelectedIndex(0);
    }
  }, [rows, selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (selectedIndex !== null) {
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (selectedIndex !== null) {
          setSelectedIndex((prev) => Math.min(prev + 1, rows.length - 1));
        }
        break;
      case 'Enter':
        if (selectedIndex !== null && rows[selectedIndex]) {
          window.location.href = `/asn/${rows[selectedIndex].asn}`;
        }
        break;
      case 'Escape':
        e.preventDefault();
        setQ('');
        setSelectedIndex(null);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Search</h1>
      <input
        value={q}
        onChange={(e) => debouncedSetQ(e.target.value)}
        onKeyDown={handleKeyDown}
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
          rows.map((r, index) => ({
            ...r,
            name: selectedIndex === index ? `<mark>${r.name}</mark>` : r.name.replace(new RegExp(q, 'gi'), (match) => `<mark>${match}</mark>`),
            org: selectedIndex === index ? `<mark>${r.org}</mark>` : r.org.replace(new RegExp(q, 'gi'), (match) => `<mark>${match}</mark>`),
          })) as unknown as Record<string, any>[]
        }
      />
    </div>
  );
};

export default SearchClient;
