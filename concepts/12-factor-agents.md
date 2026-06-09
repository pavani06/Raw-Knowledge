---
title: "12-Factor Agents"
type: concept
aliases: ["12 factor agents", "12-factor agents", "twelve-factor agents", "12factor agents"]
tags: [ai, agents, llm, methodology, software-engineering]
source_count: 1
last_updated: 2026-06-09
parent: []
part-of: []
defines: ["[[concepts/micro-agents]]", "[[concepts/structured-output]]", "[[concepts/agent-state-management]]", "[[concepts/frameworks-vs-libraries]]"]
relates-to: ["[[concepts/harness-engineering]]", "[[concepts/context-window-management]]", "[[concepts/tool-use]]", "[[concepts/sub-agents]]", "[[entities/humanlayer]]", "[[concepts/agent-harness]]"]
contradicts: []
supports: ["[[concepts/harness-engineering]]"]
extends: []
sources: ["[[sources/2026-06-09-12-factor-agents]]"]
---

# 12-Factor Agents

A framework of **12 principles for building reliable LLM applications**, modeled after the
[12-Factor App](https://12factor.net) methodology that defined how to build cloud-native
applications a decade ago. Proposed by Dex Horthy ([[entities/humanlayer|HumanLayer]]) after
interviewing 100+ founders and builders and observing the patterns that made their
production agents reliable.

The framework's core thesis: **agents are just software**. LLMs are stateless pure
functions (token in, token out). Everything that makes agents good is context engineering
— owning your prompts, your context window, your control flow, and your state. The hard AI
parts (prompt engineering, context optimization, eval design) should be *your* focus; the
tools and frameworks should take away the *other* hard parts (infrastructure, state
management, human contact).

> [!inference]
> The 12-Factor Agents framework is not a replacement for existing methodologies like
> [[concepts/harness-engineering]] — it is a **codification of patterns** that harness
> engineering practitioners were already discovering. Dex's contribution is naming,
> cataloging, and open-sourcing them so the community can build shared vocabulary and
> tooling.

## The 12 Factors (as presented in the talk)

The talk bundles several factors together for time; the full list lives in the open-source
GitHub repo (4,000+ stars, 14 contributors).

1. **Structured Output** — the most magical thing LLMs can do is turn natural language into
   JSON. See [[concepts/structured-output]].
2. **Own Your Prompts** — eventually you'll write every token by hand. LLMs are pure
   functions; the only thing determining reliability is the quality of tokens in and out.
3. **Own Your Context Window** — don't blindly append errors; clear, summarize, optimize
   density. See [[concepts/context-window-management]].
4. **Tool Use is Harmful** — tools are just JSON and deterministic code; there's nothing
   special about them. See [[concepts/tool-use]].
5. **Own Your Control Flow** — you have a prompt, a switch statement, a context builder,
   and a loop. Own all four.
6. **Manage Execution and Business State** — execution state (current step, retries) +
   business state (messages, approvals). See [[concepts/agent-state-management]].
7. **Pause and Resume** — serialize the context window to a database; the agent doesn't
   even know things happened in the background.
8. **Contact Humans with Tools** — push the tool-call vs. message-to-human distinction to
   the first natural-language token. See [[concepts/human-in-loop-vs-afk]].
9. **Trigger from Anywhere** — let users email, Slack, Discord, SMS with your agents.
10. **Small Focused Agents** — micro agent loops (3-10 steps) inside mostly deterministic
    DAGs. See [[concepts/micro-agents]].
11. **Stateless Agents** — agents should be stateless reducers; you own and manage the
    state.
12. **[[concepts/frameworks-vs-libraries|Frameworks vs. Libraries]]** — agents need
    scaffolding (like shadcn), not wrappers (like bootstrap). The tool should take away the
    non-AI hard parts so you can focus on the AI hard parts.

## Key Insights

- The framework emerged from observing 100+ production agents — most weren't that agentic
  at all, they were mostly software with small AI sprinklings
  ([[sources/2026-06-09-12-factor-agents]]).
- The analogy to 12-Factor Apps is deliberate: just as Heroku needed to define what it
  meant to build for the cloud before "cloud native" had a name, the agent ecosystem needs
  shared vocabulary and patterns ([[sources/2026-06-09-12-factor-agents]]).
- It's explicitly **not an anti-framework manifesto** — it's a wish list / feature request
  list: "how can we make frameworks serve the needs of really good builders who need high
  reliability and want to move fast" ([[sources/2026-06-09-12-factor-agents]]).
- The framework argues frameworks should handle the non-AI hard parts (infrastructure,
  state, human contact) so builders can spend their time on the AI hard parts (prompts,
  flow, tokens) — the opposite of what many current frameworks do
  ([[sources/2026-06-09-12-factor-agents]]).
- The companion tool `create-12-factor-agent` (in development at
  [[entities/humanlayer|HumanLayer]]) follows the shadcn model: scaffold code you own
  rather than wrap a black box ([[sources/2026-06-09-12-factor-agents]]).

## Sources

- [[sources/2026-06-09-12-factor-agents|12-Factor Agents: Patterns of reliable LLM applications]] — Dex Horthy's AI Engineer talk introducing the framework; derived from 100+ founder/engineer interviews

