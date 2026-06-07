#!/usr/bin/env bash
#
# article-extract.sh — fetch a web article and produce clean markdown.
#
# Usage:
#   bash scripts/article-extract.sh "<ARTICLE_URL>" [OUTPUT_FILE]
#
# Fallback chain (stops at first good result):
#   1. markitdown <url>               — clean markdown, handles most blogs/docs/news
#   2. obscura fetch --stealth        — JS-rendered SPAs, bot-protected, soft paywalls
#
# Prints the extraction method used on the LAST line of stderr as:
#   METHOD=<markitdown|obscura>
#
set -uo pipefail

URL="${1:?Usage: article-extract.sh <ARTICLE_URL> [OUTPUT_FILE]}"
OUTPUT_FILE="${2:-article.md}"

# Minimum useful body length (chars). Below this we assume extraction failed
# (cookie wall, JS shell, boilerplate-only) and fall back.
MIN_CHARS="${MIN_CHARS:-500}"

run_markitdown() { if command -v markitdown >/dev/null 2>&1; then markitdown "$@"; else uvx markitdown "$@"; fi; }
run_obscura()    { if command -v obscura >/dev/null 2>&1; then obscura "$@"; else nix run nixpkgs#obscura -- "$@" 2>/dev/null || return 127; fi; }

# Heuristic: does the file look like a real article (not a JS/cookie wall)?
looks_valid() {
  local f="$1"
  [ -s "$f" ] || return 1
  local chars
  chars=$(wc -c < "$f" | tr -d ' ')
  [ "$chars" -ge "$MIN_CHARS" ] || return 1
  # Reject obvious bot-wall / no-JS pages
  if grep -qiE 'enable javascript|are you human|verify you are|cf-browser-verification|attention required' "$f"; then
    return 1
  fi
  return 0
}

echo "Extracting article: $URL" >&2

# ── PRIMARY: markitdown ──────────────────────────────────────────────────────
echo "[1/2] Trying markitdown ..." >&2
if run_markitdown "$URL" -o "$OUTPUT_FILE" >/tmp/mid_err.$$ 2>&1; then
  if looks_valid "$OUTPUT_FILE"; then
    echo "OK: article via markitdown" >&2
    echo "METHOD=markitdown" >&2
    exit 0
  fi
  echo "  markitdown output looked thin/blocked; falling back." >&2
else
  echo "  markitdown failed: $(tail -1 /tmp/mid_err.$$ 2>/dev/null)" >&2
fi

# ── FALLBACK: obscura stealth headless browser ───────────────────────────────
echo "[2/2] Trying obscura (stealth headless render) ..." >&2
if run_obscura fetch "$URL" --stealth --dump markdown \
     --wait-until networkidle0 --timeout 45 --quiet \
     --output "$OUTPUT_FILE" >/tmp/obs_err.$$ 2>&1; then
  if looks_valid "$OUTPUT_FILE"; then
    echo "OK: article via obscura (markdown)" >&2
    echo "METHOD=obscura" >&2
    exit 0
  fi
fi

# Last attempt with obscura: plain text dump (some sites render badly to markdown).
if run_obscura fetch "$URL" --stealth --dump text \
     --wait-until networkidle0 --timeout 45 --quiet \
     > "$OUTPUT_FILE" 2>>/tmp/obs_err.$$; then
  if looks_valid "$OUTPUT_FILE"; then
    echo "OK: article via obscura (text)" >&2
    echo "METHOD=obscura" >&2
    exit 0
  fi
fi

echo "ERROR: all extraction methods failed for $URL" >&2
echo "  Check: /tmp/mid_err.$$  /tmp/obs_err.$$" >&2
exit 1
