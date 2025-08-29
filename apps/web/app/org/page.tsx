import Link from "next/link";
import { loadGlobal } from "../../lib/data";

export const metadata = { title: "Organizations — asn.zone" };

export default async function OrgsIndex() {
  const g = await loadGlobal();
  const set = new Set<string>();
  for (const r of g.top.ipv4) set.add(r.org);
  for (const r of g.top.ipv6) set.add(r.org);
  const orgs = Array.from(set).sort((a, b) => a.localeCompare(b)).slice(0, 300); // cap for now

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Organizations</h1>
      <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {orgs.map((org) => (
          <li key={org} className="rounded-xl border border-gray-200/70 dark:border-white/10 px-3 py-2 hover:bg-gray-50/60 dark:hover:bg-white/[0.04]">
            <Link className="block truncate" href={`/org/${encodeURIComponent(org)}`}>
              <div className="font-medium truncate">{org}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
