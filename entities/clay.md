---
title: "Clay"
type: entity
entity_type: company
aliases: ["Clay (company)", "clay.com"]
tags: [ai, agents, gtm, saas, data-platform]
source_count: 1
last_updated: 2026-08-31
relates-to: ["[[entities/langchain]]", "[[entities/langsmith]]", "[[entities/snowflake]]", "[[entities/claggent]]", "[[entities/sculptor]]"]
part-of: []
sources: ["[[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]"]
---

# Clay

Go-to-market (GTM) software company — web research, company/contact databases, and workflow
orchestration for sales and growth teams. Running agents since 2023
([[entities/claggent|Claggent]]), with [[entities/sculptor|Sculptor]] now one of the primary
ways users interact with the product.

Clay is deliberately becoming an **agent interface**, not just an app: everything doable in
the web UI is being exposed through a CLI and public API, and its internal agents use the
exact same tools it exposes externally — the [[concepts/tool-unification-flywheel]]. Its
eval stack runs on [[entities/langsmith|LangSmith]] (one pipeline for local, CI, staging,
and online evaluators), and it is rebuilding its [[concepts/agent-first-data-foundation]]
as a data lake with agents as first-class users, unifying first/third-party data with
traces, [[entities/snowflake|Snowflake]] analytics, Postgres, and ClickHouse.

## Mentioned In

- [[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel|Inside Clay's Eval Stack: 300M Agent Runs, One LangSmith Pipeline]] — the LangChain-channel deep dive on Clay's eval coverage matrix, production-to-offline feedback loop, tool unification flywheel, and agent-first data foundation
