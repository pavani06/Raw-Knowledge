---
title: "Agent Evals"
type: concept
aliases: ["agent evals", "agentic evaluation", "evaluation framework", "evals", "eval suite"]
tags: [ai, agents, llm, evals, testing, quality]
source_count: 5
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: ["[[concepts/eval-driven-development]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/deterministic-checks]]", "[[concepts/trajectory-evaluation]]", "[[concepts/failure-taxonomy]]", "[[concepts/continuous-evaluation]]", "[[concepts/long-session-evals]]"]
relates-to: ["[[concepts/llm-as-judge]]", "[[concepts/golden-dataset]]", "[[concepts/verification-loop]]", "[[concepts/reading-traces]]", "[[concepts/tracing-observability]]", "[[concepts/data-flywheel]]", "[[concepts/rag-evaluation]]", "[[concepts/reward-hacking]]", "[[concepts/generator-evaluator-pattern]]", "[[concepts/context-window-management]]"]
contradicts: []
supports: ["[[concepts/agent-harness]]"]
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]", "[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]", "[[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]", "[[sources/2026-06-09-how-we-solved-context-management-in-agents]]"]
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

### From More Context Makes Your Agent Dumber (Nupur Sharma, Qodo)

- **Vanity metrics** — metrics that look great on dashboards but mean nothing in the real
  world. Agent metrics must tie to user satisfaction and business outcomes, not just accuracy
  and precision — which can be deceiving ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Multi-layered evaluation** — unit tests for the agent → integration tests for the full
  workflow → an evaluator agent on top that grades both the result (against metrics) and
  the *process* (did the agent follow instructions? hallucinate? use the right tools?)
  ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Multi-agent evaluation > single evaluator** — a security agent evaluated by another
  agent expert in security yields better results than a generic evaluator; this is the
  [[concepts/generator-evaluator-pattern|adversarial separation]] principle applied to
  evaluation ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Feedback loop** — implement → evaluate → if below threshold, go back and change. The
  same [[concepts/eval-iterate-cycle|eval-iterate cycle]] described in prior sources,
  restated from a practitioner's debugging perspective ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).

> [!inference] Nupur's "vanity metrics" warning sharpens a gap in the existing eval
> framework: the current ontology covers *how* to measure (three-tier stack, trajectory
> grading, LLM-as-judge) but not *what* to measure. The distinction between metrics that
> look good and metrics that matter is a specification problem — it connects back to
> [[concepts/non-functional-requirements|non-functional requirements]] and the human's role
> in defining what "good" means.

### From Context Management in Agents (Sally-Ann Delucia, Arize)

- **[[concepts/long-session-evals|Long-session evals]] expose late failures** — Arize loads ten turns and tests the eleventh to make context degradation measurable before users report it ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Evals stand in for context-quality metrics** — Arize does not yet have a principled context budget or clear context-quality metric, so eval performance is the practical signal for whether context selection is working ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Memory and evaluation co-evolve** — as [[entities/alex|Alex]] adds long-term memory, its eval suite must catch whether longer sessions and cross-session references preserve useful context rather than accumulating noise ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).

> [!inference] This source turns context management into an eval target. Prior eval sources focused on output quality, traces, and release gates; Arize's long-session setup makes *context degradation over conversation length* a first-class behavior to measure.

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss (Arize) full workshop on the three-tier eval framework, impact hierarchy, and eval-iterate cycle
- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — the greater stack taxonomy; trajectory grading; the multi-dimension eval taxonomy
- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — layered eval stack on a concrete RAG system; evals as a release discipline
- [[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou|Why More Context Makes Your Agent Dumber]] — Nupur Sharma on vanity metrics, multi-layered evaluation, evaluator agent, and the feedback loop
- [[sources/2026-06-09-how-we-solved-context-management-in-agents|How we solved Context Management in Agents]] — Sally-Ann Delucia (Arize) on long-session evals and evals as the practical signal for context quality
