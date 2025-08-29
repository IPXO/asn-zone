import Link from "next/link";
import { loadGlobal, getAsnsByCountry, isoCountryName } from "../../../lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const ccs = Array.from(new Set([
    ...g.top.ipv4.map(r => r.country),
    ...g.top.ipv6.map(r => r.country),
  ])).slice(0, 50);
  return ccs.map(cc => ({ cc }));
}

export default async function CountryPage({ params }: { params: { cc: string } }) {
  const g = await loadGlobal();
  const cc = params.cc.toUpperCase();
  const name = isoCountryName(cc);
  const asns = getAsnsByCountry(g, cc);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          {name ? `${name} (${cc})` : `Country: ${cc}`}
        </h1>
        <p className="text-gray-600">{asns.length.toLocaleString("en-US")} ASN(s)</p>
      </div>

      {asns.length === 0 ? (
        <p className="text-gray-600">No ASNs found for this country in the current snapshot.</p>
      ) : (
        <ul className="space-y-2">
          {asns.map(asn => (
            <li key={asn.asn}>
              <Link className="text-indigo-600" href={`/asn/${asn.asn}`}>
                AS{asn.asn} — {asn.name} {asn.org ? `• ${asn.org}` : ""} {asn.country ? `• ${asn.country}` : ""}
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
