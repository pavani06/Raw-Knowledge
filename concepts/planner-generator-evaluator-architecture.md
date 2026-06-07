---
title: "Planner-Generator-Evaluator Architecture"
type: concept
aliases: ["planner-generator-evaluator", "PM-IC-QA structure", "three-role agent architecture"]
tags: [ai, agents, llm, architecture]
source_count: 1
last_updated: 2026-06-07
parent: ["[[concepts/generator-evaluator-pattern]]"]
part-of: ["[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/verification-loop]]", "[[concepts/file-system-state]]", "[[concepts/sub-agents]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]"]
extends: ["[[concepts/generator-evaluator-pattern]]"]
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Planner-Generator-Evaluator Architecture

The full three-role harness that turns a one-line prompt into a working app: a **planner**
sets high-level creative direction (sprints), a **generator** builds, and an **evaluator**
grades. Effectively a PM / IC / QA org structure where each role gets its own context
window. Builds on the [[concepts/generator-evaluator-pattern]] by adding the planner.

The defining design choice: the planner deliberately stays **high-level** and does NOT
plan granular technical details — because an early planning error would cascade and magnify
across every sprint over a multi-hour horizon.

## Key Insights

- **Contract negotiation is the key innovation over [[concepts/ralph-loop]]**: before
  writing any code, generator and evaluator negotiate what "done" means via markdown files
  on disk, iterating until both agree. The evaluator then grades against *that contract*,
  not the planner's original spec
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- This bridges vague user stories (the spec) into testable assertions without forcing the
  planner to over-specify up front
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- The planner is intentionally kept *out* of the build loop — its job is the hard outer
  lines of the product, not intervening mid-build. The main spec is re-injected into
  sessions as a reference point
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Granularity matters: one app's contract had **27 criteria**. Vague criteria → vague
  critiques → the generator shrugs; granular criteria → actionable, line-level fixes
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Real run economics: "build a retro game maker" → ~$200, ~6 hours, producing a far more
  complete app (named "Retro Forge") than the solo loop, which looked done but failed when
  actually played ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Model selection informs the architecture: Opus 4.6 for planning, Sonnet 4.6 as the
  execution workhorse ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — the full harness Ash demoed (Retro Forge, DAW examples)
