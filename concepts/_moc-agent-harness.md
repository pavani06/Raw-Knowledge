---
title: "MOC: Agent Harness"
type: concept
aliases: ["agent harness cluster", "harness map", "moc agent harness"]
tags: [ai, agents, llm, architecture, moc, harness]
source_count: 4
last_updated: 2026-06-07
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/agent-harness]]", "[[concepts/harness-engineering]]", "[[concepts/context-window-management]]", "[[concepts/verification-loop]]", "[[concepts/generator-evaluator-pattern]]", "[[concepts/sub-agents]]", "[[concepts/reading-traces]]", "[[concepts/long-running-agents]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]", "[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]", "[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]"]
---

# MOC: Agent Harness

A **Map of Content** for the agent-harness cluster — the founding and densest region of
this ontology. The harness is the scaffolding built *around* a model to make it capable of
autonomous, long-horizon work. This page indexes and contextualizes the atomic concept
pages without duplicating them; read each linked page for the full treatment.

> [!inference]
> This cluster has **no single parent concept** — [[concepts/agent-harness]] (the technical
> artifact) and [[concepts/harness-engineering]] (the human discipline built on top of it)
> are peers, not a hierarchy root. That is precisely why it warrants a MOC rather than a
> parent concept page: the cluster is a *web*, not a *tree*.

## The two load-bearing nodes

- [[concepts/agent-harness|Agent Harness]] — the **technical substrate**: sub-agents,
  permission systems, planning artifacts, verification loops, file-based state, and
  context-management machinery the raw model lacks. Co-evolves with the model; components
  get deleted as capability moves into the weights.
- [[concepts/harness-engineering|Harness Engineering]] — the **operational discipline**:
  humans steer, agents execute. The team practices, documentation culture, and feedback
  loops that make the harness self-improving. `extends` agent-harness.

## Context discipline (the master constraint)

Context is the scarce resource the harness exists to manage.

- [[concepts/context-window-management|Context Window Management]] — the umbrella technique.
- [[concepts/compaction|Compaction]] — server-side context condensing for indefinite runs.
- [[concepts/context-rot|Context Rot]] — the long-run coherence-loss failure mode.
- [[concepts/smart-zone-dumb-zone|Smart Zone / Dumb Zone]] — sizing tasks to stay sharp.
- [[concepts/skills-progressive-disclosure|Skills (Progressive Disclosure)]] — lazy-loaded
  capability packaging that saves context.
- [[concepts/programmatic-tool-calling|Programmatic Tool Calling]] — keeping intermediate
  output out of the window.
- [[concepts/file-system-state|File System as Shared State]] — durable memory outside the
  window.
- [[concepts/prompt-injection-patterns|Prompt Injection Patterns]] — surfacing context at
  the right time.

## Adversarial architecture (separate the critic from the creator)

- [[concepts/generator-evaluator-pattern|Generator-Evaluator Pattern]] — GAN-style
  builder/critic split; self-evaluation is "a trap."
- [[concepts/planner-generator-evaluator-architecture|Planner-Generator-Evaluator Architecture]]
  — the full three-role harness with contract negotiation.
- [[concepts/sub-agents|Sub-Agents]] — delegated agents, each with its own context window.
- [[concepts/reviewer-agents|Reviewer Agents]] — persona-based critics injecting PR feedback.

## Verification (use the thing, don't just lint it)

- [[concepts/verification-loop|Verification Loop]] — the agent actually testing its running
  output.
- [[concepts/design-taste-rubric|Design Taste Rubric]] — grading subjective quality with a
  written opinion.

## The human discipline (specification over implementation)

- [[concepts/reading-traces|Reading Traces]] — hand-reading agent traces as the primary
  debugging method.
- [[concepts/non-functional-requirements|Non-Functional Requirements]] — making the quality
  bar legible to agents.
- [[concepts/garbage-collection-day|Garbage Collection Day]] — converting review feedback
  into durable guardrails.
- [[concepts/code-as-free-resource|Code as Free Resource]] — the axiom that reframes the
  engineer's role.

## What the harness enables

- [[concepts/long-running-agents|Long-Running Agents]] — the goal the whole cluster serves:
  agents that run autonomously for hours to days.

## See also

- [[digests/2026-06-07|Digest 2026-06-07]] — the full-day synthesis that first named this
  cluster as the load-bearing region of the ontology.
