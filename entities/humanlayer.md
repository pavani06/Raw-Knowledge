---
title: "HumanLayer"
type: entity
entity_type: company
aliases: ["HumanLayer", "Human Layer"]
tags: [ai, agents, coding-agents, llm]
source_count: 2
last_updated: 2026-06-09
relates-to: ["[[entities/claude-code]]", "[[entities/codex]]", "[[entities/a2-protocol]]"]
part-of: []
sources: ["[[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]", "[[sources/2026-06-09-12-factor-agents]]"]
---

# HumanLayer

An AI company building an **agentic IDE** to help teams of all sizes "speedrun the journey to
99% AI-generated code." HumanLayer is the originator of the [[concepts/research-plan-implement|research-plan-implement
(RPI)]] workflow and the open-source research/plan/implement prompt system that went viral on
HackerNews. Its approach centers on [[concepts/context-window-management|context engineering]]:
keeping coding agents in the [[concepts/smart-zone-dumb-zone|smart zone]] via
[[concepts/compaction|intentional compaction]] so AI works in [[concepts/brownfield-codebases|brownfield
codebases]] without slop.

The "12 Factor Agents" talk (AI Engineer, June) — which popularized framing around context
engineering — came from the same team.

The company is also developing the [[entities/a2-protocol|A2 protocol]] for standardizing
agent-human contact, and `create-12-factor-agent`, a scaffolding tool (modeled after
shadcn/ui) for bootstrapping agents that follow the [[concepts/12-factor-agents]] framework.

## Mentioned In

- [[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases|No Vibes Allowed: Solving Hard Problems in Complex Codebases]] — Dex Horthy's talk; HumanLayer's RPI methodology, viral open-source prompts, eight-week internal rewire, and the agentic-IDE product they're hiring for
- [[sources/2026-06-09-12-factor-agents|12-Factor Agents: Patterns of reliable LLM applications]] — Dex Horthy's talk introducing the 12-Factor Agents framework; A2 protocol and create-12-factor-agent tooling; open-source GitHub repo (4,000+ stars, 14 contributors); vision for tools that scaffold non-AI hard parts
