# Raw Knowledge

A personal knowledge base built on the **LLM Wiki pattern** (Karpathy). You paste a URL — a **YouTube video** or a **web article**; an agent extracts the content and saves it as immutable raw data; a second agent curates that raw data into an interlinked, **typed-relationship ontology** you can search, cross-reference, and query inside Obsidian.

Knowledge **compounds** — each new source enriches existing concept and entity pages rather than creating isolated notes.

> *"Obsidian is the IDE. The LLM is the programmer. The wiki is the codebase."*

## Architecture

Three immutable layers:

| Layer | Directory | Owner | Rule |
|---|---|---|---|
| **Raw sources** | `sources/` | `source-extractor` agent | Never modified after creation (frontmatter + appended sections only) |
| **The ontology** | `concepts/`, `entities/`, `digests/` | `knowledge-indexer` agent | Compounded over time, never replaced |
| **The schema** | this file | Human + agents co-evolve | Governs all agent behavior |

The critical inversion: **the agents do all the bookkeeping** — cross-referencing, deduplication, index maintenance, typed links. You curate inputs (URLs) and ask questions.

## The Pipeline

```
URL  (YouTube video  OR  web article)
    │
    ▼
[source-extractor]  →  detects URL type, extracts via the right fallback chain:
    │                    • video   → youtube-transcript-api → yt-dlp subs → whisper
    │                    • article → markitdown → obscura (stealth headless)
    ▼
sources/YYYY-MM-DD-slug.md  (status: unprocessed, immutable raw content)
    │                          • video   body in ## Transcript
    │                          • article body in ## Content
    ▼
[knowledge-indexer]  →  reads raw source, extracts concepts + entities,
    │                    compounds into ontology, writes typed links
    ▼
concepts/*.md  entities/*.md  +  index.md  +  log.md  (status: processed)
    │
    ▼
Query / cross-reference / synthesize  (via Obsidian CLI + agents)
```

## Directory Structure

```
Raw-Knowledge/
├── AGENTS.md              # This file — project schema and conventions
├── README.md             # Human-facing overview and usage
├── Inbox.md              # Paste URLs (videos or articles) here for processing
├── index.md              # Agent-maintained catalog of all pages
├── log.md                # Append-only operation log (audit trail)
├── scripts/
│   ├── youtube-transcript.sh   # Fallback-chain transcript extractor (video)
│   └── article-extract.sh      # Fallback-chain article extractor (article)
├── sources/              # Immutable raw sources (transcripts + articles)
│   └── YYYY-MM-DD-slug.md
├── concepts/             # Ontology: ideas, techniques, terms, debates
│   ├── concept-name.md
│   └── _moc-cluster.md   # Map of Content (prefix _ sorts first)
├── entities/             # Ontology: projects, tools, companies, orgs
│   └── entity-name.md
├── digests/              # Periodic synthesis across recent sources
│   └── YYYY-MM-DD.md
└── .opencode/
    ├── opencode.json
    ├── agents/
    │   ├── source-extractor.md
    │   └── knowledge-indexer.md
    └── skills/
        ├── youtube-transcript/SKILL.md
        ├── article-extractor/SKILL.md
        └── knowledge-indexer/SKILL.md
```

---

## The Ontology

Every page is **exactly one** of four types. This is the ontology's backbone:

| `type:` | Directory | What it is |
|---|---|---|
| `source` | `sources/` | Immutable raw content of one input — a YouTube video (`source_type: video`) or a web article (`source_type: article`) |
| `concept` | `concepts/` | An idea, technique, term, or debate — compounds over time |
| `entity` | `entities/` | A project, tool, company, or organization — **never a person** |
| `digest` | `digests/` | Synthesis across recently ingested sources |

A `source` page carries a `source_type` (`video` or `article`) that selects its body section
and a few frontmatter fields (see Page Schemas). Everything else about the ontology is
identical regardless of where the knowledge came from.

**Why no people entities?** Author/channel attribution belongs in source frontmatter only (`channel:`/`author:` field). People pages go stale, add privacy surface area, and dilute the ontology with biographical noise instead of ideas.

### Atomic notes vs. MOC

