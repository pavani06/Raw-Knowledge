---
title: "Mental Alignment"
type: concept
aliases: ["mental alignment", "code review as alignment", "reviewing plans not code", "team alignment"]
tags: [ai, agents, llm, code-review, collaboration, software-engineering, workflow]
source_count: 1
last_updated: 2026-06-08
parent: []
part-of: ["[[concepts/research-plan-implement]]"]
defines: []
relates-to: ["[[concepts/reviewer-agents]]", "[[concepts/shared-design-concept]]", "[[concepts/dont-outsource-thinking]]", "[[concepts/prd-as-destination]]", "[[concepts/code-as-free-resource]]"]
contradicts: []
supports: ["[[concepts/research-plan-implement]]"]
extends: []
sources: ["[[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]"]
---

# Mental Alignment

The real purpose of code review — and of the [[concepts/research-plan-implement|research/plan]]
artifacts in agentic coding: **keeping the whole team on the same page about how the codebase
is changing and why**. Correctness checking matters, but the load-bearing function of review
is shared understanding of the system's evolution.

In a world where AI ships 2–3x more code, no human can read every line ("I can read a
thousand lines of Golang a week — sorry, I can't; it's hard; I don't want to"). The solution
is to **review the plans, not the code**: a technical leader reads the [[concepts/prd-as-destination|plans]]
and research, stays current on how the system is evolving, and catches problems early —
without reading every diff. The plan becomes the alignment surface.

## Key Insights

- **Code review is for mental alignment** — its most important job is not catching bugs but
  keeping everyone aligned on how and why the codebase is changing
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Read plans to maintain understanding** — a leader who reads the plans (not every line of
  code) can keep up to date and catch problems early as throughput scales
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Attach the agent thread to the PR** — Mitchell Hashimoto's practice of putting AMP threads
  on pull requests shows the reviewer the exact steps, prompts, and "I ran the build and it
  passed," taking the reviewer on a journey a wall-of-green-diff cannot
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Plans as the peer-review unit** — if you need peer review, send the plan: "Does this look
  right? Is this the right approach? Is this the right order to look at things?" Alignment
  happens before implementation, not after
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **The reviewer's burden shifts to the author** — as you ship 2–3x more code, it's on you to
  find ways to keep the team aligned: show the steps, show how it was tested manually
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).

> [!inference] Mental alignment is the human-team counterpart to
> [[concepts/shared-design-concept]] (human↔AI alignment) and the inverse of
> [[concepts/reviewer-agents]] (machine-enforced quality). Where reviewer agents automate the
> *correctness* function of review, mental alignment names the *shared-understanding* function
> that cannot be automated away — and relocates it from the diff to the plan.

## Sources

- [[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases|No Vibes Allowed: Solving Hard Problems in Complex Codebases — Dex Horthy, HumanLayer]] — "code review is for mental alignment"; reviewing plans not code; Mitchell Hashimoto's AMP-threads-on-PRs practice
