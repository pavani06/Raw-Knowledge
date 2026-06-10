---
title: "Agent Harness"
type: concept
aliases: ["agent harness", "harness", "scaffolding", "agent scaffold"]
tags: [ai, agents, llm, architecture]
source_count: 3
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/long-running-agents]]"]
defines: []
relates-to: ["[[concepts/generator-evaluator-pattern]]", "[[concepts/sub-agents]]", "[[concepts/file-system-state]]", "[[concepts/reading-traces]]", "[[concepts/harness-engineering]]", "[[concepts/prompt-injection-patterns]]", "[[concepts/context-window-management]]", "[[concepts/agent-memory]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]", "[[sources/2026-06-09-how-we-solved-context-management-in-agents]]"]
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

### From Context Management in Agents (Sally-Ann Delucia, Arize)

- **[[entities/alex|Alex]] as production AI harness** — Arize describes Alex as an AI harness for building AI applications, with planning, 40-plus skills, prompt optimization, data generation, augmentation, annotations, and trace/data workflows ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **The harness is where context policy lives** — Alex's product behavior depends on harness choices: truncation policy, memory retrieval, sub-agent routing, and long-session eval coverage ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Agent-on-agent data is a stress test** — because Alex analyzes AI traces, prompts, metadata, tool calls, and conversation history, the harness must reason over the same kind of data that causes its own context growth ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).

> [!inference] Alex is a concrete product example of the harness as context governor: the harness is not just wrappers around model calls, but the policy layer that decides which data stays active, which data becomes memory, and which data moves into sub-agents.

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — the harness as the central organizing idea of the talk
- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — Ryan Lopopolo's operational methodology; "giving the model text at the right time"; post-training in harness context
- [[sources/2026-06-09-how-we-solved-context-management-in-agents|How we solved Context Management in Agents]] — Sally-Ann Delucia (Arize) on Alex as an AI harness whose context policy is the product constraint
