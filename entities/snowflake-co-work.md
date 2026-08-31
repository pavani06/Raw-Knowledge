---
title: "Snowflake Co-work"
type: entity
entity_type: tool
aliases: ["Co-work", "Snowflake Intelligence"]
tags: [ai, agents, no-code, enterprise-ai, data-platform]
source_count: 1
last_updated: 2026-08-30
relates-to: ["[[entities/model-context-protocol]]", "[[entities/agent-bricks]]"]
part-of: ["[[entities/snowflake]]"]
sources: ["[[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]"]
---

# Snowflake Co-work

[[entities/snowflake|Snowflake]]'s no-code agent platform for business users, renamed from "Snowflake Intelligence" at Snowflake summit a couple of weeks before this talk. Ships with the Cortex AI services out of the box (Cortex Analyst for structured data over semantic views, Cortex Search for unstructured data, and further Cortex services), a ready-made chat UI, plus curation and security guardrails. Because all data is centralized in the Snowflake governed plane, agents inherit role-based access controls ([[concepts/rbac-inheritance]]) and can be deployed "without writing a single line of code."

The internal GTM assistant (6,000 users) runs on it at 15 semantic views, 85 tables, 3,000 columns, 5–6 [[entities/model-context-protocol|MCP]] connections, and ~20 skills. The platform-vendor counterpart to [[entities/agent-bricks|Databricks Agent Bricks]].

## Mentioned In

- [[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users|GTM AI Agents: Lessons from Deploying to 6,000 Users]] — the platform under the GTM assistant; renamed from Snowflake Intelligence; Cortex services, inherited RBAC, and no-code agent deployment
