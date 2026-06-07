---
title: "Context Window Management"
type: concept
aliases: ["context window management", "context management", "context window", "context engineering"]
tags: [ai, llm, context, architecture]
source_count: 3
last_updated: 2026-06-07
parent: []
part-of: []
defines: ["[[concepts/context-rot]]"]
relates-to: ["[[concepts/compaction]]", "[[concepts/skills-progressive-disclosure]]", "[[concepts/programmatic-tool-calling]]", "[[concepts/long-running-agents]]", "[[concepts/prompt-injection-patterns]]", "[[concepts/harness-engineering]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]", "[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
---

# Context Window Management

The set of techniques for keeping a model effective within a finite context window — the
single biggest constraint on [[concepts/long-running-agents]]. Each new session starts with
"amnesia," so memory components, fresh-context strategies, and disciplined use of the window
are required.

Many of the harness improvements over the past year were fundamentally context-window
improvements: [[concepts/skills-progressive-disclosure]], [[concepts/programmatic-tool-calling]],
[[concepts/compaction]], and using the file system (see [[concepts/file-system-state]]) as
external memory instead of cramming everything into context.

## Key Insights

- A new session has no memory — the agent restarts from scratch, so memory components are
  needed ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Models became progressively more **context-aware**, tracking tokens consumed and managing
  their own context as they approach the window's end (Sonnet 4.5 onward)
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- The 1M-token context window reaching GA shifts the design space — you may run a lot within
  a single window instead of needing new sessions
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Audience "smart zone / dumb zone" framing: model quality reportedly degrades past a
  context threshold (~100K with 1M windows); slicing tasks small keeps the model in its
  smart zone — a motivation behind the [[concepts/ralph-loop]]
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

### From Harness Engineering (Ryan Lopopolo, OpenAI)

- **Just-in-time context surfacing** — don't frontload all instructions (which overwhelms the agent); defer them to lint/test time so the agent can prototype freely, then receive targeted corrections at the moment they are relevant ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Context refresh during long runs** — with auto-compaction, context gets paged out; [[concepts/reviewer-agents|reviewer agents]] and lint/test failures serve as continuous context refreshers that remind the agent of requirements throughout a long task ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **File size limits as context engineering** — writing a test that limits files to ≤350 lines is a context-efficiency measure: smaller files mean the model can hold more of the relevant code in its window at once ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **[[concepts/codebase-uniformity|Codebase uniformity]] as context management** — making code maximally consistent means the model builds transferable context regardless of where in the repo it is working; less attention needed per new file ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

### From AI Coding Workflow (Matt Pocock)

- **[[concepts/smart-zone-dumb-zone]] as the practitioner's mental model** — Matt's smart
  zone / dumb zone framing gives context window management a concrete, actionable shape:
  you're either in the smart zone or you're not, and the entire workflow is about staying
  in it ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **System prompt size discipline** — a 250K-token system prompt sends you straight into
  the dumb zone before any work begins; keep the system prompt tiny and use
  [[concepts/skills-progressive-disclosure|skills]] to load context on demand
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Clear context as a context management strategy** — Matt prefers clearing context
  (returning to a known state) over [[concepts/compaction]] for parallelized AFK loops;
  each [[entities/sandcastle|Sandcastle]] sandbox starts with a clean context window,
  guaranteeing smart-zone entry ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **[[concepts/kanban-for-agents|Kanban issue sizing]]** — each issue should be sized to
  fit within the smart zone; large tasks are broken into small independently-grabbable
  issues precisely to keep each agent session within the ~100K token smart zone ceiling
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — recurring theme across the history tour and Q&A
- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — just-in-time surfacing; file size limits; codebase uniformity as context management
- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — smart zone / dumb zone framing; system prompt size discipline; clear-context strategy; Kanban issue sizing
