# Log

Chronological, append-only record of all operations. Serves as audit trail, dedup signal,
and compounding-awareness source.

<!-- Format: ## YYYY-MM-DDTHH:MMZ — operation | Title -->
<!-- Operations: extract, ingest, query, lint, digest -->

## 2026-06-07 — init | Repository scaffolded

Raw Knowledge knowledge system created: AGENTS.md schema, `transcript-extractor` and
`knowledge-indexer` agents, `youtube-transcript` and `knowledge-indexer` skills,
`scripts/youtube-transcript.sh` fallback chain, and the empty vault structure
(`sources/`, `concepts/`, `entities/`, `digests/`).

## 2026-06-07T12:57Z — extract | Anthropic Workshop: Build Agents That Run for Hours

- Source: `sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours.md`
- Video: https://www.youtube.com/watch?v=mR-WAvEPRwE
- Method: api
- Status: unprocessed (awaiting knowledge-indexer)

## 2026-06-07T13:05Z — ingest | Anthropic Workshop: Build Agents That Run for Hours

- Source: `sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours.md` (status: unprocessed → processed)
- Created concepts (16): `agent-harness`, `agent-teams`, `compaction`, `context-rot`, `context-window-management`, `design-taste-rubric`, `file-system-state`, `generator-evaluator-pattern`, `long-running-agents`, `planner-generator-evaluator-architecture`, `programmatic-tool-calling`, `ralph-loop`, `reading-traces`, `skills-progressive-disclosure`, `sub-agents`, `verification-loop`
- Created entities (5): `anthropic`, `claude-code`, `agent-sdk`, `playwright`, `model-context-protocol`
- Updated: `index.md` (rebuilt: 16 concepts, 5 entities, 1 source)
- Pages touched: 23 (1 source + 16 concepts + 5 entities + index.md)
- Note: first ingest into a greenfield ontology — no dedup matches. One `> [!contradiction]` callout in `compaction.md` (compaction ≠ coherence tension); `> [!inference]` callouts in `agent-harness.md` and `compaction.md`.

## 2026-06-07T13:14Z — digest | Digest 2026-06-07

- Created: `digests/2026-06-07.md`
- Sources covered: 1 (`sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours.md`)
- Updated: `index.md` (Digests section)
- Themes: disposable/co-evolving harness, adversarial separation over self-reflection, context as master constraint, verification = using the app, reading traces as the human skill
- Tensions flagged: compaction ≠ coherence; Ralph Loop dead-or-useful
- 3 writing prompts emitted; ontology health: all concepts source_count:1 (thin — prime for compounding on next source)
