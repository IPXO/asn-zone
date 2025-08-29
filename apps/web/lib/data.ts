// apps/web/lib/data.ts

import globalJson from "../data/current/global.json";

export type GlobalJson = typeof globalJson;
export type V4TopItem = GlobalJson["top"]["ipv4"][number];
export type V6TopItem = GlobalJson["top"]["ipv6"][number];

export async function loadGlobal(): Promise<GlobalJson> {
  return globalJson as GlobalJson;
}

export function getTopIPv4(g: GlobalJson): V4TopItem[] {
  return g.top.ipv4;
}

export function getTopIPv6(g: GlobalJson): V6TopItem[] {
  return g.top.ipv6;
}

export function findAsn(g: GlobalJson, id: string | number): V4TopItem | V6TopItem | undefined {
  const n = typeof id === "string" ? parseInt(id, 10) : id;
  return g.top.ipv4.find((r) => r.asn === n) ?? g.top.ipv6.find((r) => r.asn === n);
}

export function listByOrg(g: GlobalJson, org: string): (V4TopItem | V6TopItem)[] {
  const norm = org.toLowerCase();
  const rows = [...g.top.ipv4, ...g.top.ipv6].filter((r) => r.org.toLowerCase() === norm);
  const seen = new Set<number>();
  const out: (V4TopItem | V6TopItem)[] = [];
  for (const r of rows) {
    if (!seen.has(r.asn)) {
      seen.add(r.asn);
      out.push(r);
    }
  }
  return out;
}

export function listByCountry(g: GlobalJson, cc: string): (V4TopItem | V6TopItem)[] {
  const norm = cc.toUpperCase();
  const rows = [...g.top.ipv4, ...g.top.ipv6].filter((r) => r.country.toUpperCase() === norm);
  const seen = new Set<number>();
  const out: (V4TopItem | V6TopItem)[] = [];
  for (const r of rows) {
    if (!seen.has(r.asn)) {
      seen.add(r.asn);
      out.push(r);
    }
  }
  return out;
}

/**
 * Complete ISO 3166-1 alpha-2 country/territory map.
 * Source naming: English short names; keep codes upper-case.
 */
