---
title: "Tool Use"
type: concept
aliases: ["tool use", "tool calling", "agent tools", "external tools", "tool integration"]
tags: [ai, agents, llm, tools, architecture]
source_count: 2
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/agentic-ai]]"]
defines: []
relates-to: ["[[concepts/agentic-ai]]", "[[concepts/agent-planning]]", "[[concepts/programmatic-tool-calling]]", "[[concepts/react-pattern]]", "[[concepts/agent-harness]]", "[[entities/model-context-protocol]]", "[[concepts/sequential-tool-calling]]"]
contradicts: []
supports: ["[[concepts/agentic-ai]]"]
extends: []
sources: ["[[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]", "[[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]"]
---

# Tool Use

The capability that lets an [[concepts/agentic-ai|AI agent]] reach beyond its context
window and **interact with the external world** — calling search engines, reading and
writing files, hitting APIs, running code, or invoking any other external capability.

Tool use is what gives an agent its "body": without it, the agent can only reason and
generate text; with it, the agent can gather information, take actions, and produce
real-world effects.

Common tool categories:
- **Search** — web search, document retrieval, knowledge base lookup
- **Files** — read, write, and organize documents and data
- **APIs** — call external services (calendars, databases, messaging, etc.)
- **Code execution** — run scripts, compute results, test outputs
- **Browser** — navigate web pages, fill forms, extract content

## Key Insights

- **Tool use is what separates agents from LLMs** — an LLM can describe how to search the
  web; an agent can actually do it. See [[concepts/llm-vs-agents]]
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- **Beginner failure mode: too many tools at once** — each tool adds complexity and failure
  surface; start with the minimum set needed for the task
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- **Tool selection is part of planning** — at each step the agent must choose the right
  tool or action; this is the decision-making component of [[concepts/agent-planning]]
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- **Advanced pattern** — [[concepts/programmatic-tool-calling]] is the production-grade
  form of tool use: the agent writes code that chains multiple tool calls and returns only
  the final result, keeping intermediate output out of the context window
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- **Standardized via [[entities/model-context-protocol|MCP]]** — the Model Context Protocol
  provides a standard interface for connecting agents to tools, avoiding bespoke
  integrations for each tool type.

> [!inference]
> Tool use is the mechanism; [[concepts/programmatic-tool-calling]] is the optimization.
> Beginners should understand tool use conceptually before worrying about how to keep tool
> output out of the context window.

### From More Context Makes Your Agent Dumber (Nupur Sharma, Qodo)

- **Poor tool definition as a failure mode** — when tools lack stop conditions, the agent
  loops indefinitely: search → find something → "is it enough?" → search again. This is one
  of the four primary agent failure modes ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Input constraints** — limit results per tool call (e.g. "search for 2, stop at 3") to
  prevent runaway retrieval loops ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **[[concepts/sequential-tool-calling|Sequential tool calling]]** — define the order of tool
  invocation: first search documentation, then summarize, then query the database. Ordered
  execution is more efficient than dumping all tools at once ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Hybrid retrieval** — run semantic search first for relevance, then keyword search on top
  for precision; refine results rather than accepting the first retrieval ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Many small tools > one giant tool** — decompose complex tooling into small,
  single-purpose tools that chain together predictably ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).

## Sources

- [[sources/2026-06-07-beginners-guide-to-learning-agentic-ai|The Beginner's Guide to Learning Agentic AI]] — tool usage as a core agent building block; tool selection as part of the execution loop; beginner advice on limiting tool scope
- [[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou|Why More Context Makes Your Agent Dumber]] — Nupur Sharma on poor tool definition, tool loops, input constraints, sequential tool calling, and hybrid retrieval
