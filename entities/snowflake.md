---
title: "Snowflake"
type: entity
entity_type: company
aliases: []
tags: [ai, data-platform, enterprise-ai, agents]
source_count: 2
last_updated: 2026-08-31
relates-to: ["[[entities/databricks]]", "[[entities/clay]]"]
part-of: []
sources: ["[[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]", "[[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]"]
---

# Snowflake

Data cloud company (~10,000 employees, roughly half in go-to-market/sales roles) that runs its own internal AI program as **customer zero** for its products: the internal GTM assistant (launched September 2025, 6,000 users, 1M+ questions answered, ~40k/week) is built on [[entities/snowflake-co-work|Snowflake Co-work]], and the hard-won lessons are shared back with Fortune 500 customers trying to build the same thing.

The direct competitor analog to [[entities/databricks|Databricks]]' Genie / Agent Bricks play — both vendors dogfood internal agents on their own data platforms (centralizing data so agents inherit [[concepts/rbac-inheritance|RBAC]]) and then productize the pattern.

## Mentioned In

- [[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users|GTM AI Agents: Lessons from Deploying to 6,000 Users]] — Sait Izmit (Snowflake) on the internal GTM assistant: quality-over-coverage, retention-gated rollout, and the governed data plane
- [[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel|Inside Clay's Eval Stack: 300M Agent Runs, One LangSmith Pipeline]] — Snowflake as one of [[entities/clay|Clay]]'s disparate analytics data stores being folded into the agent-first data lake
