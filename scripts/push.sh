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

REV="$(jj log -r "$TARGET" --no-graph -T 'change_id.short()')"

if jj bookmark list -r "$TARGET" 2>/dev/null | awk '{print $1}' | sed 's/:$//' | grep -qx "$DEFAULT_BRANCH"; then
  echo "Target is on $DEFAULT_BRANCH → pushing $DEFAULT_BRANCH"
  jj git export
  git push "$ORIGIN" "$DEFAULT_BRANCH"
  exit 0
fi

EXISTING="$(
  jj bookmark list -r "$TARGET" 2>/dev/null \
    | awk '{print $1}' \
    | sed 's/:$//' \
    | grep -v -x "$DEFAULT_BRANCH" \
    | head -n 1 || true
)"

if [ -n "${EXISTING:-}" ]; then
  BOOKMARK="$EXISTING"
  echo "Using existing bookmark: $BOOKMARK"
else
  DESC="$(jj log -r "$TARGET" --no-graph -T 'description.first_line()' || true)"

  TYPE="$(printf "%s" "$DESC" | sed -nE 's/^([a-zA-Z0-9]+)(\([^)]*\))?:.*/\1/p')"
  SCOPE="$(printf "%s" "$DESC" | sed -nE 's/^[a-zA-Z0-9]+\(([^)]*)\):.*/\1/p')"

  slugify() {
    printf "%s" "$1" \
      | tr '[:upper:]' '[:lower:]' \
      | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//'
  }

  if [ -n "${TYPE:-}" ]; then
    TYPE_SLUG="$(slugify "$TYPE")"
    if [ -n "${SCOPE:-}" ]; then
      SCOPE_SLUG="$(slugify "$SCOPE")"
      BASE="${TYPE_SLUG}-${SCOPE_SLUG}"
    else
      BASE="${TYPE_SLUG}"
    fi
  else
    BASE="$(slugify "$DESC")"
  fi

  if [ -z "${BASE:-}" ]; then
    BASE="push"
  fi

  BOOKMARK="${BASE}-${REV}"
  BOOKMARK="$(printf "%.80s" "$BOOKMARK")"

  echo "Creating bookmark: $BOOKMARK"
  jj bookmark create "$BOOKMARK" -r "$TARGET"
fi

jj git export
git push "$ORIGIN" "$BOOKMARK"
