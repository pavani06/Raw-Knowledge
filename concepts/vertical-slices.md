---
title: "Vertical Slices"
type: concept
aliases: ["vertical slices", "traceable bullets", "vertical slice", "thin slices", "end-to-end slices"]
tags: [ai, agents, llm, coding, workflow, architecture, testing]
source_count: 2
last_updated: 2026-06-08
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/kanban-for-agents]]", "[[concepts/prd-as-destination]]", "[[concepts/feedback-loops]]", "[[concepts/deep-modules]]", "[[concepts/human-in-loop-vs-afk]]", "[[concepts/verification-loop]]", "[[concepts/research-plan-implement]]"]
contradicts: []
supports: ["[[concepts/feedback-loops]]", "[[concepts/kanban-for-agents]]"]
extends: []
sources: ["[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]", "[[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]"]
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

### From No Vibes Allowed (Dex Horthy, HumanLayer)

- **Vertical slices as a research primitive** — beyond implementation decomposition, a good
  [[concepts/research-plan-implement|research]] prompt launches [[concepts/sub-agents|sub-agents]]
  to "take these vertical slices through the codebase" and build a research document that is a
  snapshot of the actually-true parts of the codebase that matter. Here the slice cuts through
  the code to *understand* it, not just to *build* it
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Slicing is how you compress truth** — each vertical slice is a narrow, end-to-end path
  through the system that a sub-agent can read fully and summarize; stitching several slices
  together yields on-demand compressed context without loading the whole repo
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).

> [!inference] The same vertical-slice idea operates at both ends of
> [[concepts/research-plan-implement|RPI]]: in **research** a slice is an exploration path a
> sub-agent traces to compress truth; in **implementation** a slice is a thin end-to-end
> feature that produces testable feedback. One geometry, two phases — both about cutting
> through all layers rather than across one.

## Sources

- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — traceable bullets concept; AI's horizontal coding tendency; first-slice critique; parallelization via DAG
- [[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases|No Vibes Allowed: Solving Hard Problems in Complex Codebases — Dex Horthy, HumanLayer]] — vertical slices as a research primitive; slicing the codebase to compress truth
