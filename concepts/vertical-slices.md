---
title: "Vertical Slices"
type: concept
aliases: ["vertical slices", "traceable bullets", "vertical slice", "thin slices", "end-to-end slices"]
tags: [ai, agents, llm, coding, workflow, architecture, testing]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/kanban-for-agents]]", "[[concepts/prd-as-destination]]", "[[concepts/feedback-loops]]", "[[concepts/deep-modules]]", "[[concepts/human-in-loop-vs-afk]]", "[[concepts/verification-loop]]"]
contradicts: []
supports: ["[[concepts/feedback-loops]]", "[[concepts/kanban-for-agents]]"]
extends: []
sources: ["[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
---

# Vertical Slices

Thin end-to-end features that cross all system layers (database → API → frontend) in a
single implementation unit — as opposed to horizontal slices that implement one full layer
at a time. Also called **traceable bullets** (from the Pragmatic Programmer): like
phosphorescent tracer rounds that let you see where you're aiming in the dark, vertical
slices give you immediate feedback on whether all layers work together.

AI naturally codes **horizontally** (all DB in phase 1, all API in phase 2, all UI in
phase 3). This is wrong: you get no integrated feedback until phase 3, and the AI is coding
blind until then. Vertical slices force the AI to produce something testable at the end of
every phase.

## Key Insights

- **AI defaults to horizontal** — left to its own devices, AI will implement layer by layer;
  you must explicitly instruct it to think in vertical slices
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Feedback at every phase** — a vertical slice produces a working (if minimal) end-to-end
  feature at the end of phase 1; the AI can immediately test the full flow and get feedback
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **The first slice must be truly vertical** — "gamification service only" is a horizontal
  slice (just one layer); "award points for lesson completion visible on dashboard" is a
  vertical slice (schema + service + UI in one issue)
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Enables parallelization** — vertical slices with explicit blocking relationships form a
  directed acyclic graph; independent slices can be worked on by parallel agents
  simultaneously. See [[concepts/kanban-for-agents]]
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Traceable bullet origin** — from anti-aircraft gunnery: tracer rounds (every 6th bullet
  glows) give feedback on aim in the dark; the metaphor is about increasing feedback
  frequency, not just decomposition
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Classic software engineering principle** — Pragmatic Programmer (1999) and Martin Fowler's
  refactoring work both advocate this; the principle predates AI but applies perfectly to
  agentic coding ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

> [!inference] Vertical slices are the planning-phase equivalent of the [[concepts/verification-loop]]:
> both are about getting feedback as early and as often as possible. The verification loop
> closes the feedback loop at implementation time; vertical slices close it at planning time
> by ensuring each issue produces something testable.

## Sources

- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — traceable bullets concept; AI's horizontal coding tendency; first-slice critique; parallelization via DAG
