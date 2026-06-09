---
title: "Failure Taxonomy"
type: concept
aliases: ["failure taxonomy", "failure categorization", "failure modes", "error taxonomy", "failure backfill"]
tags: [ai, agents, llm, evals, debugging, quality]
source_count: 2
last_updated: 2026-06-09
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/tracing-observability]]", "[[concepts/reading-traces]]", "[[concepts/golden-dataset]]", "[[concepts/rag-evaluation]]", "[[concepts/continuous-evaluation]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]"]
---

# Failure Taxonomy

The discipline of categorizing agent failures by their **engineering cause** rather than
collapsing them into a single "the bot was wrong" complaint. "Hallucination" is too small a
diagnosis: it says the answer was unsupported but not *where the system broke*. A failure
taxonomy assigns each failure to the layer that produced it — because different layers require
different fixes.

For a production RAG assistant, the same surface complaint may be a **retrieval failure**
(right doc never entered context), a **groundedness failure** (context was right, model
ignored it), a **citation failure** (answer correct but cited the wrong chunk), a **refusal
failure** (answered an unsupported question instead of declining), a **multi-turn state
failure** (lost the thread on a follow-up), or a **safety/leak failure** (private doc entered
the retrieval path). Each lives in a different part of the pipeline.

## Key Insights

- **"Hallucination" hides the real failure** — production AI fails across the whole path:
  ingestion, chunking, retrieval, query rewriting, context construction, prompt assembly,
  generation, parsing, citation validation, refusal, safety filtering, tracing, monitoring. If
  you evaluate only the final text, you see the symptom but not the system
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Different failures need different responses** — retrieval failure vs. generation failure;
  wrong refusal vs. missing refusal; citation mismatch vs. hallucination; multi-turn loss vs.
  single-turn error. EDD forces these distinctions instead of letting them blur
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Analyze the trace, categorize, then improve** — when a release gate fails, you don't read
  the final text; you read the trace viewer, categorize the failure into the taxonomy, find
  exactly where the agent took a wrong turn, then fix the right layer
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Failure backfill** — production failures are labeled, categorized, and fed back into the
  offline eval set as new regression cases; the taxonomy is what makes that backfill
  actionable rather than a pile of "wrong" logs
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **The eval suite cannot be stronger than the product contract** — a sharp failure taxonomy
  depends on a sharp quality contract (answer only from public KB, cite used chunks, refuse
  unsupported, no private leakage, preserve topic, schema-valid, within latency/cost)
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).

> [!inference] The failure taxonomy is what makes [[concepts/reading-traces]] and
> [[concepts/tracing-observability]] productive: a trace tells you *what happened*, but only a
> taxonomy turns that into *which layer to fix and which regression test to add*. It is the
> bridge from observability to the [[concepts/data-flywheel|data flywheel]].

## Sources

- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — "hallucination is too small a diagnosis"; the six+ RAG failure classes; quality contract drives the taxonomy
- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — Analyze phase: read the trace, categorize into a taxonomy; failure backfill into the eval set
