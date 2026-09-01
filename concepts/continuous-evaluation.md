---
title: "Continuous Evaluation"
type: concept
aliases: ["continuous evaluation", "CE", "production monitoring", "online evals", "trace-aware monitoring"]
tags: [ai, agents, llm, evals, monitoring, production]
source_count: 4
last_updated: 2026-08-31
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/tracing-observability]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/data-flywheel]]", "[[concepts/release-gates]]", "[[concepts/failure-taxonomy]]", "[[concepts/evaluation-pipeline]]", "[[concepts/production-incident-playbook]]", "[[concepts/eval-coverage-matrix]]", "[[concepts/perceived-eval]]", "[[concepts/production-to-offline-feedback-loop]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: ["[[concepts/eval-iterate-cycle]]"]
sources: ["[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]", "[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]", "[[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]"]
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

### From the Databricks Production Playbook (Bhaumik)

- **CSAT drop detection → trace diagnosis → fix** — in the retail banking case study, a CSAT
  drop was detected via continuous monitoring. Tracing revealed the agent was referencing an
  outdated policy document. The fix was updating the vector database with new policy embeddings.
  This entire cycle was only possible because of the measurement system already in place
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **The automated eval pipeline as CE infrastructure** — capture → compare → rate → fix →
  add-to-dataset runs continuously against live production traces. See
  [[concepts/evaluation-pipeline]] ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

### From Inside Clay's Eval Stack (LangChain channel)

- **Online objective metrics as the deterministic/online quadrant** — latency, cost, whether
  users move out of the chat into other parts of the product, get stuck, or rage quit: the
  A/B-testable set, on the online half of Clay's
  [[concepts/eval-coverage-matrix|eval coverage matrix]]
  ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **Online subjective evaluators** — NPS-style user satisfaction plus
  [[concepts/perceived-eval|perceived evals]] (users correcting the agent, pushing back,
  trying to redirect it), built into [[entities/langsmith|LangSmith]] — "where we use
  LangChain the most" ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **Bulk analysis plus sampled human review** — at 300M runs/month
  ([[entities/claggent|Claggent]]) the online posture is automated bulk trace analysis with
  human eval of sampled traces, plus human "vibe-based" review
  ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **Online signals are drift fuel** — examples pulled from online evaluators (and support
  tickets) feed back into the offline suite; see
  [[concepts/production-to-offline-feedback-loop]]
  ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).

## Sources

- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — Plan→Design→Build→Evaluate→Analyze→Release→Operate loop; CE on every change; the closed-loop failure-harvest story
- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — production monitoring as a distinct eval layer; drift detection; offline-only evals going stale
- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on CSAT drop detection via continuous monitoring, trace-based diagnosis, and the automated eval pipeline running on live traces
- [[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel|Inside Clay's Eval Stack: 300M Agent Runs, One LangSmith Pipeline]] — online objective metrics (latency, cost, rage quitting), NPS + perceived evals, bulk trace analysis at 300M runs/month
