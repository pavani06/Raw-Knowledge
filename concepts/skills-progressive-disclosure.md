---
title: "Skills (Progressive Disclosure)"
type: concept
aliases: ["skills", "progressive disclosure", "agent skills"]
tags: [ai, agents, llm, context, architecture]
source_count: 4
last_updated: 2026-08-30
parent: []
part-of: ["[[concepts/context-window-management]]"]
defines: []
relates-to: ["[[concepts/programmatic-tool-calling]]", "[[concepts/design-taste-rubric]]", "[[concepts/agent-harness]]", "[[concepts/harness-engineering]]", "[[concepts/prompt-injection-patterns]]", "[[concepts/value-maturity-ladder]]"]
contradicts: []
supports: ["[[concepts/context-window-management]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]", "[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]", "[[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]"]
---

# Skills (Progressive Disclosure)

A [[entities/claude-code|Claude Code]] / [[entities/agent-sdk|Agent SDK]] primitive that
makes effective use of the context window via **progressive disclosure**: only the skill's
front matter is loaded up front (instead of all tool descriptions, which consume the context
window), and the full skill body is loaded only when instantiated — optionally followed by
references to deterministic code.

## Key Insights

- Progressive disclosure: front matter first, full body on instantiation, then references to
  runnable code — a [[concepts/context-window-management]] win
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Skills are a clean way to **package grading rubrics** (see [[concepts/design-taste-rubric]])
  into a general development flow
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Learnings from [[concepts/reading-traces]] can be baked into skills (or CLAUDE.md / prompt
  templates) to avoid repeating bad behavior
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

### From Harness Engineering (Ryan Lopopolo, OpenAI)

- **Go deep, not wide** — maintain 5–10 high-quality skills rather than sprawling many thin ones; the infrastructure beneath skills changes frequently and you don't want to track it ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Hide infrastructure complexity beneath skills** — when the team moved from Chrome DevTools Protocol directly to a daemon, Ryan didn't know for three weeks because [[entities/codex|Codex]] figured it out from the skill docs; the skill abstracted the change ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Skills as the human's invocation surface** — the human invokes a skill; the agent figures out the implementation details beneath it; this keeps the human interface stable even as the underlying tooling evolves ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Agents can write skills** — Ryan pointed Codex at OpenAI's prompting cookbooks and had it synthesize a skill for writing prompts; the agent writes the prompts that improve the agent ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

### From AI Coding Workflow (Matt Pocock)

- **Grill-me, write-PRD, improve-code-base-architecture as pull-based skills** — Matt's
  three primary skills are invoked on demand (pull-based), not loaded upfront; this is the
  progressive disclosure pattern in practice: the skill body is only loaded when the human
  invokes it ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Skills as tunable behavior** — owning the skill prompt means owning the behavior; if
  the grill-me skill asks too many questions, adjust the prompt. Skills are the human's
  lever for shaping agent behavior without touching the model
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Skills encode the workflow** — the full Matt Pocock workflow (grill → PRD → Kanban →
  AFK loop) is packaged as skills; the human invokes a skill name, the agent executes the
  full workflow step. Skills are the interface between human intent and agent execution
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

### From GTM AI Agents at Snowflake (Sait Izmit)

- **The skill library as instruction-overflow relief** — business processes and workflows could no longer fit into the agent instructions ("we couldn't fit them into the agent instructions anymore"), and skills became the release valve: "Oh, perfect. Let's build a skill library" — ~20 skills now connected to the GTM assistant ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).
- **MCP overflowed the instructions again → progressive disclosure** — orchestrating 5–6 [[entities/model-context-protocol|MCP]] connections required yet more instructions until the team "hit the limits on the agent instructions"; progressive disclosure was the answer — enterprise-scale confirmation of this page's core pattern at 6,000 users ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).
- **Skills as a maturity-ladder rung** — team-built skills are how GTM teams escaped the IT/SaaS-procurement backlog and became builders; see [[concepts/value-maturity-ladder]] ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — history tour + closing build-your-own primitives
- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — Ryan's "5–10 deep skills" principle; hiding infrastructure complexity; agents writing skills
- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — grill-me/write-PRD/improve-architecture as pull-based skills; skills as tunable behavior; skills encoding the full workflow
- [[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users|GTM AI Agents: Lessons from Deploying to 6,000 Users]] — Sait Izmit (Snowflake) on the skill library as instruction-overflow relief and progressive disclosure at 6,000-user scale
