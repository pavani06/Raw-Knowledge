---
title: "Long-Running Agents"
type: concept
aliases: ["long-running agents", "autonomous agents", "multi-hour agents", "long-horizon agents"]
tags: [ai, agents, llm, autonomy]
source_count: 2
last_updated: 2026-09-02
parent: []
part-of: []
defines: ["[[concepts/context-rot]]"]
relates-to: ["[[concepts/agent-harness]]", "[[concepts/generator-evaluator-pattern]]", "[[concepts/ralph-loop]]", "[[concepts/agent-kernel]]", "[[concepts/event-driven-agents]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]"]
---

# Long-Running Agents

Agents designed to run autonomously for extended periods — hours to days — completing
complex multi-step tasks without continuous human intervention. The headline example is
building a fully-featured application from a one-line prompt over a 3–6 hour run.

Two levers drive how long an agent can run: the **model** itself (capability baked into
weights) and the **[[concepts/agent-harness]]** (the scaffolding around the model). Both
co-evolve — as models improve, parts of the harness become unnecessary and get stripped out.

## Key Insights

- A minimal-scaffold benchmark measures how long an agent can run while completing 50% of
  tasks. It rose from ~1 hour (Sonnet 3.7) to ~12 hours (Opus 4.6) over roughly a year
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Three core obstacles to long runs: finite context (and [[concepts/context-rot]]), poor
  out-of-the-box planning, and models being bad at judging their own output
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- "Context anxiety": a model gets nervous as it nears the end of its context window and
  rushes to finish ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- The frontier doesn't shrink, it moves — the harness evolves rather than disappears as
  models improve ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

### From Agent Frameworks Considered Harmful (Rémi Louf, .txt)

- **The autonomy spectrum is a farm-equipment metaphor** — today's coding-agent UX is a
  *ride-on tractor* (a TUI you must stay on even though it drives itself) and phone agents
  are *remote controls* ("SSH with vibes") you nudge mid-walk — both "clearly transitional."
  The goal state is the *robot mower*: an unattended background agent that works all day
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Well-executed background agents deliver the promised future** — the daily brief,
  processed voice notes, and market watch just appear; the trigger model that makes it work
  is cron + events ([[concepts/event-driven-agents]]) on an
  [[concepts/agent-kernel|agent kernel]]
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — the central topic; history tour + state-of-the-art harness patterns
- [[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt|Agent Frameworks Considered Harmful — Rémi Louf, .txt]] — background agents as the goal state; ride-on tractor / remote control / robot mower autonomy spectrum
