---
title: "Context Rot"
type: concept
aliases: ["context rot", "context anxiety", "context sense anxiety", "context degradation", "long-session degradation", "late-session failure"]
tags: [ai, llm, context, failure-mode]
source_count: 2
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/context-window-management]]"]
defines: []
relates-to: ["[[concepts/long-running-agents]]", "[[concepts/compaction]]", "[[concepts/smart-zone-dumb-zone]]", "[[concepts/long-session-evals]]", "[[concepts/agent-memory]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-09-how-we-solved-context-management-in-agents]]"]
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

### From Context Management in Agents (Sally-Ann Delucia, Arize)

- **Failures appear late in long conversations** — Alex initially looked healthy after [[concepts/smart-truncation]], but users kept long chats open across pages and late-turn failures revealed that the agent began forgetting important context ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **[[concepts/long-session-evals|Long-session evals]] make rot testable** — loading ten turns and testing the eleventh converts late context degradation from anecdotal user reports into an explicit regression target ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Long-term memory is the next pressure point** — conversations grew from under ten turns to twenty-plus turns, and users now expect prior-session issues to remain available; without persistent memory, new chats restart without that context ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — framing of the long-run problem + harness-adjustment section
- [[sources/2026-06-09-how-we-solved-context-management-in-agents|How we solved Context Management in Agents]] — Sally-Ann Delucia (Arize) on late-session failures, long-session evals, and cross-session memory pressure
