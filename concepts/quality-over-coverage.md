---
title: "Quality over Coverage"
type: concept
aliases: ["quality over coverage", "quality is P-1", "trust scoping", "quality-first scoping"]
tags: [ai, agents, enterprise-ai, product-management, trust]
source_count: 1
last_updated: 2026-08-30
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/agent-evals]]", "[[concepts/golden-dataset]]", "[[concepts/release-gates]]", "[[concepts/retention-gated-rollout]]", "[[concepts/log-taxonomy]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]"]
---

# Quality over Coverage

The trust-scoping principle for non-deterministic systems: deliberately narrow what the agent *will* answer to the subset it can answer at ~95% accuracy, instead of attempting everything at ~70%. User trust in a free-form chatbot is "earned extremely hard and lost overnight": if users like what they see in the first five questions they come back; if they don't, it takes 10x the effort to win them back — if you ever can. Snowflake's internal GTM team expresses this as "quality is P-1", a priority before every priority.

Coverage grows *after* trust: 60% of the data in Snowflake's GTM agent was added 6–7 months post-launch, once the habit was established.

## Key Insights

- **The first five questions decide retention** — a free-form chatbot is judged on its opening answers; a bad first impression is nearly unrecoverable, so the opening surface is what you protect ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).
- **Derive scope from the workflow, not the available data** — Snowflake wrote 150 questions from the sales process in a spreadsheet before the agent had any of that data ("These are the questions your sellers are going to ask"); the first run scored 50% accuracy and forced the scope cut ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).
- **50 at 95 beats 100 at 70** — the explicit arithmetic of the principle: a smaller answerable surface at high accuracy produces the "this thing is awesome, can I get more of that?" reaction that later earns the right to expand ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).

> [!inference] The 150-question spreadsheet is a [[concepts/golden-dataset]] authored from the business process rather than from production logs — the scope decision *is* an eval decision, which makes this the product-side twin of [[concepts/agent-evals]]. The [[concepts/log-taxonomy]] later shows which adjacent surface users are demanding next, so expansion stays demand-driven instead of coverage-driven; the [[concepts/retention-gated-rollout]] protects the scoped surface until it earns each wider launch.

## Sources

- [[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users|GTM AI Agents: Lessons from Deploying to 6,000 Users]] — Sait Izmit (Snowflake) on "quality is P-1", the 150-question pre-launch test, and post-launch data growth
