---
title: "Agent Harness"
type: concept
aliases: ["agent harness", "harness", "scaffolding", "agent scaffold"]
tags: [ai, agents, llm, architecture]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/long-running-agents]]"]
defines: []
relates-to: ["[[concepts/generator-evaluator-pattern]]", "[[concepts/sub-agents]]", "[[concepts/file-system-state]]", "[[concepts/reading-traces]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Agent Harness

The scaffolding built *around* a model to make it capable of autonomous, long-horizon work
— the [[concepts/sub-agents]], permission systems, planning artifacts, verification loops,
[[concepts/file-system-state]], and context-management machinery that the raw model lacks.
Distinct from the model's own weight-baked capability.

The harness exists to **fill the gaps** in the current model's behavior. As the model
improves, the harness is adapted: gaps that get trained into the weights let you delete the
corresponding harness component.

## Key Insights

- Harness and model **co-evolve**: nearly every model release ships alongside harness
  changes ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- The debugging loop for building a harness is **[[concepts/reading-traces]]** by hand —
  finding where the agent's judgment diverged from a human's, then tuning the prompt —
  *not* running more experiments
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Harness design is model-specific: what was critical for Opus 4.5 (e.g. sprint
  decomposition, fresh context windows) became unnecessary for Opus 4.6, which holds long
  coherent sessions ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- The lesson "our harness was wrong" is usually wrong — it was *right for the previous
  model*; the frontier moved
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

> [!inference]
> The core implication is that harness design is a moving target, not a fixed
> architecture — practitioners should expect to strip components out as model generations
> advance, and build harnesses that are easy to simplify.

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — the harness as the central organizing idea of the talk
