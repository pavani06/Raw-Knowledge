---
title: "Prompt-as-Code"
type: concept
aliases: ["prompt as code", "prompt versioning", "prompt change management", "prompt governance", "prompt commit discipline"]
tags: [ai, agents, llm, governance, prompts, versioning, production]
source_count: 1
last_updated: 2026-06-25
parent: ["[[concepts/ai-governance]]"]
part-of: ["[[concepts/ai-governance]]"]
defines: []
relates-to: ["[[concepts/model-change-management]]", "[[concepts/eval-governance]]", "[[concepts/production-incident-playbook]]", "[[concepts/release-gates]]", "[[concepts/eval-driven-development]]"]
contradicts: []
supports: ["[[concepts/ai-governance]]"]
extends: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# Prompt-as-Code

The discipline of treating prompt versioning with the same rigor as code change management.
In enterprise AI systems, a prompt change is a production change — it cannot be "just change
a prompt and commit to Git" without proper governance. Prompt-as-code demands documented
traceability: every commit message must record what failure caused the prompt change, what
the change addresses, and what correction is expected in the next version.

## Key Insights

- **Prompts are production changes** — changing a prompt is a production change and must
  go through proper change management processes, just like code. "It has to go through
  proper change management processes as you do with code"
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Commit message discipline** — Git commit messages for prompt changes must document:
  when the prompt was changed, what exact failure caused the change, what kind of failure
  the change addresses, and what correction it introduces. Simple "updated prompt" messages
  make it impossible to trace why changes were made ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Failure-to-fix traceability** — without documented commit messages, looking back at
  prompt version history reveals changes but not the reasoning behind them. This breaks
  the audit trail and makes incident diagnosis harder
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Integration with the incident playbook** — prompt versioning is the "Contain" step
  in the [[concepts/production-incident-playbook]]: if a prompt is causing failures,
  roll it back or swap it out while the fix is developed
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

> [!inference] Prompt-as-code is the operational bridge between [[concepts/ai-governance]]
> and [[concepts/eval-driven-development]]: governance demands auditability; EDD demands
> that changes are driven by measured failures. Prompt-as-code makes both concrete by
> treating prompts as versioned, auditable, and failure-traceable artifacts — the same
> way infrastructure-as-code treats infrastructure configs.

## Sources

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on prompt versioning as change management, commit message discipline, and failure-to-fix traceability
