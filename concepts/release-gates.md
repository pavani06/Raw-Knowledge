---
title: "Release Gates"
type: concept
aliases: ["release gates", "release gate", "ship gate", "build gate", "eval gate", "release policy"]
tags: [ai, agents, llm, evals, ci-cd, release]
source_count: 2
last_updated: 2026-06-09
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/eval-driven-development]]"]
defines: []
relates-to: ["[[concepts/continuous-evaluation]]", "[[concepts/golden-dataset]]", "[[concepts/eval-governance]]", "[[concepts/deterministic-checks]]", "[[concepts/feedback-loops]]"]
contradicts: []
supports: ["[[concepts/eval-driven-development]]"]
extends: []
sources: ["[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]"]
---

# Release Gates

The shipping decision encoded as a **predefined, probabilistic threshold**: a change is
promoted to production only if it meets agreed quality, safety, cost, and latency bounds
across many eval runs — and is blocked otherwise. Release gates turn
[[concepts/eval-driven-development|EDD]] from advice into enforcement: "did the agent's
performance meet your predefined threshold across 10,000 test runs?" branches the pipeline to
either Release or Analyze.

Gates are where [[concepts/agent-evals|evals]] stop being informational and become
back-pressure. A prompt change does not ship because it *sounds* smoother; a retriever change
does not ship because it returns *more* chunks; a model upgrade does not ship because it
improves a few hand-picked examples. Each must pass the gate.

## Key Insights

- **Threshold before code** — you define the mathematical threshold of acceptable failure
  *before* you write the code; the gate then mechanically enforces it
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Block on safety-critical failures** — the release gate blocks if safety-critical cases
  fail; not every eval is a blocker, but the ship-blockers must be unambiguous
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Meet-or-analyze branch** — if the threshold is met → Release and promote to production; if
  not → Analyze the trace, categorize the failure, improve, and loop back to evals
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Minimum effect size gates** — because agent outputs vary, release decisions should not be
  made on tiny score changes; add variance reporting, confidence intervals, and minimum-effect
  gates so noise isn't mistaken for improvement
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **A change must improve without regressing constraints** — the working definition of EDD is
  that changes ship "only when they improve the system without violating critical constraints"
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Contract tests for skills** — as agents become modular, eval suites act as the
  mathematically enforceable contract for what a skill is permitted to do; the gate enforces
  *how* and *when* a tool may be used, not just whether it can
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).

> [!inference] Release gates are the eval-cluster counterpart to
> [[concepts/feedback-loops]] in the coding-agent cluster: both are the quality-enforcement
> layer that determines what is allowed to pass. A gate is also where
> [[concepts/eval-governance|governance]] hooks in — the same threshold that blocks a bad
> release is the audit evidence a regulator demands.

## Sources

- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — threshold-before-code; meet-or-analyze branch; minimum effect size; contract tests
- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — release gate as a layer; block-on-safety-critical; ship only when improving without violating constraints
