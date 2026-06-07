---
title: "File System as Shared State"
type: concept
aliases: ["file system state", "file-system state", "shared state via files", "persistent artifacts", "breadcrumbs"]
tags: [ai, agents, llm, architecture, memory]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/context-window-management]]", "[[concepts/planner-generator-evaluator-architecture]]", "[[concepts/long-running-agents]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# File System as Shared State

Using files on disk — not the context window — as the durable, shared memory for
long-running multi-agent systems. Agents read/write JSON and markdown artifacts to
coordinate, persist progress, and leave "breadcrumbs" for the next model (or a human) to
pick up.

This is the preferred state mechanism for [[concepts/long-running-agents]] because the
context window is finite and lossy, whereas files are durable and greppable.

## Key Insights

- The initializer agent breaks a vague prompt into **persistent artifacts**: a
  `featurelist.json`, a progress file, a git repo, an init script, and completion flags
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- **JSON over markdown for state**: models are *less* likely to overwrite JSON files than
  markdown files — a surprising but exploited quirk
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Contracts between generator and evaluator are negotiated **via files on disk** (one writes
  markdown, the other reads it) — see [[concepts/planner-generator-evaluator-architecture]]
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- For continuity into long-lived products: embed prompting that tells the agent to write
  learnings/state to a JSON file — a timestamped log of "tried this, found bug, fixed it,
  works ✓" plus a high-level live-updating docs file. Those two files let
  [[entities/claude-code|Claude Code]] + a human resume later
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — first-blog-post harness + Q&A on long-lived products
