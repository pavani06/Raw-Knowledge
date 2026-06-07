---
title: "Playwright"
type: entity
entity_type: tool
aliases: ["playwright", "playwright mcp"]
tags: [ai, agents, browser-automation, testing, tools]
source_count: 1
last_updated: 2026-06-07
relates-to: ["[[entities/model-context-protocol]]", "[[entities/claude-code]]"]
part-of: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Playwright

Browser-automation tool used by the evaluator agent in the
[[concepts/generator-evaluator-pattern]] to drive a live app — opening pages, clicking,
navigating, and screenshotting — as the engine of the [[concepts/verification-loop]].
Available to agents via Playwright MCP ([[entities/model-context-protocol]]); the speakers
also mention "Claude for Chrome MCP" as a more robust browser-control alternative.

## Mentioned In

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — the evaluator launches Playwright to actually use/test apps; recommended (Playwright MCP or Claude for Chrome MCP) as already very good for web-app verification, with computer use for native apps.
