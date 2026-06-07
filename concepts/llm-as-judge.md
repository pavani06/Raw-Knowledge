---
title: "LLM-as-Judge"
type: concept
aliases: ["llm as judge", "llm judge", "llm evaluator", "model-as-judge", "classification evaluator"]
tags: [ai, agents, llm, evals, testing, quality]
source_count: 1
last_updated: 2026-06-07
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/golden-dataset]]", "[[concepts/generator-evaluator-pattern]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/tracing-observability]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: ["[[concepts/generator-evaluator-pattern]]"]
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]"]
---

# LLM-as-Judge

Using a separate LLM to grade the semantic quality of another LLM's output — the third and
most powerful tier of [[concepts/agent-evals]]. The judge is a classifier: it takes an input
and makes a prediction (pass/fail, score, label), just like any ML classifier, and its
performance can be measured by comparing its predictions against human ground truth.

The LLM-as-judge is the eval-time instantiation of the [[concepts/generator-evaluator-pattern]]:
the generating agent is the generator; the judge is the evaluator. The key insight from both
patterns is identical — **adversarial separation beats self-review**.

## Key Insights

- **Chain-of-thought for judges** — forcing the judge to reason before outputting a label
  demonstrably improves judge quality; it generates tokens before deciding, which improves
  the decision ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **One dimension per judge** — never write a "god evaluator" that tests accuracy, tone,
  completeness, and policy compliance in one prompt. If it fails, you don't know why. Split
  into one LLM eval per dimension
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Use a different model as judge** — self-preference bias: the generating model rubber-stamps
  its own output. Cross-provider judging (Claude generates, OpenAI judges) is more reliable
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Known biases to watch for**:
  - *Position bias* — judges favor the first or last option when comparing
  - *Length bias* — LLMs prefer longer responses regardless of quality
  - *Confidence bias* — judges can be fooled by confident-sounding wrong answers
  - *Self-preference bias* — same model as generator tends to approve its own output
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]])
- **Meta-evaluation** — validate the judge itself against human labels. If the judge
  disagrees with you more than a human would disagree with another human (inter-rater
  reliability is often only 0.2–0.3), the judge is broken, not the agent
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Failures should seem fair** — if you look at a failing trace and think "that answer
  looks fine to me," the problem is probably the eval, not the agent. Anthropic found this
  with CoreBench: Claude Opus scored 42% on a broken eval; after fixing the eval, it scored
  95% ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Precision vs. recall trade-off** — in most eval scenarios, prioritize recall (minimize
  missed failures) over precision (minimize false positives); a false positive just means
  human review, a missed failure means bad output reaches users
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Pairwise evaluation** — instead of rating 1–10 (LLMs are bad at this), ask the judge
  to compare two outputs and pick the better one; much more reliable for A/B testing prompt
  versions or model upgrades
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss on custom LLM-as-judge construction, bias taxonomy, meta-evaluation, and the CoreBench story
