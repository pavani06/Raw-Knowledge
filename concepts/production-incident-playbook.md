---
title: "Production Incident Playbook"
type: concept
aliases: ["production incident playbook", "ai incident playbook", "incident playbook", "ai production incident response", "detect diagnose contain fix"]
tags: [ai, agents, production, incident-response, operations, reliability]
source_count: 1
last_updated: 2026-06-25
parent: ["[[concepts/ai-governance]]"]
part-of: ["[[concepts/ai-governance]]"]
defines: []
relates-to: ["[[concepts/eval-iterate-cycle]]", "[[concepts/tracing-observability]]", "[[concepts/fault-tolerance-patterns]]", "[[concepts/test-case-library]]", "[[concepts/feedback-loops]]", "[[concepts/release-gates]]"]
contradicts: []
supports: []
extends: ["[[concepts/eval-iterate-cycle]]"]
sources: ["[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]"]
---

# Production Incident Playbook

A structured operational playbook for responding to AI failures in production: **Detect →
Diagnose → Contain → Fix**. This is the operationalization of the [[concepts/eval-iterate-cycle]]
applied to live production incidents. Without a playbook, AI production failures become
invisible or untraceable — "no one knew why things were failing."

## Key Insights

- **Detect** — use your eval dashboard and online monitoring to identify when AI is failing.
  In the retail banking case study, a CSAT drop was detected because the monitoring system
  flagged negative customer feedback on chatbot answers
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Diagnose** — use tracing data to understand what went wrong. In the case study, tracing
  revealed the agent was referencing an outdated policy document in the vector database —
  the new policy's embeddings hadn't propagated. Without tracing, this would have been
  invisible ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Contain** — take immediate action: version prompts (roll back to a known-good version),
  deflect to a human agent, or apply [[concepts/fault-tolerance-patterns|fault tolerance
  patterns]] (saga, compensation, circuit breaker) to limit blast radius
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Fix** — use LLM judge reports and eval dataset reports to identify the root cause.
  Fix the problem (update the prompt, fix the tool calling, update the vector database).
  Then add the incident as a test case to the [[concepts/test-case-library]] so it's caught
  next time ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **ITSM integration** — the playbook should integrate with existing IT Service Management
  systems to alert the right person at the right time, leveraging existing alerting and
  escalation infrastructure ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

> [!inference] The production incident playbook extends the [[concepts/eval-iterate-cycle]]
> from an offline improvement loop into an operational incident-response loop. The key
> difference is the "Contain" step — unlike offline eval iteration, production incidents
> require immediate mitigation before root cause analysis can begin.

## Sources

- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on the Detect-Diagnose-Contain-Fix cycle, ITSM integration, and the retail banking CSAT-drop case study
