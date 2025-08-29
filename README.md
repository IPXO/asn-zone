# 🌐 asn.zone

asn.zone is the **open, minimalistic, authoritative directory of Autonomous System Numbers (ASNs)**.  
It provides a clean, GitHub-like interface where users can explore ASNs, see announced IP space, ownership, and trends.

👉 Live (GitHub Pages): [https://ipxo.github.io/asn-zone/](https://ipxo.github.io/asn-zone/)  
🔜 Custom domain: [https://asn.zone](https://asn.zone)

---

## ✨ Features (MVP)

- Global ASN registry with IPv4/IPv6 counts
- ASN → Org → Country mapping
- Announced vs Allocated IP space
- Top lists (IPv4, IPv6, per-country)
- Public JSON/CSV datasets (weekly snapshots)
- Minimal GitHub-style UI (Next.js + Tailwind, light/dark mode)

---

## 📂 Repository Structure

- `apps/web/` → Next.js frontend (static site → GitHub Pages)
- `apps/web/public/brand/` → Logo & favicon assets
- `data/` → JSON/CSV snapshots (current + historical)
- `scripts/` → Data pipeline: ingest → normalize → export
- `.github/workflows/` → CI/CD for build + weekly dataset updates

---

## 📊 Data Sources

- **RIPE RIS / RouteViews** → BGP tables (announced prefixes)
- **RIR delegated stats** → ARIN, RIPE NCC, APNIC, AFRINIC, LACNIC
- (Future) PeeringDB / CAIDA links

---

## 🛠️ Development

### Local dev

```bash
cd apps/web
npm install
npm run dev
# visit http://localhost:3000
```
# trigger
