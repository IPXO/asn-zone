#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: .chatops/with-log.sh <recipe> [args...]"
  exit 2
fi

recipe="$1"; shift || true
script -q .chatops/last.log bash -lc '
  set -euo pipefail
  recipe="$1"; shift
  "$recipe" "$@"
' _ "$recipe" "$@"
echo "==> Log saved to .chatops/last.log"
