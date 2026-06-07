---
title: "Prompt Injection Patterns"
type: concept
aliases: ["prompt injection patterns", "context injection", "prompt injection", "agent prompting techniques", "just-in-time prompting"]
tags: [ai, agents, llm, prompting, context, architecture]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]", "[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/non-functional-requirements]]", "[[concepts/reviewer-agents]]", "[[concepts/context-window-management]]", "[[concepts/skills-progressive-disclosure]]", "[[concepts/garbage-collection-day]]"]
contradicts: []
supports: ["[[concepts/agent-harness]]", "[[concepts/harness-engineering]]", "[[concepts/context-window-management]]"]
extends: []
sources: ["[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]"]
---

# Prompt Injection Patterns

The taxonomy of mechanisms for surfacing context and instructions to an agent at the right time — the practical toolkit of [[concepts/harness-engineering|harness engineering]]. Everything is a prompt: AGENTS.md files, lint error messages, test failures, reviewer agent comments, skills, rules files, and even the structure of the codebase itself.

The key principle is **just-in-time surfacing**: don't frontload all instructions (which overwhelms the agent), but defer them to the moment they are relevant — lint time, test time, PR review time. This is a concrete implementation of [[concepts/context-window-management|context window management]].

## The Prompt Injection Taxonomy

1. **AGENTS.md / rules files** — persistent instructions loaded at session start; the baseline context for what good work looks like
2. **Skills** — lazy-loaded capability packages ([[concepts/skills-progressive-disclosure]]); loaded only when invoked
3. **Lint error messages** — triggered at lint time with actionable remediation steps; e.g. "you shouldn't have `unknown` here because we parse-don't-validate at the edge"
4. **Test failures** — structural tests about source code (e.g. "files must be ≤350 lines") that fire at test time
5. **Reviewer agent comments** — persona-based [[concepts/reviewer-agents]] inject feedback onto the PR that the implementation agent must address before proposing for merge
6. **Error messages with remediation** — good error messages that give actual next steps to the model, not just failure codes
7. **Agent SDK embedded in tests** — shell out to an agent within a test to review the codebase for acceptability using embedded prompts

## Key Insights

- **Everything is a prompt** — AGENTS.md, skills, lint errors, test failures, reviewer comments, rules files are all just different delivery mechanisms for the same thing: text that tells the model what to do ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Just-in-time beats frontloading** — let the agent prototype freely, then surface structural requirements at lint/test time so it can correct course without being overwhelmed upfront ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Prompts can be written by agents** — Ryan pointed Codex at OpenAI's prompting cookbooks and had it synthesize a skill for writing prompts; the agent writes the prompts that improve the agent ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Context refresh during long runs** — with auto-compaction, context gets paged out; reviewer agents and lint/test failures serve as continuous context refreshers that remind the agent of requirements throughout a long task ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **None of this requires touching model weights** — all of these techniques are pure prompt engineering; capability improvements come from better context delivery, not fine-tuning ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

## Sources

- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — Ryan's enumeration of prompt injection mechanisms and the "everything is a prompt" observation
