---
title: "Don't Outsource the Thinking"
type: concept
aliases: ["don't outsource the thinking", "do not outsource thinking", "AI amplifies thinking", "no silver bullet", "there is no perfect prompt"]
tags: [ai, agents, llm, coding-agents, philosophy, workflow]
source_count: 1
last_updated: 2026-06-08
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/research-plan-implement]]", "[[concepts/mental-alignment]]", "[[concepts/shared-design-concept]]", "[[concepts/grill-me-skill]]", "[[concepts/semantic-diffusion]]"]
contradicts: []
supports: ["[[concepts/research-plan-implement]]"]
extends: []
sources: ["[[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]"]
---

# Don't Outsource the Thinking

A core discipline of agentic coding: **AI cannot replace thinking — it can only amplify the
thinking you have done (or the lack of thinking you have done)**. There is no perfect prompt
and no silver bullet. The [[concepts/research-plan-implement|RPI]] workflow only works because
the human stays in the loop, reading the plans and verifying correctness — not because the
markdown is magic.

This is the explicit counter to tools that "spew out a bunch of markdown files just to make
you feel good." Process artifacts that the human never reads provide false comfort, not
leverage.

## Key Insights

- **AI amplifies thinking, it doesn't replace it** — "AI cannot replace thinking. It can only
  amplify the thinking you have done or the lack of thinking you have done"
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **There is no perfect prompt, no silver bullet** — this is not magic; the workflow fails if
  you do not read the plan
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **The human-in-the-loop is what makes RPI valuable** — Jake's blog point: the value of
  research/plan/implement comes from the human verifying it's correct, not from the steps
  themselves ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Beware markdown theater** — watch out for tools that generate documents purely to make you
  feel productive; sometimes a full RPI is overkill (changing a button color — just tell the
  agent) ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **When the agent fails, go back to the whiteboard** — the Parquet-Java attempt only
  progressed after the humans threw out the research/plans and re-thought how it actually fits
  together ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).

> [!inference] "Don't outsource the thinking" is the philosophical spine shared with
> [[concepts/mental-alignment]] and [[concepts/grill-me-skill|grill-me]]: the agent is a
> force multiplier on human judgment, so the scarce input is human thinking applied at the
> highest-leverage point (research and planning). It also explains why
> [[concepts/semantic-diffusion|"spec-driven dev"]] failed as a phrase — it implied the spec
> could think for you.

## Sources

- [[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases|No Vibes Allowed: Solving Hard Problems in Complex Codebases — Dex Horthy, HumanLayer]] — "AI cannot replace thinking"; no perfect prompt; human-in-the-loop as the source of RPI's value; markdown-theater warning
