---
title: "Data Foundation"
type: concept
aliases: ["data foundation", "ai data strategy", "ai data infrastructure", "question data vs tracking data"]
tags: [ai, agents, data, infrastructure, observability, production]
source_count: 2
last_updated: 2026-08-31
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/tracing-observability]]", "[[concepts/agent-tracing]]", "[[concepts/data-quality-for-agents]]", "[[concepts/golden-dataset]]", "[[entities/delta-lake]]", "[[entities/unity-catalog]]", "[[concepts/agent-first-data-foundation]]", "[[entities/clay]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]", "[[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]"]
---

# Data Foundation

The third and "most important" pillar of the Databricks 5-pillar production AI framework.
Data foundation addresses the reality that agents query data built for humans — and agents
are unforgiving. The pillar splits into two distinct data strategies: **question data** (the
data needed for AI to answer questions) and **tracking data** (observability/tracing data
used for monitoring, auditing, and evaluation).

In typical projects, Sandipan Bhaumik spends 60% of his time on data foundation — because
data was built for forgiving humans, not for agents that "will go, find it wrong, they'll
give you the wrong answer confidently."

## Key Insights

- **Question data** — the data AI needs to serve outcomes: pre-training data, post-training
  data, API-connected data sources, vector databases, policy documents, customer databases.
  This is the AI's knowledge foundation ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Tracking data** — the observability/tracing data that must be collected, structured,
  and served to multiple consumers: operational dashboards, auditors, regulators, online
  monitoring systems, and LLM-as-judge pipelines. Requires a proper schema and collection
  strategy ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Centralized trace collection** — enterprises run agents across multiple frameworks
  (CrewAI, LangChain) and cloud platforms; tracing data must be centralized in one location
  to serve all downstream use cases ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Data quality for agents** — see [[concepts/data-quality-for-agents]]: data built for
  humans is forgiving (wrong data? ask someone to correct it); agents are not (wrong data?
  confidently wrong answer, and you won't know) ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Technology stack** — Databricks implements data foundation via cloud storage →
  [[entities/delta-lake|Delta Lake]] (database-like properties on raw data) →
  [[entities/unity-catalog|Unity Catalog]] (centralized permissions, PII tagging, metadata)
  → AI and BI applications on top ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

> [!inference] Data foundation is the infrastructure layer that makes [[concepts/tracing-observability]]
> and [[concepts/continuous-evaluation]] operational at enterprise scale: without a centralized
> data strategy for collecting, storing, and serving trace data, observability remains a
> per-framework concern rather than an enterprise capability.

### From Inside Clay's Eval Stack (LangChain channel)

- **The agent-first specialization** — [[entities/clay|Clay]] ran into the limit of its data
  primitives for scaling learning loops and is consolidating into a data lake where
  **agents are the first-class users**: guardrails up front, safe shadow builds deployed to
  S3, serving/dev compute separation, agent skills + CLI, and hour-long agent-driven data
  builds over Athena. See [[concepts/agent-first-data-foundation]]
  ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **Unifying the question AND tracking stores** — Clay's lake folds together exactly the
  two categories this page splits: question data (first-party + third-party GTM data) and
  tracking data ([[entities/langsmith|LangSmith]] traces), plus [[entities/snowflake|Snowflake]]
  analytics, Postgres, and ClickHouse — "one single platform" so agents don't have to tie
  the databases together themselves ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).

> [!inference] Databricks frames data foundation as the pillar agents *consume*; Clay
> reframes it as infrastructure agents *operate on* (shadow builds, long-running data
> models). The [[concepts/agent-first-data-foundation]] page carries the specialization;
> this page keeps the question-data/tracking-data distinction both stacks share.

## Sources

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on question data vs tracking data, centralized trace collection, and the data foundation technology stack
- [[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel|Inside Clay's Eval Stack: 300M Agent Runs, One LangSmith Pipeline]] — the agent-first data lake: guardrails, shadow builds, compute separation, and unifying question + tracking + analytics stores on one platform
