import Link from "next/link";
import Card, { CardContent, CardHeader } from "../../../components/ui/Card";
import Table from "../../../components/Table";
import { loadGlobal, getTopIPv6 } from "../../../lib/data";

export const metadata = { title: "Top IPv6 — asn.zone" };

export default async function Page() {
  const g = await loadGlobal();
  const rows = getTopIPv6(g);
  return (
    <Card>
      <CardHeader><h1 className="text-lg font-semibold">Top ASNs by IPv6 size</h1></CardHeader>
      <CardContent>
        <Table
          columns={[
            { key: "asn", label: "ASN", render: (v) => <Link className="text-indigo-600" href={`/asn/${v}`}>AS{v}</Link> },
            { key: "name", label: "Name" },
            { key: "org", label: "Org" },
            { key: "country", label: "CC" },
            { key: "v6_slots", label: "IPv6 (/32 slots)", render: (v) => Number(v).toLocaleString("en-US") },
          ]}
          rows={rows as unknown as Record<string, any>[]}
          getKey={(r) => (r as any).asn}
        />
      </CardContent>
    </Card>
  );
}
