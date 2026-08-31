---
title: "Change Management (AI Adoption)"
type: concept
aliases: ["change management", "activation", "ai adoption", "adoption campaign"]
tags: [ai, agents, enterprise-ai, adoption, organizational-change, product-management]
source_count: 1
last_updated: 2026-08-30
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/retention-gated-rollout]]", "[[concepts/value-maturity-ladder]]", "[[concepts/collapsing-wow-factor]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]"]
---

# Change Management (AI Adoption)

The post-launch organizational work that determines whether an internal AI product is used at all. The claim: AI initiatives don't fail on the technology (assuming quality was scoped per [[concepts/quality-over-coverage]]) — they fail on **activation**. Two weeks after Snowflake's GA, only 20% of the target organization had even tried the assistant; management read low numbers as product failure, but the causal split is: *never-tried = activation problem (not the product's fault); tried-and-left = product problem (entirely the product's fault)*.

## Key Insights

- **60–70% of the PM's time post-launch goes to activation** — demos in sales meetings, adoption dashboards by team, public praise (and shaming) of managers, and sponsorship from sales leaders who push their teams to try it. A couple-of-months campaign ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).
- **"Half of where we are today"** — without the activation investment, Snowflake estimates the assistant would sit at roughly half its actual usage; this is the segment a technical conference usually skips ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).
- **Engineers should line it up before launch** — activation and change management must be planned alongside the product, especially at 6,000-user scale in large organizations ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).

> [!inference] Activation is the adoption-side complement of the [[concepts/retention-gated-rollout]] gates: the rollout pattern protects users from a bad product; change management protects the product from users who never meet it. Both feed the [[concepts/value-maturity-ladder]] — and once the wow factor starts collapsing ([[concepts/collapsing-wow-factor]]), the same sponsorship machinery is what drives users up the next rung.

## Sources

- [[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users|GTM AI Agents: Lessons from Deploying to 6,000 Users]] — Sait Izmit (Snowflake) on the 20% trial rate two weeks post-GA and the 60–70% activation time investment
