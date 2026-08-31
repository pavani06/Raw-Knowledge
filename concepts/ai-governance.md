---
title: "AI Governance"
type: concept
aliases: ["ai governance", "agent governance", "ai accountability", "production ai governance", "agent accountability"]
tags: [ai, agents, governance, compliance, audit, security, production]
source_count: 1
last_updated: 2026-06-25
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/eval-governance]]", "[[concepts/prompt-as-code]]", "[[concepts/model-change-management]]", "[[concepts/tracing-observability]]", "[[concepts/production-incident-playbook]]", "[[concepts/deterministic-checks]]"]
contradicts: []
supports: ["[[concepts/eval-governance]]"]
extends: []
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# AI Governance

The fifth and final pillar of the Databricks 5-pillar production framework: the accountability,
compliance, and operational control layer that answers "who is responsible when AI fails at
3 AM?" AI governance is distinct from data governance — it focuses on AI-specific concerns:
audit trails, PII detection, prompt versioning as change management, model change management,
and regulatory compliance.

## Key Insights

- **Accountability at 3 AM** — every enterprise AI system must have clear ownership: who is
  responsible when AI fails in production? Who owns the data assets feeding AI responses?
  Governance establishes this ownership chain before deployment
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Audit trails** — every action, every user connection, every request, every response must
  be captured and traceable. Regulators demand this; without it, there is no production system
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **PII detection** — pre-validation of personal information using name entity recognition
  and deterministic checks. In one project, 47 PII breaches were detected during testing
  by applying this governance layer before production launch
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Prompt versioning as change management** — see [[concepts/prompt-as-code]]: prompt
  changes must go through the same rigorous change management processes as code changes,
  with documented traceability from failure to fix in every commit message
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Model change management** — see [[concepts/model-change-management]]: model provider
  upgrades must be tested against enterprise eval datasets; public benchmarks are not
  sufficient. Organizations need the flexibility to switch models and test them on their
  own data ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Integration with ITSM** — governance systems should connect to existing IT Service
  Management infrastructure for alerting the right person at the right time when AI
  incidents occur ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

> [!inference] AI governance operationalizes [[concepts/eval-governance]] at the production
> level: eval governance frames evals as compliance evidence for regulators; AI governance
> adds the operational ownership, PII detection, prompt/model change management, and incident
> response structures that turn compliance evidence into operational reality.

## Sources

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on governance as pillar five: accountability, audit trails, PII detection, prompt versioning, model change management
