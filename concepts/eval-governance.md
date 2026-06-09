---
title: "Eval Governance"
type: concept
aliases: ["eval governance", "evals as audit evidence", "ai compliance evals", "regulatory evals", "model risk management"]
tags: [ai, agents, llm, evals, governance, compliance, regulation]
source_count: 1
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/eval-driven-development]]"]
defines: []
relates-to: ["[[concepts/release-gates]]", "[[concepts/continuous-evaluation]]", "[[concepts/golden-dataset]]", "[[concepts/tracing-observability]]"]
contradicts: []
supports: ["[[concepts/eval-driven-development]]"]
extends: []
sources: ["[[sources/2026-06-09-eval-driven-development-missing-discipline]]"]
---

# Eval Governance

The framing of [[concepts/eval-driven-development|EDD]] as an **audit and compliance
mechanism**, not just an engineering technique. For regulated enterprises, evals are
mathematical proof of safety: dated, versioned, traceable evidence that a non-deterministic
system meets agreed thresholds. This is the reason large companies invest heavily in eval
infrastructure despite its cost and fragility — **they legally have to.**

When an AI's behavior is non-deterministic, the only way to satisfy a regulator is continuous,
quantifiable proof of how the system decides over time — a dashboard of (e.g.) 100,000 graded
eval iterations, version-controlled and traceable, demonstrating a stated error rate.

## Key Insights

- **EU AI Act** — for high-risk systems, the Act requires testing against "prior defined
  metrics and probabilistic thresholds," and Annex IV demands technical documentation including
  validation procedures, dated/signed test logs, and a post-market monitoring plan — structurally
  compatible with EDD's metrics, logs, and [[concepts/continuous-evaluation|continuous evaluation]]
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **NIST AI RMF** — the Govern/Map/Measure/Manage framework (plus the Generative AI Profile,
  AI 600-1) maps EDD most naturally to the Measure function while also supporting Govern and
  Manage ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **SR 11-7 / OCC model risk management** — US banking supervision mandates robust model
  validation and governance; EDD reads as "LLM/agent validation + continuous monitoring"
  modernized for non-deterministic behavior
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **ISO/IEC 42001 & 23894** — AI management-system and risk-management standards require
  continual improvement tied to measured evidence; EDD is one of the most concrete
  "performance evaluation + continual improvement" mechanisms they imply
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Define acceptable failure before writing code** — it is no longer sufficient to tell a
  regulator "we tested it and it looks fine"; you must define the mathematical threshold of
  acceptable failure up front (compare [[concepts/release-gates]])
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Security assurance references** — OWASP Top 10 for LLM Apps, MITRE ATLAS, and NIST's
  adversarial ML taxonomy (AI 100-2) inform adversarial eval suites beyond "normal traffic"
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).

> [!inference] Eval governance reframes the entire eval stack as a compliance artifact: the
> [[concepts/golden-dataset]] becomes the documented test bank, [[concepts/tracing-observability|traces]]
> become the audit trail, and [[concepts/release-gates|release gates]] become the dated proof
> that thresholds were enforced. The regulatory pressure is a one-way ratchet pushing
> [[concepts/continuous-evaluation]] from optional to mandatory.

## Sources

- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — EU AI Act (Article 9 / Annex IV); NIST AI RMF; SR 11-7 / OCC; ISO/IEC 42001 & 23894; evals as audit evidence; OWASP/MITRE/NIST adversarial references
