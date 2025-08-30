import Link from "next/link";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import Table from "../../../components/Table";
import { JsonLd, itemListJsonLd } from "../../../lib/seo";
import { loadGlobal, getAsnsByCountry, isoCountryName } from "../../../lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const ccs = new Set<string>([
    ...g.top.ipv4.map((r) => r.country),
    ...g.top.ipv6.map((r) => r.country),
  ]);
  return Array.from(ccs).slice(0, 50).map((cc) => ({ cc }));
}

const fmt = (n: number) => n.toLocaleString("en-US");

export default async function CountryPage({ params }: { params: { cc: string } }) {
  const g = await loadGlobal();
  const rows = getAsnsByCountry(g, params.cc);
  const ccLabel = isoCountryName(params.cc) || params.cc;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE ?? "";

  const items = rows.map(r => ({
    url: `/asn/${r.asn}`,
    name: `AS${r.asn} — ${r.name}`,
  }));

  return (
    <div className="space-y-6">
      <JsonLd data={itemListJsonLd({ baseUrl, name: `ASNs in ${ccLabel}`, items })} />

      <Breadcrumbs items={[
        { href: "/", label: "Home" },
        { href: "/country", label: "Countries" },
        { label: ccLabel },
      ]} />

      <h1 className="text-xl font-semibold">Country: {ccLabel}</h1>

      <Table
        columns={[
          { key: "asn", label: "ASN", render: (v) => <Link className="text-indigo-600" href={`/asn/${v}`}>AS{v}</Link> },
          { key: "name", label: "Name" },
          { key: "org", label: "Org", render: (v) => <Link className="text-indigo-600" href={`/org/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
          { key: "v4_slash24s", label: "/24s", render: (v) => fmt(Number(v)) },
          { key: "v6_slots", label: "v6 slots", render: (v) => fmt(Number(v)) },
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />
    </div>
  );
}
