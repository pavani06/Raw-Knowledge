---
title: "Deflection Rate"
type: concept
aliases: ["deflection rate", "deflection metric", "ai deflection", "query deflection", "chatbot deflection"]
tags: [ai, agents, metrics, business, evaluation, production]
source_count: 1
last_updated: 2026-06-25
parent: ["[[concepts/agent-evals]]"]
part-of: []
defines: []
relates-to: ["[[concepts/eval-driven-development]]", "[[concepts/feedback-loops]]", "[[concepts/continuous-evaluation]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# Deflection Rate

A business-level metric for AI agent systems, especially chatbots: the percentage of user
queries successfully handled by the AI agent without human intervention. Deflection rate
measures the operational goal of AI deployment — reducing reliance on human agents for
simple, repetitive queries — and must be tracked as a continuous metric, not a one-time
measurement.

In the retail banking case study, the goal was 60% deflection of simple queries to the
AI agent, defined explicitly as a success metric during the evaluation phase.

## Key Insights

- **Define success in business numbers** — deflection rate is a business metric, not
  a technical one. "What does success look like? Define it in numbers." Example: "out
  of 100 queries, 60 queries (60% of simple queries) must be handled by the agent"
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Track, don't just target** — beyond setting a deflection target, organizations
  need a system to continuously track which queries are being deflected and measure
  deflection rate over time ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Case study results** — the retail banking client had ~20,000 calls/month with
  ~60% simple queries; the AI agent was built to handle those, with deflection rate
  as a tracked operational metric post-launch ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Economic driver** — deflection rate directly translates to operational cost savings
  by reducing human agent time spent on simple queries, making it a core ROI metric
  for AI agent deployment ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

> [!inference] Deflection rate connects [[concepts/agent-evals]] to business outcomes:
> where accuracy, latency, and groundedness are technical eval metrics, deflection rate
> is the business outcome those technical metrics serve. It is the bridge between
> "the agent works correctly" and "the agent delivers value."

## Sources

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on defining success in business numbers, deflection rate as a core metric, and the retail banking case study
