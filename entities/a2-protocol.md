---
title: "A2 Protocol"
type: entity
entity_type: project
aliases: ["A2 protocol", "a2 protocol", "Agent-to-Agent protocol", "A2"]
tags: [ai, agents, protocol, human-interaction]
source_count: 1
last_updated: 2026-06-09
relates-to: ["[[entities/humanlayer]]"]
part-of: ["[[entities/humanlayer]]"]
sources: ["[[sources/2026-06-09-12-factor-agents]]"]
---

# A2 Protocol

An open protocol being developed at [[entities/humanlayer|HumanLayer]] for standardizing
how agents **contact humans** — a consolidation layer around the human-in-the-loop
interaction pattern. Mentioned by Dex Horthy in his 12-Factor Agents talk as one of the
"hard but not that interesting" infrastructure problems HumanLayer is solving so
builders can focus on the AI-specific parts of agent development.

The A2 protocol addresses the "contact humans with tools" factor of
[[concepts/12-factor-agents]]: instead of every agent builder inventing their own
approval flow, the protocol provides a standard way for agents to request human input,
wait for approval, and resume execution.

## Mentioned In

- [[sources/2026-06-09-12-factor-agents|12-Factor Agents: Patterns of reliable LLM applications]] — Dex Horthy's talk; A2 presented as the consolidation layer for agent-human contact; part of HumanLayer's open-source + open-protocol strategy

