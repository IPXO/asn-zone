import Link from "next/link";
import Table from "../../components/Table";
import { loadGlobal, getTopIPv6 } from "../../../lib/data";

export const metadata = { title: "Top IPv6 — asn.zone" };

export default async function Page() {
  const g = await loadGlobal();
  const rows = getTopIPv6(g);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Top ASNs by IPv6 (slots)</h1>
      <Table
        columns={[
          { key: "asn", label: "ASN", render: (v) => <Link className="text-indigo-600" href={`/asn/${v}`}>AS{v}</Link> },
          { key: "name", label: "Name" },
          { key: "org", label: "Org", render: (v) => <Link className="text-indigo-600" href={`/org/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
          { key: "country", label: "CC", render: (v) => <Link className="text-indigo-600" href={`/country/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
          { key: "v6_slots", label: "Slots", align: "right", render: (v) => Number(v).toLocaleString("en-US") },
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />
    </div>
  );
}
