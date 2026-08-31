---
title: "Evaluation Pipeline"
type: concept
aliases: ["evaluation pipeline", "eval pipeline", "automated evaluation pipeline", "eval automation", "capture-compare-rate-fix pipeline"]
tags: [ai, agents, evals, automation, production, ci-cd]
source_count: 1
last_updated: 2026-06-25
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/golden-dataset]]", "[[concepts/llm-as-judge]]", "[[concepts/continuous-evaluation]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/test-case-library]]", "[[concepts/data-flywheel]]"]
contradicts: []
supports: ["[[concepts/continuous-evaluation]]"]
extends: ["[[concepts/eval-iterate-cycle]]"]
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# Evaluation Pipeline

An automated system that captures AI agent responses, compares them against the evaluation
dataset, rates them, and feeds results back into the improvement cycle. The pipeline
operationalizes the [[concepts/eval-iterate-cycle]] at production scale: capture → compare →
rate → fix → add-to-dataset, running continuously against live production traces.

In the retail banking case study, the evaluation pipeline was built in weeks 1-2 of the
8-week POC — before model selection — so that by week 7, candidate models could be tested
against a mature, growing eval dataset.

## Key Insights

- **Pipeline flow** — capture user question + AI response → compare against eval dataset →
  rate the response → if below threshold, get human review → fix the issue (prompt change,
  tool change, etc.) → add the case to the test dataset so it's caught next time
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Build before model selection** — the pipeline is infrastructure, not an afterthought.
  Building it first enables data-driven model comparison when the time comes to select
  a model ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Human in the fix loop** — when the pipeline rates a response below threshold, a human
  reviews it. The fix could be a prompt change, a tool calling correction, or a data update.
  After fixing, the test case enters the [[concepts/test-case-library]]
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Simple Python starting point** — the pipeline can begin as simple Python code comparing
  AI responses against a dataset; it grows in sophistication as the dataset grows
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

> [!inference] The evaluation pipeline is the production infrastructure that makes
> [[concepts/data-flywheel]] operational: each pass through the pipeline (capture →
> compare → rate → fix → add) is one turn of the flywheel, and the growing
> [[concepts/test-case-library]] is the flywheel's accumulating mass.

## Sources

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on the automated evaluation pipeline, building it before model selection, and the capture→compare→rate→fix→add loop
