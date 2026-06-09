---
title: "Agent State Management"
type: concept
aliases: ["agent state management", "agent state", "execution state", "business state", "non-volatile state", "pause and resume"]
tags: [ai, agents, llm, state, infrastructure]
source_count: 1
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/12-factor-agents]]", "[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/context-window-management]]", "[[concepts/agent-memory]]", "[[concepts/file-system-state]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-09-12-factor-agents]]"]
---

# Agent State Management

The discipline of owning and managing both **execution state** and **business state**
in agent workflows, enabling pause, resume, and long-running operation. Factors 6 and 7
of the [[concepts/12-factor-agents]] framework.

Two categories of state:
- **Execution state** — current step, next step, retry counts, loop position. The
  DAG-orchestration metadata that tools like Airflow or Prefect provide.
- **Business state** — messages exchanged, data displayed to users, items awaiting
  approval. The domain-specific data the agent is reasoning about.

The key operational capability this unlocks is **pause and resume**: serialize the
context window to a database, let a long-running tool complete asynchronously, then
rehydrate and continue — the agent doesn't even know things happened in the background.

## Key Insights

- **Put your agent behind a REST API or MCP server** — normal requests come in, you load
  the context window, the agent calls a long-running tool, you serialize state to a
  database, and when the tool completes it calls back with a state ID to resume
  ([[sources/2026-06-09-12-factor-agents]]).
- **Own the inner loop** — building reliable agents requires flexibility in how
  execution state, context building, and tool dispatch fit together. Owning the loop
  means you can break, switch, summarize, or invoke an LLM-as-judge at any point
  ([[sources/2026-06-09-12-factor-agents]]).
- **Agents should be stateless reducers** — the agent itself is stateless (like a
  reducer or transducer); you own and manage all state externally. This is still an
  active area of abstraction design: "we're all still finding the right abstractions"
  ([[sources/2026-06-09-12-factor-agents]]).
- **Software engineering, not AI magic** — "agents are just software, so let's build
  software. Put it behind a REST API. Manage that loop. Launch, pause, resume like any
  standard API" ([[sources/2026-06-09-12-factor-agents]]).

> [!inference]
> Agent state management bridges [[concepts/context-window-management]] and
> [[concepts/agent-memory]]: the context window is *working* state (volatile, per-step),
> while non-volatile state management is *persistent* state that survives across steps
> and sessions. The pause/resume pattern makes the agent durable without requiring the
> model itself to manage state.

## Sources

- [[sources/2026-06-09-12-factor-agents|12-Factor Agents: Patterns of reliable LLM applications]] — Dex Horthy on execution vs. business state, pause/resume via database serialization, and agents as stateless reducers

