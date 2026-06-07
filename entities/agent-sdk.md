---
title: "Agent SDK"
type: entity
entity_type: tool
aliases: ["agent sdk", "claude code sdk", "claude agent sdk"]
tags: [ai, llm, agents, sdk, framework]
source_count: 1
last_updated: 2026-06-07
relates-to: ["[[entities/anthropic]]", "[[entities/claude-code]]"]
part-of: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Agent SDK

[[entities/anthropic|Anthropic]]'s framework for building agentic harnesses — originally the
"Claude Code SDK," later renamed the Agent SDK once the team realized it was far more
general-purpose than coding. Ships the core primitives for the [[concepts/agent-harness]]:
the agent loop, [[concepts/sub-agents]], MCP integration ([[entities/model-context-protocol]]),
CLAUDE.md / [[concepts/skills-progressive-disclosure]], slash commands, and a permission
system.

## Mentioned In

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — described as shipping all the primitives built over the past year; the renaming (Claude Code SDK → Agent SDK) signaled the shift beyond coding. Noted as better than [[entities/claude-code]] for running long jobs in a cloud/sandbox environment rather than tying up a local machine.
