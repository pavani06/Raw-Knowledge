---
name: article-extractor
description: "Fetch a web article from a URL and save it as an immutable raw source page in clean markdown. Primary extractor is markitdown; falls back to the obscura stealth headless browser for JS-heavy or bot-protected pages (Medium, Substack, Cloudflare). Use when a user provides an article/blog/docs URL to ingest into the knowledge base."
license: MIT
compatibility: opencode
allowed-tools: Bash
metadata:
  version: "1.0.0"
  audience: AI agents ingesting web articles into a knowledge wiki
  workflow: fetch url, convert to markdown, clean, save raw source
---

# Article Extraction Skill

Turn a web article URL into clean markdown, then save it as an immutable
`sources/YYYY-MM-DD-slug.md` page with `status: unprocessed`. The `knowledge-indexer`
agent picks it up from there.

> **Environment note**: `markitdown` is installed globally. `obscura` is available via the
> `obscura` CLI. If either isn't on PATH, invoke via `nix run` / `uvx` as needed.

---

## The Fallback Chain (run in order, stop at first good result)

```
PRIMARY:   markitdown <url>                  — clean markdown, handles most blogs/docs/news
FALLBACK:  obscura fetch <url> --stealth     — JS-rendered SPAs, bot-protected, paywall-soft
                --dump markdown                 (Medium, Substack, Cloudflare-fronted sites)
```

The repo ships `scripts/article-extract.sh` which runs this chain and prints
`METHOD=<markitdown|obscura>` on the last line of stderr. **Prefer it:**

```bash
bash scripts/article-extract.sh "$URL" /tmp/article.md
```

Run steps manually only if you need to tune behavior.

---

## PRIMARY — markitdown

`markitdown` fetches and converts a URL to structured markdown (headings, lists, tables,
links preserved), optimized for LLM consumption.

```bash
markitdown "$URL" -o /tmp/article.md
# or to stdout for inspection:
markitdown "$URL" | head -80
```

**Good for:** static blogs, documentation sites, news, GitHub READMEs, most Medium posts
that render server-side.

**Signs you must fall back to obscura:**
- Output is nearly empty (< ~500 chars of body) or only nav/boilerplate.
- Output is a cookie wall / "enable JavaScript" / "are you human" page.
- HTTP error or timeout.
- Content is a JS app shell with no article text.

---

## FALLBACK — obscura (stealth headless browser)

Renders the page in a real browser engine with anti-detection, then dumps markdown. Beats
bot protection (Cloudflare, DataDome) and JS-only sites.

```bash
obscura fetch "$URL" --stealth --dump markdown \
  --wait-until networkidle0 --timeout 45 --quiet \
  --output /tmp/article.md
```

If markdown dump is messy for a given site, get clean text instead:

```bash
obscura fetch "$URL" --stealth --dump text --wait-until networkidle0 --quiet
```

For the main article body specifically, you can target a selector:

```bash
obscura fetch "$URL" --stealth --selector "article" \
  --eval "el => el.innerText" --wait-until networkidle0 --quiet
```

**Set `extraction_method: obscura`** when this path succeeds.

---

## Getting metadata (title, author, published date)

`markitdown` output usually starts with the `# Title` as the first heading. Otherwise pull
it from the page `<title>` / meta tags via obscura:

```bash
# Title
obscura fetch "$URL" --stealth --quiet --eval "document.title"

# Author + published (Open Graph / article meta — best effort)
obscura fetch "$URL" --stealth --quiet --eval "
  JSON.stringify({
    title: document.querySelector('meta[property=\"og:title\"]')?.content || document.title,
    author: document.querySelector('meta[name=\"author\"]')?.content
            || document.querySelector('meta[property=\"article:author\"]')?.content || '',
    published: document.querySelector('meta[property=\"article:published_time\"]')?.content
            || document.querySelector('time')?.getAttribute('datetime') || ''
  })
"
```

If author/date can't be found, omit those frontmatter fields (don't invent them). Author is
a plain string — **never** a wikilink (no people entities).

---

## Building the source filename (slug)

```bash
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "$TITLE" \
  | tr '[:upper:]' '[:lower:]' \
  | sed 's/[^a-z0-9]\+/-/g; s/^-//; s/-$//' \
  | cut -c1-60)
FILE="sources/${DATE}-${SLUG}.md"
```

---

## Writing the raw source page

Use the file tools (or `obsidian create`) to write `sources/YYYY-MM-DD-slug.md` with the
source schema from `AGENTS.md`. Template for an article:

```markdown
---
title: "<Article Title>"
type: source
source_type: article
source: "<full article url>"
author: "<Author Name>"          # plain string; omit if unknown
published: <YYYY-MM-DD or omit>
created: <today YYYY-MM-DD>
extraction_method: <markitdown | obscura>
tags: [clippings]
concepts: []
entities: []
status: unprocessed
---

# <Article Title>

> Source: <url>
> Author: <Author Name> · Extracted: <today> · Method: <method>

## Content

<full cleaned article markdown — IMMUTABLE>
```

**The `## Content` section is immutable once written.** The indexer may only edit
frontmatter and append sections after it.

> Note: video sources use a `## Transcript` section; article sources use `## Content`. Both
> carry `type: source` and are distinguished by `source_type: video | article`.

---

## Done

After writing the source page, append to `log.md`:

```markdown
## <YYYY-MM-DDTHH:MMZ> — extract
- Source: `sources/<file>.md`
- URL: <url>
- Type: article
- Method: <markitdown|obscura>
- Status: unprocessed (awaiting knowledge-indexer)
```

Then tell the user the source was created and suggest running `@knowledge-indexer` to
curate it into the ontology.

---

## Failure modes cheat-sheet

| Symptom | Cause | Action |
|---|---|---|
| markitdown output tiny / boilerplate only | JS-rendered or paywalled | → obscura `--stealth` |
| "Enable JavaScript" / "Are you human" | Bot protection | → obscura `--stealth --wait-until networkidle0` |
| obscura markdown messy | Site-specific DOM | → `--dump text` or `--selector "article" --eval "el => el.innerText"` |
| Hard paywall (full content gated) | Login required | Extract the free portion; note truncation in the body; ask user if they want the full text |
| Timeout | Slow SPA | Increase `--timeout 60 --wait-until networkidle0` |
| Both methods fail | Site down / blocked | Do NOT write a partial source; report the exact error and ask the user |
