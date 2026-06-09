---
title: "Closed-Loop Evaluation"
type: concept
aliases: ["closed-loop evaluation", "closed loop eval", "autonomous self-improvement", "self-improving agents"]
tags: [ai, agents, llm, evals, automation, frontier]
source_count: 2
last_updated: 2026-06-09
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/eval-iterate-cycle]]", "[[concepts/eval-driven-development]]", "[[concepts/ralph-loop]]", "[[concepts/verification-loop]]", "[[concepts/harness-engineering]]", "[[concepts/continuous-evaluation]]", "[[concepts/reward-hacking]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: ["[[concepts/eval-iterate-cycle]]"]
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]", "[[sources/2026-06-09-eval-driven-development-missing-discipline]]"]
---

# Closed-Loop Evaluation

The frontier pattern where eval output is fed directly back to a coding agent, which then
automatically improves the application — removing the human from the improvement loop
entirely. The eval suite becomes the feedback mechanism for an autonomous self-improving
system.

Currently (2026) described as "on the horizon" and "very difficult to get to work right now"
— the concept is clear but reliable execution remains elusive.

## Key Insights

- **The vision**: write the initial version of an app, then use evals as the feedback
  mechanism to a coding agent, which automatically improves the app without human involvement
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Current state**: Arize is working toward this but hasn't presented it publicly yet;
  DSPy and similar frameworks have approached it but haven't achieved reliable end-to-end
  closed-loop optimization
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Multi-agent variant**: an agent can generate five prompt variations and test all of them
  against the eval simultaneously, selecting the best without human involvement — a partial
  form of closed-loop optimization already achievable today
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Relation to [[concepts/ralph-loop]]**: the Ralph Loop is a sequential closed loop for
  implementation; closed-loop evaluation extends this to the quality-measurement layer —
  the agent not only implements but also measures and improves based on eval feedback
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

> [!inference] Closed-loop evaluation is the logical endpoint of [[concepts/eval-driven-development]]:
> if evals define success and the agent can read eval output, the agent can improve itself.
> The bottleneck is reliability — current models can partially do this but not consistently
> enough to remove the human from the loop.

### From "The Missing Discipline" (Adnan Masood)

- **Evals become training signals** — enterprises increasingly turn evals into training signals
  (RFT/DPO-style workflows), which amplifies the stakes of getting grading right and the danger
  of [[concepts/reward-hacking|reward hacking]]; OpenAI explicitly warns to guard against it
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Adaptive evals as the near-term closed loop** — tooling auto-generates eval cases from
  near-miss production incidents without human intervention; a partial closed loop already
  emerging from production telemetry
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **The provocation** — "are humans still programming the AI, or just building the labyrinth and
  letting machines evolve to navigate it?" The closed loop (AI judges grading AI workers on
  auto-generated rubrics) is the logical endpoint
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Requires [[concepts/continuous-evaluation]]** — you cannot close the loop on a system you
  only measure once; CE on production traffic is the substrate the closed loop runs on
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss on closed-loop evaluation as the frontier; audience question on DSPy and Karpathy's auto-research ideas
- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — evals as training signals (RFT/DPO); adaptive evals as a near-term closed loop; the self-evolving-systems provocation
