# 🌐 asn.io

asn.io is the **open, minimalistic, authoritative directory of Autonomous System Numbers (ASNs)**.  
It provides a clean, GitHub-like interface where users can explore ASNs, see announced IP space, ownership, and trends.

👉 Live site: [https://asn.io](https://asn.io)

---

## Features (MVP)
- Global ASN registry with IPv4/IPv6 counts
- ASN → Org → Country mapping
- Announced vs Allocated IP space
- Top lists (IPv4, IPv6, per-country)
- Public JSON/CSV datasets (weekly snapshots)
- Minimal GitHub-style UI (Next.js + Tailwind)

---

## Repository Structure
- `apps/web/` → Next.js frontend (static site → GitHub Pages)
- `data/` → JSON/CSV snapshots (current + historical)
- `scripts/` → Data pipeline: ingest → normalize → export
- `.github/workflows/` → CI/CD for build + weekly dataset updates

---

## Data Sources
- **RIPE RIS / RouteViews** → BGP tables (announced prefixes)
- **RIR delegated stats** (ARIN, RIPE NCC, APNIC, AFRINIC, LACNIC)
- (Future) PeeringDB / CAIDA links

---

## License
- **Code** → [Apache 2.0](./LICENSE)  
- **Datasets** (`/data/` and snapshots) → [CC BY 4.0](./LICENSE-DATA)  
  - When using the datasets, please attribute: **"Source: asn.io"**  
- **Private enrichments** (internal only) are not part of this repo.

---

## Contributing
This repo welcomes issues and pull requests for:
- Bug fixes
- Data pipeline improvements
- Documentation updates

👉 Note: contributions apply only to the **public dataset pipeline** and code.  
Internal/private enrichments used by IPXO are not open-sourced.

---

## Credits
asn.io is maintained by [IPXO](https://ipxo.com).  
All dataset sources are attributed to their respective RIRs and BGP collectors.

---