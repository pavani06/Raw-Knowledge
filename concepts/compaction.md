---
title: "Compaction"
type: concept
aliases: ["compaction", "server-side compaction", "context compaction"]
tags: [ai, llm, context, technique]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/context-window-management]]"]
defines: []
relates-to: ["[[concepts/context-rot]]", "[[concepts/ralph-loop]]", "[[concepts/long-running-agents]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
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

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — history tour + harness-adjustment + closing takeaways
