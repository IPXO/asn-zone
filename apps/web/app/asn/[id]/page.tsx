import Link from "next/link";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import { JsonLd, asnThingJsonLd } from "../../../lib/seo";
import { loadGlobal, getAsnById } from "../../../lib/data";
import { fmt } from "../../../lib/num";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const ids = [
    ...g.top.ipv4.map((r) => r.asn),
    ...g.top.ipv6.map((r) => r.asn),
  ];
  // a few seeded IDs for static export
  return Array.from(new Set(ids)).slice(0, 50).map((id) => ({ id: String(id) }));
}

export default async function AsnPage({ params }: { params: { id: string } }) {
  const g = await loadGlobal();
  const a = getAsnById(g, Number(params.id));

  if (!a) {
    return (
      <div className="space-y-4">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: `AS${params.id}` }]} />
        <h1 className="text-2xl font-semibold">AS{params.id}</h1>
        <p className="text-gray-600">Not found in the current snapshot.</p>
      </div>
    );
  }

  // Build absolute or root-relative URL base (works locally and on GitHub Pages)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE ?? "";

  return (
    <div className="space-y-6">
      <JsonLd
        data={asnThingJsonLd({
          baseUrl,
          asn: a.asn,
          name: a.name,
          org: a.org,
          country: a.country,
        })}
      />

      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: `AS${a.asn}` },
        ]}
      />

      <div>
        <h1 className="text-2xl font-semibold">AS{a.asn} — {a.name}</h1>
        <p className="text-gray-600">
          {a.org} • {a.country}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {"v4_slash24s" in a && (
          <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
            <div className="text-xs uppercase text-gray-500">IPv4 (/24s)</div>
            <div className="text-2xl font-semibold">{fmt(a.v4_slash24s)}</div>
          </div>
        )}
        {"v6_slots" in a && (
          <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
            <div className="text-xs uppercase text-gray-500">IPv6 (slots)</div>
            <div className="text-2xl font-semibold">{fmt(a.v6_slots)}</div>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        <Link href="/">← Back home</Link>
      </div>
    </div>
  );
}
