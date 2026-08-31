---
title: "Model Ensembling"
type: concept
aliases: ["model ensembling", "ensembling", "multi-model voting", "model ensemble"]
tags: [ai, agents, llm, voice, reliability]
source_count: 1
last_updated: 2026-06-25
parent: []
part-of: ["[[concepts/voice-agents]]"]
defines: []
relates-to: ["[[concepts/constellation-of-models]]", "[[concepts/speculative-execution]]"]
contradicts: []
supports: ["[[concepts/voice-agents]]"]
extends: []
sources: ["[[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]"]
---

# Model Ensembling

Running **multiple models in parallel on the same input** and selecting the best output
per input segment according to known failure modes of each model. A reliability pattern
used when no single model is best across all cases.

## Key Insights

- **Silence vs. speech ensembling** — one transcription model has the highest quality but
  hallucinates during silence; another model is more conservative with silence. Sierra runs
  both in parallel: if model A says "silent," trust it; if model A says "speech," trust
  model B's transcription. This exploits each model's known failure profile
  ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Multi-provider for multi-language** — no single transcription provider is best across
  all 100+ languages Sierra supports. Ensembling across providers reduces word error rate
  for low-resource languages (e.g., Hungarian at ~20% WER with the best single model)
  ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Modular architecture enables ensembling** — an early architectural decision to
  multi-home providers across transcription, synthesis, and voice-to-voice models made
  ensembling possible. Single-provider architectures hit the limits of that provider
  ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Benchmarks drive provider selection** — [[entities/taobench|MuBench]] and other
  benchmarks give Sierra data to decide which model to trust for which input segment;
  ensembling without per-model-failure data is guesswork
  ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).

> [!inference] Model ensembling applies the [[concepts/generator-evaluator-pattern]] at the
> model level: multiple models generate (transcribe/synthesize), and a deterministic rule
> selects the best per-segment output based on known failure modes. The "evaluator" is a
> hand-coded heuristic, not a model — because the failure surface is narrow enough to
> specify explicitly.

## Sources

- [[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think|The best AI agents are simpler than you think]] — Zack Reno Wedeen on Sierra's multi-provider transcription ensembling, silence-vs-speech logic, and multi-language word error rate reduction
