---
title: "Agent Memory"
type: concept
aliases: ["agent memory", "memory", "context retention", "agent context", "working memory"]
tags: [ai, agents, llm, memory, context]
source_count: 3
last_updated: 2026-06-25
parent: []
part-of: ["[[concepts/agentic-ai]]"]
defines: []
relates-to: ["[[concepts/agentic-ai]]", "[[concepts/context-window-management]]", "[[concepts/file-system-state]]", "[[concepts/compaction]]", "[[concepts/smart-zone-dumb-zone]]", "[[concepts/agent-planning]]", "[[concepts/controlled-rag]]", "[[concepts/smart-truncation]]", "[[concepts/long-session-evals]]", "[[concepts/isolated-infrastructure]]"]
contradicts: []
supports: ["[[concepts/agentic-ai]]", "[[concepts/context-window-management]]"]
extends: []
sources: ["[[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]", "[[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]", "[[sources/2026-06-09-how-we-solved-context-management-in-agents]]"]
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

### From More Context Makes Your Agent Dumber (Nupur Sharma, Qodo)

- **Working vs. persistent memory** — divide memory into two components: *working memory*
  is everything needed for the current task (current codebase, branch, file); *persistent
  memory* is what you've learned from past conversations, user preferences, and accumulated
  knowledge — accessed only on demand ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **The ADHD analogy** — a neuroscientist pointed out that agents with low working memory
  exhibit ADHD-like symptoms: they focus on *solving the problem* rather than *finding the
  solution*. Increasing working memory shifts the agent from patching to routing — it looks
  for the right approach instead of fixating on the first one ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Chunking for memory** — break concepts into smaller pieces; the agent might need piece
  one to solve the current task but not piece two, so keep unused chunks out of context
  ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Checkpoint-based memory** — at CI/CD pipeline checkpoints, stop the agent, review memory,
  decide what to persist and what to discard, then move forward. This enables both better
  context and better evaluation of what the agent is doing ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Humans forget; agents don't** — in a 10-minute conversation, what you said in minute 4
  and minute 8 both get equal weight from the agent, while human memory naturally decays.
  This makes explicit memory management essential for agents ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).

> [!inference] The working/persistent memory distinction adds a **temporal dimension** to the
> existing memory levels (in-context / external / compressed). The prior model was structural
> (where the memory lives); the new model is temporal (when the memory matters). Together
> they form a 3x2 matrix of memory strategies.

### From Context Management in Agents (Sally-Ann Delucia, Arize)

- **Context decides what the model sees; memory decides what survives** — Arize separates the active context from a retrievable memory store, then lets [[entities/alex|Alex]] pull omitted tool calls or prior messages when needed ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **[[concepts/smart-truncation|Smart truncation memory]] is working memory, not long-term memory** — Alex's current memory store preserves truncated conversation/tool-call content inside the current session, but Arize is still building true cross-session long-term memory ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Users expect cross-session reference** — long-term memory matters because users want to discuss issues from prior Alex sessions without manually reintroducing the context ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).

> [!inference] This source sharpens the boundary between *session salvage* and *persistent memory*. A memory store attached to [[concepts/smart-truncation]] prevents context loss inside a long chat, but it does not yet satisfy the product requirement users call "memory": continuity across chats.

### From The Best AI Agents Are Simpler Than You Think (Zack Reno Wedeen, Sierra)

- **Memory as a first-class platform primitive** — every Sierra conversation can identify the customer, save memories (implicitly/automatically or explicitly), and extract those memories in future interactions. Memory is not a bolt-on; it's built into the conversation loop ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Three layers of memory storage**: (1) explicit save on a conversation turn — "I want to save this to memory"; (2) journey-level rules — "remember birthdays"; (3) customer-initiated — "remember this for next time." The agent builder, the system, and the customer each have a memory-writing mechanism ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Authentication gates memory retrieval** — memories are gated by identity verification. Phone numbers aren't always reliable (shared office lines, family plans), so every business must define policy for which memories are safe to extract and which are sensitive ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Business impact of memory** — remembering names, past calls, preferences, and frustrations "increases all of the metrics that are most important to businesses, from resolution rate to conversion rate" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **The memory structure problem is overrated** — when the knowledge base is three orders of magnitude larger than per-customer memories, "the retrieval and ranking problem is pretty simple, and I don't think it matters what structure you use" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Why memory startups haven't broken out** — to sell memory, you must also sell authentication/verification/identification. B2B players can't just offer memory without the trust framework around it. Consumer products (ChatGPT, Claude) have an advantage: users already trust them ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).

> [!inference] Sierra's memory architecture confirms the ontology's [[concepts/agent-memory]] model but adds a crucial dimension: *trust infrastructure*. The reason memory isn't just a retrieval problem is that, in enterprise contexts, every memory access is gated by authentication policy. This connects memory to [[concepts/isolated-infrastructure]] — both are about drawing security boundaries around what data the agent can touch.

## Sources

- [[sources/2026-06-07-beginners-guide-to-learning-agentic-ai|The Beginner's Guide to Learning Agentic AI]] — memory as a core agent building block; context retention enabling multi-step task completion
- [[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou|Why More Context Makes Your Agent Dumber]] — Nupur Sharma on working vs persistent memory, ADHD analogy, chunking, and checkpoint-based memory
- [[sources/2026-06-09-how-we-solved-context-management-in-agents|How we solved Context Management in Agents]] — Sally-Ann Delucia (Arize) on smart-truncation memory, retrievable omitted context, and the gap between session memory and long-term memory
- [[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think|The best AI agents are simpler than you think]] — Zack Reno Wedeen on Sierra's first-class memory primitive: implicit/explicit storage, authentication-gated retrieval, CRM integration, and the business impact of remembering customers across interactions
