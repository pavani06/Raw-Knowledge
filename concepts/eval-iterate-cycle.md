---
title: "Eval-Iterate Cycle"
type: concept
aliases: ["eval-iterate cycle", "eval iterate cycle", "eval loop", "measure-improve loop", "evaluation loop"]
tags: [ai, agents, llm, evals, methodology, iteration]
source_count: 1
last_updated: 2026-06-07
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/llm-as-judge]]", "[[concepts/golden-dataset]]", "[[concepts/eval-driven-development]]", "[[concepts/data-flywheel]]", "[[concepts/closed-loop-evaluation]]", "[[concepts/tracing-observability]]", "[[concepts/verification-loop]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]", "[[concepts/data-flywheel]]"]
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]"]
---

# Eval-Iterate Cycle

The core operational loop of agent quality improvement: **instrument → trace → eval →
annotate → analyze → improve → repeat**. This is where the real value of evaluation lives —
not in a one-time measurement but in the systematic, compounding process of measuring,
learning, and improving.

The cycle is the agent-engineering equivalent of the scientific method: controlled
experiments with a single variable changed at a time, so any difference in scores is
attributable to that change.

## Key Insights

- **Every prompt change maps to a specific failure** — don't randomly change prompts; change
  them in response to specific things the evals found wrong. Data-driven prompt engineering
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Experiments for controlled comparison** — run the improved agent against the same inputs
  with the same evaluator; the only variable is the prompt change. Eliminates confounders
  like "did the web search happen to return better results this time?"
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Run against failures only** — don't re-run the full dataset on every iteration; create
  a dataset of just the failing cases and hill-climb against those. Run the full dataset
  periodically when you think you've reached a stopping point
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Rubric iteration** — the [[concepts/llm-as-judge]] prompt can be improved the same way
  the agent prompt can; use precision/recall metrics to diagnose judge failures and iterate
  the rubric ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Pass@K for reliability** — run each example K times to account for non-determinism;
  pass@K (succeeds at least once in K tries) vs. pass^K (succeeds every time) diverge
  dramatically as K increases; which matters depends on the use case
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **One capability eval at a time** — hill-climb one capability eval while keeping existing
  evals as regression guards; changing multiple evals simultaneously makes it impossible to
  know what caused a score change
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss on the full eval-iterate loop, experiments, rubric iteration, and pass@K
