import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import Table from "../../components/Table";
import { loadGlobal, getAsnsByCountry, isoCountryName } from "../../../lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const set = new Set<string>([
    ...g.top.ipv4.map(r => r.country),
    ...g.top.ipv6.map(r => r.country),
  ]);
  return Array.from(set).slice(0, 50).map(cc => ({ cc }));
}

export default async function CountryPage({ params }: { params: { cc: string } }) {
  const g = await loadGlobal();
  const cc = params.cc.toUpperCase();
  const name = isoCountryName(cc) ?? cc;
  const rows = getAsnsByCountry(g, cc);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { href: "/", label: "Home" },
        { href: "/country", label: "Countries" },
        { label: `${name} (${cc})` },
      ]}/>
      <h1 className="text-2xl font-semibold">{name} <span className="text-gray-500 text-xl">({cc})</span></h1>

      <Table
        columns={[
          { key: "asn", label: "ASN", render: (v) => <Link className="text-indigo-600" href={`/asn/${v}`}>AS{v}</Link> },
          { key: "name", label: "Name" },
          { key: "org", label: "Org", render: (v) => <Link className="text-indigo-600" href={`/org/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
          { key: "v4_slash24s", label: "IPv4 /24s", render: (v) => Number(v).toLocaleString("en-US") },
          { key: "v6_slots", label: "IPv6 slots", render: (v) => Number(v).toLocaleString("en-US") },
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />

      <div className="text-sm text-gray-500">
        Snapshot: {new Date(g.generated_at).toLocaleString()} • <Link className="text-indigo-600" href="/country">All countries</Link>
      </div>
    </div>
  );
}
