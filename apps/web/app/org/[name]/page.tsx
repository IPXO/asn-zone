import Link from "next/link";
import { loadGlobal, getAsnsByOrg } from "../../../lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const names = Array.from(
    new Set([
      ...g.top.ipv4.map((r) => r.org),
      ...g.top.ipv6.map((r) => r.org),
    ])
  )
    .filter(Boolean)
    .slice(0, 100);
  return names.map((name) => ({ name: encodeURIComponent(name) }));
}

export default async function OrgPage({ params }: { params: { name: string } }) {
  const g = await loadGlobal();
  const name = decodeURIComponent(params.name);
  const asns = getAsnsByOrg(g, name);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{name}</h1>
        <p className="text-gray-600">{asns.length.toLocaleString("en-US")} ASN(s)</p>
      </div>

      {asns.length === 0 ? (
        <p className="text-gray-600">No ASNs found for this org in the current snapshot.</p>
      ) : (
        <ul className="space-y-2">
          {asns.map((a) => (
            <li key={a.asn}>
              <Link className="text-indigo-600" href={`/asn/${a.asn}`}>
                AS{a.asn} — {a.name} {a.country ? `• ${a.country}` : ""}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="text-sm text-gray-500">
        <Link href="/">← Back home</Link>
      </div>
    </div>
  );
}
