import Link from "next/link";
import { loadGlobal, getOrgAgg } from "../../lib/data";
import Table from "../components/Table";

export const metadata = {
  title: "Organizations — asn.zone",
  description: "Aggregated ASNs and announced IP space by organization.",
};

export default async function OrgIndexPage() {
  const g = await loadGlobal();
  const rows = getOrgAgg(g);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Organizations</h1>
      <Table
        columns={[
          { key: "org", label: "Organization", render: (v) => <Link className="text-indigo-600" href={`/org/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
          { key: "asns", label: "ASNs", render: (v) => Number(v).toLocaleString("en-US") },
          { key: "v4_slash24s", label: "IPv4 (/24s)", render: (v) => Number(v).toLocaleString("en-US") },
          { key: "v6_slots", label: "IPv6 (slots)", render: (v) => Number(v).toLocaleString("en-US") },
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />
    </div>
  );
}
