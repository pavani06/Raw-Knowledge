---
title: "Micro-Agents"
type: concept
aliases: ["micro-agents", "micro agents", "small focused agents", "small agents"]
tags: [ai, agents, llm, architecture, context]
source_count: 1
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/12-factor-agents]]"]
defines: []
relates-to: ["[[concepts/sub-agents]]", "[[concepts/context-window-management]]", "[[concepts/agent-harness]]", "[[concepts/smart-zone-dumb-zone]]"]
contradicts: []
supports: []
extends: ["[[concepts/sub-agents]]"]
sources: ["[[sources/2026-06-09-12-factor-agents]]"]
---

# Micro-Agents

An architectural pattern for reliable agents: **small, focused agent loops (3-10 steps)
embedded inside mostly deterministic DAGs**, rather than monolithic agents that attempt to
handle everything in one large autonomous loop. Factor 10 of the
[[concepts/12-factor-agents]] framework.

The core insight: the naive agent loop (event → prompt → tool call → append → repeat)
doesn't work at scale. What *does* work is keeping most of your pipeline deterministic and
sprinkling in tiny, well-scoped agent moments only where the model adds unique value —
typically turning natural language into structured JSON that feeds the next deterministic
step.

> [!inference]
> Micro-agents are the **architectural pattern**; [[concepts/sub-agents|sub-agents]] are the
> **mechanism** (separate context windows). A micro-agent *uses* sub-agents for context
> isolation, but the micro-agent concept is about *where and how* to insert the agent into
> your workflow — not about the context-isolation primitive that powers it.

## Key Insights

- **Mostly deterministic, partially agentic** — the winning pattern is a deterministic
  DAG with small 3-10 step agent loops inserted at specific decision points, not a
  fully autonomous agent that plans its own path
  ([[sources/2026-06-09-12-factor-agents]]).
- **HumanLayer's deploy bot as a case study** — their deploy pipeline is deterministic
  CI/CD until the PR is merged; then a micro-agent decides deploy order (frontend vs.
  backend), gets human approval, executes, and hands back to deterministic end-to-end
  tests. A separate rollback micro-agent handles failures. "100 tools, 20 steps, easy"
  ([[sources/2026-06-09-12-factor-agents]]).
- **Manageable context is the reason it works** — by scoping each agent loop to 3-10
  steps, context stays well within the [[concepts/smart-zone-dumb-zone|smart zone]] and
  each agent has a clear, single responsibility
  ([[sources/2026-06-09-12-factor-agents]]).
- **Over time, the agents grow** — start with deterministic workflows; gradually let
  agents handle bigger sub-tasks as models improve, until eventually whole endpoints or
  pipelines run via agents. But you still engineer reliability into the system, rather
  than trusting the model ([[sources/2026-06-09-12-factor-agents]]).
- **Find the bleeding edge** — per the NotebookLM team: find tasks right at the boundary
  of what the model can do reliably, then engineer reliability into your system to make
  it work consistently. This creates a competitive moat
  ([[sources/2026-06-09-12-factor-agents]]).

## Sources

- [[sources/2026-06-09-12-factor-agents|12-Factor Agents: Patterns of reliable LLM applications]] — Dex Horthy's talk; micro-agents as Factor 10; HumanLayer deploy bot case study; the progressive-agents vision

