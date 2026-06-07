---
title: "Context Window Management"
type: concept
aliases: ["context window management", "context management", "context window", "context engineering"]
tags: [ai, llm, context, architecture]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: []
defines: ["[[concepts/context-rot]]"]
relates-to: ["[[concepts/compaction]]", "[[concepts/skills-progressive-disclosure]]", "[[concepts/programmatic-tool-calling]]", "[[concepts/long-running-agents]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Context Window Management

The set of techniques for keeping a model effective within a finite context window — the
single biggest constraint on [[concepts/long-running-agents]]. Each new session starts with
"amnesia," so memory components, fresh-context strategies, and disciplined use of the window
are required.

Many of the harness improvements over the past year were fundamentally context-window
improvements: [[concepts/skills-progressive-disclosure]], [[concepts/programmatic-tool-calling]],
[[concepts/compaction]], and using the file system (see [[concepts/file-system-state]]) as
external memory instead of cramming everything into context.

## Key Insights

- A new session has no memory — the agent restarts from scratch, so memory components are
  needed ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Models became progressively more **context-aware**, tracking tokens consumed and managing
  their own context as they approach the window's end (Sonnet 4.5 onward)
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- The 1M-token context window reaching GA shifts the design space — you may run a lot within
  a single window instead of needing new sessions
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Audience "smart zone / dumb zone" framing: model quality reportedly degrades past a
  context threshold (~100K with 1M windows); slicing tasks small keeps the model in its
  smart zone — a motivation behind the [[concepts/ralph-loop]]
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — recurring theme across the history tour and Q&A
