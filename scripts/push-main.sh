#!/usr/bin/env bash
set -euo pipefail

DEFAULT_BRANCH="${DEFAULT_BRANCH:-main}"
ORIGIN="${ORIGIN:-origin}"

EMPTY="$(jj log -r @ --no-graph -T 'if(empty, "true", "false")')"
if [ "$EMPTY" = "true" ]; then
  TARGET='@-'
  echo "Working copy (@) is empty; targeting parent (@-)"
else
  TARGET='@'
fi

echo "Setting $DEFAULT_BRANCH → $TARGET"
jj bookmark set "$DEFAULT_BRANCH" -r "$TARGET"
jj git export
git push "$ORIGIN" "$DEFAULT_BRANCH"
