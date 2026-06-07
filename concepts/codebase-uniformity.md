---
title: "Codebase Uniformity"
type: concept
aliases: ["codebase uniformity", "code consistency", "one way to do things", "uniform codebase"]
tags: [ai, agents, software-engineering, architecture, context]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/non-functional-requirements]]", "[[concepts/code-as-free-resource]]", "[[concepts/context-window-management]]", "[[concepts/codebase-uniformity]]"]
contradicts: []
supports: ["[[concepts/agent-harness]]", "[[concepts/harness-engineering]]", "[[concepts/context-window-management]]"]
extends: []
sources: ["[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]"]
---

# Codebase Uniformity

The practice of making code maximally consistent across a repository — one ORM, one async helper pattern, one CI script style, one way to add lint rules, one programming language — so that the model's token predictions are maximally transferable regardless of where in the codebase it is working.

In [[concepts/harness-engineering|harness engineering]], uniformity is a force multiplier: the more consistent the code, the less attention the model needs to activate to do the job, and the more reliably it produces correct output. Code in the file system is text, which means it is effectively prompts given to the coding agent — making it uniform makes those prompts predictable.

Uniformity is achievable because [[concepts/code-as-free-resource|code is free]]: large-scale refactors to enforce a single canonical pattern can be driven by agents. There is no longer a reason to leave inconsistencies in place because "the migration is too expensive."

## Key Insights

- **Code in the file system is prompts** — the more uniform the code, the more transferable the context the model builds as it navigates the repo ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **One of everything**: one bounded concurrency helper, one observable/instrumented command pattern, one ORM, one programming language, one way to write CI scripts, one way to add lint rules ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Package privacy enforces uniformity** — structuring the repo into isolated packages (e.g. 750 PNPM packages by business domain) gives agents concrete file-system hooks to determine which domains are separate and prevents cross-domain leakage ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Agents optimize for local coherence** — without uniformity enforcement, agents tend to reinvent utilities locally rather than using shared helpers; pseudo-linter source-code verification catches this behavior ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Subtree locality** — structure code so most changes are local to a directory subtree; this scopes the agent's attention and reduces the surface area it needs to understand ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Empower a "dictator"** — have someone on the team define the canonical way things must be done, write it down, and use agents to migrate the entire codebase to reflect that reality ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

## Sources

- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — Ryan's discussion of repo structure, 750-package PNPM workspace, and "one way to do everything"
