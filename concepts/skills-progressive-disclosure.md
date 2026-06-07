---
title: "Skills (Progressive Disclosure)"
type: concept
aliases: ["skills", "progressive disclosure", "agent skills"]
tags: [ai, agents, llm, context, architecture]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/context-window-management]]"]
defines: []
relates-to: ["[[concepts/programmatic-tool-calling]]", "[[concepts/design-taste-rubric]]", "[[concepts/agent-harness]]"]
contradicts: []
supports: ["[[concepts/context-window-management]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Skills (Progressive Disclosure)

A [[entities/claude-code|Claude Code]] / [[entities/agent-sdk|Agent SDK]] primitive that
makes effective use of the context window via **progressive disclosure**: only the skill's
front matter is loaded up front (instead of all tool descriptions, which consume the context
window), and the full skill body is loaded only when instantiated — optionally followed by
references to deterministic code.

## Key Insights

- Progressive disclosure: front matter first, full body on instantiation, then references to
  runnable code — a [[concepts/context-window-management]] win
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Skills are a clean way to **package grading rubrics** (see [[concepts/design-taste-rubric]])
  into a general development flow
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Learnings from [[concepts/reading-traces]] can be baked into skills (or CLAUDE.md / prompt
  templates) to avoid repeating bad behavior
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — history tour + closing build-your-own primitives
