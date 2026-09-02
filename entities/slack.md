---
title: "Slack"
type: entity
entity_type: tool
aliases: ["slack"]
tags: [messaging, tools]
source_count: 1
last_updated: 2026-09-02
relates-to: []
part-of: []
sources: ["[[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]"]
---

# Slack

Team messaging platform. In the [[concepts/agent-kernel|agent kernel]] story, Slack is the
**delivery surface for agent output**: a `slack.message.post` event subscribes to the
daily-brief agent's output and posts the morning brief as a Slack message
([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]). An early
production failure — the brief posted twice — came from missing attempt tracking at this
integration, later fixed by the kernel's queue.

## Mentioned In

- [[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt|Agent Frameworks Considered Harmful — Rémi Louf, .txt]] — daily brief posted to Slack; the duplicate-post failure that motivated the kernel's queue
