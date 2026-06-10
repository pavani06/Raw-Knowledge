---
title: "Smart Truncation"
type: concept
aliases: ["smart truncation", "smart truncation memory", "head-tail truncation", "head-tail-memory strategy"]
tags: [ai, agents, llm, context, memory]
source_count: 1
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/context-window-management]]"]
defines: []
relates-to: ["[[concepts/agent-memory]]", "[[concepts/compaction]]", "[[concepts/context-rot]]", "[[concepts/sub-agents]]"]
contradicts: []
supports: ["[[concepts/context-window-management]]"]
extends: ["[[concepts/compaction]]"]
sources: ["[[sources/2026-06-09-how-we-solved-context-management-in-agents]]"]
---

# Smart Truncation

Smart truncation is Arize's production context-management strategy for [[entities/alex|Alex]]: keep the beginning and end of a large context object, move the middle into a retrievable memory store, and let the agent fetch omitted content when it decides that content matters.

It sits between naive truncation and full summarization. Naive truncation keeps too little and breaks reasoning; summarization compresses aggressively but gives the system little control over what survives. Smart truncation preserves stable anchors while externalizing bulk context into [[concepts/agent-memory]].

## Key Insights

- **Head plus tail beats first-only truncation** — Arize first tried taking only the first 100 characters of a long context blob, but follow-up questions looked like new conversations because the agent lost continuity ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Summaries were too inconsistent** — asking an LLM to summarize all context into fewer tokens left the model to decide what mattered, which was unreliable for trace analysis ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Middle becomes memory** — Alex keeps roughly the first 100 characters and last 100 characters, stores the middle, and gives the agent a tool to retrieve prior messages or tool calls by ID/preview when needed ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **The system prompt stays stable** — Alex does not reset the system prompt during truncation; the harness instructions remain active while bulk data moves out of the main context ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Smart truncation is still heuristic** — Arize still lacks a principled context budget or clear metric for context quality, so first-100/last-100 remains a working but provisional strategy ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).

> [!inference] Smart truncation is best treated as a hybrid of [[concepts/compaction]] and [[concepts/agent-memory]]: it compresses the active context by removing the middle, but preserves recoverability by storing that removed context outside the active window rather than trusting a lossy summary.

## Sources

- [[sources/2026-06-09-how-we-solved-context-management-in-agents|How we solved Context Management in Agents]] — Sally-Ann Delucia (Arize) on the failed first-100 truncation, failed summarization, and the working head/tail plus memory-store strategy in Alex
