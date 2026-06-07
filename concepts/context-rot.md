---
title: "Context Rot"
type: concept
aliases: ["context rot", "context anxiety", "context sense anxiety"]
tags: [ai, llm, context, failure-mode]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/context-window-management]]"]
defines: []
relates-to: ["[[concepts/long-running-agents]]", "[[concepts/compaction]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Context Rot

The loss of coherence as a model works deeper into its context window — a failure mode that
makes [[concepts/long-running-agents]] hard. A related symptom is **context (sense)
anxiety**: as the model approaches the end of its context window it gets "nervous" and
rushes to finish whatever it is doing.

## Key Insights

- Context rot is framed as a **temporary problem** — a failing of today's models that is
  far less pronounced than even one model generation ago
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Opus 4.5 exhibited bad context anxiety; Opus 4.6 largely does not, due to post-training —
  which let the team drop context-resetting between sessions in favor of one continuous
  session + [[concepts/compaction]]
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- It is one of the three core obstacles (alongside poor planning and bad self-judgment) to
  running agents for extended periods
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — framing of the long-run problem + harness-adjustment section
