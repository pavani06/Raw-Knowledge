---
title: "Voice Agents"
type: concept
aliases: ["voice agents", "voice agent", "conversational voice AI", "phone agents"]
tags: [ai, agents, voice, latency, architecture]
source_count: 1
last_updated: 2026-06-25
parent: []
part-of: []
defines: ["[[concepts/speculative-execution]]", "[[concepts/model-ensembling]]"]
relates-to: ["[[concepts/voice-to-voice-models]]", "[[concepts/constellation-of-models]]", "[[entities/sierra]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]"]
---

# Voice Agents

Agent architectures designed for real-time voice interaction — a domain with fundamentally
different constraints from chat agents. Voice requires sub-second latency, parallel
execution of thinking/listening/talking, and careful attention to naturalism and
multilingual quality.

"Voice has been maybe the most fun project that I've worked on in my whole career." — Zack
Reno Wedeen, [[entities/sierra|Sierra]].

## Key Insights

- **Latency is the master constraint** — if you're not responding in 1-2 seconds, callers
  wonder where you went. This forces architectural decisions that chat agents can skip
  (parallelism, [[concepts/speculative-execution|speculative execution]], progress
  indicators) ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Parallelize thinking, listening, and talking** — "one of the big unlocks for Sierra
  agents": while listening, already think about what to say next; while talking, listen
  for interruptions. This mirrors human conversation: ~50% of brain power goes to deciding
  *when* to speak, not *what* to say ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Naturalism is multi-dimensional** — robotic-sounding agents fail on both text quality
  (what the agent says) and audio quality (how the voice sounds). Both must be right
  ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Multilingualism is harder for voice than chat** — LLMs can easily write in 60+
  languages, but voice requires high-quality transcription and synthesis in each; some
  languages have a 20% word error rate even from the best single provider
  ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **[[concepts/model-ensembling|Model ensembling]]** is essential — no single provider is
  best across all languages and failure modes; the modular architecture that multi-homes
  providers has "totally played out to our advantage" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Voice agents need multimodal UX** — when a user needs to type a complex name or
  reservation number, the experience must seamlessly blend voice and visual/text input
  ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **The harness differs from coding agents** — the latency constraint means Sierra's
  core conversation loop looks different from a coding agent harness, even though both
  use the same models and have tool access. Longer async tasks can still be delegated to
  background agents that run without the latency constraint
  ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).

> [!inference] Voice agents are not "chat agents plus speech-to-text." The latency
> constraint reshapes the entire architecture: speculative execution, model ensembling,
> and progress indicators are not optional polish — they are load-bearing infrastructure
> that determines whether the agent works at all.

## Sources

- [[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think|The best AI agents are simpler than you think]] — Zack Reno Wedeen on Sierra's voice architecture: latency constraints, parallelized thinking/listening/talking, naturalism, multilingual ensembling, and multimodal UX
