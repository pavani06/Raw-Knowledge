---
title: "Continuous Evaluation"
type: concept
aliases: ["continuous evaluation", "CE", "production monitoring", "online evals", "trace-aware monitoring"]
tags: [ai, agents, llm, evals, monitoring, production]
source_count: 2
last_updated: 2026-06-09
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/tracing-observability]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/data-flywheel]]", "[[concepts/release-gates]]", "[[concepts/failure-taxonomy]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: ["[[concepts/eval-iterate-cycle]]"]
sources: ["[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]"]
---

# Continuous Evaluation

Running evals **on every change** and **on live production traffic**, rather than as a
one-time pre-release gate. Continuous evaluation (CE) treats deployment as the *start* of the
evaluation lifecycle, not the end: production traces are sampled, graded, and fed back into
the [[concepts/golden-dataset|golden dataset]] as new test cases. It is the operational
backbone that turns [[concepts/eval-driven-development|eval-driven development]] from an
offline habit into production infrastructure.

CE exists because **agent behavior is probabilistic and path-dependent** — traditional
freeze-the-code-and-test-once validation is obsolete when the same input can produce a
different trajectory next run.

## Key Insights

- **Deployment is the beginning, not the end** — the agentic lifecycle adds an Operate phase:
  continuous online monitoring, live incident review, and harvesting new failure logs that
  become tomorrow's regression tests
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Run evals on every change** — OpenAI's best practices describe CE as running evals on
  every change and growing the eval set over time; pin production to model snapshots and add
  evals that monitor prompt behavior across upgrades
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **The closed-loop story** — a customer-service bot solves your hard problem flawlessly today
  *because* it failed that exact task for someone else weeks ago; that failure trace was
  captured, labeled, and fed back into the offline eval dataset
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Production monitoring is its own eval layer** — low-confidence retrieval, repeated
  follow-ups, and escalations are monitored signals that catch drift and real-world failures
  the offline suite never anticipated
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Offline-only evals go stale** — if production failures are not converted back into eval
  cases, the benchmark rots; CE is the mechanism that keeps the
  [[concepts/data-flywheel|data flywheel]] turning
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).

> [!inference] Continuous evaluation is the production-scale realization of the
> [[concepts/eval-iterate-cycle]]: the same instrument → trace → eval → annotate → improve
> loop, but running perpetually against live traffic instead of a fixed offline set. It is
> also what makes [[concepts/closed-loop-evaluation]] conceivable — you cannot close the loop
> on a system you only measure once.

## Sources

- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — Plan→Design→Build→Evaluate→Analyze→Release→Operate loop; CE on every change; the closed-loop failure-harvest story
- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — production monitoring as a distinct eval layer; drift detection; offline-only evals going stale
