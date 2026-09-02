---
title: "Frameworks vs. Libraries"
type: concept
aliases: ["frameworks vs libraries", "frameworks versus libraries", "scaffolding vs wrappers"]
tags: [ai, agents, software-engineering, tooling, architecture]
source_count: 2
last_updated: 2026-09-02
parent: []
part-of: ["[[concepts/12-factor-agents]]"]
defines: []
relates-to: ["[[concepts/harness-engineering]]", "[[entities/humanlayer]]", "[[concepts/code-as-free-resource]]", "[[concepts/declarative-agent-definitions]]", "[[concepts/agent-kernel]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-09-12-factor-agents]]", "[[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]"]
---

# Frameworks vs. Libraries

A classic software engineering debate applied to agent tooling: should agent development
tools be **frameworks** (you plug into their structure) or **libraries** (you own the
structure, the tool provides primitives)? Factor 12 of the
[[concepts/12-factor-agents]] framework.

Dex Horthy argues that current agent frameworks get the tradeoff wrong: they try to
take away the *hard AI parts* (prompt construction, context management, control flow)
— which are exactly the parts builders need to own to achieve reliability. Instead,
tools should take away the *other* hard parts (infrastructure, state management, human
contact) so builders can focus their energy on prompt and context engineering.

## Key Insights

- **Shadcn, not Bootstrap** — the model for agent tooling should be shadcn/ui (scaffold
  code you own and control) rather than Bootstrap (a wrapper you configure but don't
  control). `create-12-factor-agent` (in development at [[entities/humanlayer|HumanLayer]])
  follows this philosophy ([[sources/2026-06-09-12-factor-agents]]).
- **The framework vs. library tension is old** — the talk references a classic Ruby
  community post about whether abstraction or duplication is worse; the same tension
  applies to agents. When frameworks abstract the wrong things, builders end up seven
  layers deep in a call stack reverse-engineering how prompts get built
  ([[sources/2026-06-09-12-factor-agents]]).
- **The anti-pattern: frameworks that own the AI parts** — many frameworks try to
  abstract away prompt construction, tool routing, and control flow. This is helpful at
  70-80% quality but creates a ceiling: to get past that, you need to own those layers
  yourself ([[sources/2026-06-09-12-factor-agents]]).
- **The proposal: frameworks should own the non-AI parts** — infrastructure, state
  serialization, human approval flows, multi-channel triggers. These are hard
  engineering problems that distract from the AI-specific work of prompt and context
  optimization ([[sources/2026-06-09-12-factor-agents]]).

> [!inference]
> This is a structural critique of the current agent framework market: the abstractions
> that let you go from 0 to 70% fast are the same abstractions that prevent you from
> going from 70% to 95%. The market needs tools that help with the *scaffolding* (state,
> infra, human-in-loop) while leaving the *AI engineering* (prompts, context, eval) in
> the builder's hands.

### From Agent Frameworks Considered Harmful (Rémi Louf, .txt)

- **The lived framework failure** — with frameworks, "I spent all my time actually editing
  the prompt within the code"; the escape was [[concepts/declarative-agent-definitions|
  markdown agent definitions]] + an [[concepts/agent-kernel|agent kernel]] that owns
  runtime concerns, leaving no framework abstraction in between
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Build before you buy (in this category)** — the agent-infra category "is definitely
  unsettled"; for a small company, building first reveals what you actually need and where
  existing tools fall short — and the CEO can do it without derailing engineers
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Framework builders: eat your own dog food** — "sometimes it's pretty clear that people
  are building agent orchestration frameworks but not eating their own dog food"
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).

> [!inference] The two sources converge from different angles: 12-Factor says frameworks
> abstract the wrong layer (own the scaffolding, not the AI parts); this talk goes further —
> move runtime concerns into a kernel and agent logic into declarative files, so no one
> owns your agent's control flow but you.

## Sources

- [[sources/2026-06-09-12-factor-agents|12-Factor Agents: Patterns of reliable LLM applications]] — Dex Horthy on Factor 12; the shadcn vs. bootstrap framing; critique of current frameworks
- [[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt|Agent Frameworks Considered Harmful — Rémi Louf, .txt]] — frameworks as prompt-in-code prisons; build-before-you-buy in unsettled infra; the dogfooding demand

