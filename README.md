# 🌐 asn.zone

asn.zone is the **open, minimalistic, authoritative directory of Autonomous System Numbers (ASNs)**.  
It provides a clean, GitHub-like interface where users can explore ASNs, see announced IP space, ownership, and trends.

👉 Live (GitHub Pages): https://ipxo.github.io/asn-zone/  
🔜 Custom domain: https://asn.zone

---

## Features (MVP)
- Global ASN registry with IPv4/IPv6 counts
- ASN → Org → Country mapping
- Announced vs Allocated IP space
- Top lists (IPv4, IPv6, per-country)
- Public JSON/CSV datasets (weekly snapshots)
- Minimal UI (Next.js + Tailwind), light/dark via system auto or toggle

---

## Repository Structure
- `apps/web/` → Next.js frontend (static export → GitHub Pages)
- `apps/web/public/brand/` → logo and brand assets
- `data/` → JSON/CSV snapshots (current + historical)
- `scripts/` → Data pipeline: ingest → normalize → export
- `.github/workflows/` → CI/CD for build + weekly dataset updates

---

## Tech / Build
- **Next.js 14** with App Router
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- Static export (`output: 'export'`)
- GitHub Pages deploy via Actions

### Local dev
```bash
cd apps/web
npm install
npm run dev
# http://localhost:3000