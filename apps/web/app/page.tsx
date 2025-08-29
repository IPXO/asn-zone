import Link from "next/link";
import Table from "../components/Table";
import Stat from "../components/Stat";
import Card, { CardHeader, CardContent } from "../components/ui/Card";
import { loadGlobal, getTopIPv4, getTopIPv6, GlobalJson, V4TopItem, V6TopItem } from "../lib/data";

export const metadata = { title: "asn.zone — authoritative ASN directory" };

export default async function Home() {
  const global: GlobalJson = await loadGlobal();
  const top4: V4TopItem[] = getTopIPv4(global).slice(0, 10);
  const top6: V6TopItem[] = getTopIPv6(global).slice(0, 10);
  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total ASNs" value={fmt(global.stats.asns_total)} />
        <Stat label="IPv4 announced" value={fmt(global.stats.ipv4_announced)} hint="/24 equivalents" />
        <Stat label="IPv6 announced" value={fmt(global.stats.ipv6_announced)} hint="/32 slots" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Top ASNs by IPv4 size</h2>
            <Link href="/top/ipv4" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            columns={[
              { key: "asn", label: "ASN", render: (v) => <Link className="text-indigo-600" href={`/asn/${v}`}>AS{v}</Link> },
              { key: "name", label: "Name" },
              { key: "org", label: "Org" },
              { key: "country", label: "CC" },
              { key: "v4_slash24s", label: "IPv4 (/24 eq)", render: (v) => Number(v).toLocaleString("en-US") },
            ]}
            rows={top4 as unknown as Record<string, any>[]}
            getKey={(r) => (r as any).asn}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Top ASNs by IPv6 size</h2>
            <Link href="/top/ipv6" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            columns={[
              { key: "asn", label: "ASN", render: (v) => <Link className="text-indigo-600" href={`/asn/${v}`}>AS{v}</Link> },
              { key: "name", label: "Name" },
              { key: "org", label: "Org" },
              { key: "country", label: "CC" },
              { key: "v6_slots", label: "IPv6 (/32 slots)", render: (v) => Number(v).toLocaleString("en-US") },
            ]}
            rows={top6 as unknown as Record<string, any>[]}
            getKey={(r) => (r as any).asn}
          />
        </CardContent>
      </Card>

      <div className="text-xs text-gray-500">updated {global.generated_at}</div>
    </div>
  );
}
