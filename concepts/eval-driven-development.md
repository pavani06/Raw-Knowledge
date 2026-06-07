---
title: "Eval-Driven Development"
type: concept
aliases: ["eval-driven development", "EDD", "evaluation-first development", "capability-eval-first"]
tags: [ai, agents, llm, evals, testing, methodology]
source_count: 1
last_updated: 2026-06-07
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/agent-evals]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/verification-loop]]", "[[concepts/feedback-loops]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]"]
---

# Eval-Driven Development

Writing capability evals *before* building a feature — the agent-engineering analog of
test-driven development (TDD). The eval defines what success looks like; the agent then has
a hill to climb. Like TDD, everyone agrees it's a good idea and few people actually do it.

Anthropic built [[entities/claude-code|Claude Code]] this way: capability evals were written
first, and when a new model dropped, the team immediately saw which bets had paid off and
which hadn't — without manual inspection.

## Key Insights

- **Write the eval before the feature** — if you want your agent to always verify customer
  identity before processing a refund, write an eval that checks for that first; this gives
  you a capability eval and a hill to climb
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Capability evals → regression evals** — create capability evals first (agent is failing);
  as you pass them, graduate them to regression evals (lock in what's working). The eval
  suite evolves with the agent
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Evals are infrastructure, not afterthoughts** — some teams add evals at the start of
  development, some at scale; the right time is when vibe-checking becomes a bottleneck to
  improvement, or when changing one thing breaks three others without you noticing
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **The first regression that surfaces before users** — the moment an eval catches a
  regression before it reaches production, the cost of building the eval suite is justified
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

> [!inference] Eval-driven development is to [[concepts/agent-evals]] what [[concepts/feedback-loops]]
> are to AI coding: the quality of the feedback mechanism is the ceiling on the quality of
> the output. Both Matt Pocock (TDD for AI coding) and Laurie Voss (EDD for agent evals)
> converge on the same principle: define the success criterion first, then let the agent climb.

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss on EDD, the Claude Code example, and the capability→regression graduation pattern
