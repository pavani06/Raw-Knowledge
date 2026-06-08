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

## 2026-06-07T13:00Z — extract | Harness Engineering: How to Build Software When Humans Steer, Agents Execute

- Source: `sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent.md`
- Video: https://youtu.be/am_oeAoUhew?si=0I0ta4wvDAF27uSu
- Method: api
- Status: unprocessed (awaiting knowledge-indexer)

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

## 2026-06-07T14:00Z — ingest | Harness Engineering: How to Build Software When Humans Steer, Agents Execute

- Source: `sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent.md` (status: unprocessed → processed)
- Created concepts (7): `harness-engineering`, `non-functional-requirements`, `code-as-free-resource`, `reviewer-agents`, `codebase-uniformity`, `garbage-collection-day`, `prompt-injection-patterns`
- Created entities (3): `openai`, `codex`, `linear`
- Compounded concepts (5): `agent-harness` (source_count: 1→2), `skills-progressive-disclosure` (1→2), `context-window-management` (1→2), `sub-agents` (1→2), `verification-loop` (1→2)
- Updated: `index.md` (rebuilt: 23 concepts, 8 entities, 2 sources)
- Pages touched: 18 (1 source + 7 new concepts + 3 new entities + 5 compounded concepts + index.md + log.md)
- Dedup checks: no near-matches found for any new concept/entity; 5 existing concepts compounded
- Key themes: harness engineering as named methodology (humans steer / agents execute); code-as-free-resource axiom; non-functional requirements as the primary engineering artifact; reviewer agents replacing synchronous code review; garbage collection day as self-improving feedback loop; codebase uniformity as context management; just-in-time prompt injection patterns
- Contradictions with prior source: none direct; `> [!inference]` callouts in `harness-engineering.md`, `code-as-free-resource.md`, `garbage-collection-day.md`
- Ontology health: 5 concepts now at source_count:2 (compounding confirmed working); 7 new concepts at source_count:1 (thin — prime for next source)

## 2026-06-07T15:00Z — digest | Digest 2026-06-07 (updated — 2 sources)

- Updated: `digests/2026-06-07.md` (supersedes the 1-source digest written at 13:14Z)
- Sources covered: 2
  - `sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours.md`
  - `sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent.md`
- Updated: `index.md` (Digests entry updated: "2 sources, 23 concepts, 8 entities")
- Cross-source themes synthesized (5):
  1. The harness is the product — and it is disposable (co-evolution from both angles: technical + operational)
  2. Adversarial separation beats self-reflection — at every layer (generator-evaluator ↔ reviewer agents)
  3. Context is the master constraint — and the harness is its manager (compaction/skills/JIT surfacing/uniformity)
  4. Verification means using the thing — at every stage (Playwright evaluator ↔ QA plans + smoke tests)
  5. The human skill is specification, not implementation (reading traces ↔ writing non-functional requirements)
- Contradictions flagged (3): compaction ≠ coherence; Ralph Loop dead-or-useful; greenfield vs. brownfield applicability
- 3 writing prompts emitted: "the specification economy", "adversarial separation as a universal pattern", "context engineering as the new systems programming"
- Ontology health: 5 concepts at source_count:2; 18 at source_count:1; no orphans; strongest cluster: agent-harness ↔ harness-engineering ↔ context-window-management ↔ verification-loop

## 2026-06-07T16:00Z — extract | Ship Real Agents: Hands-On Evals for Agentic Applications — Laurie Voss, Arize

- Source: `sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications.md`
- Video: https://youtu.be/Xfl50508LZM?si=b4dEqxKcbbSeQa1M
- Method: api
- Status: unprocessed (awaiting knowledge-indexer)

## 2026-06-07T17:30Z — extract | Full Walkthrough: Workflow for AI Coding — Matt Pocock

- Source: `sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock.md`
- Video: https://www.youtube.com/watch?v=-QFHIoCo-Ko
- Method: yt-dlp
- Status: unprocessed (awaiting knowledge-indexer)

## 2026-06-07T18:00Z — ingest | Ship Real Agents: Hands-On Evals for Agentic Applications — Laurie Voss, Arize

