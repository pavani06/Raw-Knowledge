---
title: "Garbage Collection Day"
type: concept
aliases: ["garbage collection day", "GC day", "slop elimination", "feedback loop closure"]
tags: [ai, agents, software-engineering, process, team-practice]
source_count: 2
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/reviewer-agents]]", "[[concepts/non-functional-requirements]]", "[[concepts/prompt-injection-patterns]]", "[[concepts/agent-harness]]"]
contradicts: []
supports: ["[[concepts/harness-engineering]]"]
extends: []
sources: ["[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]", "[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]"]
---

# Garbage Collection Day

A weekly team ritual in [[concepts/harness-engineering|harness engineering]]: one day per week (Ryan's team used Fridays) dedicated entirely to taking every slop pattern observed during the week and **categorically eliminating it** from ever happening again — by converting human review feedback into automated guardrails.

The core insight is that a human review comment on a PR is a signal of a **context failure** on the agent's part. Rather than giving the same feedback repeatedly, the team invests in making the feedback automatic: write the doc, add the lint rule, create the test, or configure the [[concepts/reviewer-agents|reviewer agent]] so the agent self-heals when it produces that bad behavior in the future.

This is how you go from synchronous human time spent on code review to a self-improving harness that catches the same issues automatically.

## Key Insights

- **Human review comment = context failure** — if the agent needed a human to tell it something, the harness failed to surface that context automatically ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Categorical elimination, not one-off fixes** — the goal is never to give the same feedback twice; each observation becomes a durable guardrail ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **The feedback loop**: human review comment → identify the class of failure → write documentation → add lint/test/reviewer agent → automatic enforcement on all future PRs ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Slop reduction compounds** — continuously appending to persona docs and adding guardrails causes slop to reduce, reduce, reduce over time ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Merge conflicts as a trigger** — Ryan's team started GC day partly because 3–5 PRs/engineer/day caused merge conflicts; GC day addressed both the conflict root causes and the review bottleneck simultaneously ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

> [!inference]
> Garbage Collection Day is the operational mechanism that makes [[concepts/harness-engineering]] self-improving. Without it, the harness is static and human review remains a bottleneck. With it, the harness accumulates the team's collective quality knowledge over time, progressively removing humans from the review loop.

### From Evals Workshop (Laurie Voss, Arize)

- **Parallel to the [[concepts/data-flywheel]]** — both Garbage Collection Day and the
  data flywheel are self-improving feedback loops that convert human review findings into
  automated guardrails; GC day is the harness-engineering version (reviewer agents, lint
  rules, docs), the data flywheel is the eval-infrastructure version (golden datasets,
  regression evals) ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Production failures → guardrails** — Laurie Voss's principle "today's production
  failures become tomorrow's test cases" is the eval-layer equivalent of GC day's
  "human review comment → automated guardrail"; both convert observed failures into
  durable, automated defenses
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **[[concepts/golden-dataset]] as the eval-layer GC artifact** — the golden dataset is
  what GC day produces at the eval layer: encoded domain judgment that prevents the same
  failure from reaching users again
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

## Sources

- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — Ryan's description of Fridays as "garbage collection day" and the feedback-loop-closure process
- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — parallel to data flywheel; production failures → test cases; golden dataset as eval-layer GC artifact
