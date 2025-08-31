import Link from "next/link";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import Table from "../../../components/Table";
import { JsonLd, itemListJsonLd } from "../../../lib/seo";
import { loadGlobal, getAsnsByOrg } from "../../../lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const names = new Set<string>([
    ...g.top.ipv4.map((r) => r.org),
    ...g.top.ipv6.map((r) => r.org),
  ]);
  return Array.from(names).slice(0, 50).map((name) => ({ name }));
}

const fmt = (n: number) => n.toLocaleString("en-US");

export default async function OrgPage({ params }: { params: { name: string } }) {
  const g = await loadGlobal();
  const rows = getAsnsByOrg(g, params.name);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE ?? "";

  const items = rows.map(r => ({
    url: `/asn/${r.asn}`,
    name: `AS${r.asn} — ${r.name}`,
  }));

  return (
    <div className="space-y-6">
      <JsonLd json={itemListJsonLd({ baseUrl, name: `ASNs for ${params.name}`, items })} />

      <Breadcrumbs items={[
        { href: "/", label: "Home" },
        { href: "/org", label: "Organizations" },
        { label: params.name },
      ]} />

      <h1 className="text-xl font-semibold">{params.name}</h1>

      <Table
        columns={[
          { key: "asn", label: "ASN", render: (v) => <Link className="text-indigo-600" href={`/asn/${v}`}>AS{v}</Link> },
          { key: "name", label: "Name" },
          { key: "country", label: "CC", render: (v) => <Link className="text-indigo-600" href={`/country/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
          { key: "v4_slash24s", label: "/24s", render: (v) => fmt(Number(v)) },
          { key: "v6_slots", label: "v6 slots", render: (v) => fmt(Number(v)) },
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />
    </div>
  );
}
