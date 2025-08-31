import Link from 'next/link';
import Table from '../../../components/Table';
import { loadGlobal, getTopIPv6 } from '../../../lib/data';
import { JsonLd, itemListJsonLd } from '../../../lib/seo';

export const metadata = { title: 'Top IPv6 — asn.zone' };

export default async function Page() {
  const g = await loadGlobal();
  const rows = getTopIPv6(g);
  const urls = rows.map((r) => `/asn/${r.asn}`);
  const updated = new Date(g.generated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <div className="space-y-6">
      <JsonLd json={itemListJsonLd(urls.map((u) => ({ url: u })))} />
      <h1 className="text-xl font-semibold">Top ASNs by IPv6 (/32 slots)</h1>
      <p className="text-sm text-gray-500">Dataset updated {updated}</p>
      <Table
        columns={[
          { key: 'asn', label: 'ASN', kind: 'asn' },
          { key: 'name', label: 'Name' },
          { key: 'org', label: 'Org', kind: 'org' },
          { key: 'country', label: 'CC', kind: 'country' },
          { key: 'v6_slots', label: 'slots', kind: 'number' },
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />
    </div>
  );
}
