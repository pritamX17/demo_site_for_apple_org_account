#!/bin/sh
# Static export of / and /jarvis for the team review hub, then publish it.
#   sh scripts/export-review.sh            # build + patch into out/
#   sh scripts/export-review.sh --publish  # …and push to the hub (needs ~/onestop-site)
# Next's basePath covers routes, /_next assets and next/link; it does NOT touch
# public files referenced from CSS url() / inline styles / next/image src, so we
# rewrite those absolute /img and /figma paths after the build.
set -e
cd "$(dirname "$0")/.."
BASE="/onestop-share/onestop-site"
rm -rf out .next-export
HUB_EXPORT=1 npm run build
OUT=out; [ -d out ] || OUT=.next-export
find "$OUT" \( -name '*.html' -o -name '*.css' -o -name '*.js' \) -print0 \
  | xargs -0 perl -0pi -e "s#([\"'(])/(img|figma)/#\$1$BASE/\$2/#g"
# noindex on every page (the hub is robots-disallowed too)
find "$OUT" -name '*.html' -print0 \
  | xargs -0 perl -0pi -e 's#<head>#<head><meta name="robots" content="noindex,nofollow"/>#'
echo "export ready in $OUT/"
if [ "$1" = "--publish" ]; then
  python3 "$HOME/onestop-site/tools/publish.py" --title "OneStop website — homepage + Jarvis" --slug onestop-site \
    --dir "$PWD/$OUT" --blurb "The real site: / (homepage) and /jarvis (product page, copy v5). Desktop + phone." --push
fi
