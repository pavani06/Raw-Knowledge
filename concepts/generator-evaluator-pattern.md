---
title: "Generator-Evaluator Pattern"
type: concept
aliases: ["generator-evaluator", "generator evaluator pattern", "generator-critic", "adversarial evaluator", "GAN-style harness"]
tags: [ai, agents, llm, architecture, verification]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/verification-loop]]", "[[concepts/design-taste-rubric]]", "[[concepts/sub-agents]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]"]
---

# Generator-Evaluator Pattern

An [[concepts/agent-harness]] pattern, borrowed conceptually from GANs (generative
adversarial networks): one **generator** agent builds, a separate **evaluator** (critic)
agent grades, and adversarial pressure between them drives quality over long runs. The two
have **separate context windows, system prompts, and jobs**.

The crucial property: the evaluator doesn't just read diffs — it actually *uses the app*
(launching [[entities/playwright|Playwright]], navigating, clicking, screenshotting) and
hands a critique back to the generator, which then reflects and fixes.

## Key Insights

- **Why it beats self-review**: tuning a standalone critic to be harsh is tractable; tuning
  a builder to be self-critical is not. It exploits the gap between an LLM's ability to
  *critique* vs. *generate* — like a human finding it easier to critique art than make it
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- **Self-evaluation is a trap** — models are sycophantic and rubber-stamp their own work
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- **Keep streams clean**: the evaluator should judge *output only*, NOT see the generator's
  reasoning traces — mixing the two streams lets the model kid itself
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- **It can pivot, not just patch**: when the generator is stuck on a criterion, this harness
  throws everything out and restarts — unlike a single pass or [[concepts/ralph-loop]] that
  keeps patching the same thing ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Out of the box, Claude is a *bad* QA agent (it defers bugs as "fix later"); making the
  evaluator harsh required extensive prompt tuning via [[concepts/reading-traces]]
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- The pattern is a *subset* of the [[concepts/agent-teams]] approach — each team member can
  be paired with its own critic
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — the central state-of-the-art pattern presented by Ash
