#!/usr/bin/env bash
set -euo pipefail

DEFAULT_BRANCH="${DEFAULT_BRANCH:-main}"
ORIGIN="${ORIGIN:-origin}"

EMPTY="$(jj log -r @ --no-graph -T 'if(empty, "true", "false")')"
if [ "$EMPTY" = "true" ]; then
  TARGET='@-'
else
  TARGET='@'
fi

BOOKMARK="$(
  jj bookmark list -r "$TARGET" 2>/dev/null \
    | awk '{print $1}' \
    | sed 's/:$//' \
    | grep -v -x "$DEFAULT_BRANCH" \
    | grep -v '@' \
    | head -n 1 || true
)"

if [ -z "${BOOKMARK:-}" ]; then
  echo "No bookmark on target. Run 'task push' first."
  exit 1
fi

jj git export
git push "$ORIGIN" "$BOOKMARK" --force-with-lease
