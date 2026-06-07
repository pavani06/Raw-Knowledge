---
name: knowledge-indexer
description: "Curate raw YouTube transcript sources into a typed-relationship ontology of concept and entity pages. Compounds knowledge, deduplicates, maintains index.md and log.md. Use when sources need processing into the wiki, or for query/lint/digest operations."
license: MIT
compatibility: opencode
allowed-tools: Bash(obsidian:*)
metadata:
  version: "1.0.0"
  audience: AI agents maintaining a typed-link knowledge ontology
  workflow: ingest, query, lint, digest
---

# Knowledge Indexer Skill

Turn immutable raw transcripts (`sources/`) into a compounding, typed-relationship
**ontology** (`concepts/`, `entities/`) that is searchable and cross-referenceable in
Obsidian.

**Read `AGENTS.md` first** — it defines the page schemas, the closed relationship
vocabulary, and the hard rules. This skill is the *how*; AGENTS.md is the *contract*.

---

## Operation: Ingest

### Step 1 — Find unprocessed sources

```bash
grep -rl "status:.*unprocessed" sources/
```

Or via Obsidian CLI if running:

```bash
obsidian search query="status: unprocessed" format=paths
```

### Step 2 — Read and analyze each source

A source is either a **video** (`source_type: video`, body in `## Transcript`) or an
**article** (`source_type: article`, body in `## Content`). Read the full body. Extract:

1. **Core thesis** — the source's main argument (1–2 sentences).
2. **Key takeaways** — 3–7 actionable/notable insights.
3. **Concepts** — technical ideas/techniques/terms/debates that deserve a page.
4. **Entities** — projects, tools, companies, organizations (NEVER people).
5. **Connections** — how this relates to existing wiki pages.
6. **Contradictions** — conflicts with existing knowledge.

> **Video transcripts** are messy (filler words, no punctuation from auto-captions);
> whisper transcripts may misspell names/jargon. **Articles** are cleaner but may carry
> nav/boilerplate noise from extraction. In both cases read for *meaning*, not literal
> phrasing, and cross-check entity names. The same concepts/entities can come from either
> source type — compound them into the **same** ontology pages regardless of origin.

### Step 3 — Check before create (dedup — CRITICAL)

Before creating ANY concept/entity page:

```bash
# 1. Search the index
grep -i "concept-name" index.md

# 2. List existing slugs
ls concepts/ | grep -i "partial-name"

# 3. Search aliases across pages
grep -rl "aliases:.*synonym" concepts/
```

If a near-match exists → **update it**. Never create `attention.md` and
`attention-mechanism.md` as separate pages.

### Step 4 — Enrich the source frontmatter

Edit ONLY the frontmatter (the body section — `## Transcript` for video, `## Content` for
article — is immutable):
- Replace `tags: [clippings]` with real domain tags.
- Fill `concepts: ["[[concepts/...]]", ...]`.
- Fill `entities: ["[[entities/...]]", ...]`.
- Set `status: processed`.

Then **append** (after the immutable body section) a knowledge section:

```markdown

---

## Key Takeaways

- Takeaway 1 ([[concepts/relevant-concept]])
- Takeaway 2

## Concepts

- [[concepts/concept-name|Concept Name]] — why it's relevant here

## Entities

- [[entities/entity-name|Entity Name]] — context

## Connections

- Relates to [[concepts/other-concept]] because ...
```

### Step 5 — Create / update concept pages

For each concept: if it exists, **compound** (read first, merge new insights, add the new
source to `## Sources`, increment `source_count`, update `last_updated`, add typed links).
If new, create it with the FULL schema from AGENTS.md — including all relationship fields
(empty `[]` where none) and `aliases`.

Always set typed relationships using the **closed vocabulary**:
`parent`, `part-of`, `defines`, `relates-to`, `contradicts`, `supports`, `extends`,
`sources`. Mirror the most important links inline in the body so the graph view shows them.

### Step 6 — Create / update entity pages

Same compounding logic. `entity_type` ∈ `company | project | tool | organization`.
**No people.** The video's channel stays in the source's `channel:` field only.

### Step 7 — Update `index.md`

Add new pages to the right section, **sorted alphabetically**, with a one-line summary and
source count:

```markdown
- [[concepts/kv-cache|KV Cache]] — Key-value cache for inference optimization (3 sources)
```

### Step 8 — Append to `log.md`

```markdown
## <YYYY-MM-DDTHH:MMZ> — ingest | <Video Title>
- Source: `sources/<file>.md`
- Created: `concepts/<new>.md`, `entities/<new>.md`
- Updated: `concepts/<existing>.md` (source_count: 2→3)
- Pages touched: N
```

---

## Operation: Query

Answer a question against the ontology:

1. Read `index.md` to find relevant pages (or `obsidian search query="..."`).
2. Read those pages; follow typed links (`relates-to`, `parent`, `part-of`) to expand.
3. Synthesize an answer with `[[wikilink]]` citations.
4. Offer to save valuable answers as a concept or digest page.

Useful Obsidian CLI:

```bash
obsidian search:context query="connection pooling" limit=5
obsidian backlinks file="concepts/kv-cache"     # what references this
obsidian links file="concepts/kv-cache"         # what it points to
```

---

## Operation: Lint

Report (do NOT auto-fix without confirmation):

```bash
obsidian orphans        # pages with zero incoming links
obsidian unresolved     # broken [[wikilinks]]
```

Plus manual checks:
- Concept pages with `source_count: 1` (thin knowledge).
- Missing relationship fields (schema drift).
- `source_count` mismatch vs. actual `## Sources` entries.
- Duplicate concepts (check `aliases`).
- Sources still `status: unprocessed`.
- Concept pages appearing in <2 other pages (orphan risk).

---

## Operation: Digest

1. Read `log.md` for recent ingests (since last digest / last N days).
2. Read the involved source + concept pages.
3. Write `digests/YYYY-MM-DD.md` with:
   - Summary of videos covered.
   - Cross-video connections and emerging themes.
   - Contradictions / evolving understanding.
   - 2–3 specific writing/research prompts.
4. Update `index.md` and `log.md`.

---

## Compounding rules (the heart of the system)

- **Read before write** — never overwrite an existing page; merge.
- **Cite provenance** — claims trace to a source: `... (\[\[sources/...]])`.
- **Mark synthesis** — agent inferences use `> [!inference]`.
- **Flag contradictions** — `> [!contradiction] Contradicts [[sources/...]]`.
- **Increment counters** — `source_count` and `last_updated` on every touch.
- **Be opinionated about links** — when two concepts connect, make it an explicit typed
  relationship, not just prose.

---

## Obsidian CLI integration (optional)

If Obsidian is running with this vault open, prefer the CLI for single-note CRUD and
property edits (it keeps wikilinks + index consistent):

```bash
obsidian create name="concepts/kv-cache" content="..." 
obsidian property:set file="concepts/kv-cache" name="source_count" value="3"
obsidian append file="concepts/kv-cache" content="\n## Sources\n- [[sources/...]]"
obsidian move file="concepts/old-name" to="concepts/new-name"   # rewrites all links
```

**Fallback**: if Obsidian isn't running, use plain file read/write/grep — the vault is
just markdown on disk.
