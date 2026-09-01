---
title: "Eval Coverage Matrix"
type: concept
aliases: ["eval coverage matrix", "eval coverage grid", "coverage matrix", "eval matrix"]
tags: [ai, agents, llm, evals, testing, quality]
source_count: 1
last_updated: 2026-08-31
parent: ["[[concepts/agent-evals]]"]
part-of: []
defines: ["[[concepts/perceived-eval]]"]
relates-to: ["[[concepts/deterministic-checks]]", "[[concepts/llm-as-judge]]", "[[concepts/golden-dataset]]", "[[concepts/trajectory-evaluation]]", "[[concepts/simulations]]", "[[concepts/production-to-offline-feedback-loop]]", "[[concepts/continuous-evaluation]]", "[[entities/langsmith]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]"]
---

# Eval Coverage Matrix

A two-axis grid for reasoning about eval coverage: **deterministic ↔ non-deterministic**
(the grader type) crossed with **offline ↔ online** (where the eval runs). The goal is not
one perfect eval but "a few things in each of these boxes" — coverage across quadrants beats
depth in one. Introduced by [[entities/clay|Clay]]'s eval team on
[[entities/langsmith|LangSmith]] ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).

The matrix adds the *where* axis to the vault's grader-stack taxonomy: the three tiers of
[[concepts/agent-evals]] (deterministic checks → judge → behavioral) describe how you grade;
the matrix crosses that with offline (development/CI) vs online (production traffic), which
makes [[concepts/continuous-evaluation]] a cell of the grid rather than a separate discipline.

## The quadrants

- **Deterministic + offline** — [[concepts/golden-dataset|goldens]] (exact-match test cases);
  structured eval checks over only the parts of the output that matter; trajectory/tool
  assertions ("if the agent answers pricing questions, it must actually go and read the
  pricing scale" — see [[concepts/trajectory-evaluation]]).
- **Non-deterministic + offline** — [[concepts/llm-as-judge|LLM-as-judge]] grading of
  semantic quality.
- **Simulated-user multi-turn** — an agent plays the user, seeded with examples from past
  traces, driving the conversation to a conclusion; the deterministic variant hard-codes the
  user turns instead.
- **Deterministic + online** — the objective A/B metrics: latency, cost, whether users move
  out of the chat into other parts of the product, get stuck, or rage quit.
- **Non-deterministic + online** — satisfaction scores (NPS-style), [[concepts/perceived-eval|perceived
  evals]] (users correcting/pushing back on the agent), and bulk LLM analysis of production
  traces.

## Key Insights

- **Goldens are quadrant-bound** — goldens "work great for really simple things" like a query
  language, but are too static for complicated behavior: reordering keywords or nodes breaks
  them, and noisy evals end up getting ignored. The fix is structured checks that only look
  at the parts of the query you actually care about — more forgiving, still deterministic
  ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **Deterministic multi-turn evals beat simulated users** — Clay found the agent-as-user
  variant "too noisy": it was just another agent to manage, keep up to date, and write evals
  for. Hard-coded user turns were the most useful multi-turn form in practice
  ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **The online/non-deterministic quadrant is where LangSmith gets used most** — online
  evaluators (NPS, perceived eval), bulk trace analysis over production data, and human eval
  of sampled traces all live there ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **The hardest part is the dotted arrow** — everything learned in production should feed
  back into the offline quadrants; that loop is unsolved in general (see
  [[concepts/production-to-offline-feedback-loop]])
  ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).

> [!contradiction] Contradicts [[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]
> Sierra built its [[concepts/simulations|simulations]] product on simulated users (20+
> personas, multi-language, adversarial) as a pre-ship regression gate; Clay tried
> agent-as-user multi-turn evals and abandoned them as too noisy, keeping deterministic
> user turns. Customer-facing conversation agents vs developer-facing workflow agents may
> reconcile the difference, but the simulated-user doctrine genuinely differs. Unresolved
> as of 2026-08-31.

> [!inference] The matrix is the eval-time analog of a test pyramid with a production leg:
> deterministic/offline ≈ unit tests, judge ≈ integration tests, online metrics ≈ production
> telemetry. Quadrant coverage, not quadrant purity, is the design goal.

## Sources

- [[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel|Inside Clay's Eval Stack: 300M Agent Runs, One LangSmith Pipeline]] — the coverage matrix; goldens' staticness limit; deterministic multi-turn over simulated users; online evaluators
