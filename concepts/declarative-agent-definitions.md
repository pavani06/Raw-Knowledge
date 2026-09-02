---
title: "Declarative Agent Definitions"
type: concept
aliases: ["declarative agent definitions", "markdown agents", "agent definitions as markdown", "declarative agents"]
tags: [ai, agents, architecture, developer-experience, configuration]
source_count: 1
last_updated: 2026-09-02
parent: []
part-of: ["[[concepts/agent-kernel]]"]
defines: []
relates-to: ["[[concepts/no-code-agent-building]]", "[[concepts/frameworks-vs-libraries]]", "[[concepts/prompt-as-code]]", "[[concepts/event-driven-agents]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]"]
---

# Declarative Agent Definitions

Defining agents as **markdown/config files dropped into a folder** instead of writing them
inside framework code. The runtime picks the file up and the agent "just magically works."
Everyone hates YAML, but the format wins because it is versionable, diffable, and
reviewable in a PR — and because it keeps prompts out of code, which is where frameworks
force them ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

The decisive effect is **who can contribute**: after a month of internal deployment at
[[entities/txt|.txt]], 20 agents existed, "not just contributed by technical people" — the
markdown layer opens agent authoring to the people who understand the workflow
([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

## Key Insights

- **"Markdown is userland"** — the agent definition format is optional infrastructure: a
  frontend could skip it entirely; the kernel does not require it
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **The anti-pattern it replaces** — with agent frameworks, "I spent all my time actually
  editing the prompt within the code"; declarative files move the thing you actually
  iterate on (the prompt) into the artifact you actually review (the file)
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Topology over code** — combined with [[concepts/event-driven-agents|event
  subscriptions]], contribution is "drop a file and the topology emerges"; you need to know
  what events exist, not how to program
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

> [!inference] Same impulse as Sierra's [[concepts/no-code-agent-building|no-code
> journeys]], two instantiations: Sierra compiles a DSL deterministically down to code and
> keeps code as the escape hatch; .txt keeps markdown as *userland* interpreted by the
> kernel, no compilation step at all. Both move agent authoring up an abstraction level so
> domain experts own the artifact — which is also the practical form of
> [[concepts/prompt-as-code]]: the versioned, PR-reviewed artifact IS the prompt.

## Sources

- [[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt|Agent Frameworks Considered Harmful — Rémi Louf, .txt]] — markdown agent definitions as userland; prompts out of code; non-technical contribution at scale
