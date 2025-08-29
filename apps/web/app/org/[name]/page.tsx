import Table from "../../components/Table";
import { loadGlobal, getAsnsByOrg } from "../../../lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const names = new Set<string>([
    ...g.top.ipv4.map(r => r.org),
    ...g.top.ipv6.map(r => r.org),
  ]);
  return Array.from(names).slice(0, 50).map(name => ({ name }));
}

export async function generateMetadata({ params }: { params: { name: string } }) {
  const name = params.name;
  return {
    title: `${name} — ASNs on asn.zone`,
    description: `Autonomous Systems operated by ${name}.`,
  };
}

export default async function OrgPage({ params }: { params: { name: string } }) {
  const g = await loadGlobal();
  const rows = getAsnsByOrg(g, params.name);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">{params.name}</h1>
      <Table
        columns={[
          { key: "asn", label: "ASN", kind: "asn" },
          { key: "name", label: "Name" },
          { key: "country", label: "CC", kind: "country" },
          { key: "v4_slash24s", label: "IPv4 /24s", kind: "number" },
          { key: "v6_slots", label: "IPv6 slots", kind: "number" },
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />
    </div>
  );
}
