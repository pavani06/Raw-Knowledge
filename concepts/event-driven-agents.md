---
title: "Event-Driven Agents"
type: concept
aliases: ["event-driven agents", "event-driven agent orchestration", "events not graphs", "agent event subscriptions"]
tags: [ai, agents, architecture, orchestration, events]
source_count: 1
last_updated: 2026-09-02
parent: []
part-of: ["[[concepts/agent-kernel]]"]
defines: []
relates-to: ["[[concepts/multi-agent-orchestration]]", "[[concepts/long-running-agents]]", "[[concepts/declarative-agent-definitions]]", "[[concepts/typed-agent-boundaries]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]"]
---

# Event-Driven Agents

An orchestration model where agents **subscribe to events** instead of being wired into
in-code graphs or orchestrators. A cron job only covers *when* something should run; events
cover *what happened* — a voice note dropped in the system, a new email, a new CRM entry, a
PR opened or merged. Agents declare what event they accept and what event they return
([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

The worked example from the talk: a `voice-note-processed` event triggers a transcription
agent that emits durable notes; a daily-brief agent subscribes to both the cron output and
the voice-note events and posts the brief via a `slack.message.post` event to
[[entities/slack|Slack]]. Fan-in and fan-out are free; there are no edges to maintain.

## Key Insights

- **"You do not need graphs in this case. All you need is events"** — frameworks sell graph
  orchestration in code; with event subscriptions the topology emerges from whatever the log
  says happened ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Anyone can contribute** — to add an agent you "just need to know what events exist in
  the system"; no code required, drop a
  [[concepts/declarative-agent-definitions|definition file]]
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Cron is a special case** — schedules are just one event source; the morning market-watch
  cron feeds the same brief agent that voice-note events feed
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Causality is queryable** — events in the kernel log are causally linked (which event
  triggered which), which is what makes debugging a multi-agent fan-out tractable
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

> [!inference] This is the [[concepts/multi-agent-orchestration|choreography]] pattern made
> the default: independent agents on an event bus, no central orchestrator. The talk's
> contribution is showing choreography working at company scale with non-engineer
> contributors — and implying orchestrator-worker graphs are sold for problems that plain
> pub/sub already solves.

## Sources

- [[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt|Agent Frameworks Considered Harmful — Rémi Louf, .txt]] — the morning-briefing system: cron + voice-note events → daily brief → Slack; events vs. in-code graphs