- Source: `sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications.md` (status: unprocessed → processed)
- Created concepts (8): `agent-evals`, `llm-as-judge`, `golden-dataset`, `eval-driven-development`, `data-flywheel`, `closed-loop-evaluation`, `tracing-observability`, `eval-iterate-cycle`
- Created entities (1): `arize-phoenix`
- Compounded concepts (3): `reading-traces` (source_count: 1→2), `generator-evaluator-pattern` (1→2), `verification-loop` (2→3)
- Updated: `index.md` (rebuilt: 31 concepts, 9 entities, 3 sources)
- Pages touched: 13 (1 source + 8 new concepts + 1 new entity + 3 compounded concepts + index.md + log.md)
- Dedup checks: no near-matches found for any new concept/entity; 3 existing concepts compounded
- Key themes: three-tier eval framework (code → built-in → LLM-as-judge); golden datasets as encoded domain judgment; eval-iterate cycle as the core improvement loop; data flywheel as competitive moat; closed-loop evaluation as the frontier; LLM-as-judge biases and meta-evaluation; eval-driven development as the agent analog of TDD
- Cross-source connections: `reading-traces` compounded (Laurie's "read traces first" mirrors Anthropic's hand-reading discipline); `generator-evaluator-pattern` compounded (LLM-as-judge is the eval-time instantiation); `verification-loop` compounded (evals are systematic verification replacing vibe-checking); `garbage-collection-day` linked to `data-flywheel` (both convert human review findings into automated guardrails)
- `> [!inference]` callouts in `agent-evals.md`, `golden-dataset.md`, `eval-driven-development.md`, `data-flywheel.md`, `tracing-observability.md`, `eval-iterate-cycle.md`, `closed-loop-evaluation.md`
- Ontology health: 3 concepts now at source_count:2+; 8 new concepts at source_count:1 (thin — prime for compounding)

## 2026-06-07T18:30Z — ingest | Full Walkthrough: Workflow for AI Coding — Matt Pocock

- Source: `sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock.md` (status: unprocessed → processed)
- Created concepts (10): `smart-zone-dumb-zone`, `grill-me-skill`, `shared-design-concept`, `prd-as-destination`, `vertical-slices`, `deep-modules`, `human-in-loop-vs-afk`, `doc-rot`, `kanban-for-agents`, `feedback-loops`
- Created entities (1): `sandcastle`
- Compounded concepts (7): `sub-agents` (2→3), `skills-progressive-disclosure` (2→3), `context-window-management` (2→3), `ralph-loop` (1→2), `compaction` (1→2), `harness-engineering` (1→2), `garbage-collection-day` (1→2)
- Fixed: `.md` extension removed from source wikilinks in 5 Matt Pocock concept pages (`grill-me-skill`, `shared-design-concept`, `prd-as-destination`, `smart-zone-dumb-zone`, `vertical-slices`)
- Updated: `index.md` (rebuilt: 41 concepts, 10 entities, 4 sources)
- Pages touched: 19 (1 source + 10 new concepts + 1 new entity + 7 compounded concepts + index.md + log.md)
- Dedup checks: no near-matches found for any new concept/entity; 7 existing concepts compounded
- Key themes: software engineering fundamentals apply to AI (Pragmatic Programmer, Philosophy of Software Design); smart zone / dumb zone as context management mental model; grill-me skill as alignment-before-planning discipline; PRD as destination artifact; vertical slices over horizontal layers; deep modules as AI-navigable architecture; feedback loops as quality ceiling; human-in-loop vs. AFK task classification; Kanban for parallelized agent work; doc rot as agent misleader
- Cross-source connections: `feedback-loops` ↔ `eval-driven-development` (same principle: define success criterion first); `kanban-for-agents` ↔ `sub-agents` (Kanban is the coordination layer for parallel sub-agents); `doc-rot` ↔ `garbage-collection-day` (both eliminate stale context); `human-in-loop-vs-afk` ↔ `harness-engineering` (humans steer = human-in-loop; agents execute = AFK); `compaction` contradiction callout added (clear-context vs. compaction trade-off)
- `> [!inference]` callouts in `feedback-loops.md`, `deep-modules.md`, `doc-rot.md`, `kanban-for-agents.md`, `human-in-loop-vs-afk.md`, `vertical-slices.md`, `shared-design-concept.md`, `grill-me-skill.md`
- `> [!contradiction]` callout added to `compaction.md` (clear-context vs. compaction: single long-running session vs. many short parallel sessions)
- Ontology health: 3 concepts at source_count:3 (`sub-agents`, `skills-progressive-disclosure`, `context-window-management`, `verification-loop`); 5 at source_count:2; 22 at source_count:1; no orphans detected; strongest cluster: harness-engineering ↔ agent-harness ↔ context-window-management ↔ verification-loop ↔ feedback-loops

