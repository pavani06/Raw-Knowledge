---
title: "Agent Kernel"
type: concept
aliases: ["agent kernel", "agent runtime", "agent runtime kernel", "kernel for agents"]
tags: [ai, agents, architecture, runtime, infrastructure]
source_count: 1
last_updated: 2026-09-02
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/event-driven-agents]]", "[[concepts/content-addressed-prompts]]", "[[concepts/declarative-agent-definitions]]", "[[concepts/typed-agent-boundaries]]", "[[concepts/agent-harness]]", "[[concepts/frameworks-vs-libraries]]", "[[concepts/multi-agent-orchestration]]", "[[concepts/long-running-agents]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]"]
---

# Agent Kernel

An operating-system-like runtime for agents: the kernel **runs agent processes**, schedules
them, isolates them, and journals them with the append-only log and the agent definition.
Agents are to the kernel what processes are to an OS kernel — it does not matter what they
do internally; the system can schedule and isolate them regardless
([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

The kernel emerged bottom-up: each production failure (lost voice note, duplicate Slack
posts, unversioned prompt drift) was paid down as it appeared, and each fix became one
component of what turned out to be a runtime — the [[concepts/event-driven-agents|event]]
substrate, the [[concepts/content-addressed-prompts|content-addressed journal]], the
[[concepts/typed-agent-boundaries|typed boundaries]]. Nothing new under the sun: "it's just
good old software orchestration."

The kernel's declared job: **make bad actions impossible, not just unlikely**
([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

## Key Insights

- **Frameworks vs. kernel** — agent frameworks put your agents inside their code
  abstractions ("your agents live inside their abstractions"); the kernel inverts this:
  agents are markdown definitions in userland (optional — a frontend could skip the format
  entirely), and the kernel owns scheduling, isolation, and journaling
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Built by dogfooding, not by design** — [[entities/txt|.txt]]'s CEO built it in a
  two-week dive after the Opus 4.6 step function, as "the dumbest thing that could possibly
  work" for a morning-briefing need; a month after internal deployment it ran 20 agents,
  contributed by non-technical people too
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Old distributed-systems shopping list** — the log, the queue with attempt counting, and
  content addressing are textbook components; agent orchestration did not invent new
  problems ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

> [!inference] The agent kernel is the structural answer to
> [[concepts/frameworks-vs-libraries|Factor 12]]: instead of choosing between framework code
> you don't control and library primitives you assemble yourself, move the *runtime* concerns
> (scheduling, events, journaling, typed boundaries) into a kernel and demote agent logic to
> declarative userland files. It complements the model-facing [[concepts/agent-harness]] —
> the kernel is the substrate the harness runs on.

## Sources

- [[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt|Agent Frameworks Considered Harmful — Rémi Louf, .txt]] — the talk that proposes the kernel: origin story, architecture (log, content-addressed prompts, typed boundaries), and production results
