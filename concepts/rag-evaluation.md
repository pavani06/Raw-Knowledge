---
title: "RAG Evaluation"
type: concept
aliases: ["rag evaluation", "rag evals", "retrieval evaluation", "groundedness", "citation validation", "recall@k", "precision@k", "mrr"]
tags: [ai, agents, llm, evals, rag, retrieval]
source_count: 1
last_updated: 2026-06-09
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/deterministic-checks]]", "[[concepts/failure-taxonomy]]", "[[concepts/llm-as-judge]]", "[[concepts/trajectory-evaluation]]", "[[concepts/golden-dataset]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]"]
---

# RAG Evaluation

Evaluating a retrieval-augmented generation system requires measuring the **retrieval layer
separately from the generation layer**, because a bad answer can originate in either. RAG
evaluation splits the pipeline into independently-gradeable stages: did the right document get
retrieved (retrieval metrics), did the answer stay faithful to that context (groundedness),
and does the citation point to the chunk actually used (citation validation)?

A single "answer quality" score cannot distinguish a retrieval failure from a generation
failure — and they need different fixes (see [[concepts/failure-taxonomy]]). RAG evaluation is
the concrete instantiation of layered [[concepts/agent-evals|evals]] for the most common
production AI architecture.

## Key Insights

- **Retrieval metrics** — expected-doc match, **recall@k** (did the right doc appear in the
  top-k?), **precision@k**, and **MRR** (mean reciprocal rank) diagnose retrieval quality
  independently of the generated text
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Groundedness / faithfulness** — does the answer stay faithful to the retrieved context, or
  does it invent details not in the knowledge base? This is a semantic check best handled by an
  [[concepts/llm-as-judge|LLM judge]], not string matching
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Citation validation is deterministic** — if a citation points to a document or chunk that
  was never retrieved, discard it; if a supported answer lacks a valid citation, convert it to
  a refusal. Code catches this, not a judge (see [[concepts/deterministic-checks]])
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Keep private data out of the retrieval path** — the safest control is architectural: never
  index internal documents, so the model cannot leak what it was never given. Don't rely on
  "do not reveal this" prompt wording
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Refusal as a first-class behavior** — refuse when retrieval confidence is too low, when the
  request is unsupported/unsafe, or when it asks for private data; wrong refusals and missing
  refusals are distinct failure modes requiring different tuning
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Start with a lexical, inspectable retriever** — a lexical baseline is easier to debug than
  embeddings; the same eval suite can later compare lexical vs. embeddings vs. hybrid vs.
  reranking as *measured* upgrades, not assumptions
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Multi-turn state** — "What about logs?" after a retention question must stay on topic;
  query rewriting and conversation-aware retrieval make multi-turn failures traceable rather
  than mysterious ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).

> [!inference] RAG evaluation is where the abstract [[concepts/agent-evals|three-tier eval]]
> framework meets the most common real-world architecture: deterministic citation checks,
> retrieval metrics, and judge-graded groundedness map exactly onto the code → metric → judge
> layering. It also makes [[concepts/trajectory-evaluation]] concrete — the trace's retrieved
> chunks and scores are the trajectory you grade.

## Sources

- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — recall@k/precision@k/MRR; groundedness; deterministic citation validation; architectural private-data boundary; refusal behavior; lexical-first retriever; multi-turn handling
