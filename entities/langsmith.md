---
title: "LangSmith"
type: entity
entity_type: tool
aliases: ["langsmith", "LangSmith pipeline"]
tags: [ai, agents, llm, evals, observability, tracing]
source_count: 1
last_updated: 2026-08-31
relates-to: ["[[entities/langchain]]", "[[entities/clay]]", "[[concepts/agent-tracing]]", "[[concepts/eval-coverage-matrix]]", "[[concepts/production-to-offline-feedback-loop]]", "[[concepts/perceived-eval]]"]
part-of: []
sources: ["[[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]"]
---

# LangSmith

The observability and evaluation platform of the [[entities/langchain|LangChain]] ecosystem.
[[entities/clay|Clay]]'s entire eval stack runs on it as a single pipeline across all
levels: locally-run CLI evals are persisted and versioned there, CI/staging runs write to
it, and its built-in online primitives are where Clay says it uses LangChain-the-ecosystem
the most ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).

Primitives cited in the Clay stack: online evaluators (NPS-style user satisfaction,
[[concepts/perceived-eval|perceived-eval]] evaluators detecting corrections/pushback), bulk
trace analysis over production data, and use-case classifiers for coverage checks against
production — feeding the [[concepts/production-to-offline-feedback-loop]].

> [!inference] In the Clay transcript (serpapi extraction), "lchain", "Blinkchain engine",
> and the repeatedly mentioned "engine" are read as LangSmith per the video title ("One
> LangSmith Pipeline"); the same garbling renders [[entities/langchain|LangChain]] the
> framework as "lane chain".

## Mentioned In

- [[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel|Inside Clay's Eval Stack: 300M Agent Runs, One LangSmith Pipeline]] — the one pipeline: versioned local/CI/staging eval storage, online evaluators, bulk trace analysis, use-case classifiers
