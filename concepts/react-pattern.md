---
title: "ReAct Pattern"
type: concept
aliases: ["ReAct", "react pattern", "reasoning and acting", "reason-act loop", "ReAct agent"]
tags: [ai, agents, llm, architecture, workflow, reasoning]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/agentic-ai]]"]
defines: []
relates-to: ["[[concepts/agentic-ai]]", "[[concepts/agent-planning]]", "[[concepts/tool-use]]", "[[concepts/verification-loop]]", "[[concepts/eval-iterate-cycle]]"]
contradicts: []
supports: ["[[concepts/agentic-ai]]", "[[concepts/verification-loop]]"]
extends: ["[[concepts/agent-planning]]"]
sources: ["[[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]"]
---

# ReAct Pattern

**Reasoning and action interleaved** — the agent thinks about the next step, takes an
action (calls a tool, writes output), observes the result, then reasons again. The loop
continues until the goal is reached or the agent determines it cannot proceed.

The micro-cycle:
```
Thought → Action → Observation → Thought → Action → Observation → … → Final Answer
```

This contrasts with pure planning (reason everything upfront, then execute) or pure
reaction (act without reasoning). ReAct combines both: each action is preceded by explicit
reasoning, and each observation updates the reasoning for the next step.

ReAct is the loop-level pattern underlying the [[concepts/verification-loop]] — the
"check result and improve" step in the agent execution loop is the Observation phase of
ReAct made explicit.

## Key Insights

- **Reasoning and action together** — the agent does not plan everything upfront; it
  reasons about the *next* step, acts, observes, and updates its plan. This makes it
  adaptive to unexpected tool results
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- **Grounding via observation** — each action produces an observation that grounds the
  next reasoning step in real data, reducing hallucination compared to pure chain-of-thought
  ([[sources/2026-06-07-beginners-guide-to-learning-agentic-ai]]).
- **Relationship to [[concepts/verification-loop]]** — the Observation step in ReAct is
  the micro-level verification; the [[concepts/verification-loop]] is the macro-level
  verification (testing the full output). Both are "check and improve" loops at different
  granularities.
- **Relationship to [[concepts/eval-iterate-cycle]]** — the eval-iterate cycle
  (instrument → trace → eval → annotate → improve → repeat) is ReAct scaled to the
  system level: the "eval" is the observation, the "improve" is the next action.

> [!inference]
> ReAct is the foundational loop pattern from which more sophisticated agent architectures
> derive. The [[concepts/planner-generator-evaluator-architecture]] is ReAct with roles
> separated into distinct agents: the generator acts, the evaluator observes, the planner
> reasons about the next sprint.

## Sources

- [[sources/2026-06-07-beginners-guide-to-learning-agentic-ai|The Beginner's Guide to Learning Agentic AI]] — ReAct described as "reasoning and action together"; listed as a core agentic workflow pattern
