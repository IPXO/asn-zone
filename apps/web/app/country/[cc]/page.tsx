import Table from "../../components/Table";
import { loadGlobal, getAsnsByCountry, isoCountryName } from "../../../lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const g = await loadGlobal();
  const ccs = new Set<string>([
    ...g.top.ipv4.map(r => r.country),
    ...g.top.ipv6.map(r => r.country),
  ]);
  return Array.from(ccs).slice(0, 50).map(cc => ({ cc }));
}

export async function generateMetadata({ params }: { params: { cc: string } }) {
  const label = isoCountryName(params.cc) ?? params.cc;
  return {
    title: `ASNs in ${label} — asn.zone`,
    description: `Autonomous Systems registered/announced in ${label}.`,
  };
}

export default async function CountryPage({ params }: { params: { cc: string } }) {
  const g = await loadGlobal();
  const rows = getAsnsByCountry(g, params.cc);
  const ccLabel = isoCountryName(params.cc) ?? params.cc;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Country: {ccLabel}</h1>
      <Table
        columns={[
          { key: "asn", label: "ASN", kind: "asn" },
          { key: "name", label: "Name" },
          { key: "org", label: "Org", kind: "org" },
          { key: "v4_slash24s", label: "IPv4 /24s", kind: "number" },
          { key: "v6_slots", label: "IPv6 slots", kind: "number" },
        ]}
        rows={rows as unknown as Record<string, any>[]}
      />
    </div>
  );
}
