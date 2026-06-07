---
title: "Ralph Loop"
type: concept
aliases: ["ralph loop", "ralph wiggum technique", "ralph wiggum"]
tags: [ai, agents, llm, technique]
source_count: 2
last_updated: 2026-06-07
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/long-running-agents]]", "[[concepts/context-window-management]]", "[[concepts/compaction]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
---

# Ralph Loop

A simple long-horizon technique: take a prompt, feed it into the [[entities/claude-code|Claude Code]]
CLI, and run it on a loop until all tasks are complete. Originated by Jeffrey Huntley
(released ~July, gained traction ~December). Slightly deeper than the simplification: there
is a planning phase that breaks the prompt into features, then picks one task and works it
in a fresh context window.

Its appeal is its motto — *"deterministically bad in an undeterministic world"* — i.e. it
is better to fail predictably than to succeed unpredictably.

## Key Insights

- Anthropic shipped its own Ralph Loop plugin inside Claude Code, but it runs within a
  *single* session relying on [[concepts/compaction]] rather than spawning fresh context
  windows — leading some to argue it's "not a real Ralph Loop". It uses max-iterations, a
  safe word, and a stop hook that intercepts when Claude would stop and continues until an
  exit criterion is hit
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Its limitation vs. the [[concepts/planner-generator-evaluator-architecture]]: a fixed
  `plan.md` with **no adversarial counterpart** arguing with the main loop, and it keeps
  *patching* the same thing rather than pivoting to a fresh approach
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- One audience view: the Ralph loop's value was keeping the model in its "smart zone" by
  slicing tasks below ~100K context; the speakers note larger context windows + compaction
  reduce that need but it may still fit some use cases
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

### From AI Coding Workflow (Matt Pocock)

- **ralph-once.sh as the AFK implementation primitive** — Matt's `ralph-once.sh` script is
  his concrete implementation of the Ralph Loop; it runs a single AFK agent session on one
  [[concepts/kanban-for-agents|Kanban issue]] and exits. [[entities/sandcastle|Sandcastle]]
  runs multiple ralph-once.sh instances in parallel Docker sandboxes
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Ralph Loop + vertical slices + TDD** — Matt adds [[concepts/vertical-slices]] and
  [[concepts/feedback-loops|TDD]] discipline on top of the basic Ralph Loop; the loop is
  the execution mechanism, but the quality comes from the feedback loops and task sizing
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Clear context > compact for Ralph Loop** — Matt prefers clearing context (returning to
  a known state) over [[concepts/compaction]] between Ralph Loop iterations; predictability
  beats continuity when running many parallel loops
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — Andrew's history-tour interlude + Q&A on smart/dumb zones
- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — ralph-once.sh implementation; Sandcastle parallelization; clear-context preference over compaction
