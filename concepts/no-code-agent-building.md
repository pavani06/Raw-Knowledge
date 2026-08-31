---
title: "No-Code Agent Building"
type: concept
aliases: ["no-code agent building", "journeys", "no-code layer"]
tags: [ai, agents, no-code, platforms, enterprise]
source_count: 1
last_updated: 2026-08-30
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/harness-engineering]]", "[[concepts/context-window-management]]", "[[concepts/frameworks-vs-libraries]]", "[[concepts/simulations]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]"]
---

# No-Code Agent Building

Authoring agents through a declarative layer instead of code. At Sierra, the no-code layer is **journeys** — "kind of the underlying source code layer, although it's not really code. It's more like natural language or standard operating procedures" — which compiles down to Agent SDK code deterministically and isomorphically ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).

## Key Insights

- **Deterministic, isomorphic compilation** — "over the last 18 months... pretty much all of the agent development has shifted to our no code layer that we call journeys. It compiles down to Agent SDK code deterministically and isomorphically... you can turn it one way and then turn it back and it's the same." Code and no-code are interchangeable: code can move to no-code and back ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **LLM-as-compiler was tried and rejected** — "If you're just doing text, you have to choose between this is non-deterministically compiled, which all of the experiments we've done in that direction, you end up with more harm than good. Or this is a prompt engineering task, which then puts you in the realm of engineering teams." Journeys has "some DSL... not pure raw text" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **The audience is operations teams, not engineers** — "we are very proud to be more in the realm of operations teams where a lot of that domain specific knowledge resides." The declarative language "maps the type of document that we would write for someone joining the team in a customer experience role or sales role. You would explain to them how to do the job" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Ghostwriter flattens the learning curve** — "Ghostwriter has totally changed the learning curve for building agents... it's an expert in journeys. But Ghostwriter is using the journeys product. So it's not writing code, it's writing journeys directly so that you can go inspect that after the fact." Ghostwriter primarily (entirely) edits no-code because "that's where the vast majority of activity is on the platform today" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Self-serve for the people with the most context** — builders are "primarily people that have the most depth and insight about the ideal customer experience, which tends to be operations people, so customer experience managers." Sierra is "constantly trying to sand down all of the barriers between the people with the most context and their ability to contribute directly to the platform" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Code remains a first-class escape hatch** — customers with CI/CD pipelines or "100-plus developers" work in Git; because no-code compiles to code, the platform "will import code files and compiled no code files kind of all as though they're the same thing because they are" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).

> [!inference] Deterministic no-code→code compilation is the production instantiation of the scaffolding-over-wrappers thesis in [[concepts/frameworks-vs-libraries]] (noted in the source's Connections section). It also reshapes [[concepts/harness-engineering]] and [[concepts/context-window-management]] practice: the artifact a builder curates is a declarative journey rather than a prompt or a code file, and changes proposed in no-code are validated by [[concepts/simulations]] before release — the same review-then-ship discipline, moved up one abstraction level. The division of labor pairs with [[concepts/forward-deployed-engineering]]: ops domain experts self-serve in no-code while forward-deployed builders handle the deep, code-adjacent work.

## Sources

- [[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think|The best AI agents are simpler than you think]] — Zack Reno Wedeen (Sierra) on the journeys layer: deterministic isomorphic compilation, rejected LLM-as-compiler, ops-team audience, Ghostwriter authoring journeys directly, and the code escape hatch
