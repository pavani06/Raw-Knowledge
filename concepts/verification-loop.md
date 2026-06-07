---
title: "Verification Loop"
type: concept
aliases: ["verification loop", "self-verification", "agent verification"]
tags: [ai, agents, llm, verification, testing]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/generator-evaluator-pattern]]", "[[concepts/planner-generator-evaluator-architecture]]", "[[concepts/design-taste-rubric]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Verification Loop

The step where an agent actually *tests its own output* — not just inspecting code but
exercising the running product (e.g. driving the UI with [[entities/playwright|Playwright]],
checking that arrow keys move a player, that physics runs, that routes work). A direct
counter to the model's weakness at judging its own work.

In the [[concepts/generator-evaluator-pattern]] the verification is owned by a *separate*
evaluator agent, which makes it adversarial and far more reliable than a single agent
checking itself.

## Key Insights

- Models are bad at judging their own output — they call half-baked features "done," or
  build a button with no backend behind it
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Real verification means *using the app*: the evaluator launched the game, played it, and
  built a live debug HUD to make checking easier
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- The evaluator caught real bugs a CI/[[concepts/ralph-loop]] would miss — FastAPI route
  ordering, a delete-key boolean logic bug — precisely *because* it used the app, not just
  unit tests ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Vision improved enough (Opus 4.x) that the evaluator can read network/console errors,
  navigate apps, zoom in, and spot overlapping text on elements
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — Retro Forge play-mode example and bug-catching anecdotes
