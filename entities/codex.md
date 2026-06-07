---
title: "Codex"
type: entity
entity_type: tool
aliases: ["codex", "openai codex", "codeex"]
tags: [ai, llm, agents, coding, tool]
source_count: 1
last_updated: 2026-06-07
relates-to: ["[[entities/openai]]", "[[entities/claude-code]]"]
part-of: []
sources: ["[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]"]
---

# Codex

[[entities/openai|OpenAI]]'s coding agent — the primary [[concepts/agent-harness|harness]] Ryan Lopopolo's team uses for all implementation work. In Ryan's setup, Codex is the **entry point** to the development process: tickets go in, Codex executes, humans steer via skills, guardrails, and reviewer agents.

The team's philosophy is "outside-in" — Codex is the entry point the same way a human engineer would be, and the repository is structured around making Codex's job easy (skills that teach it how to launch the app, spin up observability, attach Chrome DevTools, etc.) rather than building a shell environment that Codex gets spawned into.

OpenAI post-trains Codex *in the context of the harness* — the apply-patch tool, bash tool semantics, and other harness-specific behaviors are in the training loop, creating leverage for teams that use Codex directly rather than building custom harnesses from scratch.

> Note: auto-captions in the transcript render this as "codeex" or "CEX" — it is **Codex**.

## Mentioned In

- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — the primary coding agent in Ryan's [[concepts/harness-engineering]] setup; described in detail during the workflow walkthrough and Q&A
