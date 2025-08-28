# Contributing to asn.io

Thanks for your interest in contributing! 🎉  
asn.io is the **open, minimalistic, authoritative directory of Autonomous System Numbers (ASNs)**.  
This repository covers the **public-facing dataset pipeline and website** only.

---

## How you can contribute

We welcome contributions in the following areas:
- 🐛 **Bug fixes** in the pipeline or frontend
- ⚙️ **Data pipeline improvements** (ingest, normalization, export)
- 📝 **Documentation** improvements (README, pipeline docs, data sources)
- 🌍 **Community feedback** on ASN data representation

---

## Code of conduct

By contributing, you agree to follow our [Code of Conduct](https://opensource.guide/code-of-conduct/)  
(tl;dr → be respectful, constructive, and professional).

---

## Project scope

This repo only covers:
- Open data ingestion (RIR delegated stats, RIPE RIS / RouteViews BGP tables)
- Public dataset generation (JSON/CSV weekly snapshots)
- Static frontend (Next.js → GitHub Pages)

This repo **does not** cover:
- Proprietary enrichments (e.g. contact discovery, abuse/reputation data, SSL telemetry)
- IPXO’s private internal sales tooling
- Any non-public or licensed datasets

If your PR touches private enrichments, it will be closed.

---

## Development setup

1. Fork the repo and clone it locally
   ```bash
   git clone https://github.com/<your-username>/asn-io.git
   cd asn-io