// apps/web/app/search/page.tsx
import Table from "../../components/Table";
import { loadGlobal, getTopIPv4 } from "../../lib/data";

export const metadata = { title: "Search — asn.zone" };

export default async function Page() {
  const global = await loadGlobal();
  // Temporary: show top IPv4 as a placeholder for search results
  const rows = getTopIPv4(global).slice(0, 20);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Search</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Full-text search is coming soon. For now, here are some popular ASNs:
      </p>

      <Table
        columns={[
          { key: "asn", label: "ASN" },
          { key: "name", label: "Name" },
          { key: "org", label: "Org" },
          { key: "country", label: "CC" },
          { key: "v4_slash24s", label: "/24s" },
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />
    </div>
  );
}