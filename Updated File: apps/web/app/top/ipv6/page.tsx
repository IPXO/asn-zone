import Link from 'next/link';
import SortableTable from '../../../components/SortableTable';
import { loadGlobal, getTopIPv6 } from '../../../lib/data';

export const metadata = { title: 'Top IPv6 — asn.zone' };

export default async function Page() {
  const g = await loadGlobal();
  const rows = getTopIPv6(g);
  const updated = new Date(g.generated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Top ASNs by IPv6 (/32 slots)</h1>
      <p className="text-sm text-gray-500">Dataset updated {updated}</p>
      <SortableTable
        columns={[
          { key: 'asn', label: 'ASN', kind: 'asn' },
          { key: 'name', label: 'Name' },
          { key: 'org', label: 'Org', kind: 'org' },
          { key: 'country', label: 'CC', kind: 'country' },
          { key: 'v6_slots', label: 'slots', kind: 'number' },
        ]}
        rows={rows}
      />
    </div>
  );
}
