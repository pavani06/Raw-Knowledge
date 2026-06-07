---
title: "Kanban for Agents"
type: concept
aliases: ["kanban for agents", "agent kanban", "parallelizable issue board", "independently-grabbable issues", "agent task board"]
tags: [ai, agents, llm, coding, workflow, parallelization, planning]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/vertical-slices]]", "[[concepts/prd-as-destination]]", "[[concepts/sub-agents]]", "[[concepts/human-in-loop-vs-afk]]", "[[concepts/ralph-loop]]", "[[concepts/context-window-management]]"]
contradicts: []
supports: ["[[concepts/sub-agents]]", "[[concepts/vertical-slices]]"]
extends: []
sources: ["[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
---

# Kanban for Agents

A parallelizable issue board where each issue is **independently grabbable** — self-contained
enough that an agent can pick it up and implement it without needing to coordinate with other
agents mid-task. Issues have explicit **blocking relationships** (this issue cannot start
until that one is done), forming a directed acyclic graph (DAG) that enables multiple agents
to work in parallel on non-blocking issues.

The Kanban board is the output of decomposing a [[concepts/prd-as-destination|PRD]] into
[[concepts/vertical-slices|vertical slices]]. Each slice becomes one issue; the blocking
relationships between slices become the DAG edges.

## Key Insights

- **Independently-grabbable issues** — each issue must be self-contained: it has a clear
  definition of done, all the context the agent needs, and no implicit dependencies on
  in-progress work by other agents ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Blocking relationships enable parallelization** — explicit "blocked by" relationships
  let multiple agents work simultaneously on independent issues; the DAG structure makes
  the parallelization safe ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **PRD → Kanban → AFK loop** — the workflow is: grill → PRD → decompose into Kanban
  issues → agents pick up issues and implement AFK. The Kanban board is the bridge between
  planning and execution ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Sandcastle parallelization** — [[entities/sandcastle|Sandcastle]] (Matt's tool) runs
  multiple AFK agent loops in parallel Docker sandboxes, each picking up one Kanban issue;
  the Kanban board is the coordination mechanism between them
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Issue quality is the bottleneck** — the quality of the Kanban issue (clarity of
  definition, completeness of context) determines the quality of the agent's output; a
  vague issue produces vague code. See [[concepts/non-functional-requirements]]
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Context window sizing** — each issue should be sized to fit within the agent's
  [[concepts/smart-zone-dumb-zone|smart zone]]; large issues that require many context
  switches should be split ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

> [!inference] Kanban for agents is the planning-phase implementation of the
> [[concepts/sub-agents]] pattern: just as sub-agents each get their own context window,
> Kanban issues each get their own agent session. The Kanban board is the coordination
> layer that makes parallel sub-agent work safe and predictable.

## Sources

- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — independently-grabbable issues; blocking relationships as DAG; PRD→Kanban→AFK workflow; Sandcastle parallelization
