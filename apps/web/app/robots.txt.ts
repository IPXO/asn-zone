export default function robots() {
  const host = process.env.NODE_ENV === "production" ? "https://ipxo.github.io/asn-zone" : "http://localhost:3000";
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${host}/sitemap.xml`,
  };
}
