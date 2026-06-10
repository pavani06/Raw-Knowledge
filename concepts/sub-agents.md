---
title: "Sub-Agents"
type: concept
aliases: ["sub-agents", "sub agents", "subagents", "custom sub-agents"]
tags: [ai, agents, llm, architecture]
source_count: 7
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/agent-teams]]", "[[concepts/generator-evaluator-pattern]]", "[[concepts/context-window-management]]", "[[concepts/reviewer-agents]]", "[[concepts/research-plan-implement]]", "[[concepts/micro-agents]]", "[[concepts/smart-truncation]]", "[[concepts/agent-memory]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]", "[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]", "[[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]", "[[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]", "[[sources/2026-06-09-12-factor-agents]]", "[[sources/2026-06-09-how-we-solved-context-management-in-agents]]"]
---

# Sub-Agents

Delegated agents the main agent loop spawns to handle specific tasks, each with its own
context window. A core primitive of the [[entities/agent-sdk|Agent SDK]] and the building
block for both [[concepts/agent-teams]] and the [[concepts/generator-evaluator-pattern]]
(where the evaluator/QA role is just a sub-agent with a harsh system prompt).

## Key Insights

- Running many sub-agents became **economical** with Haiku 4.5 / Opus 4.5, unlocking
  multi-agent harnesses ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Custom sub-agents are already a shipped primitive — give one a harsh system prompt and a
  detailed rubric and you have an evaluator/QA role
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Giving each role its own context window is the essence of the
  [[concepts/planner-generator-evaluator-architecture]] — "we just gave each role its own
  context window" ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

### From Harness Engineering (Ryan Lopopolo, OpenAI)

- **[[concepts/reviewer-agents|Reviewer agents]] as sub-agents** — persona-based reviewer agents (front-end architect, reliability engineer, etc.) are sub-agents triggered on every push; each has its own context window and a system prompt defining its review persona ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Sub-agents for CI** — roughly a third of Ryan's token budget runs in CI as sub-agents doing security review, reliability review, and QA plan validation on every push ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **The dream: 50 agents running 24/7** — the goal is to define work well enough that agents run continuously without requiring human interaction; each required "continue" click is a harness failure ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

### From AI Coding Workflow (Matt Pocock)

- **Explore sub-agent burns tokens in isolation** — Matt's explore sub-agent runs on Opus,
  consumes ~93K tokens reading the codebase, and reports a summary back to the main context;
  the key insight is that the sub-agent's token burn stays out of the main context window
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **[[entities/sandcastle|Sandcastle]] as parallel sub-agent orchestrator** — Sandcastle
  dispatches multiple AFK agent loops in parallel Docker sandboxes, each working on a
  separate [[concepts/kanban-for-agents|Kanban issue]]; this is sub-agents at the
  parallelization layer, not just the delegation layer
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Sub-agents for [[concepts/human-in-loop-vs-afk|AFK implementation]]** — the AFK
  classification maps directly onto sub-agent delegation: tasks classified as AFK are
  handed to sub-agents; tasks classified as human-in-loop stay in the main session
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

### From No Vibes Allowed (Dex Horthy, HumanLayer)

- **Sub-agents are for controlling context, not anthropomorphizing roles** — "if you have a
  front-end sub-agent and a backend sub-agent and a QA sub-agent and a data-scientist
  sub-agent, please stop. Sub-agents are not for anthropomorphizing roles. They are for
  controlling context." The whole point is the separate context window, not the persona
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Fork-out-and-return-succinct** — a sub-agent forks a new context window to do all the
  reading, searching, and codebase understanding, then returns a *really succinct* message up
  to the parent ("the file you want is here"); the parent reads one file and gets straight to
  work. The expensive exploration never pollutes the parent's
  [[concepts/smart-zone-dumb-zone|smart zone]]
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Sub-agents power on-demand research** — a good research prompt launches sub-agents to take
  [[concepts/vertical-slices|vertical slices]] through the codebase, building the
  [[concepts/research-plan-implement|research]] doc that compresses truth
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **[[concepts/compaction|Frequent intentional compaction]] is the layer above sub-agents** —
  sub-agents control context per-task; RPI wraps the whole workflow in compaction so the
  context stays small end-to-end
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).

> [!inference] Dex's "context not roles" rule resolves a common confusion in the
> [[concepts/agent-teams]] vs. sub-agents distinction: persona-flavored sub-agents (like
> [[concepts/reviewer-agents]]) are fine *because* each persona gets its own context window —
> the persona is a side effect of the context split, never the reason for it.

### From More Context Makes Your Agent Dumber (Nupur Sharma, Qodo)

- **Specialized sub-agents save context** — a coding agent, a security agent, and a review
  agent each carry their own smaller static prompts and focus areas. Breaking a monolithic
  agent into specialized sub-agents saves tokens because each sub-agent's base prompt is
  scoped to its domain rather than covering everything ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Monolithic agents suffer from instruction clash** — when multiple concerns (security,
  review, coding) share one agent with one context window, instructions clash and the agent
  fails to prioritize correctly. Separate context windows for separate concerns eliminate
  this conflict ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).

