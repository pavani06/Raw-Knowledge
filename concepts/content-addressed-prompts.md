---
title: "Content-Addressed Prompts"
type: concept
aliases: ["content-addressed prompts", "content-addressed prompt graph", "prompt hashing", "prompt graph"]
tags: [ai, agents, llm, observability, debugging, prompts, architecture]
source_count: 1
last_updated: 2026-09-02
parent: []
part-of: ["[[concepts/agent-kernel]]"]
defines: []
relates-to: ["[[concepts/tracing-observability]]", "[[concepts/compaction]]", "[[concepts/prompt-as-code]]", "[[concepts/eval-driven-development]]"]
contradicts: []
supports: ["[[concepts/tracing-observability]]"]
extends: []
sources: ["[[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]"]
---

# Content-Addressed Prompts

A git/nix-style representation of model interactions: every prompt component (system
prompt, each skill description, tool descriptions, the user message) is stored separately
and addressed by the **hash of its content**. A prompt is then represented as a *list of
hashes* rather than rendered text; model answers are stored the same way
([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

The motivation: **the live chat session is a lie**. What you see in a coding-agent TUI is
not what the model saw — compaction rewrites history, and providers (OpenAI, Anthropic) do
not share the thinking traces. To debug, replay, or audit, you need the exact model input,
which the chat surface cannot give you.

## Key Insights

- **Exact trace-back** — from an answer you walk to the prompt it came from, and from the
  prompt to exactly what entered the model's context
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Run diffs for free** — diff two runs component-wise: did only the user message change,
  or did the skill/tool set change too?
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Replay for evals** — rebuild an old request from the graph and resend it verbatim,
  optionally to a different model; used to evaluate open-source replacements against
  recorded production traffic ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Compaction becomes graph surgery** — with context as a content-addressed graph,
  compaction manipulates hashes, not strings — easier and auditable
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]); see
  [[concepts/compaction]].
- **Auditability at scale** — the main advantage once deployed: know exactly what an agent
  did and why it returned what it returned
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

> [!inference] Content addressing is the structural completion of
> [[concepts/prompt-as-code]]: prompt-as-code governs *changes* to prompts (commit
> discipline, failure traceability); content addressing makes the prompt itself a
> first-class, hash-identified object whose every historical state is recoverable and
> replayable. It also gives [[concepts/tracing-observability]] its missing foundation —
> spans tell you the model was called, the prompt graph tells you exactly what was sent.

## Sources

- [[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt|Agent Frameworks Considered Harmful — Rémi Louf, .txt]] — the "big rabbit hole": prompt-as-hash-list, the chat-is-a-lie problem, diffs, replay, compaction as graph manipulation