- **Atomic concept pages** (Zettelkasten): one concept per file. `attention-mechanism.md` *links to* `transformer-architecture.md` — it does not contain it.
- **MOC (Map of Content)**: an index page that lists and contextualizes atomic pages without duplicating them. Filename prefixed with `_` (e.g. `_moc-llm-architecture.md`) so it sorts first.
- **Rule**: Create a MOC only when a concept cluster exceeds **5 pages** and has no natural parent concept. Never create a MOC as a substitute for a missing concept page.

---

## Typed Links (the semantic layer)

Native `[[wikilinks]]` are untyped — they show *that* two notes connect, not *how*. We use a **two-part convention**:

1. **Typed relationship fields in YAML frontmatter** — machine-readable, queryable, authoritative for agents.
2. **Inline `[[wikilinks]]` in body text** — human-readable, drives Obsidian's graph view.

Both coexist. Agents read frontmatter; humans read the graph.

### Closed relationship vocabulary

Agents must use **only** these relationship fields — no ad-hoc field names. Always YAML lists (even for one value); empty is explicit `[]`.

```yaml
# Hierarchical
parent:       ["[[concepts/parent-concept]]"]   # this is a subtype/instance of
part-of:      ["[[concepts/larger-system]]"]    # this is a component of

# Semantic
defines:      ["[[concepts/term-a]]"]           # this page defines these terms
relates-to:   ["[[concepts/related]]"]          # general association (use sparingly)
contradicts:  ["[[concepts/opposing-view]]"]    # direct contradiction
supports:     ["[[concepts/claim]]"]            # provides evidence for
extends:      ["[[concepts/base-concept]]"]     # builds on / specializes

# Provenance
sources:      ["[[sources/2026-06-07-slug]]"]   # raw sources that contributed
```

**Do not** use plugin-specific inline syntax (`::`, `@type`). YAML is portable and survives plugin churn. (Dataview, Breadcrumbs, Juggl, Graph Link Types all *read* this frontmatter — none are required to *write* it.)

---

## Page Schemas

### Source page (`sources/`) — created by `source-extractor`

Two shapes share `type: source`, distinguished by `source_type`.

**Video** (`source_type: video`) — body section is `## Transcript`:

```yaml
---
title: "Exact Video Title"
type: source
source_type: video
source: "https://www.youtube.com/watch?v=VIDEO_ID"
video_id: "VIDEO_ID"
channel: "Channel Name"          # plain string, NEVER a wikilink to a person
published: 2026-06-01            # video upload date if known
created: 2026-06-07              # date extracted into the vault
duration: "12:34"               # if known
extraction_method: api          # api | yt-dlp | whisper
tags: [clippings]               # placeholder; indexer replaces with domain tags
concepts: []                    # indexer fills with [[concepts/...]] links
entities: []                    # indexer fills with [[entities/...]] links
status: unprocessed             # unprocessed | processed
---

# Exact Video Title

> Source: https://www.youtube.com/watch?v=VIDEO_ID
> Channel: Channel Name · Extracted: 2026-06-07 · Method: api

## Transcript

<full raw transcript text — IMMUTABLE>
```

**Article** (`source_type: article`) — body section is `## Content`:

```yaml
---
title: "Exact Article Title"
type: source
source_type: article
source: "https://example.com/the-article"
author: "Author Name"            # plain string, NEVER a wikilink; omit if unknown
published: 2026-06-01            # article publish date if known
created: 2026-06-07              # date extracted into the vault
extraction_method: markitdown   # markitdown | obscura
tags: [clippings]
concepts: []
entities: []
status: unprocessed
---

# Exact Article Title

> Source: https://example.com/the-article
> Author: Author Name · Extracted: 2026-06-07 · Method: markitdown

## Content

<full cleaned article markdown — IMMUTABLE>
```

- `tags` placeholder is `[clippings]` so unprocessed sources are easy to spot.
- The body section (`## Transcript` for video, `## Content` for article) is **immutable**. The indexer may only edit frontmatter and **append** sections after it.
- Video-only fields: `video_id`, `channel`, `duration`. Article-only field: `author`. Do not mix them.

### Concept page (`concepts/`) — owned by `knowledge-indexer`

