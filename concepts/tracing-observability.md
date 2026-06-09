---
title: "Tracing & Observability"
type: concept
aliases: ["tracing", "observability", "agent tracing", "span tracing", "execution traces", "instrumentation"]
tags: [ai, agents, llm, observability, debugging, evals]
source_count: 3
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/reading-traces]]", "[[concepts/agent-evals]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/llm-as-judge]]", "[[concepts/long-running-agents]]", "[[concepts/trajectory-evaluation]]", "[[concepts/failure-taxonomy]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]", "[[concepts/reading-traces]]", "[[concepts/trajectory-evaluation]]"]
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]", "[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]"]
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

### From the EDD articles (Masood / Ramchandani)

- **The trace is the most important operational artifact** — "a final answer tells us what the
  user saw; a trace tells us how the system got there." Without traces, evals are shallow because
  a failing case cannot be diagnosed ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **What a complete trace records** — user input, history, rewritten query, retrieved chunks,
  retrieval scores, final prompt, model name, prompt/retriever versions, answer, citations,
  refusal flag, latency, token usage, cost, eval results, and failure category. You can only
  grade what the trace records ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Trace-native QA is the future** — capturing/analyzing multi-step trajectories becomes the
  standard debugging artifact, like distributed tracing for microservices or a black-box flight
  recorder; you won't ship an agent without an integrated trace viewer
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Tracing is the prerequisite for the [[concepts/failure-taxonomy]]** — the Analyze phase reads
  the trace viewer, not the final text, to categorize where the agent took a wrong turn
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Observability cost is a governance constraint** — storing runs, traces, artifacts, and
  labeled outcomes creates storage/privacy obligations; the EU AI Act's test-log and monitoring
  requirements make trace retention a compliance matter (see [[concepts/eval-governance]])
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss on setting up tracing with Arize Phoenix, span/trace concepts, production monitoring, and session-aware tracing
- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — trace-native QA as the future; traces as prerequisite for failure taxonomy; observability cost as governance constraint
- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — the trace as the most important operational artifact; the full trace record schema
