---
title: "Structured Output"
type: concept
aliases: ["structured output", "NL to JSON", "natural language to JSON", "structured data extraction"]
tags: [ai, llm, agents, data]
source_count: 1
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/12-factor-agents]]"]
defines: []
relates-to: ["[[concepts/tool-use]]", "[[concepts/agent-harness]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-09-12-factor-agents]]"]
---

# Structured Output

Factor 1 of the [[concepts/12-factor-agents]] framework: the most magical and underrated
capability of LLMs — **turning natural language sentences into structured JSON**. This
has nothing to do with loops, switch statements, code execution, or tools. It is the
atomic primitive that makes agents useful.

The insight is that structured output is the bridge between the fuzzy, probabilistic
world of language models and the deterministic, reliable world of software. You don't
need the LLM to *do* anything — you just need it to *classify, extract, or structure*
information into JSON that your deterministic code can act on.

## Key Insights

- JSON is the universal interface between LLM output and deterministic code — once you
  have structured data, you can pass it into a loop, a switch statement, a function
  call, or any other software construct ([[sources/2026-06-09-12-factor-agents]]).
- This is the simplest, most reliable thing you can do with an LLM today — no complex
  tool chains, no agent loops, just prompt → JSON → code
  ([[sources/2026-06-09-12-factor-agents]]).
- [[concepts/tool-use]] is really just structured output + deterministic code — the
  model outputs JSON specifying which tool to call and with what arguments; your code
  executes it. "There's nothing special about tools. It's just JSON and code"
  ([[sources/2026-06-09-12-factor-agents]]).
- HumanLayer's deploy bot demo: the agent proposes a deploy step (frontend or backend)
  as structured JSON; a human approves or overrides; the JSON drives the next step in
  the deterministic pipeline ([[sources/2026-06-09-12-factor-agents]]).

> [!inference]
> Structured output is the lowest-risk, highest-leverage entry point for adding AI to
> an existing application. Before building complex agent loops, ask: "can this be
> reduced to NL → JSON → deterministic code?" If yes, you avoid all the reliability
> challenges of autonomous agents while still getting the LLM's value.

## Sources

- [[sources/2026-06-09-12-factor-agents|12-Factor Agents: Patterns of reliable LLM applications]] — Dex Horthy on Factor 1; structured output as the foundation of all agent capabilities

