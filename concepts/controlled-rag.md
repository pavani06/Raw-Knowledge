---
title: "Controlled RAG"
type: concept
aliases: ["controlled rag", "controlled retrieval augmented generation", "system-side rag", "metadata-filtered rag"]
tags: [ai, agents, llm, rag, context, retrieval]
source_count: 1
last_updated: 2026-06-09
parent: ["[[concepts/context-window-management]]"]
part-of: []
defines: []
relates-to: ["[[concepts/context-window-management]]", "[[concepts/agent-memory]]", "[[concepts/smart-zone-dumb-zone]]", "[[concepts/compaction]]"]
contradicts: []
supports: ["[[concepts/context-window-management]]"]
extends: []
sources: ["[[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]"]
---

# Controlled RAG

Retrieval Augmented Generation where the **system** — not the user — controls how much
context enters the agent's window. Standard RAG dumps retrieved documents directly into
context alongside the static prompt and the user's dynamic prompt, inflating the window
uncontrollably. Controlled RAG adds guardrails: checkpoints, metadata filtering, and
human-in-the-loop refinement so only the most relevant, high-quality context reaches the
agent.

## Key Insights

- **System-side checkpoints** — stop retrieval when the context hits a predefined token
  limit (e.g. 20K) or a document count cap (e.g. 7 documents), preventing the window from
  silently overflowing ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Metadata filtering** — filter retrieved documents by source, recency, environment,
  branch, or other metadata fields before sending them to the agent; relevance is not just
  about vector similarity ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Human-in-the-loop refinement** — after retrieval, a human (or a separate evaluator
  agent) verifies what is relevant and what is noise before the main agent sees the context
  ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).

> [!inference]
> Controlled RAG is the retrieval-time counterpart to [[concepts/compaction|compaction]]:
> compaction compresses context that's already in the window; controlled RAG prevents
> irrelevant context from entering the window in the first place. Both serve
> [[concepts/smart-zone-dumb-zone|smart-zone]] discipline.

## Sources

- [[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou|Why More Context Makes Your Agent Dumber]] — Nupur Sharma on controlled RAG as a countermeasure to context bloat
