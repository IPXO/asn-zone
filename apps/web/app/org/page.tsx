import Link from "next/link";
import { loadGlobal } from "../../lib/data";

export const metadata = { title: "Organizations — asn.zone" };

export default async function OrgIndex() {
  const g = await loadGlobal();
  const names = new Set<string>([
    ...g.top.ipv4.map(r => r.org),
    ...g.top.ipv6.map(r => r.org),
  ]);
  const list = Array.from(names).sort();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Organizations in current snapshot</h1>
      <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {list.map(name => (
          <li key={name}>
            <Link className="text-indigo-600" href={`/org/${encodeURIComponent(name)}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
