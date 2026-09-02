---
title: "Codex"
type: entity
entity_type: tool
aliases: ["codex", "openai codex", "codeex"]
tags: [ai, llm, agents, coding, tool]
source_count: 2
last_updated: 2026-09-02
relates-to: ["[[entities/openai]]", "[[entities/claude-code]]"]
part-of: []
sources: ["[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]", "[[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]"]
---

# Codex

[[entities/openai|OpenAI]]'s coding agent — the primary [[concepts/agent-harness|harness]] Ryan Lopopolo's team uses for all implementation work. In Ryan's setup, Codex is the **entry point** to the development process: tickets go in, Codex executes, humans steer via skills, guardrails, and reviewer agents.

The team's philosophy is "outside-in" — Codex is the entry point the same way a human engineer would be, and the repository is structured around making Codex's job easy (skills that teach it how to launch the app, spin up observability, attach Chrome DevTools, etc.) rather than building a shell environment that Codex gets spawned into.

OpenAI post-trains Codex *in the context of the harness* — the apply-patch tool, bash tool semantics, and other harness-specific behaviors are in the training loop, creating leverage for teams that use Codex directly rather than building custom harnesses from scratch.

> Note: auto-captions in the transcript render this as "codeex" or "CEX" — it is **Codex**.

- **Its chat surface is not the model's view** — the live Codex session "is kind of a lie":
  compaction and unshared thinking traces mean the TUI does not show exactly what the model
  saw — the motivation for content-addressed prompt records
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Cron jobs without events** — Codex offers scheduled runs ("that's what's available in
  Codex today"), but cron only covers *when*; it lacks the event subscriptions the kernel
  story treats as the real trigger model
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Good enough to build a runtime** — the first version of the [[concepts/agent-kernel|
  agent kernel]] was written with Codex in about a day
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

## Mentioned In

- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — the primary coding agent in Ryan's [[concepts/harness-engineering]] setup; described in detail during the workflow walkthrough and Q&A
- [[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt|Agent Frameworks Considered Harmful — Rémi Louf, .txt]] — build tool for the kernel's first version; cron-only scheduling; chat surface that hides true model input
