import { loadGlobal } from "../lib/data";

export default async function sitemap() {
  const base =
    process.env.NODE_ENV === "production"
      ? "https://ipxo.github.io/asn-zone"
      : "http://localhost:3000";

  const g = await loadGlobal();

  const asnIds = Array.from(
    new Set([...g.top.ipv4.map(r => r.asn), ...g.top.ipv6.map(r => r.asn)])
  ).slice(0, 50);

  const orgNames = Array.from(
    new Set([...g.top.ipv4.map(r => r.org), ...g.top.ipv6.map(r => r.org)])
  ).slice(0, 50);

  const countries = Array.from(
    new Set([...g.top.ipv4.map(r => r.country), ...g.top.ipv6.map(r => r.country)])
  ).slice(0, 50);

  const asn = asnIds.map((id) => ({
    url: `${base}/asn/${id}`,
    lastModified: new Date(),
  }));

  const org = orgNames.map((name) => ({
    url: `${base}/org/${encodeURIComponent(name)}`,
    lastModified: new Date(),
  }));

  const cc = countries.map((c) => ({
    url: `${base}/country/${c}`,
    lastModified: new Date(),
  }));

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/top/ipv4`, lastModified: new Date() },
    { url: `${base}/top/ipv6`, lastModified: new Date() },
    { url: `${base}/search`, lastModified: new Date() },
    ...asn,
    ...org,
    ...cc,
  ];
}
