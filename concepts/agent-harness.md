---
title: "Agent Harness"
type: concept
aliases: ["agent harness", "harness", "scaffolding", "agent scaffold"]
tags: [ai, agents, llm, architecture]
source_count: 2
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/long-running-agents]]"]
defines: []
relates-to: ["[[concepts/generator-evaluator-pattern]]", "[[concepts/sub-agents]]", "[[concepts/file-system-state]]", "[[concepts/reading-traces]]", "[[concepts/harness-engineering]]", "[[concepts/prompt-injection-patterns]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]"]
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

### From Harness Engineering (Ryan Lopopolo, OpenAI)

- **A good harness is operationalized around giving the model text at the right time** — surface instructions so the model can look at the work it has done and the information around what a good job looks like ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Every human interaction with the agent is a harness failure** — if you must type "continue," the harness didn't provide enough context to reach autonomous completion ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Harness engineering is a named discipline** built on top of the harness concept — see [[concepts/harness-engineering]] for the full operational methodology ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Post-training in harness context** — labs like [[entities/openai|OpenAI]] post-train models *in the context of the harness* (apply-patch tool, bash tool semantics), creating leverage for teams that depend on first-party harnesses directly ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Harness as fuzzy compiler** — the harness constraints (lint rules, tests, docs, guardrails) are optimization passes that determine which code is acceptable; swapping models is like changing a code-generation backend ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — the harness as the central organizing idea of the talk
- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — Ryan Lopopolo's operational methodology; "giving the model text at the right time"; post-training in harness context
