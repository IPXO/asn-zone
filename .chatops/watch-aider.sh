#!/usr/bin/env bash
set -euo pipefail

LOG=".chatops/last.log"
echo "Watching $LOG for new commits. Press Ctrl+C to stop."

last_commit=""

while true; do
  # Grab the most recent commit line from the log
  commit=$(grep -E "Commit [0-9a-f]{7}" "$LOG" | tail -n 1 || true)

  if [[ "$commit" != "$last_commit" ]]; then
    echo "[Aider] $commit"
    last_commit="$commit"
  fi

  # If no new commit appears for 2 minutes → assume Aider idle
  if [[ -n "$last_commit" ]]; then
    now=$(date +%s)
    if [[ -f /tmp/aider_last_commit_time ]]; then
      prev=$(cat /tmp/aider_last_commit_time)
    else
      prev=$now
    fi

    if [[ "$commit" != "$last_commit" ]]; then
      echo "$now" > /tmp/aider_last_commit_time
    fi

    diff=$((now - prev))
    if [[ $diff -gt 120 ]]; then
      echo "✅ Aider has been idle for 2+ minutes. Safe to push now."
      exit 0
    fi
  fi

  sleep 10
done
