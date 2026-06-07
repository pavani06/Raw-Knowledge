---
title: "Agent Memory"
type: concept
aliases: ["agent memory", "memory", "context retention", "agent context", "working memory"]
tags: [ai, agents, llm, memory, context]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/agentic-ai]]"]
defines: []
relates-to: ["[[concepts/agentic-ai]]", "[[concepts/context-window-management]]", "[[concepts/file-system-state]]", "[[concepts/compaction]]", "[[concepts/smart-zone-dumb-zone]]", "[[concepts/agent-planning]]"]
contradicts: []
supports: ["[[concepts/agentic-ai]]", "[[concepts/context-window-management]]"]
extends: []
sources: ["[[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]"]
---

# Agent Memory

The ability of an [[concepts/agentic-ai|AI agent]] to **retain and recall useful context
across the steps of a task** — so that later steps can build on earlier ones without
re-explaining everything from scratch.

Memory is what makes multi-step task completion coherent. Without it, each step would be
isolated; with it, the agent can accumulate understanding, track progress, and avoid
repeating work.

Memory exists at multiple levels:

| Level | What it is | Implementation |
|---|---|---|
| **In-context** | Information held in the active context window | Prompt / conversation history |
| **External** | Information stored outside the model | Files, databases, [[concepts/file-system-state\|file system]] |
| **Compressed** | Summarized history that fits in context | [[concepts/compaction\|Compaction]], summaries |

## Key Insights

- **Memory is a core building block** — without memory, an agent cannot complete multi-step
  tasks; each step would lose the context of what came before
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- **Context window is the primary memory constraint** — the [[concepts/smart-zone-dumb-zone]]
  principle applies: agents degrade past ~100K tokens; memory management is the discipline
  of staying in the smart zone ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- **[[concepts/file-system-state|File system as shared memory]]** — for long-running or
  multi-agent tasks, durable external memory (JSON files, databases) is more reliable than
  in-context memory; it survives context resets and is shareable across agents.
- **[[concepts/compaction|Compaction]]** is the server-side technique for extending
  in-context memory: the context is condensed into a summary, enabling indefinite
  single-session runs without losing coherence.

> [!inference]
> "Memory" in the beginner sense maps onto three distinct mechanisms in the advanced
> ontology: [[concepts/context-window-management]] (managing what stays in context),
> [[concepts/file-system-state]] (durable external memory), and [[concepts/compaction]]
> (server-side compression). Beginners need the concept; practitioners need all three.

## Sources

- [[sources/2026-06-07-beginners-guide-to-learning-agentic-ai|The Beginner's Guide to Learning Agentic AI]] — memory as a core agent building block; context retention enabling multi-step task completion
