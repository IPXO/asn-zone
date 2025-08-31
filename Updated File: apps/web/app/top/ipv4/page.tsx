import Link from 'next/link';
import SortableTable from '../../../components/SortableTable';
import { loadGlobal, getTopIPv4 } from '../../../lib/data';

export const metadata = { title: 'Top IPv4 — asn.zone' };

export default async function Page() {
  const g = await loadGlobal();
  const rows = getTopIPv4(g);
  const updated = new Date(g.generated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Top ASNs by IPv4 (/24 equivalents)</h1>
      <p className="text-sm text-gray-500">Dataset updated {updated}</p>
      <SortableTable
        columns={[
          { key: 'asn', label: 'ASN', kind: 'asn' },
          { key: 'name', label: 'Name' },
          { key: 'org', label: 'Org', kind: 'org' },
          { key: 'country', label: 'CC', kind: 'country' },
          { key: 'v4_slash24s', label: '/24s', kind: 'number' },
        ]}
        rows={rows}
      />
    </div>
  );
}
