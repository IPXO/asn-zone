import Link from 'next/link';
import { loadGlobal, getTopIPv4 } from '../../../lib/data';
import { JsonLd, itemListJsonLd } from '../../../lib/seo';

export const metadata = { title: 'Top IPv4 — asn.zone' };

export default async function Page() {
  const g = await loadGlobal();
  const rows = getTopIPv4(g);
  const urls = rows.map((r) => `/asn/${r.asn}`);
  const updated = new Date(g.generated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <div className="space-y-6">
      <JsonLd json={itemListJsonLd(urls.map((u) => ({ url: u })))} />
      <h1 className="text-xl font-semibold">Top ASNs by IPv4 (/24 equivalents)</h1>
      <p className="text-sm text-gray-500">Dataset updated {updated}</p>
      <SortableTable
        columns={[
          {
            key: 'asn',
            label: 'ASN',
            href: (r) => `/asn/${r.asn}`,
          },
          { key: 'name', label: 'Name' },
          {
            key: 'org',
            label: 'Org',
            href: (r) => `/org/${encodeURIComponent(r.org)}`,
          },
          { key: 'country', label: 'CC', href: (r) => `/country/${r.country}` },
          { key: 'v4_slash24s', label: '/24s', format: (value) => value.toLocaleString('en-US') },
        ]}
        rows={rows}
        defaultSortKey="v4_slash24s"
        defaultSortDir="desc"
      />
    </div>
  );
}
