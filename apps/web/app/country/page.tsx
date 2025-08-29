import Link from "next/link";
import { loadGlobal, isoCountryName } from "../../lib/data";

export const metadata = {
  title: "Countries — asn.zone",
  description: "Browse ASNs by country.",
};

export default async function CountryIndex() {
  const g = await loadGlobal();
  const ccs = new Set<string>([
    ...g.top.ipv4.map(r => r.country),
    ...g.top.ipv6.map(r => r.country),
  ]);
  const list = Array.from(ccs).sort();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Countries</h1>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {list.map(cc => (
          <li key={cc}>
            <Link className="text-indigo-600" href={`/country/${encodeURIComponent(cc)}`}>
              {isoCountryName(cc) ?? cc} ({cc})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
