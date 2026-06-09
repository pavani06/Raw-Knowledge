---
title: "Agent Evals"
type: concept
aliases: ["agent evals", "agentic evaluation", "evaluation framework", "evals", "eval suite"]
tags: [ai, agents, llm, evals, testing, quality]
source_count: 3
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: ["[[concepts/eval-driven-development]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/deterministic-checks]]", "[[concepts/trajectory-evaluation]]", "[[concepts/failure-taxonomy]]", "[[concepts/continuous-evaluation]]"]
relates-to: ["[[concepts/llm-as-judge]]", "[[concepts/golden-dataset]]", "[[concepts/verification-loop]]", "[[concepts/reading-traces]]", "[[concepts/tracing-observability]]", "[[concepts/data-flywheel]]", "[[concepts/rag-evaluation]]", "[[concepts/reward-hacking]]"]
contradicts: []
supports: ["[[concepts/agent-harness]]"]
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]", "[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]"]
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

### From the EDD articles (Masood / Ramchandani)

- **The three tiers, restated as the "greater stack taxonomy"** — both EDD articles independently
  arrive at the same layering: [[concepts/deterministic-checks|deterministic code checks]] →
  rubric/[[concepts/llm-as-judge|judge]] scoring → human calibration. Each layer catches a
  different failure class; over-delegating to the judge makes the system slow and untrustworthy
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Agent evals grade the trajectory, not just the output** — the key difference from chatbot
  evals; see [[concepts/trajectory-evaluation]]. OpenAI and Anthropic both define agent evals as
  prompt → captured run (trace + artifacts) → checks → comparable score
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **A taxonomy of eval dimensions** — scope (skill / workflow / system), artifact (final answer
  vs. [[concepts/trajectory-evaluation|trace]]), grader (deterministic / rubric / calibrated),
  data ([[concepts/golden-dataset|synthetic / production / curated]]), behavior
  (outcome/process/style/efficiency), and benchmark (external sanity check only)
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Evals as a release discipline** — expected behavior encoded as eval data, every run leaves a
  [[concepts/tracing-observability|trace]], failures categorized into engineering causes (see
  [[concepts/failure-taxonomy]]), changes shipped only via [[concepts/release-gates|gates]]
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss (Arize) full workshop on the three-tier eval framework, impact hierarchy, and eval-iterate cycle
- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — the greater stack taxonomy; trajectory grading; the multi-dimension eval taxonomy
- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — layered eval stack on a concrete RAG system; evals as a release discipline