## 2026-06-07T19:00Z — ingest | The Beginner's Guide to Learning Agentic AI — Harsh Singh

- Source: `sources/2026-06-07-beginners-guide-to-learning-agentic-ai.md` (status: unprocessed → processed)
- Source type: article (ai.plainenglish.io)
- Created concepts (6): `agentic-ai`, `llm-vs-agents`, `agent-planning`, `tool-use`, `agent-memory`, `react-pattern`
- Created entities (0): none — no specific tools, companies, or organizations named in the article
- Compounded concepts (0): no existing pages directly compounded; cross-links added to `human-in-loop-vs-afk`, `verification-loop`, `agent-harness`, `planner-generator-evaluator-architecture`, `programmatic-tool-calling`, `eval-iterate-cycle` via source knowledge section
- Updated: `index.md` (rebuilt: 47 concepts, 10 entities, 5 sources)
- Pages touched: 9 (1 source + 6 new concepts + index.md + log.md)
- Dedup checks: no near-matches found for any new concept; `human-in-loop-vs-afk` and `verification-loop` referenced but not compounded (article is beginner-level; existing pages are already richer — cross-links added instead)
- Key themes: agentic AI as "AI that acts, not just responds"; LLM vs. agent distinction (suggest vs. suggest+act); six building blocks (goals, planning, tool use, memory, decision-making, human-in-loop); ReAct as the foundational loop pattern; beginner failure modes (over-complexity, too many tools, skipping testing, expecting full autonomy)
- Cross-source connections: `agentic-ai` ↔ `agent-harness` (beginner framing of the same concept); `agent-planning` ↔ `planner-generator-evaluator-architecture` (foundational vs. formalized); `tool-use` ↔ `programmatic-tool-calling` (concept vs. implementation pattern); `react-pattern` ↔ `verification-loop` (micro-cycle vs. macro-cycle); `react-pattern` ↔ `eval-iterate-cycle` (loop pattern at different scales)
- `> [!inference]` callouts in `agentic-ai.md`, `llm-vs-agents.md`, `agent-planning.md`, `tool-use.md`, `agent-memory.md`, `react-pattern.md`
- Ontology health: 6 new concepts at source_count:1 (thin — prime for compounding); ontology now has foundational layer (agentic-ai, llm-vs-agents, agent-planning, tool-use, agent-memory, react-pattern) bridging beginner concepts to advanced harness-engineering cluster

## 2026-06-07T20:30Z — moc | Agent Harness cluster

- Created MOC (1): `concepts/_moc-agent-harness.md` (first Map of Content in the vault)
- Trigger: agent-harness cluster exceeded the 5-page MOC threshold (AGENTS.md rule) with 19 atomic members and no natural parent concept — `agent-harness` (technical substrate) and `harness-engineering` (operational discipline) are peers, not a hierarchy root
- Cluster indexed (19 concepts, grouped into 5 themes): two load-bearing nodes (`agent-harness`, `harness-engineering`); context discipline (`context-window-management`, `compaction`, `context-rot`, `smart-zone-dumb-zone`, `skills-progressive-disclosure`, `programmatic-tool-calling`, `file-system-state`, `prompt-injection-patterns`); adversarial architecture (`generator-evaluator-pattern`, `planner-generator-evaluator-architecture`, `sub-agents`, `reviewer-agents`); verification (`verification-loop`, `design-taste-rubric`); human discipline (`reading-traces`, `non-functional-requirements`, `garbage-collection-day`, `code-as-free-resource`); enabler (`long-running-agents`)
- Typed links: `relates-to` the 8 most central nodes; `sources` all 4 contributing sources
- Updated: `index.md` (MOC added at top of Concepts section — `_` prefix sorts first)
- Pages touched: 3 (1 new MOC + index.md + log.md)
- Dedup checks: no existing MOC; no atomic concept pages duplicated (MOC indexes, does not contain)
- `> [!inference]` callout in `_moc-agent-harness.md`: cluster is a web (no single parent), justifying a MOC over a parent concept page
- Note: MOC does not count toward concept `source_count` compounding; it is a navigation layer, not a knowledge page. Vault now: 47 atomic concepts + 1 MOC, 10 entities, 5 sources, 1 digest
