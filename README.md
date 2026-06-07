# Raw Knowledge

A personal knowledge system that turns **YouTube videos and web articles** into a
searchable, cross-linked **ontology** inside Obsidian — built on the LLM Wiki pattern
(Karpathy).

You paste a URL — a video or an article. One AI agent detects the type, extracts the
content, and stores it as immutable raw data. A second AI agent curates that raw data into
an interlinked web of concept and entity pages with **typed relationships**. Knowledge
**compounds**: each new source enriches existing pages instead of creating isolated notes —
and a concept learned from a video merges with the same concept seen in an article. Then you
search, cross-reference, and synthesize it all from Obsidian.

## How it works

```
URL  (YouTube video  OR  web article)
    │  @source-extractor   (skills: youtube-transcript, article-extractor)
    ▼      • video   → youtube-transcript-api → yt-dlp subs → whisper
    ▼      • article → markitdown → obscura (stealth headless)
sources/YYYY-MM-DD-slug.md          # immutable raw content, status: unprocessed
    │                                 # video → ## Transcript · article → ## Content
    │  @knowledge-indexer  (skills: knowledge-indexer, obsidian)
    ▼      extract concepts + entities, compound, write typed links
concepts/*.md  entities/*.md  +  index.md  +  log.md     # status: processed
    │  @knowledge-indexer query "..."
    ▼
answers with [[wikilink]] citations, cross-referenced across all sources
```

## Layout

| Path | What |
|---|---|
| `AGENTS.md` | The schema — read this first. Page types, typed-link vocabulary, hard rules. |
| `sources/` | Immutable raw sources (video transcripts + web articles). |
| `concepts/` | Ontology: ideas, techniques, terms, debates. Compound over time. |
| `entities/` | Ontology: projects, tools, companies, orgs (never people). |
| `digests/` | Periodic synthesis across recent sources. |
| `index.md` | Agent-maintained catalog of all pages. |
| `log.md` | Append-only operation log. |
| `Inbox.md` | Paste URLs (videos or articles) here. |
| `scripts/youtube-transcript.sh` | Transcript fallback-chain helper (video). |
| `scripts/article-extract.sh` | Article fallback-chain helper (article). |
| `.opencode/` | Agents (`source-extractor`, `knowledge-indexer`) + skills config. |

## Usage

```text
# 1. Extract a source (saves immutable raw content) — works for video OR article
@source-extractor https://www.youtube.com/watch?v=VIDEO_ID
@source-extractor https://example.com/some-great-article

# 2. Curate it into the ontology
@knowledge-indexer process

# 3. Ask questions across everything you've ingested (videos + articles together)
@knowledge-indexer query "how do these sources describe agent memory?"

# Maintenance
@knowledge-indexer lint        # vault health check
@knowledge-indexer digest      # synthesis + writing prompts
```

You can also extract by hand:

```bash
bash scripts/youtube-transcript.sh "https://www.youtube.com/watch?v=VIDEO_ID" transcript.txt
bash scripts/article-extract.sh   "https://example.com/some-great-article"     article.md
```

## Requirements

- [OpenCode](https://opencode.ai) with the bundled agents/skills.
- **Video** toolchain — on NixOS the script auto-invokes via `nix run` / `uvx`:
  `youtube-transcript-api` (primary), `yt-dlp` (fallback), `ffmpeg` + `whisper-cpp` (last resort).
- **Article** toolchain: `markitdown` (primary), `obscura` (stealth headless fallback for
  JS-heavy or bot-protected pages).
- **Obsidian 1.12.4+** (optional) with the CLI registered, for graph view and `obsidian`
  CLI integration. Open this folder as an Obsidian vault to browse the ontology.

## The ontology in one paragraph

Folders encode **type** (`source` / `concept` / `entity` / `digest`); tags encode
**topic**. A `source` carries a `source_type` (`video` or `article`) but feeds the **same**
ontology. Relationships between pages are **typed** in YAML frontmatter using a closed
vocabulary — `parent`, `part-of`, `defines`, `relates-to`, `contradicts`, `supports`,
`extends`, `sources` — and mirrored as inline `[[wikilinks]]` so Obsidian's graph view
lights up. Agents check for existing pages (by slug + `aliases`) before creating new ones,
so knowledge compounds instead of fragmenting. See `AGENTS.md` for the full contract.
