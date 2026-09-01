---
title: "Sculptor"
type: entity
entity_type: tool
aliases: ["Clay Sculptor", "Sculptor for Search"]
tags: [ai, agents, gtm, engineering-agent]
source_count: 1
last_updated: 2026-08-31
relates-to: ["[[entities/claggent]]", "[[concepts/tool-unification-flywheel]]", "[[concepts/agent-evals]]"]
part-of: ["[[entities/clay]]"]
sources: ["[[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]"]
---

# Sculptor

[[entities/clay|Clay]]'s go-to-market **engineering agent** (launched ~2025): builds and
orchestrates GTM workflows inside the product, analyzes data, and (as "Sculptor for Search")
queries Clay's companies-and-contacts database to find leads and prospects. It has become
one of the primary ways users interact with Clay, at 100k+ messages/week — past the
threshold of reading every trace or talking to every customer.

Sculptor is also the reference implementation of Clay's
[[concepts/tool-unification-flywheel]]: it uses **exactly the same tools** Clay exposes via
its CLI and public API to external agents, so its invocation failures improve the shared
tool surface for everyone.

## Mentioned In

- [[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel|Inside Clay's Eval Stack: 300M Agent Runs, One LangSmith Pipeline]] — Sculptor's scope (workflows, analysis, search), 100k messages/week, and its role as the tool-parity agent
