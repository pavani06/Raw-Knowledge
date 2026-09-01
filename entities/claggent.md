---
title: "Claggent"
type: entity
entity_type: tool
aliases: ["Clay agent", "Clagent", "Clayun"]
tags: [ai, agents, gtm, research-agent]
source_count: 1
last_updated: 2026-08-31
relates-to: ["[[entities/sculptor]]", "[[concepts/agent-tracing]]", "[[concepts/agent-evals]]"]
part-of: ["[[entities/clay]]"]
sources: ["[[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]"]
---

# Claggent

[[entities/clay|Clay]]'s first agent (launched 2023): a **go-to-market research agent** that
searches the public web to help research and qualify companies, and also searches over
customers' internal (first-party) data sets.

Its defining property in this vault is **scale**: 300M+ runs/month — more volume than the
team could possibly inspect in traces, even at workspace or user level, which is what made
systematic [[concepts/agent-evals]] and bulk [[concepts/agent-tracing|trace analysis]]
non-negotiable at Clay.

## Mentioned In

- [[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel|Inside Clay's Eval Stack: 300M Agent Runs, One LangSmith Pipeline]] — Claggent's three pillars (web research, first-party data, scale) and the 300M runs/month number that forced the eval program
