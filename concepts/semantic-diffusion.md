---
title: "Semantic Diffusion"
type: concept
aliases: ["semantic diffusion", "spec-driven development", "spec driven dev", "RPI naming", "term dilution"]
tags: [ai, agents, llm, terminology, software-engineering, philosophy]
source_count: 1
last_updated: 2026-06-08
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/research-plan-implement]]", "[[concepts/dont-outsource-thinking]]", "[[concepts/prd-as-destination]]", "[[concepts/agentic-ai]]", "[[concepts/llm-vs-agents]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]"]
---

# Semantic Diffusion

**Semantic diffusion** (Martin Fowler, 2006): a good term with a precise definition gets
popular, then everyone starts meaning it to mean a hundred things to a hundred people — until
it becomes useless. Dex Horthy invokes it to explain why **"spec-driven development"** is
broken (the phrase, not the idea) and why there will "never be a year of agents."

The catalog of diffused meanings for "spec-driven dev": a more detailed prompt; a product
requirements document; verifiable feedback loops with back-pressure; treating code like
assembly (Sean Grove's framing); "a bunch of markdown files while you're coding"; or even "a
spec is documentation for an open-source library." Once a term means everything, it means
nothing.

The same fate befell **"agent"**: an agent is a person / a microservice / a chatbot / a
workflow — until Simon Willison's reset, *an agent is just tools in a loop* (compare
[[concepts/llm-vs-agents]]). This is why Dex resists the **RPI** acronym: the moment a
workflow gets a catchy name, it semantically diffuses.

## Key Insights

- **Fowler's 2006 coinage** — "we come up with a good term with a good definition and then
  everybody gets excited and everybody starts meaning it to mean a hundred things to a hundred
  different people and it becomes useless"
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **"Spec-driven dev" is now useless** — not the idea, but the phrase; it's overhyped and
  semantically diffused, with at least six mutually incompatible meanings in circulation
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **"Agent" was diffused and then reset** — person / microservice / chatbot / workflow, until
  "an agent is just tools in a loop" pulled it back to a usable definition (compare
  [[concepts/agentic-ai]]) ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Resist naming the workflow** — Dex deliberately avoids the RPI acronym because the
  important part is **compaction and context engineering**, not the three-letter brand
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Brietta (Thoughtworks) on "spec"** — many people say "spec" and just mean "a more detailed
  prompt," which is not a useful definition
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).

> [!inference] Semantic diffusion is the meta-concept behind this whole knowledge base's
> naming discipline: it argues for anchoring concepts to precise, source-cited definitions
> (exactly what typed concept pages do) rather than to viral buzzwords. It directly motivates
> [[concepts/dont-outsource-thinking]] — a diffused term lets people skip the thinking the
> original term demanded.

## Sources

- [[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases|No Vibes Allowed: Solving Hard Problems in Complex Codebases — Dex Horthy, HumanLayer]] — Fowler's semantic-diffusion concept; the death of "spec-driven dev"; the "agent" dilution-and-reset; resisting the RPI acronym
