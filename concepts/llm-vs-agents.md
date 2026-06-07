---
title: "LLM vs. Agents"
type: concept
aliases: ["llm vs agents", "LLM vs AI agents", "agents vs LLMs", "language model vs agent"]
tags: [ai, agents, llm, architecture, fundamentals]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/agentic-ai]]"]
defines: []
relates-to: ["[[concepts/agentic-ai]]", "[[concepts/agent-harness]]", "[[concepts/tool-use]]", "[[concepts/agent-planning]]"]
contradicts: []
supports: ["[[concepts/agentic-ai]]"]
extends: []
sources: ["[[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]"]
---

# LLM vs. Agents

The clearest one-line distinction: **an LLM can suggest; an AI agent can suggest and act.**

A **large language model (LLM)** is the component that understands and generates language.
An **AI agent** uses an LLM as its reasoning engine but wraps it with [[concepts/agent-planning|planning]],
[[concepts/tool-use|tool use]], [[concepts/agent-memory|memory]], and a
[[concepts/verification-loop|verification loop]] — enabling it to take action in the world,
not just produce text.

| Dimension | LLM | AI Agent |
|---|---|---|
| Output | Text | Text + actions |
| Scope | Single turn | Multi-step task |
| Tools | None | Search, files, APIs, … |
| Memory | Context window only | Persistent across steps |
| Autonomy | Responds | Plans and executes |

Example: ask "What is the best way to organize my study plan?" — an LLM suggests ideas; an
agent can go further and create a schedule, list tasks, and update a plan over time.

## Key Insights

- The LLM is the *brain*; the agent is the *brain + body* — the [[concepts/agent-harness]]
  is what gives the LLM a body
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- Understanding this distinction is the prerequisite for effective **prompt writing for AI
  agents** — prompts for agents must specify goals and constraints, not just questions
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- An agent *contains* an LLM — swapping the underlying model changes capability but not the
  agent architecture; this is the [[concepts/agent-harness]] co-evolution principle
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).

> [!inference]
> The LLM vs. agents distinction maps directly onto the [[concepts/harness-engineering]]
> framing: the LLM is the model; the agent is the harness + model. "Humans steer, agents
> execute" only makes sense once you understand that the agent is more than the LLM.

## Sources

- [[sources/2026-06-07-beginners-guide-to-learning-agentic-ai|The Beginner's Guide to Learning Agentic AI]] — core definition and the "suggest vs. suggest and act" framing
