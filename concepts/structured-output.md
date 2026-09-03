---
title: "Structured Output"
type: concept
aliases: ["structured output", "NL to JSON", "natural language to JSON", "structured data extraction"]
tags: [ai, llm, agents, data]
source_count: 3
last_updated: 2026-09-02
parent: []
part-of: ["[[concepts/12-factor-agents]]"]
defines: []
relates-to: ["[[concepts/tool-use]]", "[[concepts/agent-harness]]", "[[concepts/typed-agent-boundaries]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-09-12-factor-agents]]", "[[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]", "[[sources/2026-09-02-the-prompting-playbook]]"]
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

### From Agent Frameworks Considered Harmful (Rémi Louf, .txt)

- **Structured output as company specialty** — [[entities/txt|.txt]] has worked on
  structured outputs for three years; in the kernel story it is the primitive that makes
  [[concepts/typed-agent-boundaries|typed events and typed tool calls]] enforceable at the
  boundary ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Provider quality is a production risk** — Anthropic's weak structured outputs caused
  ~20% of events to be wrong and rejected, the origin story of .txt's own stack; a reminder
  that NL→JSON reliability is not uniform across providers
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).
- **Open-source models were good enough** — after switching to open-source models (even a
  local one on a laptop), the workload ran without third-party APIs — for non-coding agent
  work; coding is a different question
  ([[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt]]).


- **The output contract has two layers** — the prompt defines the format (e.g. XML tags
  wrapping the answer), and the harness enforces it programmatically: a stop sequence that
  detects the closing tag and halts generation, or structured outputs for nested JSON
  schemas. The harness layer guarantees consistency to a higher degree than prompt text
  alone and survives model migration better. Right-size the contract: a conversational bot
  needs a light one; machine-consumed output needs heavy enforcement
  ([[sources/2026-09-02-the-prompting-playbook]]).
## Sources

- [[sources/2026-06-09-12-factor-agents|12-Factor Agents: Patterns of reliable LLM applications]] — Dex Horthy on Factor 1; structured output as the foundation of all agent capabilities
- [[sources/2026-09-02-agent-frameworks-considered-harmful-remi-louf-txt|Agent Frameworks Considered Harmful — Rémi Louf, .txt]] — structured outputs as the kernel's boundary primitive; provider-quality failure mode (20% rejected events)
- - [[sources/2026-09-02-the-prompting-playbook|The Prompting Playbook]] — Claude (Anthropic, Code with Claude breakout) on maintaining a production prompt through a model migration (Meridian Mobile support bot: eval suite, XML-tag hygiene, stop sequences, tool integration, trade-off balancing) and building a scheduler agent from zero (model/thinking/prompt/architecture comparison, generate-evaluate-repair economics) — the two-layer output contract: prompt-level format definition + stop-sequence/structured-output enforcement in the harness
