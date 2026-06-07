---
title: "Design Taste Rubric"
type: concept
aliases: ["design taste rubric", "grading taste", "taste rubric", "design taste"]
tags: [ai, agents, llm, design, evaluation, frontend]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/generator-evaluator-pattern]]"]
defines: []
relates-to: ["[[concepts/verification-loop]]", "[[concepts/skills-progressive-disclosure]]"]
contradicts: []
supports: ["[[concepts/generator-evaluator-pattern]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Design Taste Rubric

A written, explicit rubric that lets an evaluator grade *subjective* quality — design taste,
not just "does it work." Used to imbue Claude with design taste in post-training and to power
front-end design skills. The thesis: **you can grade taste if you hold a strong enough
opinion and write it down.**

## Key Insights

- Four criteria — **design, originality, craft, functionality** — weighted toward design and
  originality, with weightings shifted per model (Opus 4.6 is already good at functionality)
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- The goal is to prevent "AI slop" aesthetics — purple gradients and generic look
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Calibrated with **few-shot reference sites** so the evaluator's taste converges on the
  team's own ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Closing takeaway: don't assume subjective quality isn't gradable — force yourself to write
  down what good looks like
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — Ash's section on grading taste + front-end design skills
