---
title: "Sub-Agents"
type: concept
aliases: ["sub-agents", "sub agents", "subagents", "custom sub-agents"]
tags: [ai, agents, llm, architecture]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/agent-teams]]", "[[concepts/generator-evaluator-pattern]]", "[[concepts/context-window-management]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Sub-Agents

Delegated agents the main agent loop spawns to handle specific tasks, each with its own
context window. A core primitive of the [[entities/agent-sdk|Agent SDK]] and the building
block for both [[concepts/agent-teams]] and the [[concepts/generator-evaluator-pattern]]
(where the evaluator/QA role is just a sub-agent with a harsh system prompt).

## Key Insights

- Running many sub-agents became **economical** with Haiku 4.5 / Opus 4.5, unlocking
  multi-agent harnesses ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Custom sub-agents are already a shipped primitive — give one a harsh system prompt and a
  detailed rubric and you have an evaluator/QA role
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Giving each role its own context window is the essence of the
  [[concepts/planner-generator-evaluator-architecture]] — "we just gave each role its own
  context window" ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — Agent SDK primitives + closing how-to-build-your-own section
