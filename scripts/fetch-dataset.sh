#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${DATASET_URL:-}" ]]; then
  echo "DATASET_URL not set; skipping."
  exit 0
fi

mkdir -p apps/web/data/current
curl -fsSL "$DATASET_URL" -o apps/web/data/current/global.json

# sanity check with Node (no jq dependency)
node -e "const fs=require('fs');const j=JSON.parse(fs.readFileSync('apps/web/data/current/global.json','utf8')); if(!j.top){console.error('global.json missing .top'); process.exit(1)}"

echo "Dataset fetched."
