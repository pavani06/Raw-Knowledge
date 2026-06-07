---
title: "Verification Loop"
type: concept
aliases: ["verification loop", "self-verification", "agent verification"]
tags: [ai, agents, llm, verification, testing]
source_count: 3
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/generator-evaluator-pattern]]", "[[concepts/planner-generator-evaluator-architecture]]", "[[concepts/design-taste-rubric]]", "[[concepts/reviewer-agents]]", "[[concepts/non-functional-requirements]]", "[[concepts/agent-evals]]", "[[concepts/eval-driven-development]]", "[[concepts/feedback-loops]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]", "[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]", "[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]"]
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

### From Harness Engineering (Ryan Lopopolo, OpenAI)

- **QA plans as structured verification** — every user-facing PR must include a QA plan documenting critical user journeys and what media should be attached to prove the feature works; a [[concepts/reviewer-agents|reviewer agent]] validates the plan is present and complete ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **QA plan reduces human shoulder-surfing** — when a QA plan is attached and validated, the human can trust the output without reading every line of code; this removes the human from the synchronous review loop ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Reviewer agents as automated verification** — persona-based reviewer agents (security, reliability) running on every push are a form of continuous verification against [[concepts/non-functional-requirements|non-functional requirements]], not just functional correctness ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Smoke testing built artifacts** — before promoting to distribution, agents need tools to download the built artifact, launch it, and validate critical user journeys; this is a verification loop at the deployment stage ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

### From Evals Workshop (Laurie Voss, Arize)

- **Evals are the systematic, scalable verification loop** — [[concepts/agent-evals]] replace
  ad-hoc vibe-checking with a repeatable, measurable process; capability evals define the
  hill to climb, regression evals lock in what's working
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Eval-driven development as pre-verification** — writing evals before building features
  (see [[concepts/eval-driven-development]]) is verification-first: define what correct looks
  like before writing any code, then verify the agent achieves it
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **The eval-iterate cycle closes the loop** — instrument → trace → eval → annotate →
  improve → repeat; this is the verification loop made systematic and data-driven
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — Retro Forge play-mode example and bug-catching anecdotes
- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — QA plans; reviewer agents as verification; smoke testing built artifacts
- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — evals as systematic verification; eval-driven development; the eval-iterate cycle
