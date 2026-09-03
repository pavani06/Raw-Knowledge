---
title: "Anthropic"
type: entity
entity_type: company
aliases: []
tags: [ai, llm]
source_count: 3
last_updated: 2026-09-02
relates-to: ["[[entities/claude-code]]", "[[entities/agent-sdk]]"]
part-of: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]", "[[sources/2026-09-02-the-prompting-playbook]]"]
---

# Anthropic

AI company behind the Claude model family, [[entities/claude-code|Claude Code]], and the
[[entities/agent-sdk|Agent SDK]]. The workshop's presenters (Ash & Andrew) are engineers on
its applied AI team, and the talk covers Anthropic's research and product evolution around
[[concepts/long-running-agents]].

## Mentioned In

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — host org; covers its model releases (Sonnet/Opus 3.7 → 4.6), [[concepts/agent-harness]] research, [[concepts/design-taste-rubric]] post-training, and culture of reading traces by hand
- [[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt|Agent Frameworks Considered Harmful — Rémi Louf, .txt]] — Opus 4.6 as the "step function" that made agents really good (late 2025); criticized for weak structured outputs (~20% of events rejected in the kernel's early runs) and for not sharing thinking traces
- [[sources/2026-09-02-the-prompting-playbook|The Prompting Playbook]] — host org (Claude channel, applied AI engineer, London): prompting best practices on Claude models, including the Sonnet 4.6 vs. Opus 4.7 vs. adaptive thinking comparison and tool integration for reliable calculation
