#!/usr/bin/env bash
set -euo pipefail

pushd apps/web >/dev/null
rm -rf node_modules .next out
npm ci --silent || exit 1
npm run build --silent || exit 1
popd >/dev/null
exit 0
