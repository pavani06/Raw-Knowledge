---
title: "Typed Agent Boundaries"
type: concept
aliases: ["typed agent boundaries", "typed tool calls", "typed events", "typed boundaries"]
tags: [ai, agents, reliability, architecture, structured-output]
source_count: 1
last_updated: 2026-09-02
parent: []
part-of: ["[[concepts/agent-kernel]]"]
defines: []
relates-to: ["[[concepts/structured-output]]", "[[concepts/tool-use]]", "[[concepts/event-driven-agents]]"]
contradicts: []
supports: []
extends: ["[[concepts/structured-output]]"]
sources: ["[[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]"]
---

# Typed Agent Boundaries

The two contracts between agents and the world, both typed and both **non-negotiable**:

1. **Typed tool calls** — the agent↔tool boundary: you don't want to call tools that don't
   exist or pass malformed arguments.
2. **Typed events** — the agent↔agent boundary: every event crossing between agents has a
   schema ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

The kernel's job statement follows from this: **make bad actions impossible, not just
unlikely** — validation happens at the boundary so an ill-typed event or tool call cannot
enter the system, rather than being caught after the damage
([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

## Key Insights

- **A lot of errors come just from this** — untyped boundaries were a primary error source
  in the first week of operation; typing them eliminated a whole failure class
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **The origin story is provider quality** — the boundary machinery exists because
  Anthropic "was terrible at structured outputs": ~20% of events were wrong and rejected by
  the system, which pushed [[entities/txt|.txt]] (structured-outputs specialists for three
  years) to build its own stack — a big dogfooding project
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Structured output is the enabling primitive** — typed events and tool calls are just
  [[concepts/structured-output|NL→JSON]] enforced at the boundary; the voice-note agent
  "uses structured outputs" to produce its typed output event
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

> [!inference] Typed boundaries relocate reliability from prompts (asking the model to
> behave) to contracts (making misbehavior unrepresentable). This is the runtime analogue
> of type systems at API boundaries — and it explains why the talk's verdict on frameworks
> is structural: a framework cannot give you boundary typing if your agents live inside its
> abstractions instead of behind the kernel's envelope.

## Sources

- [[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt|Agent Frameworks Considered Harmful — Rémi Louf, .txt]] — typed tool calls and typed events as non-negotiable; "impossible, not just unlikely"; the 20%-rejected-events origin story
