---
title: "Harness Engineering"
type: concept
aliases: ["harness engineering", "humans steer agents execute", "agent-driven development"]
tags: [ai, agents, llm, software-engineering, methodology, coding-agents]
source_count: 2
last_updated: 2026-06-07
parent: []
part-of: []
defines: ["[[concepts/non-functional-requirements]]", "[[concepts/garbage-collection-day]]", "[[concepts/reviewer-agents]]"]
relates-to: ["[[concepts/agent-harness]]", "[[concepts/code-as-free-resource]]", "[[concepts/codebase-uniformity]]", "[[concepts/prompt-injection-patterns]]", "[[concepts/skills-progressive-disclosure]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]"]
extends: ["[[concepts/agent-harness]]"]
sources: ["[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]", "[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
---

# Harness Engineering

A named methodology for building software in the agent era: **humans steer, agents execute**. The engineer's role shifts from writing code to defining work, specifying quality bars, building guardrails, and removing blockers — so that a team of agents can run autonomously toward completion.

Coined and practiced by Ryan Lopopolo at [[entities/openai|OpenAI]], who banned his team from touching editors directly, requiring all implementation to flow through agents ([[entities/codex|Codex]]). The core axiom is [[concepts/code-as-free-resource|code is free]] — implementation is no longer the scarce resource. The scarce resources are **human time**, **human and model attention**, and **model context window**.

The [[concepts/agent-harness|agent harness]] is the technical substrate; harness engineering is the *operational discipline* built on top of it — the team practices, documentation culture, and feedback loops that make the harness self-improving.

## Key Insights

- **Every human interaction with the agent is a harness failure** — if you must type "continue," the harness failed to provide enough context for autonomous completion ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **The engineer's new role is staff engineer at scale** — you have as many team members as you can drive concurrently; your job is to look 1 day / 1 week / 6 months ahead and build structures that productively deploy this capacity ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Skill sets shift toward systems thinking, system design, and delegation** — not away from engineering, but toward higher-leverage engineering ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **The important thing is not the code but the prompt and the guardrails that got you there** — ADRs, persona-oriented docs, ticket history, and code review logs are the process artifacts that must be made legible to agents ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Harness engineering is not over-engineering** — the goal is the bare minimum context management needed for the agent to do an acceptable job; avoid frontloading all instructions ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **The "bitter lesson" guard**: build harnesses around things that won't be obsoleted by model capability increases — context management and requirement specification will always be needed ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Token budget split**: roughly a third each on planning/ticket curation, documentation/implementation, and CI-running agents ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

> [!inference]
> Harness engineering is essentially the operationalization of the [[concepts/agent-harness]] concept into a team practice. Where "agent harness" describes the technical artifact, "harness engineering" describes the human discipline of building, maintaining, and evolving that artifact — including the cultural norms (no editors, garbage collection day, persona docs) that make it work.

### From AI Coding Workflow (Matt Pocock)

- **Full workflow as harness engineering** — Matt's grill → PRD → Kanban → AFK loop → QA
  cycle is a concrete harness engineering methodology; the [[concepts/grill-me-skill]] and
  [[concepts/shared-design-concept]] are the planning-phase harness; [[entities/sandcastle|Sandcastle]]
  and [[concepts/ralph-loop]] are the execution-phase harness
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Software engineering fundamentals as harness principles** — Matt's thesis is that classic
  software engineering books (Pragmatic Programmer, Philosophy of Software Design) contain
  the best guidance for harness engineering; the paradigm is new but the principles are not
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **[[concepts/feedback-loops]] as harness infrastructure** — tests, types, and linters are
  the quality-enforcement layer of the harness; without them, the harness can only fail
  silently. The quality of the feedback loops is the quality ceiling of the harness
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **[[concepts/deep-modules]] as harness architecture** — designing large, simple-interface
  modules is the architectural expression of harness engineering: the human owns the
  interface (steering), the agent implements the internals (executing)
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

## Sources

- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — Ryan Lopopolo's keynote + Q&A; the primary source defining this methodology
- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — Matt's full workflow as harness engineering; software engineering fundamentals as harness principles; feedback loops and deep modules as harness infrastructure
