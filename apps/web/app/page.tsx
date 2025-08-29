import Link from "next/link";
import { loadGlobal, getTopIPv4, getTopIPv6, type V4TopItem, type V6TopItem } from "../lib/data";
import Table from "../components/Table";
import Script from "next/script";

export const metadata = { title: "asn.zone — authoritative ASN directory" };

export default async function Home() {
  const global = await loadGlobal();
  const top4: V4TopItem[] = getTopIPv4(global).slice(0, 10);
  const top6: V6TopItem[] = getTopIPv6(global).slice(0, 10);
  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <div className="space-y-8">
      <Script
        id="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "asn.zone",
            "url": "https://ipxo.github.io/asn-zone/",
            "logo": "https://ipxo.github.io/asn-zone/brand/logo.svg",
            "sameAs": ["https://github.com/IPXO/asn-zone"]
          })
        }}
      />

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

      <div>
        <h2 className="text-xl font-semibold mb-2">Top IPv4</h2>
        <Table
          columns={[
            { key: "asn", label: "ASN" },
            { key: "name", label: "Name" },
            { key: "org", label: "Org" },
            { key: "country", label: "CC" },
            { key: "v4_slash24s", label: "/24s" },
          ]}
          rows={top4 as unknown as Record<string, any>[]}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Top IPv6</h2>
        <Table
          columns={[
            { key: "asn", label: "ASN" },
            { key: "name", label: "Name" },
            { key: "org", label: "Org" },
            { key: "country", label: "CC" },
            { key: "v6_slots", label: "slots" },
          ]}
          rows={top6 as unknown as Record<string, any>[]}
        />
      </div>
    </div>
  );
}
