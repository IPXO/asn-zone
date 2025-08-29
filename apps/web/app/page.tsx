import Link from "next/link";
import { loadGlobal, getTopIPv4, getTopIPv6 } from "../lib/data";
import Table from "../components/Table";
import Stat from "../components/Stat";
import Card, { CardHeader, CardContent } from "../components/ui/Card";

export const metadata = { title: "asn.zone — authoritative ASN directory" };

export default async function Home() {
  const global = await loadGlobal();
  const top4 = getTopIPv4(global).slice(0, 5);
  const top6 = getTopIPv6(global).slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <Stat label="ASNs Total" value={global.stats.asns_total.toLocaleString()} />
        <Stat label="IPv4 /24s" value={global.stats.ipv4_announced.toLocaleString()} />
        <Stat label="IPv6 slots" value={global.stats.ipv6_announced.toLocaleString()} />
      </div>

      <Card>
        <CardHeader>Top IPv4</CardHeader>
        <CardContent>
          <Table
            columns={[
              { key: "asn", label: "ASN", render: (v) => <Link href={`/asn/${v}`}>AS{v}</Link> },
              { key: "name", label: "Name" },
              { key: "org", label: "Org" },
              { key: "country", label: "CC" },
              { key: "v4_slash24s", label: "/24s" },
            ]}
            rows={top4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>Top IPv6</CardHeader>
        <CardContent>
          <Table
            columns={[
              { key: "asn", label: "ASN", render: (v) => <Link href={`/asn/${v}`}>AS{v}</Link> },
              { key: "name", label: "Name" },
              { key: "org", label: "Org" },
              { key: "country", label: "CC" },
              { key: "v6_slots", label: "Slots" },
            ]}
            rows={top6}
          />
        </CardContent>
      </Card>
    </div>
  );
}
