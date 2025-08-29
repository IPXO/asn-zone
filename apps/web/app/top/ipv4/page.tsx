import Link from "next/link";
import Table from "../../../components/Table";
import { loadGlobal, getTopIPv4, V4TopItem } from "../../../lib/data";

export const metadata = { title: "Top IPv4 — asn.zone" };

export default async function Page() {
  const global = await loadGlobal();
  const rows: V4TopItem[] = getTopIPv4(global);

  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Top ASNs by IPv4 (/24s)</h1>
      <Table
        columns={[
          {
            key: "asn",
            label: "ASN",
            render: (v) => (
              <Link href={`/asn/${v}`} className="text-indigo-600">
                AS{v}
              </Link>
            )
          },
          { key: "name", label: "Name" },
          { key: "org", label: "Org" },
          { key: "country", label: "CC" },
          { key: "v4_slash24s", label: "/24s", render: (v) => fmt(v) }
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />
    </div>
  );
}