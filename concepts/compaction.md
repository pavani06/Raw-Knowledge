---
title: "Compaction"
type: concept
aliases: ["compaction", "server-side compaction", "context compaction", "intentional compaction", "frequent intentional compaction"]
tags: [ai, llm, context, technique]
source_count: 3
last_updated: 2026-06-08
parent: []
part-of: ["[[concepts/context-window-management]]"]
defines: []
relates-to: ["[[concepts/context-rot]]", "[[concepts/ralph-loop]]", "[[concepts/long-running-agents]]", "[[concepts/research-plan-implement]]", "[[concepts/smart-zone-dumb-zone]]"]
contradicts: []
supports: ["[[concepts/research-plan-implement]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]", "[[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]"]
---

# Compaction

Summarizing/condensing accumulated context so a single agent session can keep running past
the raw context window — a key enabler of single-session [[concepts/long-running-agents]].
With **server-side compaction**, this happens automatically server-side, letting models run
effectively indefinitely.

## Key Insights

- Server-side compaction (shipped around the Opus/Sonnet 4.6 era) means models can run
  indefinitely with compaction handled server-side
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- With Opus 4.6, the team moved from fresh context windows to **one long-running continuous
  session + compaction**
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Caveat from the closing slide: **compaction ≠ coherence** — lossy summaries drift, so
  structured hand-offs and clean contexts remain better patterns for some work
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

> [!contradiction] Tension within the source
> The talk both embraces single-session + compaction (replacing fresh context windows) and
> warns that "compaction does not equal coherence." The resolution offered: it depends on
> model generation and use case — Opus 4.6 holds coherence well enough that compaction
> suffices, but lossy summaries still drift on harder work.

### From AI Coding Workflow (Matt Pocock)

- **Clear context > compact** — Matt explicitly prefers clearing context (returning to a
  known, predictable state) over compacting; compaction accumulates "sediment" that may
  degrade quality in unpredictable ways, whereas a cleared context is always the same
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Predictability beats continuity** — the argument for clear-context is not that
  compaction is wrong, but that for parallelized [[concepts/ralph-loop]] sessions (via
  [[entities/sandcastle|Sandcastle]]), a known starting state is more reliable than a
  compacted one; each Docker sandbox starts clean
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

> [!contradiction] Compaction vs. clear-context
> The Anthropic Workshop (source 1) embraces single-session + compaction as the future of
> long-running agents. Matt Pocock (source 2) prefers clearing context over compacting for
> parallelized AFK loops. The resolution: compaction is better for single long-running
> sessions (Anthropic's use case); clear-context is better for many short parallel sessions
> (Matt's use case). Both are valid; the choice depends on the execution model.

### From No Vibes Allowed (Dex Horthy, HumanLayer)

- **Intentional compaction** — whether you're on track or not, take the existing context
  window and ask the agent to compress it into a markdown file. You review it, tag it, and
  the next agent starts straight from work instead of re-doing all the searching and codebase
  understanding ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **What to compact** — the things that eat the context window: finding files, understanding
  code flow, editing files, test/build output (and JSON-dumping MCPs). A *good* compaction is
  "the exact files and line numbers that matter to the problem we're solving"
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Compaction = cleverly avoiding the [[concepts/smart-zone-dumb-zone|dumb zone]]** — Dex's
  framing for why you compact at all: keep the working context small enough to stay in the
  smart zone ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Frequent intentional compaction** — the layer on top of [[concepts/sub-agents|sub-agents]]:
  build the *entire workflow* ([[concepts/research-plan-implement|research → plan → implement]])
  around constantly keeping the context window small; each phase boundary is a compaction
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).

> [!inference] Dex's **intentional compaction** is the manual, human-reviewed counterpart to
> Anthropic's automatic **server-side compaction**. Both compress accumulated context, but
> intentional compaction makes the compressed artifact (a markdown file) reviewable and
> taggable — directly addressing the "compaction ≠ coherence" worry above by putting a human
> in the compaction loop.

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — history tour + harness-adjustment + closing takeaways
- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — clear-context preference; predictability vs. continuity trade-off; Sandcastle clean-sandbox rationale
- [[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases|No Vibes Allowed: Solving Hard Problems in Complex Codebases — Dex Horthy, HumanLayer]] — intentional compaction (compress context to a reviewable markdown file); what-to-compact; frequent intentional compaction as the workflow spine
