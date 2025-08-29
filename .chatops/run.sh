#!/usr/bin/env bash
set -euo pipefail

RECIPES_DIR=".chatops/recipes"

if [[ $# -lt 1 ]]; then
  echo "Usage: .chatops/run.sh <recipe-name> [args...]"
  echo "Available recipes:"
  if [[ -d "$RECIPES_DIR" ]]; then
    for f in "$RECIPES_DIR"/*; do
      [[ -x "$f" ]] && echo "  - $(basename "$f")"
    done
  fi
  exit 1
fi

RECIPE="$RECIPES_DIR/$1"
shift || true

if [[ ! -x "$RECIPE" ]]; then
  echo "Recipe not found or not executable: $RECIPE"
  exit 1
fi

exec "$RECIPE" "$@"
