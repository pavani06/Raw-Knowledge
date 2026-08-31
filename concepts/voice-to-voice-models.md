---
title: "Voice-to-Voice Models"
type: concept
aliases: ["voice-to-voice models", "voice to voice", "native voice models", "audio-to-audio models", "speech-to-speech models"]
tags: [ai, agents, voice, models, audio]
source_count: 1
last_updated: 2026-06-25
parent: []
part-of: ["[[concepts/voice-agents]]"]
defines: []
relates-to: ["[[concepts/voice-agents]]", "[[concepts/constellation-of-models]]", "[[concepts/tool-use]]"]
contradicts: []
supports: []
extends: ["[[concepts/voice-agents]]"]
sources: ["[[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]"]
---

# Voice-to-Voice Models

Native audio-to-audio models that take speech as input and produce speech as output directly,
bypassing the traditional speech-to-text → LLM → text-to-speech pipeline. An emerging model
category that promises lower latency and higher naturalism at the cost of reasoning
capability, tool-use reliability, and cost.

In 2026, these models are in early production at [[entities/sierra|Sierra]] but limited to
simpler journeys where naturalism matters more than complex procedure. Zack Reno Wedeen
estimates 24 months before 50%+ of traffic runs on voice-to-voice models.

## Key Insights

- **Simpler architecture per turn, more complexity per business** — a voice-to-voice model
  simplifies one conversation turn, but supporting 100+ languages and multiple providers
  still requires the modular [[concepts/model-ensembling|ensembling]] architecture for the
  foreseeable future ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Still an order of magnitude more expensive** than the STT+TTS pipeline; cost will need
  to drop significantly for broad adoption ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Tool calling and instruction following lag** — current voice-to-voice models are not
  yet as reliable with tools and complex instructions as text-based models. They work best
  for simpler, more conversational journeys ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Last-mile integration** — Sierra's approach: run the entire text-based pipeline, then
  pipe the output context plus the original audio into the voice-to-voice model for the
  final audio generation. The harness still does the heavy lifting; the audio model does
  the naturalistic rendering ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **50 lines of Python vs. trillion parameters** — up until voice-to-voice models, the
  turn-taking decision (when to speak) was handled by ~50 lines of Python (Silero VAD),
  while the content decision (what to say) used trillion-parameter models. Voice-to-voice
  models shift more of the turn-taking intelligence into the model — a rebalancing of
  where intelligence lives ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **The harness doesn't go away** — the fallacy is "you don't need the harness anymore."
  You can either do the same thing more easily or "set your sights on new and more
  impressive things." The industry's direction: not obsolescence, but raised horizons
  ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).

> [!inference] Voice-to-voice models are to [[concepts/voice-agents]] what LLMs are to
> rule-based NLP: they collapse a multi-step pipeline into a single model call, but at
> the cost of controllability. The [[concepts/agent-harness]] doesn't disappear — it
> shifts from managing the pipeline to managing the model's limitations.

## Sources

- [[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think|The best AI agents are simpler than you think]] — Zack Reno Wedeen on voice-to-voice model adoption timeline, last-mile integration, tool-calling limitations, and the "50 lines of Python" turn-taking imbalance
