
export const metadata = {
  title: ({ params }: any) => `AS${params.id} — asn.zone`,
  description: ({ params }: any) => `Details for AS${params.id} on asn.zone`,
};

import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import { loadGlobal, getAsnById } from "../../../lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const ids = Array.from(new Set([
    ...g.top.ipv4.map(r => r.asn),
    ...g.top.ipv6.map(r => r.asn),
  ])).slice(0, 50);
  return ids.map((id) => ({ id: String(id) }));
}

export default async function AsnPage({ params }: { params: { id: string } }) {
  const g = await loadGlobal();
  const asn = getAsnById(g, Number(params.id));

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { href: "/", label: "Home" },
        { label: `AS${params.id}` },
      ]}/>
      <div>
        <h1 className="text-2xl font-semibold">AS{params.id}{asn ? ` — ${asn.name}` : ""}</h1>
        {asn ? (
          <p className="text-gray-600">{asn.org} • {asn.country}</p>
        ) : (
          <p className="text-gray-600">Not found in the current snapshot.</p>
        )}
      </div>

      {asn && (
        <div className="grid gap-4 md:grid-cols-2">
          {"v4_slash24s" in asn && (
            <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
              <div className="text-xs uppercase text-gray-500">IPv4 (/24s)</div>
              <div className="text-2xl font-semibold">{asn.v4_slash24s.toLocaleString("en-US")}</div>
            </div>
          )}
          {"v6_slots" in asn && (
            <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
              <div className="text-xs uppercase text-gray-500">IPv6 (slots)</div>
              <div className="text-2xl font-semibold">{asn.v6_slots.toLocaleString("en-US")}</div>
            </div>
          )}
        </div>
      )}

      <div className="text-sm text-gray-500">
        Snapshot: {new Date(g.generated_at).toLocaleString()} • <Link className="text-indigo-600" href="/">Home</Link>
      </div>
    </div>
  );
}
