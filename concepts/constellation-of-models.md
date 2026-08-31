---
title: "Constellation of Models"
type: concept
aliases: ["constellation of models", "model constellation", "multi-model architecture", "model routing"]
tags: [ai, agents, llm, architecture, model-selection]
source_count: 1
last_updated: 2026-06-25
parent: []
part-of: ["[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/model-ensembling]]", "[[concepts/speculative-execution]]", "[[concepts/voice-agents]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]"]
---

# Constellation of Models

An agent architecture where **10 to 15 different models** may be invoked for a single
conversation turn, each specialized by task class and cost profile. The term comes from
[[entities/sierra|Sierra]]'s "Agent OS" layer, which orchestrates this multi-model
execution.

The constellation spans three tiers:

1. **Frontier models** — top-tier reasoning (GPT-5.5 class, Claude, Gemini), used for the
   bulk of reasoning but only 1-2 inferences per turn due to latency and cost.
2. **In-house fine-tuned models** — trained by Sierra for specific tasks (knowledge retrieval,
   reranking) where off-the-shelf models were limiting.
3. **Classifier models** — cheap, fast models that handle narrow tasks (intent classification,
   sentiment) at high volume.

## Key Insights

- **Not all tasks need a frontier model** — classifiers and speculatively-executed tasks run
  on cheaper models, reserving frontier capacity for the reasoning that actually requires it
  ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Build in-house only when pushing the state of the art** — Sierra builds custom models for
  knowledge retrieval because they hit limits with off-the-shelf solutions; for general
  reasoning, they rely on frontier labs (OpenAI, Anthropic) who are "the best in the world
  at it" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Capacity, not just cost** — multi-model support is driven by resilience needs: Black
  Friday / Cyber Monday spikes require the ability to fail over to whichever provider has
  capacity. Load tests at billions-of-conversations scale ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Model selection + evals + prompt engineering** — the constellation requires ongoing
  post-training, model selection, eval, and prompt engineering; it is an operational
  discipline, not a one-time architecture choice ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).

> [!inference] The constellation pattern is the model-level analog of the
> [[concepts/generator-evaluator-pattern]]: different models play different roles in a
> single conversation turn, with frontier models doing the heavy reasoning and classifiers
> handling fast, deterministic tasks. This is the inverse of the "one model to rule them
> all" assumption.

## Sources

- [[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think|The best AI agents are simpler than you think]] — Zack Reno Wedeen on Sierra's Agent OS, the three-tier model architecture, capacity-driven multi-provider support, and the build-vs-buy decision for in-house models
