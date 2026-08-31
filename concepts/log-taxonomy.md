---
title: "Log Taxonomy"
type: concept
aliases: ["log taxonomy", "question taxonomy", "demand-side radar", "log classification", "gap-to-content circuit"]
tags: [ai, agents, enterprise-ai, observability, product-management, feedback]
source_count: 1
last_updated: 2026-08-30
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/feedback-loops]]", "[[concepts/data-flywheel]]", "[[concepts/tracing-observability]]", "[[concepts/failure-taxonomy]]", "[[concepts/collapsing-wow-factor]]", "[[concepts/quality-over-coverage]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]"]
---

# Log Taxonomy

The practice of using LLMs to classify production user questions into a deep topic → subcategory → example-question tree, turning raw conversation logs into a **demand-side radar**: a real-time map of what users ask, what the agent cannot answer, and where quality degrades. At Snowflake scale: 1.2M questions classified, ~40,000 new questions per week — itself a fun scaling problem ("how you do that at scale without breaking the bank").

Distinct from [[concepts/tracing-observability|tracing]] (what the agent *did* internally) and from the [[concepts/failure-taxonomy]] (engineering causes of failures): the log taxonomy indexes *user demand*, not agent behavior.

## Key Insights

- **Real-time feature-gap radar** — "I see in real time what my feature gaps are": questions the agent can't answer or answers poorly, including quality signals like users swearing at the agent or repeating their question, surface exactly where to improve ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).
- **The gap-to-content circuit** — gaps close semi-automatically: connect Confluence, Jira, and Slack, ingest the PRDs, generate battle cards and sales-enablement documents in minutes, and feed them back into the agent — replacing what would take ~100 seller interviews a week with an analytics question answered in minutes ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).
- **Organizational matchmaking as a second-order use** — the taxonomy sees different sales teams targeting similar accounts from different angles without knowing about each other, and pings them; the platform becomes an organizational sensor ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).
- **The hockey stick** — "the first features are difficult to get out. The next ones are easy"; tapping into the logs is what starts the exponential compounding ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).

> [!inference] The log taxonomy is the demand-side complement to the [[concepts/data-flywheel]]: the flywheel compounds *failure* data into evals; the taxonomy compounds *demand* data into roadmap and content. Together they close the production [[concepts/feedback-loops|feedback loop]] on both sides of the agent — what it did wrong, and what users wish it did — and they tell [[concepts/quality-over-coverage]] where demand justifies widening the answerable surface. Demand shifts visible here are the early warning of the [[concepts/collapsing-wow-factor]].

## Sources

- [[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users|GTM AI Agents: Lessons from Deploying to 6,000 Users]] — Sait Izmit (Snowflake) on LLM log classification at 1.2M-question scale, the gap-to-content circuit, and matchmaking
