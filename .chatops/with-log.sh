#!/usr/bin/env bash
set -euo pipefail

LOG=".chatops/last.log"
CMD="${*:-}"

if [[ -z "${CMD}" ]]; then
  echo "Usage: .chatops/with-log.sh <recipe-name> [args...]"
  exit 1
fi

# Detect platform: macOS uses BSD 'script', Linux uses util-linux 'script'
if [[ "$OSTYPE" == darwin* ]]; then
  # BSD script: script [-aq] logfile command ...
  # run command via bash -lc to keep it in a login-like shell
  script -q "$LOG" bash -lc "$CMD"
else
  # util-linux script: script [-q] -c "cmd" logfile
  script -q -c "$CMD" "$LOG"
fi

echo
echo "==> Log saved to $LOG"
