---
title: "Research-Plan-Implement (RPI)"
type: concept
aliases: ["research plan implement", "RPI", "research-plan-implement", "frequent intentional compaction", "advanced context engineering for coding agents"]
tags: [ai, agents, llm, coding-agents, workflow, context, methodology]
source_count: 1
last_updated: 2026-06-08
parent: []
part-of: ["[[concepts/context-window-management]]", "[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/compaction]]", "[[concepts/smart-zone-dumb-zone]]", "[[concepts/sub-agents]]", "[[concepts/mental-alignment]]", "[[concepts/dont-outsource-thinking]]", "[[concepts/prd-as-destination]]", "[[concepts/vertical-slices]]"]
contradicts: []
supports: ["[[concepts/context-window-management]]"]
extends: []
sources: ["[[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]"]
---

# Research-Plan-Implement (RPI)

A three-phase coding-agent workflow — **research → plan → implement** — built entirely
around [[concepts/context-window-management|context management]]. The goal of each phase is
to keep the agent in the [[concepts/smart-zone-dumb-zone|smart zone]] by compressing the
prior phase's output into a small, reviewable artifact ([[concepts/compaction|intentional
compaction]]) before handing off to the next. Dex Horthy frames it as **"frequent
intentional compaction"**: the entire workflow exists to keep the context window small.

The three phases:

1. **Research** — understand how the system works, find the right files, stay objective.
   The research document is a *snapshot of truth based on the code itself* — the exact files
   and line numbers that matter to the problem (see [[concepts/vertical-slices|vertical
   slices through the codebase]] and on-demand compressed context).
2. **Plan** — outline the exact steps, including file names, line snippets, and actual code
   snippets of what will change; be explicit about how to test after every change. The plan
   is the [[concepts/prd-as-destination|destination artifact]] and the locus of
   [[concepts/mental-alignment]].
3. **Implement** — run the plan, keeping context low. "If you read one of these plans, you
   can see very easily how the dumbest model in the world is probably not going to screw
   this up."

Dex resists the **RPI acronym** and the "spec-driven dev" label (see
[[concepts/semantic-diffusion]]) — the steps themselves are not sacred; the load-bearing
ideas are **compaction, context engineering, and staying in the smart zone**.

## Key Insights

- **Each phase is a compaction boundary** — research compacts the codebase into a research
  doc; plan compacts research + intent into a plan file; implement consumes the plan. You're
  "compacting again" at every handoff
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Error hierarchy in context**: the worst thing is **incorrect** information, then
  **missing** information, then just **too much noise**. Optimize the context window for
  correctness, completeness, size, and trajectory
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **A bad line of research is worse than a bad line of code** — a misunderstanding of how the
  system works (research) sends the model in the wrong direction; a bad part of a plan could
  be a hundred bad lines of code. Human effort should move to the highest-leverage parts of
  the pipeline (research and planning), not implementation
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Match the ceremony to the task** — changing a button color needs no RPI; a small feature
  needs a simple plan; a medium feature across repos needs one research pass then a plan. The
  hardest problems you can solve scale with how much context engineering you're willing to do
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Proven on brownfield + complex problems** — Dex one-shot a fix to BAML's 300K-line Rust
  codebase (merged into the next release), then shipped ~35K lines in a 7-hour session
  (estimated at 1–2 weeks of human work). But it has limits: removing Hadoop deps from Parquet
  Java failed until they went back to the whiteboard
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **The prompts are open source** — HumanLayer's research/plan/implement prompt system went
  viral on HackerNews; thousands grabbed it from GitHub
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Plan length is a trade-off** — as plans get longer, reliability goes up but readability
  goes down; there's a sweet spot per team/codebase. The best plans include actual code
  snippets so the human knows exactly what change will happen
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).

> [!inference] RPI is the HumanLayer-flavored sibling of [[concepts/harness-engineering]]'s
> grill → PRD → Kanban → AFK loop and the Anthropic
> [[concepts/planner-generator-evaluator-architecture]]. All three decompose agentic coding
> into phases whose real purpose is context compaction, not workflow ceremony — the phase
> boundaries exist to keep the model in its [[concepts/smart-zone-dumb-zone|smart zone]].

## Sources

- [[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases|No Vibes Allowed: Solving Hard Problems in Complex Codebases — Dex Horthy, HumanLayer]] — the canonical RPI talk; three-phase workflow, error hierarchy, BAML/Parquet case studies, open-source prompts
