---
title: "Reading Traces"
type: concept
aliases: ["reading traces", "trace reading", "model empathy", "trace debugging"]
tags: [ai, agents, llm, debugging, observability]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/generator-evaluator-pattern]]", "[[concepts/skills-progressive-disclosure]]", "[[concepts/long-running-agents]]"]
contradicts: []
supports: ["[[concepts/agent-harness]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Reading Traces

The primary debugging discipline for building [[concepts/agent-harness|agent harnesses]]:
reading what the agent actually did, line by line, to find where its judgment diverged from
a human's — then tuning the prompt for that case. Described as the same muscle as reading a
stack trace, and inseparable from *empathizing* with the model's situation.

## Key Insights

- The primary debugging loop is reading traces by hand, **not** running more experiments
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Tooling tip: pipe agent transcripts to files and have *another* agent grep/play through
  them and update prompts — closing the loop on harness-building itself
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Anthropic reads traces by hand a lot in general; automated first-pass triage exists but
  hand-reading remains the best approach
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- **Model empathy**: for Claude for Chrome, the team simulated browsing "with eyes closed,"
  opening a static page every 10 seconds — to feel the model's experience and instruct it
  better ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Observability for ultra-long-running agents is **not yet solved** — an interesting
  greenfield area ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — Ash's "reading the traces" section + Q&A on traceability/observability
