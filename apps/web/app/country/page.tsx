import Link from "next/link";
import { loadGlobal, isoCountryName } from "../../lib/data";

export const metadata = { title: "Countries — asn.zone" };

export default async function CountriesIndex() {
  const g = await loadGlobal();
  const set = new Set<string>();
  for (const r of g.top.ipv4) set.add(r.country);
  for (const r of g.top.ipv6) set.add(r.country);
  const codes = Array.from(set).sort((a, b) => a.localeCompare(b));

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Countries</h1>
      <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {codes.map((cc) => (
          <li key={cc} className="rounded-xl border border-gray-200/70 dark:border-white/10 px-3 py-2 hover:bg-gray-50/60 dark:hover:bg-white/[0.04]">
            <Link className="block" href={`/country/${encodeURIComponent(cc)}`}>
              <div className="font-medium">{isoCountryName(cc)}</div>
              <div className="text-xs text-gray-500">{cc}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
