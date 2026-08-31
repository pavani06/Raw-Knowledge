---
title: "Model Change Management"
type: concept
aliases: ["model change management", "model upgrade management", "model versioning", "model provider migration", "model selection governance"]
tags: [ai, agents, llm, models, governance, evals, production]
source_count: 1
last_updated: 2026-06-25
parent: ["[[concepts/ai-governance]]"]
part-of: ["[[concepts/ai-governance]]"]
defines: []
relates-to: ["[[concepts/prompt-as-code]]", "[[concepts/eval-driven-development]]", "[[concepts/golden-dataset]]", "[[concepts/release-gates]]", "[[concepts/eval-governance]]"]
contradicts: []
supports: ["[[concepts/ai-governance]]"]
extends: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# Model Change Management

The discipline of testing model provider upgrades against enterprise-specific evaluation
datasets before adopting them in production. Model providers publish benchmark scores, but
"those are not really useful when you put them in your context, in your enterprise."
Model change management ensures that a model upgrade is tested against your own data,
your own eval criteria, and your own use cases before deployment.

## Key Insights

- **Public benchmarks are insufficient** — model providers publish evaluation benchmarks
  that don't represent your enterprise context, data distribution, or use case. Testing
  on your own eval datasets is the only reliable way to assess a model upgrade
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **No single-model dependency** — from a risk perspective, enterprises cannot rely on
  a single model provider. They must have the flexibility to switch between models and
  the infrastructure to test alternatives against their eval datasets
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Eval datasets enable rapid comparison** — in the retail banking case study, building
  the eval dataset first (weeks 1-2 of an 8-week POC) enabled running different models
  against it in weeks 7-8, producing a data-driven model selection decision rapidly
  instead of "weeks debating on which model to use"
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Model selection deferred to week 7** — the case study's key insight: don't start
  with model selection. Build evaluation infrastructure first; then run candidate models
  against it. This is [[concepts/eval-driven-development]] applied to model selection
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

> [!inference] Model change management is the model-upgrade counterpart to
> [[concepts/prompt-as-code]]: both treat changes to the AI system as governed,
> testable, and auditable. Together they close the gap that most production AI
> failures exploit — ungoverned changes to either the instructions (prompts) or
> the reasoning engine (models).

## Sources

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on testing model upgrades against enterprise eval datasets, avoiding single-model dependency, and deferring model selection until eval infrastructure is built
