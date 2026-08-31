---
title: "Test Case Library"
type: concept
aliases: ["test case library", "eval test case library", "eval dataset governance", "test case categorization", "living eval dataset"]
tags: [ai, agents, evals, testing, quality, production, governance]
source_count: 1
last_updated: 2026-06-25
parent: ["[[concepts/golden-dataset]]"]
part-of: ["[[concepts/golden-dataset]]"]
defines: []
relates-to: ["[[concepts/evaluation-pipeline]]", "[[concepts/data-flywheel]]", "[[concepts/production-incident-playbook]]", "[[concepts/behavioral-evaluation]]", "[[concepts/release-gates]]"]
contradicts: []
supports: ["[[concepts/golden-dataset]]"]
extends: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# Test Case Library

A governed, categorized, living collection of evaluation test cases that grows with every
production incident. The test case library is the [[concepts/golden-dataset]] made operational:
it's not just a dataset — it's a governed artifact with ownership, categorization, and a
growth strategy. "The test case library is a growing system. It will grow over time. And
because it grows over time, you need some sort of governance around it."

## Key Insights

- **Categorization by problem type** — test cases must be organized by problem category
  (security, login, policy, tool calling, etc.) so that when a specific type of change
  is made, only the relevant subset of test cases needs to run. This reduces the cost
  of running behavioral evals against large datasets ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Ownership is required** — a test case library needs a designated owner who manages
  what test cases exist, which problems they relate to, and how they're organized.
  Without ownership, the library becomes a disorganized dump rather than a governed asset
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Subset testing for cost control** — in CI pipelines, run only a small relevant subset
  of the library on each prompt change; run the full test suite only on merge to main.
  This reduces the exponential cost of running behavioral evals against hundreds of rows
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Growth from production incidents** — every [[concepts/production-incident-playbook|production
  incident]] that reaches the "Fix" stage adds its test case to the library, ensuring the
  same failure is caught automatically next time ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Security category example** — test cases can be tagged as "security" to catch failures
  like "agent did not ask for login credentials when the customer asked for account info"
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

> [!inference] The test case library extends [[concepts/golden-dataset]] with governance:
> the golden dataset is *what* to test against; the test case library is *how* to organize,
> own, and efficiently test against a growing dataset at scale. Categorization makes the
> library usable when it reaches hundreds or thousands of cases — without it, every change
> requires running against the entire set.

## Sources

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on test case library as a growing governed system, categorization by problem type, and subset testing for cost control
