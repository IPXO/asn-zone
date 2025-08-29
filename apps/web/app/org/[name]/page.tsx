import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import Table from "../../components/Table";
import { loadGlobal, getAsnsByOrg } from "../../../lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const set = new Set<string>([
    ...g.top.ipv4.map(r => r.org),
    ...g.top.ipv6.map(r => r.org),
  ]);
  return Array.from(set).slice(0, 50).map(name => ({ name }));
}

export default async function OrgPage({ params }: { params: { name: string } }) {
  const g = await loadGlobal();
  const orgName = params.name;
  const rows = getAsnsByOrg(g, orgName);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { href: "/", label: "Home" },
        { href: "/org", label: "Organizations" },
        { label: orgName },
      ]}/>
      <h1 className="text-2xl font-semibold">{orgName}</h1>

      <Table
        columns={[
          { key: "asn", label: "ASN", render: (v) => <Link className="text-indigo-600" href={`/asn/${v}`}>AS{v}</Link> },
          { key: "name", label: "Name" },
          { key: "country", label: "CC", render: (v) => <Link className="text-indigo-600" href={`/country/${encodeURIComponent(String(v))}`}>{String(v)}</Link> },
          { key: "v4_slash24s", label: "IPv4 /24s", render: (v) => Number(v).toLocaleString("en-US") },
          { key: "v6_slots", label: "IPv6 slots", render: (v) => Number(v).toLocaleString("en-US") },
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />

      <div className="text-sm text-gray-500">
        Snapshot: {new Date(g.generated_at).toLocaleString()} • <Link className="text-indigo-600" href="/org">All orgs</Link>
      </div>
    </div>
  );
}
