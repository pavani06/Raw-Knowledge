---
title: "RBAC Inheritance"
type: concept
aliases: ["rbac inheritance", "role-based access control inheritance", "permission inheritance", "governed data plane"]
tags: [ai, agents, enterprise-ai, security, data-platform, governance]
source_count: 1
last_updated: 2026-08-30
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/ai-governance]]", "[[concepts/isolated-infrastructure]]"]
contradicts: []
supports: ["[[concepts/ai-governance]]"]
extends: []
sources: ["[[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]"]
---

# RBAC Inheritance

An enterprise security pattern for AI agents: centralize all relevant data (first-party, third-party, SaaS exports like Salesforce, call transcripts) in one governed data platform, so that agents built on top **inherit the platform's role-based access controls automatically** — per-user permissions flow through the agent with zero security-specific agent code.

Snowflake's strategic choice for the internal GTM assistant: bring all the data together in Snowflake, and agents deployed on [[entities/snowflake-co-work|Snowflake Co-work]] "can inherit a lot of the role-based access controls" — deployable "without writing a single line of code", with curation and security guardrails out of the box.

## Key Insights

- **Security at the data plane, not the agent layer** — access control is solved once, where the data lives; every agent, skill, and MCP connection downstream inherits it ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).
- **A precondition for no-code agent deployment** — business users can only safely build their own agents if permissions never depend on the builder ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).

> [!inference] Contrast with Sierra's [[concepts/isolated-infrastructure]]: per-customer walled-off infrastructure vs. one shared governed plane with inherited RBAC — two answers to the same trust question (external customer trust vs. internal employee trust). Both push security below the agent rather than into it; neither source comments on the other's approach. Also a concrete instance of [[concepts/ai-governance]] arriving as architecture rather than policy.

## Sources

- [[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users|GTM AI Agents: Lessons from Deploying to 6,000 Users]] — Sait Izmit (Snowflake) on centralizing all data in the governed plane so agents inherit RBAC
