---
title: "Sub-Agents"
type: concept
aliases: ["sub-agents", "sub agents", "subagents", "custom sub-agents"]
tags: [ai, agents, llm, architecture]
source_count: 3
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/agent-teams]]", "[[concepts/generator-evaluator-pattern]]", "[[concepts/context-window-management]]", "[[concepts/reviewer-agents]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]", "[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
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

### From Harness Engineering (Ryan Lopopolo, OpenAI)

- **[[concepts/reviewer-agents|Reviewer agents]] as sub-agents** — persona-based reviewer agents (front-end architect, reliability engineer, etc.) are sub-agents triggered on every push; each has its own context window and a system prompt defining its review persona ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Sub-agents for CI** — roughly a third of Ryan's token budget runs in CI as sub-agents doing security review, reliability review, and QA plan validation on every push ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **The dream: 50 agents running 24/7** — the goal is to define work well enough that agents run continuously without requiring human interaction; each required "continue" click is a harness failure ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

### From AI Coding Workflow (Matt Pocock)

- **Explore sub-agent burns tokens in isolation** — Matt's explore sub-agent runs on Opus,
  consumes ~93K tokens reading the codebase, and reports a summary back to the main context;
  the key insight is that the sub-agent's token burn stays out of the main context window
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **[[entities/sandcastle|Sandcastle]] as parallel sub-agent orchestrator** — Sandcastle
  dispatches multiple AFK agent loops in parallel Docker sandboxes, each working on a
  separate [[concepts/kanban-for-agents|Kanban issue]]; this is sub-agents at the
  parallelization layer, not just the delegation layer
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Sub-agents for [[concepts/human-in-loop-vs-afk|AFK implementation]]** — the AFK
  classification maps directly onto sub-agent delegation: tasks classified as AFK are
  handed to sub-agents; tasks classified as human-in-loop stay in the main session
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — Agent SDK primitives + closing how-to-build-your-own section
- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — reviewer agents as sub-agents; CI sub-agents; 50-agent-24/7 vision
- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — explore sub-agent pattern; Sandcastle parallel dispatch; AFK classification as sub-agent delegation
