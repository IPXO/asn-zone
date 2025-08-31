// apps/web/lib/data.ts

import globalJson from '../data/current/global.json';

export type GlobalJson = typeof globalJson;
export type V4TopItem = GlobalJson['top']['ipv4'][number];
export type V6TopItem = GlobalJson['top']['ipv6'][number];

export async function loadGlobal(): Promise<GlobalJson> {
  return globalJson as GlobalJson;
}
export function getGlobalSync(): GlobalJson {
  return globalJson as GlobalJson;
}

export function getTopIPv4(g: GlobalJson): V4TopItem[] {
  return g.top.ipv4;
}
export function getTopIPv6(g: GlobalJson): V6TopItem[] {
  return g.top.ipv6;
}

export function getAsnById(g: GlobalJson, id: number): (V4TopItem | V6TopItem) | undefined {
  return g.top.ipv4.find((r) => r.asn === id) || g.top.ipv6.find((r) => r.asn === id);
}

export function getAsnAggregated(g: GlobalJson, id: number) {
  const v4 = g.top.ipv4.find((r) => r.asn === id);
  const v6 = g.top.ipv6.find((r) => r.asn === id);
  if (!v4 && !v6) return undefined;
  const base = (v4 ?? v6)!;
  return {
    asn: base.asn,
    name: base.name,
    org: base.org,
    country: base.country,
    v4_slash24s: v4 ? v4.v4_slash24s : 0,
    v6_slots: v6 ? ((v6 as any).v6_slots ?? 0) : 0,
  };
}

export function getAsnsByCountry(g: GlobalJson, cc: string): Array<V4TopItem | V6TopItem> {
  const CC = (cc || '').toUpperCase();
  const merged = [...g.top.ipv4, ...g.top.ipv6].filter((r) => r.country.toUpperCase() === CC);
  const seen = new Set<number>();
  const out: Array<V4TopItem | V6TopItem> = [];
  for (const r of merged) {
    if (!seen.has(r.asn)) {
      seen.add(r.asn);
      out.push(r);
    }
  }
  return out.sort(
    (a, b) =>
      (b as any).v4_slash24s - (a as any).v4_slash24s || (b as any).v6_slots - (a as any).v6_slots,
  );
}

export function getAsnsByOrg(g: GlobalJson, org: string): Array<V4TopItem | V6TopItem> {
  const key = org.trim().toLowerCase();
  const merged = [...g.top.ipv4, ...g.top.ipv6].filter(
    (r) => r.org.toLowerCase() === key || r.name.toLowerCase() === key,
  );
  const seen = new Set<number>();
  const out: Array<V4TopItem | V6TopItem> = [];
  for (const r of merged) {
    if (!seen.has(r.asn)) {
      seen.add(r.asn);
      out.push(r);
    }
  }
  return out.sort(
    (a, b) =>
      (b as any).v4_slash24s - (a as any).v4_slash24s || (b as any).v6_slots - (a as any).v6_slots,
  );
}

// Full ISO 3166-1 alpha-2
const ISO_COUNTRIES: Record<string, string> = {
  AF: 'Afghanistan',
  AX: 'Åland Islands',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua and Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BQ: 'Bonaire, Sint Eustatius and Saba',
  BA: 'Bosnia and Herzegovina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cabo Verde',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo',
  CD: 'Congo, Democratic Republic of the',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  CI: 'Côte d’Ivoire',
  HR: 'Croatia',
  CU: 'Cuba',
  CW: 'Curaçao',
  CY: 'Cyprus',
  CZ: 'Czechia',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  SZ: 'Eswatini',
  ET: 'Ethiopia',
  FK: 'Falkland Islands',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GG: 'Guernsey',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard Island and McDonald Islands',
  VA: 'Holy See',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KP: 'Korea (DPRK)',
  KR: 'Korea (Republic of)',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: 'Lao PDR',
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MK: 'North Macedonia',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestine, State of',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Réunion',
  RO: 'Romania',
  RU: 'Russian Federation',
  RW: 'Rwanda',
  BL: 'Saint Barthélemy',
  SH: 'Saint Helena, Ascension and Tristan da Cunha',
  KN: 'Saint Kitts and Nevis',
  LC: 'Saint Lucia',
  MF: 'Saint Martin (French part)',
  PM: 'Saint Pierre and Miquelon',
  VC: 'Saint Vincent and the Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome and Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SX: 'Sint Maarten (Dutch part)',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia and the South Sandwich Islands',
  SS: 'South Sudan',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard and Jan Mayen',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad and Tobago',
  TN: 'Tunisia',
  TR: 'Türkiye',
  TM: 'Turkmenistan',
  TC: 'Turks and Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  US: 'United States of America',
  UM: 'US Minor Outlying Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Viet Nam',
  VG: 'Virgin Islands (British)',
  VI: 'Virgin Islands (U.S.)',
  WF: 'Wallis and Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',
};

