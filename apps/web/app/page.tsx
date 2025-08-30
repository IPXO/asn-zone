import Link from "next/link";
import Table from "../components/Table";
import { loadGlobal, getTopIPv4, getTopIPv6 } from "../lib/data";

export const metadata = { title: "asn.zone — authoritative ASN directory" };

export default async function Home() {
  const global = await loadGlobal();
  const top4 = getTopIPv4(global).slice(0, 10);
  const top6 = getTopIPv6(global).slice(0, 10);

  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
          <div className="text-xs uppercase text-gray-500">Total ASNs</div>
          <div className="text-2xl font-semibold">{fmt(global.stats.asns_total)}</div>
        </div>
        <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
          <div className="text-xs uppercase text-gray-500">IPv4 announced</div>
          <div className="text-2xl font-semibold">{fmt(global.stats.ipv4_announced)}</div>
        </div>
        <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
          <div className="text-xs uppercase text-gray-500">IPv6 announced</div>
          <div className="text-2xl font-semibold">{fmt(global.stats.ipv6_announced)}</div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Top IPv4</h2>
            <Link className="text-sm text-indigo-600" href="/top/ipv4">view all</Link>
          </div>
          <Table
            columns={[
              { key: "asn", label: "ASN", kind: "asn" },
              { key: "name", label: "Name" },
              { key: "org", label: "Org", kind: "org" },
              { key: "country", label: "CC", kind: "country" },
              { key: "v4_slash24s", label: "/24s", kind: "number" },
            ]}
            rows={top4 as unknown as Record<string, any>[]}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Top IPv6</h2>
            <Link className="text-sm text-indigo-600" href="/top/ipv6">view all</Link>
          </div>
          <Table
            columns={[
              { key: "asn", label: "ASN", kind: "asn" },
              { key: "name", label: "Name" },
              { key: "org", label: "Org", kind: "org" },
              { key: "country", label: "CC", kind: "country" },
              { key: "v6_slots", label: "slots", kind: "number" },
            ]}
            rows={top6 as unknown as Record<string, any>[]}
          />
        </div>
      </div>
    </div>
  );
}
