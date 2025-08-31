import React from "react";

const DEFAULT_BASE =
  process.env.NEXT_PUBLIC_CANONICAL ||
  "https://ipxo.github.io/asn-zone";

/** Make a URL absolute against the canonical base */
export function absolute(pathOrUrl: string): string {
  if (!pathOrUrl) return DEFAULT_BASE;
  try {
    const u = new URL(pathOrUrl);
    return u.toString(); // already absolute
  } catch {
    const base = DEFAULT_BASE.endsWith("/") ? DEFAULT_BASE : DEFAULT_BASE + "/";
    const rel = String(pathOrUrl).replace(/^\/+/, "");
    return new URL(rel, base).toString();
  }
}

/** Inline JSON-LD helper (script tag) */
export function JsonLd({ json }: { json: unknown }) {
  const content = JSON.stringify(json);
  // eslint-disable-next-line react/no-danger
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: content }} />;
}

/** Site-level JSON-LD (WebSite) */
export function siteJsonLd() {
  const base = DEFAULT_BASE;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: base,
    name: "asn.zone",
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/search?q={query}`,
      "query-input": "required name=query",
    },
  };
}

/** Generic ItemList JSON-LD (expects absolute-able urls) */
export function itemListJsonLd(items: { url: string; name?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absolute(it.url),
      ...(it.name ? { name: it.name } : {}),
    })),
  };
}

/** ASN Thing JSON-LD for detail pages */
export function asnThingJsonLd(asn: {
  asn: number;
  name?: string;
  org?: string;
  country?: string;
}) {
  const url = absolute(`/asn/${asn.asn}`);
  return {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: `AS${asn.asn}${asn.name ? ` — ${asn.name}` : ""}`,
    url,
    identifier: `AS${asn.asn}`,
    ...(asn.org
      ? {
          provider: {
            "@type": "Organization",
            name: asn.org,
          },
        }
      : {}),
    ...(asn.country ? { areaServed: asn.country } : {}),
  };
}
