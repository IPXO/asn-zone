// apps/web/app/page.tsx
import Link from "next/link";
import Table from "../components/Table";
import { loadGlobal, getTopIPv4, getTopIPv6, V4TopItem, V6TopItem } from "../lib/data";

export const metadata = {
  title: "asn.zone — authoritative ASN directory"
};

export default async function Home() {
  const global = await loadGlobal();
  const top4: V4TopItem[] = getTopIPv4(global).slice(0, 10);
  const top6: V6TopItem[] = getTopIPv6(global).slice(0, 10);

  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <main className="space-y-10">
      <section>
        <h1 className="text-2xl font-semibold mb-4">asn.zone</h1>
        <p className="text-gray-600 dark:text-gray-300">
          The open, minimalistic, authoritative ASN directory.
        </p>
        <ul className="list-disc ml-6 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <li>Top 10 ASNs (IPv4 / IPv6)</li>
          <li>Search by ASN, org, prefix</li>
          <li>Weekly datasets</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Top IPv4 (by /24s announced)</h2>
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
          rows={top4 as unknown as Record<string, any>[]}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Top IPv6 (by slots)</h2>
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
            { key: "v6_slots", label: "slots", render: (v) => fmt(v) }
          ]}
          rows={top6 as unknown as Record<string, any>[]}
        />
      </section>
    </main>
  );
}