---
title: "Programmatic Tool Calling"
type: concept
aliases: ["programmatic tool calling", "code-based tool calling", "tool calling via code"]
tags: [ai, agents, llm, context, tools]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/context-window-management]]"]
defines: []
relates-to: ["[[concepts/skills-progressive-disclosure]]", "[[concepts/agent-harness]]"]
contradicts: []
supports: ["[[concepts/context-window-management]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Programmatic Tool Calling

A [[concepts/context-window-management]] technique: instead of invoking many tools one by
one and pulling all their output into context to process, the model **writes code on the
fly** that runs a series of tool calls and returns only the final result. This keeps
intermediate tool output out of the context window.

## Key Insights

- Avoids polluting context with every tool's raw output — only the final result returns
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Listed among the context improvements (alongside [[concepts/skills-progressive-disclosure]])
  that arrived in the "big couple months" of harness evolution
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — Andrew's history tour, context-improvement segment