export function isoCountryName(cc: string): string {
  const k = (cc || '').toUpperCase();
  return ISO_COUNTRIES[k] || k;
}
/* === Aggregations for Country & Org indexes ============================== */

export type CountryAgg = {
  cc: string;
  name: string;
  asns: number;
  v4_slash24s: number;
  v6_slots: number;
};

export type OrgAgg = {
  org: string;
  asns: number;
  v4_slash24s: number;
  v6_slots: number;
};

export function getCountryAgg(g: GlobalJson): CountryAgg[] {
  // de-duplicate ASNs across v4/v6 before counting
  const byAsn = new Map<
    number,
    { country?: string; v4?: number; v6?: number; name?: string; org?: string }
  >();

  for (const r of g.top.ipv4) {
    const e = byAsn.get(r.asn) || {};
    byAsn.set(r.asn, {
      ...e,
      country: r.country,
      v4: r.v4_slash24s ?? 0,
      name: r.name,
      org: r.org,
    });
  }
  for (const r of g.top.ipv6) {
    const e = byAsn.get(r.asn) || {};
    byAsn.set(r.asn, {
      ...e,
      country: e.country ?? r.country,
      v6: r.v6_slots ?? 0,
      name: r.name,
      org: r.org,
    });
  }

  const agg = new Map<string, CountryAgg>();
  for (const a of byAsn.values()) {
    if (!a.country) continue;
    const cc = a.country;
    const cur = agg.get(cc) || {
      cc,
      name: isoCountryName(cc),
      asns: 0,
      v4_slash24s: 0,
      v6_slots: 0,
    };
    cur.asns += 1;
    cur.v4_slash24s += a.v4 ?? 0;
    cur.v6_slots += a.v6 ?? 0;
    agg.set(cc, cur);
  }

  return Array.from(agg.values()).sort(
    (a, b) => b.v4_slash24s - a.v4_slash24s || b.v6_slots - a.v6_slots || a.cc.localeCompare(b.cc),
  );
}

export function getOrgAgg(g: GlobalJson): OrgAgg[] {
  const byAsn = new Map<number, { org?: string; v4?: number; v6?: number }>();

  for (const r of g.top.ipv4) {
    const e = byAsn.get(r.asn) || {};
    byAsn.set(r.asn, { ...e, org: r.org, v4: r.v4_slash24s ?? 0 });
  }
  for (const r of g.top.ipv6) {
    const e = byAsn.get(r.asn) || {};
    byAsn.set(r.asn, { ...e, org: e.org ?? r.org, v6: r.v6_slots ?? 0 });
  }

  const agg = new Map<string, OrgAgg>();
  for (const a of byAsn.values()) {
    const org = a.org?.trim();
    if (!org) continue;
    const cur = agg.get(org) || { org, asns: 0, v4_slash24s: 0, v6_slots: 0 };
    cur.asns += 1;
    cur.v4_slash24s += a.v4 ?? 0;
    cur.v6_slots += a.v6 ?? 0;
    agg.set(org, cur);
  }

  return Array.from(agg.values()).sort(
    (a, b) =>
      b.v4_slash24s - a.v4_slash24s || b.v6_slots - a.v6_slots || a.org.localeCompare(b.org),
  );
}
