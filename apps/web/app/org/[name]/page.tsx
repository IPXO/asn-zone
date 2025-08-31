import Link from "next/link";
import { loadGlobal, getAsnsByOrg } from "../../../lib/data";
import { JsonLd, itemListJsonLd } from "../../../lib/seo";


export const dynamicParams = false;
export async function generateStaticParams() {
  const { loadGlobal } = await import("../../../lib/data");
  const g = await loadGlobal();
  const names = Array.from(new Set([
    ...(g?.top?.ipv4 || []).map(r => r.org).filter(Boolean),
    ...(g?.top?.ipv6 || []).map(r => r.org).filter(Boolean),
  ]));
  // Keep raw strings for params; your links can encode for URLs.
  return names.slice(0, 200).map(name => ({ name }));
}
export const metadata = { title: "Organization — asn.zone" };

export default async function OrgPage({ params }: { params: { name: string } }) {
  const g = await loadGlobal();
  const decodedName = decodeURIComponent(params.name);
  const rows = getAsnsByOrg(g, decodedName);

  const urls = rows.map((r) => `/asn/${r.asn}`);
  const updated = new Date(g.generated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="space-y-6">
      <JsonLd json={itemListJsonLd(urls.map((u) => ({ url: u })))} />

      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li><Link href="/">Home</Link></li>
          <li>/</li>
          <li><Link href="/org">Organizations</Link></li>
          <li>/</li>
          <li aria-current="page" className="text-gray-900 dark:text-gray-200">{decodedName}</li>
        </ol>
      </nav>

      <h1 className="text-xl font-semibold">ASNs for “{decodedName}”</h1>
      <p className="text-sm text-gray-500">Dataset updated {updated}</p>

      {rows.length === 0 ? (
        <p className="text-gray-600">No ASNs found for this organization in the current snapshot.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200/70 dark:border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-3 py-2 text-left font-medium">ASN</th>
                <th className="px-3 py-2 text-left font-medium">Name</th>
                <th className="px-3 py-2 text-left font-medium">Org</th>
                <th className="px-3 py-2 text-left font-medium">CC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/70 dark:divide-white/10">
              {rows.map((r) => (
                <tr key={r.asn} className="hover:bg-gray-50/60 dark:hover:bg-white/[0.04]">
                  <td className="px-3 py-2">
                    <Link className="text-indigo-600" href={`/asn/${r.asn}`}>AS{r.asn}</Link>
                  </td>
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="px-3 py-2">
                    <Link className="text-indigo-600" href={`/org/${encodeURIComponent(String(r.org))}`}>
                      {String(r.org)}
                    </Link>
                  </td>
                  <td className="px-3 py-2">
                    <Link className="text-indigo-600" href={`/country/${encodeURIComponent(String(r.country))}`}>
                      {String(r.country)}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