```yaml
---
title: "Attention Mechanism"
type: concept
aliases: ["attention", "self-attention", "scaled dot-product attention"]
tags: [ai, transformers, architecture]
source_count: 3
last_updated: 2026-06-07
parent:      ["[[concepts/neural-network-architectures]]"]
part-of:     ["[[concepts/transformer-architecture]]"]
defines:     ["[[concepts/query-key-value]]"]
relates-to:  ["[[concepts/memory-bandwidth]]"]
contradicts: []
supports:    []
extends:     []
sources:     ["[[sources/2026-06-07-attention-explained]]"]
---

# Attention Mechanism

Brief description.

## Key Insights

- Insight ([[sources/2026-06-07-attention-explained]])

## Sources

- [[sources/2026-06-07-attention-explained|Attention Explained]] — covered scaled dot-product attention
```

### Entity page (`entities/`) — owned by `knowledge-indexer`

```yaml
---
title: "Anthropic"
type: entity
entity_type: company            # company | project | tool | organization
aliases: []
tags: [ai, llm]
source_count: 1
last_updated: 2026-06-07
relates-to: ["[[entities/openai]]"]
part-of:    []
sources:    ["[[sources/2026-06-07-some-video]]"]
---

# Anthropic

What the entity does and how it relates to others (not biography).

## Mentioned In

- [[sources/2026-06-07-some-video|Video Title]] — context of mention
```

### Digest page (`digests/`)

```yaml
---
title: "Digest 2026-06-07"
type: digest
date: 2026-06-07
sources_covered: 5
sources: ["[[sources/2026-06-05-a]]", "[[sources/2026-06-06-b]]"]
tags: [synthesis]
---
```

---

## Folders vs. Tags (the definitive rule)

**Folders encode TYPE. Tags encode TOPIC.**

- Never use folders for topics (no `concepts/ai/`). A concept can belong to multiple topics — that's what flat tags are for.
- `tags` = domain vocabulary describing what the content is *about*: `[rust, memory-safety, performance]`.
- Structural metadata may use hierarchical tags: `status/processed`, `domain/ai`.

## Slug rules

| Rule | Example |
|---|---|
| Lowercase, hyphens only | `attention-mechanism.md` ✓ |
| No spaces, no underscores (except `_moc-`) | `Attention_Mechanism.md` ✗ |
| No special characters | `c++` → `cpp` |
| Descriptive, not abbreviated | `kv-cache` not `kvc` |
| Sources | `YYYY-MM-DD-slug.md` |
| Concepts/entities | concept name only |

The filename **is** the canonical identifier. Renaming breaks `[[wikilinks]]`. Always check for an existing page before creating one.

---

## Focus Areas (for tagging)

AI/ML/LLM (agents, models, training, inference) · Systems/Infra (NixOS, Linux, DevOps, containers, Kubernetes) · Low-level (Rust, Go, Zig, systems programming, performance) · Databases · Knowledge management.

---

## Hard Rules

- **Never modify a source's body section** (`## Transcript` for video, `## Content` for article) after creation — sources are immutable records. Frontmatter and appended sections only.
- **No people entities** — the channel (video) / author (article) stays in source frontmatter (`channel:` / `author:`) only.
- **Check before create** — before any concept/entity page, search `index.md`, the directory, and `aliases:` for a near-match. If found, **update**; never create a duplicate.
- **Compound, don't replace** — read existing pages first, append/merge, never overwrite.
- **Flag contradictions** with a callout, never silent overwrite:
  ```markdown
  > [!contradiction] Contradicts [[sources/2026-05-01-other-video]]
  > That video claimed X; this one argues Y because Z. Unresolved as of 2026-06-07.
  ```
- **Mark agent synthesis** (claims not directly from a source) with `> [!inference]`.
- **Always update `index.md`** after any page creation/deletion (sorted alphabetically, with source counts).
- **Always append to `log.md`** after any operation (audit trail + dedup signal).
- **Use `[[wikilinks]]`** for all cross-references (Obsidian-compatible).
- **Frontmatter is mandatory** on every page, with all relationship fields present (empty `[]` if none).
- **Today's date** for all date fields — use the actual current date.
- **Every concept page must appear in ≥2 other pages** as an inline `[[wikilink]]`. Orphans are a lint error.
