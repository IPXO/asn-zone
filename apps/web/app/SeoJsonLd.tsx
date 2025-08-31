import { JsonLd, siteJsonLd } from "../lib/seo";

export default function SeoJsonLd({ json }: { json?: unknown }) {
  const data = json ?? siteJsonLd();
  return <JsonLd json={data} />;
}
