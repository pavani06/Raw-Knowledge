---
title: "Production-to-Offline Feedback Loop"
type: concept
aliases: ["production-to-offline feedback loop", "production to offline eval loop", "eval drift", "production drift", "judge drift", "data drift"]
tags: [ai, agents, llm, evals, monitoring, production, drift]
source_count: 1
last_updated: 2026-08-31
parent: ["[[concepts/agent-evals]]"]
part-of: []
defines: []
relates-to: ["[[concepts/continuous-evaluation]]", "[[concepts/golden-dataset]]", "[[concepts/llm-as-judge]]", "[[concepts/reward-hacking]]", "[[concepts/data-flywheel]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/log-taxonomy]]", "[[concepts/eval-coverage-matrix]]"]
contradicts: []
supports: ["[[concepts/continuous-evaluation]]"]
extends: ["[[concepts/eval-iterate-cycle]]"]
sources: ["[[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]"]
---

# Production-to-Offline Feedback Loop

The "dotted arrow" of the [[concepts/eval-coverage-matrix|eval coverage matrix]]: everything
learned in production — online evaluator signals, support tickets, trace analysis — should
flow back to inform the offline eval suite. Clay calls this the hardest part of the whole
eval stack to set up, and considers eval/production drift "still an unsolved problem in the
agent eval space" ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).

## The drift taxonomy

- **Data drift** — production use cases are not actually what the team has been testing and
  bug-bashing on; the offline suite measures the wrong distribution.
- **Judge drift** — every model and model family has internal biases; if you only hill-climb
  against one [[concepts/llm-as-judge|LLM judge]], you are probably overfitting to it.
- **Eval-set overfitting** — hill-climbing against a small eval set makes the prompt start
  to mirror just those examples (the drift-shaped cousin of [[concepts/reward-hacking]]).

## Mitigations in practice (Clay)

- Pull examples in from online evaluators.
- Mine customer support tickets for high-signal customer feedback.
- Keep human-annotated [[concepts/golden-dataset|goldens]] specifically to detect judging drift.
- Run use-case classifiers / use-case tagging over production traffic to verify the evals
  actually cover production use cases (same move as [[concepts/log-taxonomy]] on the demand
  side).

## Key Insights

- **Offline evals rot without the loop** — this is the same staleness dynamic as
  [[concepts/continuous-evaluation]] ("offline-only evals go stale") restated as a drift
  taxonomy with named causes ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **Judge calibration is a maintenance cadence, not a one-time setup** — human-annotated
  goldens function as drift detectors for the judge itself, extending the meta-evaluation
  practice from [[concepts/llm-as-judge]] into an ongoing ritual
  ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).

> [!inference] The loop is the connective tissue between the two halves of the eval stack:
  it is what turns [[concepts/continuous-evaluation]]'s online measurements into
  [[concepts/eval-iterate-cycle]] fuel, and it is the mechanism that keeps the
  [[concepts/data-flywheel|data flywheel]] from stalling. Clay's framing adds the
  engineering vocabulary (drift types) that prior sources implied but never named.

## Sources

- [[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel|Inside Clay's Eval Stack: 300M Agent Runs, One LangSmith Pipeline]] — the dotted arrow as the hardest part; data/judge/eval-set drift taxonomy; support tickets, online-evaluator examples, golden-based drift detection, use-case tagging
