import Link from "next/link";
import Table from "../../components/Table";
import { loadGlobal, getAsnsByCountry, isoCountryName } from "../../../lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const ccs = new Set<string>([
    ...g.top.ipv4.map((r) => r.country),
    ...g.top.ipv6.map((r) => r.country),
  ]);
  return Array.from(ccs).slice(0, 100).map((cc) => ({ cc }));
}

export default async function CountryPage({ params }: { params: { cc: string } }) {
  const g = await loadGlobal();
  const cc = params.cc.toUpperCase();
  const rows = getAsnsByCountry(g, cc);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          {isoCountryName(cc) ?? cc} <span className="text-gray-500 text-base">({cc})</span>
        </h1>
        <p className="text-gray-600">{rows.length.toLocaleString("en-US")} ASN(s)</p>
      </div>

      <Table
        columns={[
          { key: "asn", label: "ASN", render: (v) => <Link className="text-indigo-600" href={`/asn/${v}`}>AS{v}</Link> },
          { key: "name", label: "Name" },
          { key: "org", label: "Org", render: (v) => <Link className="text-indigo-600" href={`/org/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
          { key: "v4_slash24s", label: "/24s", render: (v) => (v != null ? Number(v).toLocaleString("en-US") : "—") },
          { key: "v6_slots", label: "v6 slots", render: (v) => (v != null ? Number(v).toLocaleString("en-US") : "—") },
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />

      <div className="text-sm text-gray-500">
        Snapshot: {new Date(g.generated_at).toLocaleString()} • <Link className="text-indigo-600" href="/">Home</Link>
      </div>
    </div>
  );
}
