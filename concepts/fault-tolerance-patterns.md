---
title: "Fault Tolerance Patterns"
type: concept
aliases: ["fault tolerance patterns", "failure recovery patterns", "saga pattern", "compensation pattern", "circuit breaker pattern"]
tags: [ai, agents, reliability, fault-tolerance, production, orchestration]
source_count: 1
last_updated: 2026-06-25
parent: ["[[concepts/multi-agent-orchestration]]"]
part-of: ["[[concepts/multi-agent-orchestration]]"]
defines: []
relates-to: ["[[concepts/agent-state-management]]", "[[concepts/production-incident-playbook]]", "[[concepts/ai-governance]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# Fault Tolerance Patterns

Patterns for handling failures gracefully in multi-agent production systems. When agents
fail, retry, or produce unexpected results, fault tolerance patterns contain the blast
radius and enable recovery without cascading failures. Mentioned in the Databricks
multi-agent orchestration framework as essential for production-scale agent deployments.

## Key Insights

- **Saga pattern** — a sequence of local transactions where each step has a compensating
  transaction to undo it if a later step fails. Applied to multi-agent workflows where an
  agent's action must be reversible if a downstream agent fails
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Compensation pattern** — when a failure occurs in a multi-step workflow, execute
  compensating actions to return the system to a consistent state. The business-logic
  equivalent of a database rollback for agent actions
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Circuit breaker pattern** — detect repeated failures (e.g., API calls failing, tool
  calls erroring) and stop calling the failing component, redirecting to a fallback
  (human escalation, cached response, degraded mode). Prevents retry storms
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Retry limits with escalation** — configure maximum retry attempts (e.g., 3) for
  failing operations; beyond the limit, escalate to a human or report to a monitoring
  system rather than retrying indefinitely ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Online monitoring triggers** — fault tolerance patterns are applied reactively via
  online monitoring: when duplicate calls or failing calls are detected in production,
  fallback strategies activate automatically ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

> [!inference] Fault tolerance patterns are the reliability layer that makes
> [[concepts/multi-agent-orchestration]] production-grade. While orchestration defines
> the coordination topology, fault tolerance defines what happens when that coordination
> breaks — making it the operational complement to [[concepts/agent-state-management]]
> (which handles pause/resume) and the [[[concepts/production-incident-playbook]]
> (which handles human response).

## Sources

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on saga, compensation, and circuit breaker patterns; retry limits with escalation; online monitoring triggers
