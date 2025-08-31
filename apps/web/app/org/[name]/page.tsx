import Link from 'next/link';
import Breadcrumbs from '../../../components/ui/Breadcrumbs';
import { JsonLd, itemListJsonLd } from '../../../lib/seo';
import SortableTable from '../../../components/SortableTable';
import { loadGlobal, getAsnsByOrg } from '../../../lib/data';

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const names = new Set<string>([...g.top.ipv4.map((r) => r.org), ...g.top.ipv6.map((r) => r.org)]);
  return Array.from(names)
    .slice(0, 50)
    .map((name) => ({ name }));
}

const fmt = (n: number) => n.toLocaleString('en-US');

export default async function OrgPage({ params }: { params: { name: string } }) {
  const g = await loadGlobal();
  const rows = getAsnsByOrg(g, params.name);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE ?? '';

  const items = rows.map((r) => ({
    url: `/asn/${r.asn}`,
    name: `AS${r.asn} — ${r.name}`,
  }));

  const jsonItems = rows.map((it) => ({
    url: `/asn/${it.asn}`,

    name: it.name ? `AS${it.asn} — ${it.name}` : `AS${it.asn}`,
  }));

  return (
    <div className="space-y-6">
      <JsonLd json={itemListJsonLd(jsonItems)} />

      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/org', label: 'Organizations' },
          { label: params.name },
        ]}
      />

      <h1 className="text-xl font-semibold">{params.name}</h1>

      <SortableTable
        columns={[
          {
            key: 'asn',
            label: 'ASN',
            kind: 'number',
          },
          { key: 'name', label: 'Name' },
          {
            key: 'country',
            label: 'Country',
            kind: 'text',
          },
          { key: 'v4_slash24s', label: '/24s', kind: 'number' },
          { key: 'v6_slots', label: 'v6 slots', kind: 'number' },
        ]}
        rows={rows}
      />
    </div>
  );
}
