---
title: "Harness Engineering"
type: concept
aliases: ["harness engineering", "humans steer agents execute", "agent-driven development"]
tags: [ai, agents, llm, software-engineering, methodology, coding-agents]
source_count: 4
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/context-window-management]]"]
defines: ["[[concepts/non-functional-requirements]]", "[[concepts/garbage-collection-day]]", "[[concepts/reviewer-agents]]"]
relates-to: ["[[concepts/agent-harness]]", "[[concepts/code-as-free-resource]]", "[[concepts/codebase-uniformity]]", "[[concepts/prompt-injection-patterns]]", "[[concepts/skills-progressive-disclosure]]", "[[concepts/research-plan-implement]]", "[[concepts/12-factor-agents]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]"]
extends: ["[[concepts/agent-harness]]"]
sources: ["[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]", "[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]", "[[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]", "[[sources/2026-06-09-12-factor-agents]]"]
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

### From No Vibes Allowed (Dex Horthy, HumanLayer)

- **Harness engineering is part of context engineering** — Dex offers "harness engineering"
  as the hypey word for how you integrate with the integration points on Codex / Claude /
  Cursor and customize your codebase; he explicitly nests it *under*
  [[concepts/context-window-management|context engineering]], not above it
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **The real moat is workflow/SDLC adaptation, not the coding agent** — Dex predicts the
  coding-agent layer gets commoditized; the hard, durable problem is adapting your team and
  SDLC to a world where 99% of code is shipped by AI
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **The seniority rift** — staff engineers under-adopt AI (it doesn't speed them up much),
  junior/mid-levels over-use it (it fills skill gaps but produces slop), and seniors burn out
  cleaning up the slop. Cultural change must come from the top: "pick one tool and get some
  reps" ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Don't min-max across tools** — Dex recommends *against* spreading reps thin across Claude,
  Codex, and Cursor; pick one and build mastery
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).

> [!contradiction] Where harness engineering sits in the hierarchy
> Ryan Lopopolo (source 1) presents *harness engineering* as the top-level named methodology,
> with context management as one of its concerns. Dex Horthy (source 3) inverts this:
> *context engineering* is the root field and harness engineering is "part of" it. Resolution:
> they're naming the same elephant from different ends — Ryan from the team/operational angle,
> Dex from the context/token angle. Both agree the load-bearing skill is managing context and
> specifying work; the label hierarchy is a framing choice (see [[concepts/semantic-diffusion]]).

### From 12-Factor Agents (Dex Horthy, HumanLayer)

- **Agents are just software** — the talk's thesis directly reinforces harness engineering:
  "You all can build software. Anyone ever written a switch statement before? While loop?
  Yeah. So we can do this stuff." The harness is the software around the LLM
  ([[sources/2026-06-09-12-factor-agents]]).
- **The 12-Factor Agents framework as harness engineering codified** — the 12 factors are
  essentially a catalog of harness patterns. Factor 5 (own your control flow) and Factor 6
  (manage execution/business state) are pure harness engineering: own the loop, own the
  state, own the context building ([[sources/2026-06-09-12-factor-agents]]).
- **Frameworks should handle non-AI hard parts** — a refinement of the harness engineering
  thesis: tools should scaffold infrastructure, state management, and human contact so
  builders can focus on prompts, context, and eval. See
  [[concepts/frameworks-vs-libraries]] ([[sources/2026-06-09-12-factor-agents]]).
- **LLMs are stateless pure functions** — the simplest, most important harness principle:
  token in, token out. Everything else is the harness around that pure function
  ([[sources/2026-06-09-12-factor-agents]]).

## Sources

- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — Ryan Lopopolo's keynote + Q&A; the primary source defining this methodology
- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — Matt's full workflow as harness engineering; software engineering fundamentals as harness principles; feedback loops and deep modules as harness infrastructure
- [[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases|No Vibes Allowed: Solving Hard Problems in Complex Codebases — Dex Horthy, HumanLayer]] — harness engineering as "part of context engineering"; coding-agent commoditization; the seniority rift; pick-one-tool-and-get-reps
- [[sources/2026-06-09-12-factor-agents|12-Factor Agents: Patterns of reliable LLM applications]] — Dex Horthy on agents as software; the 12 factors as harness patterns; frameworks should handle non-AI hard parts; LLMs as stateless pure functions