> [!inference] This source adds a **token-economics** argument for sub-agents that
> complements Dex's "context control" argument: specialized sub-agents don't just isolate
> context — they *reduce total token consumption* because each sub-agent's static prompt is
> smaller than a monolithic agent's combined prompt would be.

### From 12-Factor Agents (Dex Horthy, HumanLayer)

- **Micro-agents as the architectural application** — sub-agents are the mechanism (separate
  context windows); [[concepts/micro-agents]] are the architectural pattern (small 3-10 step
  loops in deterministic DAGs). Dex advocates for sprinkling tiny agent moments into mostly
  deterministic pipelines ([[sources/2026-06-09-12-factor-agents]]).
- **Sub-agents at HumanLayer** — the deploy bot spawns small agent loops for specific
  decisions (deploy frontend or backend first?) within an otherwise deterministic CI/CD
  pipeline. "100 tools, 20 steps, easy" — each step is a focused sub-agent with manageable
  context and clear responsibility ([[sources/2026-06-09-12-factor-agents]]).

> [!inference] Dex's two talks present a layered view of sub-agents: the RPI talk
> ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]])
> focused on sub-agents as a **context-control mechanism** (fork-out-and-return-succinct).
> The 12-Factor talk focuses on sub-agents as the **building block of micro-agent
> architecture** (small loops in deterministic DAGs). Together, they form a complete
> picture: sub-agents are *how* you implement micro-agents.

### From Context Management in Agents (Sally-Ann Delucia, Arize)

- **Heavy data belongs outside the main conversation** — [[entities/alex|Alex]] moved trace search and data-intensive operations into sub-agents so the main agent kept only chat history plus light context ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Delegation as context routing** — the main agent delegates to a sub-agent, the sub-agent holds the heavy data and intermediate reasoning, then returns the result to the main conversation ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Sub-agents became the fallback pattern** — when huge context still breaks provider limits, Arize keeps returning to sub-agents: break work apart and let different parts of the system own different context ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).

> [!inference] Arize's production story reinforces the existing ontology's thesis that sub-agents are primarily a context-management primitive. The novelty is the data-plane split: sub-agents are not only for codebase exploration or role separation, but for isolating trace/search data so the user-facing conversation remains coherent.

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — Agent SDK primitives + closing how-to-build-your-own section
- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — reviewer agents as sub-agents; CI sub-agents; 50-agent-24/7 vision
- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — explore sub-agent pattern; Sandcastle parallel dispatch; AFK classification as sub-agent delegation
- [[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases|No Vibes Allowed: Solving Hard Problems in Complex Codebases — Dex Horthy, HumanLayer]] — "context not roles"; fork-out-and-return-succinct pattern; sub-agents powering on-demand research
- [[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou|Why More Context Makes Your Agent Dumber]] — Nupur Sharma on specialized sub-agents saving context via smaller static prompts; instruction clash in monolithic agents
- [[sources/2026-06-09-12-factor-agents|12-Factor Agents: Patterns of reliable LLM applications]] — Dex Horthy on micro-agents as the architectural pattern built on sub-agents; HumanLayer deploy bot as case study; 3-10 step agent loops in deterministic DAGs
- [[sources/2026-06-09-how-we-solved-context-management-in-agents|How we solved Context Management in Agents]] — Sally-Ann Delucia (Arize) on delegating trace/search-heavy work to sub-agents while the main conversation keeps light context
