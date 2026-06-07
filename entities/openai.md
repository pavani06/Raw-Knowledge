---
title: "OpenAI"
type: entity
entity_type: company
aliases: ["openai", "open ai"]
tags: [ai, llm, company]
source_count: 1
last_updated: 2026-06-07
relates-to: ["[[entities/anthropic]]", "[[entities/codex]]"]
part-of: []
sources: ["[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]"]
---

# OpenAI

AI company behind GPT models, [[entities/codex|Codex]], and the broader ecosystem of tools Ryan Lopopolo used to pioneer [[concepts/harness-engineering|harness engineering]]. Ryan is a member of technical staff at OpenAI who spent nine months building software exclusively with agents, banning his team from touching editors directly.

OpenAI's post-training process for coding agents (like Codex) includes training the model *in the context of the harness* — meaning the apply-patch tool, bash tool quoting semantics, and other harness-specific behaviors are in the loop during post-training. This creates leverage for teams that depend on first-party harnesses directly.

## Mentioned In

- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — Ryan's employer; context for the scale and practices described (token billionaire, billion output tokens/day, internal agent tooling)
