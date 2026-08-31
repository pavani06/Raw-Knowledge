---
title: "LangChain"
type: entity
entity_type: tool
aliases: []
tags: [ai, agents, framework, llm]
source_count: 1
last_updated: 2026-06-25
relates-to: ["[[entities/crewai]]", "[[concepts/agent-tracing]]"]
part-of: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# LangChain

Agent framework mentioned as one of the frameworks enterprises use in production AI
deployments. Enterprises typically run agents across multiple frameworks simultaneously
(LangChain, [[entities/crewai|CrewAI]], etc.), which creates complexity for
[[concepts/agent-tracing|centralized trace collection]] — tracing data from all
frameworks must converge in one location to serve dashboards, auditors, and monitoring.

## Mentioned In

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — LangChain as one of multiple frameworks enterprises use, motivating centralized trace collection
