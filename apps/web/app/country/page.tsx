import Link from "next/link";
import { loadGlobal } from "../../lib/data";

export const metadata = { title: "Countries — asn.zone" };

export default async function CountryIndex() {
  const g = await loadGlobal();
  const ccs = new Set<string>([
    ...g.top.ipv4.map(r => r.country),
    ...g.top.ipv6.map(r => r.country),
  ]);
  const list = Array.from(ccs).sort();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Countries in current snapshot</h1>
      <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {list.map(cc => (
          <li key={cc}>
            <Link className="text-indigo-600" href={`/country/${encodeURIComponent(cc)}`}>{cc}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
