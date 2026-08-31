---
title: "Data Quality for Agents"
type: concept
aliases: ["data quality for agents", "agent data quality", "ai data quality", "data readiness for ai", "agent-unforgiving data"]
tags: [ai, agents, data, quality, production, data-strategy]
source_count: 1
last_updated: 2026-06-25
parent: ["[[concepts/data-foundation]]"]
part-of: ["[[concepts/data-foundation]]"]
defines: []
relates-to: ["[[concepts/golden-dataset]]", "[[concepts/agent-evals]]", "[[concepts/eval-driven-development]]"]
contradicts: []
supports: ["[[concepts/data-foundation]]"]
extends: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# Data Quality for Agents

The operational reality that data built for human consumption fails catastrophically when
queried by AI agents. "Data was always built for humans, and humans are always forgiving.
You find the wrong data in a report, you just go and ask someone to correct it. Agents
don't forgive you. Agents will go, find it wrong, they'll give you the wrong answer
confidently." This is why data quality and strategy consume ~60% of production AI project
effort.

## Key Insights

- **Humans forgive bad data; agents don't** — a human sees wrong data in a report and
  asks someone to fix it. An agent trusts the data, produces a confidently wrong answer,
  and the failure is invisible without observability infrastructure
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Confident wrong answers** — the combination of bad data and agent confidence is
  the dangerous failure mode: the agent doesn't express uncertainty when the data is
  wrong — it produces wrong answers with the same confidence as correct ones
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **60% of project time** — Sandipan Bhaumik reports that data foundation work consumes
  60% of typical production AI project time. This is not because AI is hard; it's because
  enterprise data was never designed for machine consumers ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Impact hierarchy validates this** — the [[concepts/agent-evals]] insight "data quality >
  prompting > model selection > hyperparameter tuning" is confirmed by production experience:
  fixing the data produces more improvement than all downstream optimizations combined
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Metadata as context** — technologies like [[entities/unity-catalog|Unity Catalog]]
  enable metadata tagging (PII, column descriptions, table descriptions) that agents can
  consume as context when querying data, improving accuracy through enriched understanding
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

## Sources

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on agents being unforgiving with bad data, confident wrong answers, and the 60% time investment in data foundation
