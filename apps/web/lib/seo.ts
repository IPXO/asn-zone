import React from "react";

const DEFAULT_BASE =
  process.env.NEXT_PUBLIC_CANONICAL ||
  "https://ipxo.github.io/asn-zone";

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

/** Inline JSON-LD helper */
export function JsonLd({ json }: { json: unknown }) {
  const content = JSON.stringify(json);
  // eslint-disable-next-line react/no-danger
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: content }} />;
}

/** Site-level JSON-LD */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "asn.zone — authoritative ASN directory",
  url: absolute("/"),
  potentialAction: {
    "@type": "SearchAction",
    target: absolute("/search?q={search_term_string}"),
    "query-input": "required name=search_term_string",
  },
};

function absoluteWithBase(pathOrUrl: string, baseUrl?: string) {
  if (!baseUrl) return absolute(pathOrUrl);
  try {
    const u = new URL(pathOrUrl);
    return u.toString();
  } catch {
    const base = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
    const rel = String(pathOrUrl).replace(/^\/+/, "");
    return new URL(rel, base).toString();
  }
}

/** ItemList JSON-LD for lists (country/org pages, top lists) */
export function itemListJsonLd(args:
  { items: { url: string; name?: string }[]; name?: string; baseUrl?: string }
) {
  const { items, name, baseUrl } = args;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(name ? { name } : {}),
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteWithBase(it.url, baseUrl),
      name: it.name ?? it.url,
    })),
  };
}

/** Organization JSON-LD for an ASN detail */
export function asnThingJsonLd(asn: {
  asn: number;
  name?: string;
  org?: string;
  country?: string;
}) {
  const title = `AS${asn.asn}${asn.name ? " — " + asn.name : ""}`;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: title,
    url: absolute(`/asn/${asn.asn}`),
    identifier: `AS${asn.asn}`,
    address: asn.country ? { "@type": "PostalAddress", addressCountry: asn.country } : undefined,
    parentOrganization: asn.org ? { "@type": "Organization", name: asn.org } : undefined,
  };
}
