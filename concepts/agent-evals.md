---
title: "Agent Evals"
type: concept
aliases: ["agent evals", "agentic evaluation", "evaluation framework", "evals", "eval suite"]
tags: [ai, agents, llm, evals, testing, quality]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: ["[[concepts/eval-driven-development]]", "[[concepts/eval-iterate-cycle]]"]
relates-to: ["[[concepts/llm-as-judge]]", "[[concepts/golden-dataset]]", "[[concepts/verification-loop]]", "[[concepts/reading-traces]]", "[[concepts/tracing-observability]]", "[[concepts/data-flywheel]]"]
contradicts: []
supports: ["[[concepts/agent-harness]]"]
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]"]
---

# Agent Evals

The systematic evaluation framework for agentic applications — the discipline of measuring
whether an agent is actually doing a good job, at scale, without relying on human vibe-checking.
Evals are the bridge between "it seems to work" and "we can ship this."

Agents make evaluation harder than a simple LLM call because they involve multi-step reasoning,
tool use, and non-deterministic paths. A single wrong tool call early in a chain can cascade
into a completely wrong final answer — and the final answer may still look plausible.

The three tiers of evals, in order of cost and power:

1. **Code evals** — deterministic, cheap, fast. Check format, presence of expected strings,
   structural properties. Write these first.
2. **Built-in LLM evals** — pre-built rubrics from the eval platform (e.g. [[entities/arize-phoenix]]).
3. **Custom LLM-as-judge** — a separate LLM grades semantic quality against a written rubric.
   See [[concepts/llm-as-judge]].

## Key Insights

- **Read traces before writing evals** — 15 minutes of reading real outputs beats hours of
  blind prompt-fiddling; categorize what went wrong first, then decide what to measure
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Impact hierarchy**: data quality > prompting > model selection > hyperparameter tuning.
  Fix the data first; no amount of prompt engineering compensates for stale or wrong data
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Guardrails vs. North Star metrics** — some evals are ship-blockers (hallucinated stock
  price = hard fail); others are informative nice-to-haves. Know which is which before
  shipping ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Capability evals vs. regression evals** — capability evals measure a hill to climb
  (agent is currently failing); regression evals lock in what's already working. Create
  capability evals first; graduate them to regression evals as you pass them
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Sample size math**: 200 samples at 3% defect rate → 95% CI of 0.6–5.4%; 400 samples
  → 1.3–4.7%. Doubling samples halves the confidence interval but doubles cost
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Evals are infrastructure** — treat them like code: version prompts, store them, know
  what they did five versions ago. An unvalidated eval is "a fancy way of being wrong at
  scale" ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Non-technical stakeholders write better evals** — product managers and customer success
  reps know what "good" means for the domain; involve them in writing rubrics
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Model adoption advantage** — a comprehensive regression suite tells you within minutes
  whether a new model drop makes your agent better or worse
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

> [!inference] Evals are the [[concepts/harness-engineering]] discipline applied to quality
> measurement: the same "humans steer, agents execute" logic applies — humans define what
> good looks like (rubrics, golden datasets), agents execute the measurement at scale.

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss (Arize) full workshop on the three-tier eval framework, impact hierarchy, and eval-iterate cycle
