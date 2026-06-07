---
title: "Arize Phoenix"
type: entity
entity_type: tool
aliases: ["Phoenix", "Arize Phoenix", "Arize AX", "ArizeAX"]
tags: [ai, agents, evals, observability, llm]
source_count: 1
last_updated: 2026-06-07
relates-to: ["[[entities/anthropic]]", "[[entities/agent-sdk]]"]
part-of: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]"]
---

# Arize Phoenix

Open-source LLM observability and evaluation platform built by Arize AI. Phoenix collects
agent execution traces (spans), makes them queryable and filterable, and provides
infrastructure for running [[concepts/agent-evals]] — including code evals, built-in LLM
evals, and custom [[concepts/llm-as-judge]] classifiers. The enterprise version (Arize AX)
adds SOC 2 compliance, SAML/SSO, session-aware tracing, and production-scale storage (RiseDB).

Phoenix is the primary tool used in the "Ship Real Agents" workshop to demonstrate the full
[[concepts/eval-iterate-cycle]]: instrument → trace → eval → annotate → improve.

## Mentioned In

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — central tool throughout the workshop; used for tracing, annotation, classification evaluators, experiments, and dataset management
