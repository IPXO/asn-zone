import Link from "next/link";
import { loadGlobal, getAsnsByCountry, isoCountryName } from "../../../lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const set = new Set<string>([
    ...g.top.ipv4.map(r => r.country).filter(Boolean),
    ...g.top.ipv6.map(r => r.country).filter(Boolean),
  ]);
  return Array.from(set).slice(0, 100).map(cc => ({ cc }));
}

export default async function CountryPage({ params }: { params: { cc: string } }) {
  const g = await loadGlobal();
  const cc = params.cc.toUpperCase();
  const asns = getAsnsByCountry(g, cc);
  const name = isoCountryName(cc) ?? cc;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{name} ({cc})</h1>
        <p className="text-gray-600">{asns.length.toLocaleString("en-US")} ASN(s)</p>
      </div>

      {asns.length === 0 ? (
        <p className="text-gray-600">No ASNs found in the current snapshot.</p>
      ) : (
        <ul className="space-y-2">
          {asns.map(a => (
            <li key={a.asn}>
              <Link className="text-indigo-600" href={`/asn/${a.asn}`}>
                AS{a.asn} — {a.name} {a.org ? `• ${a.org}` : ""}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="text-sm text-gray-500"><Link href="/">← Back home</Link></div>
    </div>
  );
}
