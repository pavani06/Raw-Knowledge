# Raw Knowledge

A personal knowledge system that turns **YouTube videos** into a searchable, cross-linked
**ontology** inside Obsidian — built on the LLM Wiki pattern (Karpathy).

You paste a YouTube link. One AI agent extracts the transcript and stores it as immutable
raw data. A second AI agent curates that raw data into an interlinked web of concept and
entity pages with **typed relationships**. Knowledge **compounds**: each new video enriches
existing pages instead of creating isolated notes. Then you search, cross-reference, and
synthesize it all from Obsidian.

## How it works

```
YouTube URL
    │  @transcript-extractor  (skill: youtube-transcript)
    ▼      fallback chain: youtube-transcript-api → yt-dlp subs → whisper
sources/YYYY-MM-DD-slug.md          # immutable raw transcript, status: unprocessed
    │  @knowledge-indexer  (skills: knowledge-indexer, obsidian)
    ▼      extract concepts + entities, compound, write typed links
concepts/*.md  entities/*.md  +  index.md  +  log.md     # status: processed
    │  @knowledge-indexer query "..."
    ▼
answers with [[wikilink]] citations, cross-referenced across videos
```

## Layout

| Path | What |
|---|---|
| `AGENTS.md` | The schema — read this first. Page types, typed-link vocabulary, hard rules. |
| `sources/` | Immutable raw transcripts (one per video). |
| `concepts/` | Ontology: ideas, techniques, terms, debates. Compound over time. |
| `entities/` | Ontology: projects, tools, companies, orgs (never people). |
| `digests/` | Periodic synthesis across recent videos. |
| `index.md` | Agent-maintained catalog of all pages. |
| `log.md` | Append-only operation log. |
| `Inbox.md` | Paste YouTube URLs here. |
| `scripts/youtube-transcript.sh` | The transcript fallback-chain helper. |
| `.opencode/` | Agents (`transcript-extractor`, `knowledge-indexer`) + skills config. |

## Usage

```text
# 1. Extract a transcript (saves an immutable raw source)
@transcript-extractor https://www.youtube.com/watch?v=VIDEO_ID

# 2. Curate it into the ontology
@knowledge-indexer process

# 3. Ask questions across everything you've ingested
@knowledge-indexer query "how do these videos describe agent memory?"

# Maintenance
@knowledge-indexer lint        # vault health check
@knowledge-indexer digest      # synthesis + writing prompts
```

You can also extract the transcript by hand:

```bash
bash scripts/youtube-transcript.sh "https://www.youtube.com/watch?v=VIDEO_ID" transcript.txt
```

## Requirements

- [OpenCode](https://opencode.ai) with the bundled agents/skills.
- A transcript toolchain — on NixOS the script auto-invokes them via `nix run` / `uvx`:
  - `youtube-transcript-api` (primary), `yt-dlp` (fallback), `ffmpeg` + `whisper-cpp` (last resort).
- **Obsidian 1.12.4+** (optional) with the CLI registered, for graph view and `obsidian`
  CLI integration. Open this folder as an Obsidian vault to browse the ontology.

## The ontology in one paragraph

Folders encode **type** (`source` / `concept` / `entity` / `digest`); tags encode
**topic**. Relationships between pages are **typed** in YAML frontmatter using a closed
vocabulary — `parent`, `part-of`, `defines`, `relates-to`, `contradicts`, `supports`,
`extends`, `sources` — and mirrored as inline `[[wikilinks]]` so Obsidian's graph view
lights up. Agents check for existing pages (by slug + `aliases`) before creating new ones,
so knowledge compounds instead of fragmenting. See `AGENTS.md` for the full contract.
