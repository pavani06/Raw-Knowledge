---
title: "Agent Teams"
type: concept
aliases: ["agent teams", "agent team"]
tags: [ai, agents, llm, architecture]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/sub-agents]]", "[[concepts/generator-evaluator-pattern]]"]
contradicts: []
supports: []
extends: ["[[concepts/sub-agents]]"]
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Agent Teams

A [[entities/claude-code|Claude Code]] feature (shipped with Opus/Sonnet 4.6) for
scaffolding your own set of custom agents. Its innovation over plain [[concepts/sub-agents]]:
sub-agents can **communicate with each other directly** and coordinate, reporting back to
the main agent only when required — rather than everything funneling through the main agent.

## Key Insights

- Released alongside the 4.6 models as a more general-purpose way to scaffold custom agents
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- The [[concepts/generator-evaluator-pattern]] is described as a **subset** of the
  agent-teams approach — e.g. classic front-end / back-end / integration sub-agents could
  each be paired with their own critic
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Adopted heavily internally; the speakers note Anthropic regularly *un-ships* things too,
  so it isn't presented as a permanent answer
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — history tour + Q&A on agent teams vs. generator/critic
