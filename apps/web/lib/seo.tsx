import React from 'react';

const DEFAULT_BASE = process.env.NEXT_PUBLIC_CANONICAL || 'https://ipxo.github.io/asn-zone';

export function absolute(pathOrUrl: string): string {
  if (!pathOrUrl) return DEFAULT_BASE;
  try {
    const u = new URL(pathOrUrl);
    return u.toString(); // already absolute
  } catch {
    const base = DEFAULT_BASE.endsWith('/') ? DEFAULT_BASE : DEFAULT_BASE + '/';
    const rel = String(pathOrUrl).replace(/^\/+/, '');
    return new URL(rel, base).toString();
  }
}

/** Inline JSON-LD helper */
export function JsonLd({ json }: { json: unknown }) {
  const content = JSON.stringify(json);
  // eslint-disable-next-line react/no-danger
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: content }} />;
}

/** Site-level JSON-LD (basic WebSite schema) */
export function siteJsonLd() {
  const url = absolute('/');
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name: 'asn.zone',
    description: 'Autonomous System stats, rankings and lookups.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absolute('/search')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Generic ItemList JSON-LD for listing pages */
export function itemListJsonLd(items: Array<{ url: string; name?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absolute(it.url),
      ...(it.name ? { name: it.name } : {}),
    })),
  };
}

/** ASN Thing JSON-LD for detail pages */
export function asnThingJsonLd(asn: {
  asn: number | string;
  name?: string;
  org?: string;
  country?: string;
}) {
  const url = absolute(`/asn/${asn.asn}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name: `AS${asn.asn}${asn.name ? ` — ${asn.name}` : ''}`,
    url: url,
    ...(asn.org ? { additionalType: 'Organization', disambiguatingDescription: asn.org } : {}),
    ...(asn.country ? { identifier: `CC=${asn.country}` } : {}),
  };
}
