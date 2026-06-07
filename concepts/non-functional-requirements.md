---
title: "Non-Functional Requirements"
type: concept
aliases: ["non-functional requirements", "NFRs", "quality bar", "code quality spec", "what good looks like"]
tags: [ai, agents, software-engineering, documentation, quality]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/reviewer-agents]]", "[[concepts/prompt-injection-patterns]]", "[[concepts/codebase-uniformity]]", "[[concepts/garbage-collection-day]]"]
contradicts: []
supports: ["[[concepts/agent-harness]]", "[[concepts/harness-engineering]]"]
extends: []
sources: ["[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]"]
---

# Non-Functional Requirements

The undocumented quality bar that experienced engineers carry in their heads — the ~500 micro-decisions that go into a single good patch: naming conventions, error handling patterns, retry/timeout discipline, component decomposition, test structure, security interface design. In the agent era, these **must be written down** to be visible to the model.

Agents have seen trillions of lines of code and can satisfy any style — but only if you specify it. The model has no way to infer your team's particular taste from the codebase alone. Writing non-functional requirements down is the act of making your team's accumulated expertise legible to [[concepts/agent-harness|the harness]].

This is the core documentation work of [[concepts/harness-engineering|harness engineering]]: ADRs, persona-oriented docs, QA plan templates, lint rules, and test assertions about source code structure are all mechanisms for encoding non-functional requirements into the repository.

## Key Insights

- **A single patch requires ~500 micro-decisions** around non-functional requirements — things like "should this have a timeout?", "should this component be stateless?", "is this interface impossible to misuse?" ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Diverse team expertise compounds** — when each engineer (front-end architect, reliability engineer, product-minded engineer) writes down their non-functional requirements, every agent trajectory gets the best of every person on the team ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Lint rules and tests are executable non-functional requirements** — e.g. a lint that checks every `fetch()` call has a retry and timeout wrapper, or a test that limits files to 350 lines ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Error messages are non-functional requirement prompts** — a lint failure that says "you shouldn't have `unknown` here because we parse-don't-validate at the edge" is more valuable than a bare type error ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **"Do not produce slop"** is a valid non-functional requirement — you can simply state it and the model will comply, but you must state it ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Persona-oriented documentation** — organizing requirements by engineering persona (front-end, reliability, scalability) maps naturally to [[concepts/reviewer-agents]] that embody those personas ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

## Sources

- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — central theme; Ryan's argument that specifying NFRs is the primary job of the engineer in the agent era
