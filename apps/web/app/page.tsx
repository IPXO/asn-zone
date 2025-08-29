import Link from "next/link";
import Table from "./components/Table";
import { loadGlobal, getTopIPv4, getTopIPv6 } from "../lib/data";

export const metadata = { title: "asn.zone — authoritative ASN directory" };

export default async function Home() {
  const global = await loadGlobal();
  const top4 = getTopIPv4(global).slice(0, 10);
  const top6 = getTopIPv6(global).slice(0, 10);
  const isoWhen = new Date(global.generated_at).toISOString();

  const fmt = (n: number) => n.toLocaleString("en-US");
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "asn.zone — authoritative ASN directory",
    "dateModified": isoWhen,
    "about": "Explore ASNs, IP space, ownership, and trends",
    "isPartOf": {
      "@type": "WebSite",
      "name": "asn.zone",
      "url": "https://ipxo.github.io/asn-zone/"
    }
  };

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
          <div className="text-xs uppercase text-gray-500">Total ASNs</div>
          <div className="text-2xl font-semibold">{fmt(global.stats.asns_total)}</div>
        </div>
        <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
          <div className="text-xs uppercase text-gray-500">IPv4 announced</div>
          <div className="text-2xl font-semibold">{fmt(global.stats.ipv4_announced)}</div>
          <div className="text-xs text-gray-500">/24 equivalents</div>
        </div>
        <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
          <div className="text-xs uppercase text-gray-500">IPv6 announced</div>
          <div className="text-2xl font-semibold">{fmt(global.stats.ipv6_announced)}</div>
          <div className="text-xs text-gray-500">/32 slots</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Top IPv4</h2>
          <Table
            columns={[
              { key: "asn", label: "ASN", render: (v) => <Link className="text-indigo-600" href={`/asn/${v}`}>AS{v}</Link> },
              { key: "name", label: "Name" },
              { key: "org", label: "Org", render: (v) => <Link className="text-indigo-600" href={`/org/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
              { key: "country", label: "CC", render: (v) => <Link className="text-indigo-600" href={`/country/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
              { key: "v4_slash24s", label: "/24s", align: "right", render: (v) => Number(v).toLocaleString("en-US") },
            ]}
            rows={top4 as unknown as Record<string, any>[]}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Top IPv6</h2>
          <Table
            columns={[
              { key: "asn", label: "ASN", render: (v) => <Link className="text-indigo-600" href={`/asn/${v}`}>AS{v}</Link> },
              { key: "name", label: "Name" },
              { key: "org", label: "Org", render: (v) => <Link className="text-indigo-600" href={`/org/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
              { key: "country", label: "CC", render: (v) => <Link className="text-indigo-600" href={`/country/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
              { key: "v6_slots", label: "Slots", align: "right", render: (v) => Number(v).toLocaleString("en-US") },
            ]}
            rows={top6 as unknown as Record<string, any>[]}
          />
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Snapshot: {new Date(global.generated_at).toLocaleString()} •{" "}
        <Link className="text-indigo-600" href="/data/current/global.json">dataset.json</Link>
      </div>
    </div>
  );
}
