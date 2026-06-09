---
title: "Brownfield Codebases"
type: concept
aliases: ["brownfield", "brownfield codebases", "greenfield vs brownfield", "complex codebases", "legacy codebases"]
tags: [ai, agents, llm, coding-agents, software-engineering, codebase]
source_count: 1
last_updated: 2026-06-08
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/research-plan-implement]]", "[[concepts/context-window-management]]", "[[concepts/code-as-free-resource]]", "[[concepts/codebase-uniformity]]", "[[concepts/dont-outsource-thinking]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]"]
---

# Brownfield Codebases

**Brownfield** = existing, complex, often legacy codebases (a 10-year-old Java codebase, a
300K-line Rust project) — as opposed to **greenfield** (a new Vercel dashboard from scratch).
The brownfield/greenfield split is the central axis along which naive AI coding succeeds or
fails: vibe-coding works great on greenfield and produces slop + churn on brownfield.

Dex Horthy's whole thesis is that disciplined [[concepts/context-window-management|context
engineering]] (via [[concepts/research-plan-implement|RPI]]) is what makes AI viable on
brownfield — "AI that can work well in brownfield codebases that can solve complex problems.
No slop."

## Key Insights

- **The Eigor / 100,000-developer survey**: most AI-assisted software engineering involves a
  lot of rework and codebase churn; it doesn't work well for complex tasks in brownfield
  codebases. You ship more, but much of it is reworking last week's slop
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Greenfield is easy mode** — a little Vercel dashboard works great with naive prompting; a
  10-year-old Java codebase does not. This matched the experience of many founders and senior
  engineers ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Brownfield success is achievable but bounded** — proven on BAML's 300K-line Rust codebase
  (PR merged) and a 7-hour 35K-line session; but removing Hadoop deps from Parquet Java failed
  and required going back to the whiteboard
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **"No slop" is the goal, not a given** — HumanLayer rewired their entire build process over
  eight weeks (team of three) specifically to make AI work in brownfield without producing slop
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).

> [!inference] Brownfield is the stress test that separates real context engineering from
> demo-ware. The reason [[concepts/research-plan-implement|RPI]],
> [[concepts/codebase-uniformity]], and on-demand compressed context all exist is that
> brownfield codebases exceed the [[concepts/smart-zone-dumb-zone|smart zone]] — you cannot
> fit a 5-million-line monorepo in context, so you must compress truth selectively.

## Sources

- [[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases|No Vibes Allowed: Solving Hard Problems in Complex Codebases — Dex Horthy, HumanLayer]] — Eigor survey on rework/churn; greenfield-vs-brownfield split; BAML success and Parquet-Java failure