const COUNTRY_NAMES: Record<string, string> = {
  AD: "Andorra",
  AE: "United Arab Emirates",
  AF: "Afghanistan",
  AG: "Antigua and Barbuda",
  AI: "Anguilla",
  AL: "Albania",
  AM: "Armenia",
  AO: "Angola",
  AQ: "Antarctica",
  AR: "Argentina",
  AS: "American Samoa",
  AT: "Austria",
  AU: "Australia",
  AW: "Aruba",
  AX: "Åland Islands",
  AZ: "Azerbaijan",
  BA: "Bosnia and Herzegovina",
  BB: "Barbados",
  BD: "Bangladesh",
  BE: "Belgium",
  BF: "Burkina Faso",
  BG: "Bulgaria",
  BH: "Bahrain",
  BI: "Burundi",
  BJ: "Benin",
  BL: "Saint Barthélemy",
  BM: "Bermuda",
  BN: "Brunei Darussalam",
  BO: "Bolivia (Plurinational State of)",
  BQ: "Bonaire, Sint Eustatius and Saba",
  BR: "Brazil",
  BS: "Bahamas",
  BT: "Bhutan",
  BV: "Bouvet Island",
  BW: "Botswana",
  BY: "Belarus",
  BZ: "Belize",
  CA: "Canada",
  CC: "Cocos (Keeling) Islands",
  CD: "Congo, Democratic Republic of the",
  CF: "Central African Republic",
  CG: "Congo",
  CH: "Switzerland",
  CI: "Côte d’Ivoire",
  CK: "Cook Islands",
  CL: "Chile",
  CM: "Cameroon",
  CN: "China",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  CV: "Cabo Verde",
  CW: "Curaçao",
  CX: "Christmas Island",
  CY: "Cyprus",
  CZ: "Czechia",
  DE: "Germany",
  DJ: "Djibouti",
  DK: "Denmark",
  DM: "Dominica",
  DO: "Dominican Republic",
  DZ: "Algeria",
  EC: "Ecuador",
  EE: "Estonia",
  EG: "Egypt",
  EH: "Western Sahara",
  ER: "Eritrea",
  ES: "Spain",
  ET: "Ethiopia",
  FI: "Finland",
  FJ: "Fiji",
  FK: "Falkland Islands (Malvinas)",
  FM: "Micronesia (Federated States of)",
  FO: "Faroe Islands",
  FR: "France",
  GA: "Gabon",
  GB: "United Kingdom",
  GD: "Grenada",
  GE: "Georgia",
  GF: "French Guiana",
  GG: "Guernsey",
  GH: "Ghana",
  GI: "Gibraltar",
  GL: "Greenland",
  GM: "Gambia",
  GN: "Guinea",
  GP: "Guadeloupe",
  GQ: "Equatorial Guinea",
  GR: "Greece",
  GS: "South Georgia and the South Sandwich Islands",
  GT: "Guatemala",
  GU: "Guam",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HK: "Hong Kong",
  HM: "Heard Island and McDonald Islands",
  HN: "Honduras",
  HR: "Croatia",
  HT: "Haiti",
  HU: "Hungary",
  ID: "Indonesia",
  IE: "Ireland",
  IL: "Israel",
  IM: "Isle of Man",
  IN: "India",
  IO: "British Indian Ocean Territory",
  IQ: "Iraq",
  IR: "Iran (Islamic Republic of)",
  IS: "Iceland",
  IT: "Italy",
  JE: "Jersey",
  JM: "Jamaica",
  JO: "Jordan",
  JP: "Japan",
  KE: "Kenya",
  KG: "Kyrgyzstan",
  KH: "Cambodia",
  KI: "Kiribati",
  KM: "Comoros",
  KN: "Saint Kitts and Nevis",
  KP: "Korea (Democratic People’s Republic of)",
  KR: "Korea, Republic of",
  KW: "Kuwait",
  KY: "Cayman Islands",
  KZ: "Kazakhstan",
  LA: "Lao People’s Democratic Republic",
  LB: "Lebanon",
  LC: "Saint Lucia",
  LI: "Liechtenstein",
  LK: "Sri Lanka",
  LR: "Liberia",
  LS: "Lesotho",
  LT: "Lithuania",
  LU: "Luxembourg",
  LV: "Latvia",
  LY: "Libya",
  MA: "Morocco",
  MC: "Monaco",
  MD: "Moldova, Republic of",
  ME: "Montenegro",
  MF: "Saint Martin (French part)",
  MG: "Madagascar",
  MH: "Marshall Islands",
  MK: "North Macedonia",
  ML: "Mali",
  MM: "Myanmar",
  MN: "Mongolia",
  MO: "Macao",
  MP: "Northern Mariana Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MS: "Montserrat",
  MT: "Malta",
  MU: "Mauritius",
  MV: "Maldives",
  MW: "Malawi",
  MX: "Mexico",
  MY: "Malaysia",
  MZ: "Mozambique",
  NA: "Namibia",
  NC: "New Caledonia",
  NE: "Niger",
  NF: "Norfolk Island",
  NG: "Nigeria",
  NI: "Nicaragua",
  NL: "Netherlands",
  NO: "Norway",
  NP: "Nepal",
  NR: "Nauru",
  NU: "Niue",
  NZ: "New Zealand",
  OM: "Oman",
  PA: "Panama",
  PE: "Peru",
  PF: "French Polynesia",
  PG: "Papua New Guinea",
  PH: "Philippines",
  PK: "Pakistan",
  PL: "Poland",
  PM: "Saint Pierre and Miquelon",
  PN: "Pitcairn",
  PR: "Puerto Rico",
  PS: "Palestine, State of",
  PT: "Portugal",
  PW: "Palau",
  PY: "Paraguay",
  QA: "Qatar",
  RE: "Réunion",
  RO: "Romania",
  RS: "Serbia",
  RU: "Russian Federation",
  RW: "Rwanda",
  SA: "Saudi Arabia",
  SB: "Solomon Islands",
  SC: "Seychelles",
  SD: "Sudan",
  SE: "Sweden",
  SG: "Singapore",
  SH: "Saint Helena, Ascension and Tristan da Cunha",
  SI: "Slovenia",
  SJ: "Svalbard and Jan Mayen",
  SK: "Slovakia",
  SL: "Sierra Leone",
  SM: "San Marino",
  SN: "Senegal",
  SO: "Somalia",
  SR: "Suriname",
  SS: "South Sudan",
  ST: "Sao Tome and Principe",
  SV: "El Salvador",
  SX: "Sint Maarten (Dutch part)",
  SY: "Syrian Arab Republic",
  SZ: "Eswatini",
  TC: "Turks and Caicos Islands",
  TD: "Chad",
  TF: "French Southern Territories",
  TG: "Togo",
  TH: "Thailand",
  TJ: "Tajikistan",
  TK: "Tokelau",
  TL: "Timor-Leste",
  TM: "Turkmenistan",
  TN: "Tunisia",
  TO: "Tonga",
  TR: "Türkiye",
  TT: "Trinidad and Tobago",
  TV: "Tuvalu",
  TW: "Taiwan, Province of China",
  TZ: "Tanzania, United Republic of",
  UA: "Ukraine",
  UG: "Uganda",
  UM: "United States Minor Outlying Islands",
  US: "United States",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VA: "Holy See",
  VC: "Saint Vincent and the Grenadines",
  VE: "Venezuela (Bolivarian Republic of)",
  VG: "Virgin Islands (British)",
  VI: "Virgin Islands (U.S.)",
  VN: "Viet Nam",
  VU: "Vanuatu",
  WF: "Wallis and Futuna",
  WS: "Samoa",
  YE: "Yemen",
  YT: "Mayotte",
  ZA: "South Africa",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

export function countryName(cc: string): string {
  const code = cc.toUpperCase();
  return COUNTRY_NAMES[code] ?? code;
}
