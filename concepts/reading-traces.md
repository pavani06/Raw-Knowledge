---
title: "Reading Traces"
type: concept
aliases: ["reading traces", "trace reading", "model empathy", "trace debugging"]
tags: [ai, agents, llm, debugging, observability]
source_count: 2
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/generator-evaluator-pattern]]", "[[concepts/skills-progressive-disclosure]]", "[[concepts/long-running-agents]]", "[[concepts/tracing-observability]]", "[[concepts/agent-evals]]"]
contradicts: []
supports: ["[[concepts/agent-harness]]", "[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]"]
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

### From Evals Workshop (Laurie Voss, Arize)

- **Read traces before writing evals** — 15 minutes of reading real agent outputs beats hours
  of blind prompt-fiddling; categorize what went wrong first, then decide what to measure
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Traces as the prerequisite for evals** — [[concepts/tracing-observability]] captures the
  raw execution data (spans, token counts, latency, cost) that makes trace-reading scalable;
  hand-reading is the human skill, instrumentation is the infrastructure
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Failures should seem fair** — if you look at a failing trace and think "that answer looks
  fine to me," the problem is probably the eval, not the agent; trace-reading is the
  meta-evaluation check on the eval itself
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Filter by cost and latency, not just quality** — traces expose expensive paths (100 web
  searches to get one answer) that pass quality evals but are unshippable in production
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — Ash's "reading the traces" section + Q&A on traceability/observability
- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss on reading traces as the first step before writing any eval; traces as meta-evaluation check
