---
title: "Multi-Agent Orchestration"
type: concept
aliases: ["multi-agent orchestration", "agent orchestration", "orchestration patterns", "multi-agent patterns", "agent coordination"]
tags: [ai, agents, architecture, orchestration, production]
source_count: 1
last_updated: 2026-06-25
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/sub-agents]]", "[[concepts/agent-state-management]]", "[[concepts/fault-tolerance-patterns]]", "[[concepts/human-in-loop-vs-afk]]", "[[concepts/agent-teams]]", "[[concepts/data-foundation]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# Multi-Agent Orchestration

The patterns and infrastructure for coordinating multiple agents in a production system.
Single agents work well in isolation; complexity increases exponentially with each additional
agent due to coordination needs, inter-agent communication, dependency management, and
response synchronization. Multi-agent orchestration is the fourth pillar of the Databricks
5-pillar production framework.

## Key Insights

- **Orchestrator-worker pattern** — a central orchestrator controls all work from a single
  plane and distributes tasks to specialized agents. Every request passes through the orchestrator,
  providing central control and a single logging/debugging point. If something goes wrong, you
  go to the orchestrator logs ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Choreography pattern** — agents are independent and autonomous, communicating through a
  message bus/event bus. Each agent listens for events it's interested in and runs in parallel
  with others. Reduces latency compared to orchestrator-worker because agents don't wait for
  sequential handoffs. Example: mortgage application where one agent checks customer details
  while another checks approval criteria ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Human-in-the-loop pattern** — when an agent's confidence score falls below a threshold,
  a human is called into the workflow to review and take action. This is the safety net for
  ambiguous or high-stakes decisions ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **State management** — multi-agent systems require explicit state handling: execution state
  (current step, next step, retry counts) and business state (messages, approvals, domain data).
  See [[concepts/agent-state-management]] ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Fault tolerance** — when things fail in multi-agent systems, patterns like saga,
  compensation, and circuit breaker handle failure gracefully. See
  [[concepts/fault-tolerance-patterns]] ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

> [!inference] Multi-agent orchestration extends [[concepts/sub-agents]] from a context-management
> primitive into a production architecture concern. Sub-agents are the mechanism (separate
> context windows); orchestration patterns define the coordination topology (centralized vs.
> decentralized, synchronous vs. asynchronous, autonomous vs. supervised).

## Sources

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on orchestrator-worker, choreography, human-in-the-loop patterns; state management and fault tolerance
