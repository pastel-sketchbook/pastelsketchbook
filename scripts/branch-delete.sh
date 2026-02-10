#!/usr/bin/env bash
set -euo pipefail

ORIGIN="${ORIGIN:-origin}"
BRANCH="${1:-}"

if [ -z "$BRANCH" ]; then
  echo "Usage: $0 <branch-name>"
  exit 1
fi

if jj log -r "bookmark(\"$BRANCH\")" --no-graph >/dev/null 2>&1; then
  SHORT="$(jj log -r "bookmark(\"$BRANCH\")" --no-graph -T 'change_id.short()')"
  ARCHIVE="archive/${BRANCH}-${SHORT}"
  echo "Archiving tip as: $ARCHIVE"
  jj bookmark create "$ARCHIVE" -r "bookmark(\"$BRANCH\")" 2>/dev/null \
    || jj bookmark set "$ARCHIVE" -r "bookmark(\"$BRANCH\")"
  jj git export
fi

echo "Deleting remote branch ${ORIGIN}/${BRANCH}"
git push "$ORIGIN" --delete "$BRANCH" || true
git fetch "$ORIGIN" --prune
jj git import
