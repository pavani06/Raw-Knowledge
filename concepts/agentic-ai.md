---
title: "Agentic AI"
type: concept
aliases: ["agentic ai", "AI agent", "autonomous AI", "agentic systems", "agentic workflow"]
tags: [ai, agents, llm, agentic-ai, architecture]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: []
defines: ["[[concepts/agent-planning]]", "[[concepts/tool-use]]", "[[concepts/agent-memory]]", "[[concepts/react-pattern]]"]
relates-to: ["[[concepts/agent-harness]]", "[[concepts/llm-vs-agents]]", "[[concepts/human-in-loop-vs-afk]]", "[[concepts/verification-loop]]", "[[concepts/harness-engineering]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]"]
---

# Agentic AI

AI that can **take action toward a goal** — not just respond to a prompt. Where a regular
chatbot answers questions, an agentic AI system can plan, use tools, remember context across
steps, and execute multi-step tasks autonomously.

The simplest framing: a chatbot is a helpful assistant sitting at a desk; an AI agent is a
helpful assistant who can also move around the office, check files, send emails, and follow
up on tasks.

Agentic AI is built from six core building blocks:

1. **Goals** — what the agent is trying to achieve
2. **[[concepts/agent-planning|Planning]]** — deciding the steps to reach the goal
3. **[[concepts/tool-use|Tool usage]]** — calling search, files, APIs, or other external capabilities
4. **[[concepts/agent-memory|Memory]]** — remembering useful context across steps
5. **Decision-making** — choosing what to do next at each step
6. **[[concepts/human-in-loop-vs-afk|Human-in-the-loop control]]** — letting a person check or approve important steps

The execution loop: receive task → decompose into steps → choose tool/action → execute →
check result ([[concepts/verification-loop]]) → improve on feedback → repeat.

> [!inference]
> "Agentic AI" is the beginner-accessible name for what the rest of this ontology calls the
> [[concepts/agent-harness]] — the scaffolding of planning, tool use, memory, and
> verification that wraps a raw LLM and makes autonomous task completion possible.

## Key Insights

- **Action, not just generation** — the defining property is the ability to *act* on the
  world (call tools, write files, send requests), not just generate text
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- **Multi-step task handling** — agentic systems break large goals into smaller steps and
  execute them sequentially or in parallel, checking results at each stage
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- **Practical value** — automation, planning, and decision-making at scale; useful for
  support tasks, research, scheduling, and workflow automation
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- **Common workflow patterns**: Planner (creates strategy), Executor (carries out steps),
  Reflection loop (reviews and improves), [[concepts/react-pattern|ReAct]] (reasoning +
  action together), multi-step task handling
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- **Beginner failure mode**: making the first project too complex, using too many tools at
  once, skipping testing, expecting full autonomy too soon
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).

## Sources

- [[sources/2026-06-07-beginners-guide-to-learning-agentic-ai|The Beginner's Guide to Learning Agentic AI]] — foundational definition, building blocks, workflow patterns, and beginner roadmap
