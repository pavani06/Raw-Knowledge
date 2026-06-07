---
title: "Model Context Protocol"
type: entity
entity_type: project
aliases: ["model context protocol", "MCP", "MCP spec", "MCP servers"]
tags: [ai, llm, agents, tools, protocol]
source_count: 1
last_updated: 2026-06-07
relates-to: ["[[entities/agent-sdk]]", "[[entities/playwright]]", "[[entities/anthropic]]"]
part-of: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Model Context Protocol

An open protocol (MCP) that lets agents use external tools via standardized servers. Part of
the toolchain that enabled Claude to "use tools," and the delivery mechanism for things like
[[entities/playwright|Playwright]] MCP and "Claude for Chrome MCP." The
[[entities/agent-sdk|Agent SDK]]'s agent loop can pull in tools from MCP servers.

## Mentioned In

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — MCP spec shipped in the "prehistory" segment (alongside computer use); the agent loop pulls tools from MCP servers; Playwright MCP / Claude for Chrome MCP power the evaluator's browser verification.
