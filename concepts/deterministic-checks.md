---
title: "Deterministic Checks"
type: concept
aliases: ["deterministic checks", "code evals", "deterministic evals", "hard rules", "programmatic checks", "the greater stack taxonomy"]
tags: [ai, agents, llm, evals, testing, quality]
source_count: 4
last_updated: 2026-09-02
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/llm-as-judge]]", "[[concepts/rag-evaluation]]", "[[concepts/golden-dataset]]", "[[concepts/failure-taxonomy]]", "[[concepts/behavioral-evaluation]]", "[[concepts/ai-governance]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]", "[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]", "[[sources/2026-09-02-the-prompting-playbook]]"]
---

# Deterministic Checks

The first and cheapest layer of the eval stack: **hard, programmable rules that have an
objective right answer** and can be verified by ordinary code in milliseconds. Did a specific
database row update? Is the JSON schema valid? Is a citation present? Did a private document
leak? These are binary questions — no [[concepts/llm-as-judge|LLM judge]] required.

Both sources frame this as the bottom of a layered "greater stack taxonomy": deterministic
checks for invariants, rubric/judge scoring for semantic quality, and human calibration on
top. The discipline is **not to ask a judge to do work that code can do** — judges are
expensive, slow, and fragile; reserve them for where judgment is actually required.

## Key Insights

- **The greater stack taxonomy** — layer evaluation types: (1) deterministic checks (schema
  validity, DB state, required fields, no leftover temp files), (2) rubric-based LLM scoring
  for qualitative dimensions, (3) human calibration auditing the judges
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Code catches what code should catch** — if a response has no citation, an internal phone
  number appears, the output schema is broken, or an expected doc was absent from retrieval,
  *code* catches it. "The judge belongs where judgment is actually required."
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Don't subjectively grade objective things** — missing citation, private-data leakage, and
  unsupported-answer-without-refusal are hard rules that "should never be subjective"; making
  them deterministic keeps the eval suite fast and trustworthy
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Defense in depth** — keep deterministic checks for invariants, rubric checks for
  qualitative states, calibrate judges with humans, and add adversarial tests; over-delegating
  to a judge makes the system expensive, slow, and hard to trust
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Unit/integration tests still apply** — small components (tokenizer, chunker, schema
  parser, citation validator, cost calculator) are deterministic and testable with classic TDD
  even when the whole application is system-level non-deterministic
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).

> [!inference] Deterministic checks are the [[concepts/agent-evals|three-tier eval]] framework's
> "code evals" tier, made central. Where the conference framing said "write code evals first,"
> these EDD articles formalize *why*: cost, speed, and trustworthiness. Every check you can make
> deterministic is one you don't have to pay a fragile [[concepts/llm-as-judge|judge]] to make.

### From the Databricks Production Playbook (Bhaumik)

- **Classic ML as deterministic checks** — beyond regex, use classic ML models for name entity
  recognition (NER), intent classification, and PII detection. These are "easy stuff, cheap
  stuff, you should get them out of the way. We have already been doing this for years."
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **PII detection as a deterministic gate** — in one customer project, 47 PII breaches were
  detected during the testing phase by applying deterministic NER and pattern checks before
  production launch. This is a governance requirement, not optional
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).


- **Hard/soft constraint grader split** — partition constraints by nature: hard rules
  (binary, countable) go to a deterministic checker function (e.g. a Python violation
  counter over generated artifacts); soft preferences go to the LLM evaluator, where they
  become runtime-tunable prompt content instead of backend deploys. Report violation
  counts per rule per trial: counts detect directional improvement even when binary
  pass/fail does not move ([[sources/2026-09-02-the-prompting-playbook]]).
## Sources

- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — the greater stack taxonomy; deterministic checks as the first layer; defense in depth
- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — "the judge belongs where judgment is required"; hard rules that should never be subjective; unit/integration tests for deterministic components
- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on classic ML for NER/intent/PII as deterministic checks; 47 PII breaches caught in testing
- - [[sources/2026-09-02-the-prompting-playbook|The Prompting Playbook]] — Claude (Anthropic, Code with Claude breakout) on maintaining a production prompt through a model migration (Meridian Mobile support bot: eval suite, XML-tag hygiene, stop sequences, tool integration, trade-off balancing) and building a scheduler agent from zero (model/thinking/prompt/architecture comparison, generate-evaluate-repair economics) — hard/soft grader split: the scheduling agent's Python violation counter vs. the LLM evaluator carrying runtime-tunable soft constraints
