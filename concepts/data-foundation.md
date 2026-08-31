---
title: "Data Foundation"
type: concept
aliases: ["data foundation", "ai data strategy", "ai data infrastructure", "question data vs tracking data"]
tags: [ai, agents, data, infrastructure, observability, production]
source_count: 1
last_updated: 2026-06-25
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/tracing-observability]]", "[[concepts/agent-tracing]]", "[[concepts/data-quality-for-agents]]", "[[concepts/golden-dataset]]", "[[entities/delta-lake]]", "[[entities/unity-catalog]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
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

## Sources

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on question data vs tracking data, centralized trace collection, and the data foundation technology stack
