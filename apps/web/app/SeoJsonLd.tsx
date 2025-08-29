export default function SeoJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "asn.zone",
    "url": "https://ipxo.github.io/asn-zone/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ipxo.github.io/asn-zone/search?q={query}",
      "query-input": "required name=query"
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
