import Link from "next/link";
import { loadGlobal, getCountryAgg } from "../../lib/data";
import Table from "../components/Table";

export const metadata = {
  title: "Countries — asn.zone",
  description: "ASNs and announced IP space by country.",
};

export default async function CountryIndexPage() {
  const g = await loadGlobal();
  const rows = getCountryAgg(g);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Countries</h1>
      <Table
        columns={[
          { key: "cc", label: "CC", render: (v) => <Link className="text-indigo-600" href={`/country/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
          { key: "name", label: "Country" },
          { key: "asns", label: "ASNs", render: (v) => Number(v).toLocaleString("en-US") },
          { key: "v4_slash24s", label: "IPv4 (/24s)", render: (v) => Number(v).toLocaleString("en-US") },
          { key: "v6_slots", label: "IPv6 (slots)", render: (v) => Number(v).toLocaleString("en-US") },
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />
    </div>
  );
}
