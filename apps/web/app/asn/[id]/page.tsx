import Link from "next/link";
import { notFound } from "next/navigation";
import { loadGlobal, getAsnById } from "../../../lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  // seed a reasonable set so export works; we can grow this later
  const ids = Array.from(
    new Set([
      ...g.top.ipv4.map((r) => r.asn),
      ...g.top.ipv6.map((r) => r.asn),
    ])
  )
    .slice(0, 300)
    .map((id) => ({ id: String(id) }));
  return ids;
}

export default async function AsnPage({ params }: { params: { id: string } }) {
  const g = await loadGlobal();
  const id = Number(params.id);
  const asn = getAsnById(g, id);

  if (!asn) {
    notFound();
  }

  const fmt = (n: number) => n.toLocaleString("en-US");
  const org = "org" in asn ? asn.org : undefined;
  const cc = "country" in asn ? asn.country : undefined;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          AS{id} {asn && "name" in asn ? `— ${asn.name}` : ""}
        </h1>
        <p className="text-gray-600">
          {org ? (
            <>
              <Link className="text-indigo-600 hover:underline" href={`/org/${encodeURIComponent(org)}`}>
                {org}
              </Link>
              {" • "}
            </>
          ) : null}
          {cc ? (
            <Link className="text-indigo-600 hover:underline" href={`/country/${encodeURIComponent(cc)}`}>
              {cc}
            </Link>
          ) : null}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        {"v4_slash24s" in asn && (
          <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
            <div className="text-xs uppercase text-gray-500">IPv4 — /24 equivalents</div>
            <div className="text-2xl font-semibold">{fmt(asn.v4_slash24s)}</div>
          </div>
        )}
        {"v6_slots" in asn && (
          <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 p-4">
            <div className="text-xs uppercase text-gray-500">IPv6 — /32 slots</div>
            <div className="text-2xl font-semibold">{fmt(asn.v6_slots)}</div>
          </div>
        )}
      </div>

      {/* Placeholder sections we’ll fill with real data soon */}
      <div className="rounded-2xl border border-dashed border-gray-200/70 dark:border-white/10 p-4">
        <div className="text-sm text-gray-500">
          Coming soon: announced prefixes, peers, and historical charts.
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <Link href="/">← Back home</Link>
      </div>
    </div>
  );
}
