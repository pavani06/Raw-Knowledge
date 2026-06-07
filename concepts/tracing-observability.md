---
title: "Tracing & Observability"
type: concept
aliases: ["tracing", "observability", "agent tracing", "span tracing", "execution traces", "instrumentation"]
tags: [ai, agents, llm, observability, debugging, evals]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/reading-traces]]", "[[concepts/agent-evals]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/llm-as-judge]]", "[[concepts/long-running-agents]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]", "[[concepts/reading-traces]]"]
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]"]
---

# Tracing & Observability

The instrumentation layer that captures raw execution data from agent runs — spans, traces,
token counts, latency, cost — as the prerequisite for any [[concepts/agent-evals|eval]].
You cannot evaluate what you cannot observe. Tracing is how you capture the raw data needed
to run evals in the first place.

A **span** is a single unit of work (one LLM call, one tool invocation); a **trace** is the
full tree of spans for one agent run. Observability platforms like [[entities/arize-phoenix]]
collect these and make them queryable, filterable, and annotatable.

## Key Insights

- **Tracing is the prerequisite** — before writing any eval, you need traces; before reading
  traces, you need instrumentation; the eval pipeline starts with observability
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Read traces before writing evals** — 15 minutes of reading real traces and categorizing
  what went wrong is more valuable than hours of blind prompt-fiddling; traces reveal the
  actual failure modes ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Filter by more than labels** — traces expose latency, token count, and cost alongside
  quality labels; an agent getting the right answer via 100 web searches is a production
  problem even if it passes quality evals
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Production monitoring** — send a percentage of live traffic to an eval suite for
  continuous evaluation; catches model quality drops, adversarial attacks, and agent drift
  as the product evolves ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Session-aware tracing** — enterprise observability tracks not just individual agent turns
  but a user's entire session from login to logout; essential for understanding multi-turn
  agent behavior ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Suppress tracing during evals** — when running evals, suppress tracing to avoid
  polluting production trace data with eval runs
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

> [!inference] Tracing & Observability is the [[concepts/reading-traces]] discipline made
> scalable: hand-reading traces is the human skill; instrumentation + observability platforms
> are the infrastructure that makes that skill applicable at production scale.

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss on setting up tracing with Arize Phoenix, span/trace concepts, production monitoring, and session-aware tracing
