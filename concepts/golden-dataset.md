---
title: "Golden Dataset"
type: concept
aliases: ["golden dataset", "golden data set", "ground truth dataset", "eval dataset", "reference dataset"]
tags: [ai, agents, llm, evals, testing, data]
source_count: 5
last_updated: 2026-08-31
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/llm-as-judge]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/data-flywheel]]", "[[concepts/garbage-collection-day]]", "[[concepts/failure-taxonomy]]", "[[concepts/continuous-evaluation]]", "[[concepts/test-case-library]]", "[[concepts/evaluation-pipeline]]", "[[concepts/eval-coverage-matrix]]", "[[concepts/production-to-offline-feedback-loop]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]", "[[concepts/llm-as-judge]]"]
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]", "[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]", "[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]", "[[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]"]
---

# Golden Dataset

A curated set of human-labeled examples that encodes the judgment of domain experts — the
benchmark against which both the agent and the [[concepts/llm-as-judge]] are measured. The
golden dataset is not just test data; it is the **encoded judgment of the people who know
your domain best**.

Golden datasets grow over time: today's production failures become tomorrow's test cases.
This compounding property makes them a core component of the [[concepts/data-flywheel]].

## Key Insights

- **Give yourself concrete criteria** — when building the golden dataset, humans should
  apply the same rubric as the LLM judge; arbitrary "yes/no" human labels have the same
  non-determinism problem as an unconstrained LLM
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Split 75/25** — use 75% for training/iteration and hold out 25% as a blind test set;
  run against the held-out set when you think you've reached a stopping point or are about
  to ship, to catch overfitting
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Production failures → test cases** — the most valuable additions to a golden dataset
  come from real failures in production; this is the same logic as [[concepts/garbage-collection-day]]
  (converting human review findings into automated guardrails)
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Keep tasks unambiguous** — if an agent scores 0% consistently, the task is almost
  certainly broken (too hard for the agent, or impossible to evaluate). Create a reference
  solution for each task in advance
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Test in both directions** — include cases where the behavior should occur AND cases
  where it shouldn't; otherwise you risk training an agent that always triggers the behavior
  to game the eval
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Size targets**: 12–20 examples for directional signal in workshop/prototype settings;
  200–400 examples for shipping decisions
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Inter-rater reliability is low** — two human experts given the same rubric will disagree
  20–30% of the time; if your LLM judge achieves 40% agreement with you, it's doing well.
  The benchmark is human performance, not perfection
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

> [!inference] The golden dataset is the [[concepts/harness-engineering]] equivalent of
> non-functional requirements: it makes the implicit quality bar explicit and machine-readable,
> so agents can be measured against it at scale.

### From the Databricks Production Playbook (Bhaumik)

- **The golden dataset as a living system** — "once you start, as you start building in
  production, this is a living system. This will keep growing. And the bigger it grows,
  the better your system will be." The dataset is never complete; it compounds with every
  production incident ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Start with 200 real cases** — in the retail banking case study, the golden dataset
  was seeded with 200 real cases collected from human agents answering customer queries
  on simple questions. This captured real ground truth from domain experts, not synthetic
  examples ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Categorization by problem type** — the growing dataset must be organized into categories
  (security, login, policy, etc.) so that targeted subsets can be tested efficiently. See
  [[concepts/test-case-library]] for the governance layer
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

### From the EDD articles (Masood / Ramchandani)

- **Data taxonomy: where test cases come from** — synthetic, domain-specific, purchased,
  human-curated, production, and historical; OpenAI explicitly recommends logging and mining
  logs for eval cases ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Start small but targeted** — 10–20 prompts can surface regressions for a single skill;
  grow the set over time. Small sets deliver value if they are sharp
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Product-specific golden cases** — for the Nimbus RAG assistant, the golden dataset encodes
  SSO boundaries, refunds, API limits, and retention as expected behaviors, each tied to an
  expected source document and specific facts that must appear
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Failure backfill grows the dataset** — production failures are labeled, categorized via the
  [[concepts/failure-taxonomy]], and fed back as new cases; this is the engine of
  [[concepts/continuous-evaluation]] and the [[concepts/data-flywheel]]
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Avoid benchmark substitution** — don't let a public benchmark stand in for your production
  distribution; biased datasets that don't reproduce production patterns are an anti-pattern and
  invite [[concepts/reward-hacking|overfitting]]
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).

### From Inside Clay's Eval Stack (LangChain channel)

- **Goldens are great for simple targets, too static for complex ones** — for something
  like Clay's query language, goldens "work great for really simple things"; for complicated
  behavior, reordering keywords or node ordering breaks them — and noisy evals "just end up
  getting ignored." Clay moved to structured eval checks that only look at the parts of the
  query they actually care about (see [[concepts/eval-coverage-matrix]])
  ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **Human-annotated goldens as drift detectors** — beyond grading the agent, Clay keeps
  human-annotated goldens specifically for judging drift: checking whether the
  [[concepts/llm-as-judge|LLM judge]] has drifted as models and prompts hill-climb (see
  [[concepts/production-to-offline-feedback-loop]])
  ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).

> [!inference] Clay adds a failure mode this page lacked: a golden that fails noisily is
> worse than no golden, because developers learn to ignore it. The mitigation (structured
> partial checks) keeps the determinism while forgiving irrelevant variation — the
> golden-dataset equivalent of grading the parts of the answer that matter.

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss on building, splitting, and growing golden datasets; inter-rater reliability; production-failure-to-test-case pipeline
- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — data taxonomy (where cases come from); start-small sizing; failure backfill; benchmark-substitution anti-pattern
- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — product-specific golden cases (SSO/refunds/API/retention) tied to expected source docs
- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on the golden dataset as a living system, starting with 200 real human agent cases, and categorization by problem type
- [[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel|Inside Clay's Eval Stack: 300M Agent Runs, One LangSmith Pipeline]] — goldens' staticness limit on complex targets; noisy evals get ignored; human-annotated goldens for judge-drift detection
