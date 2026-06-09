---
title: "LLM-as-Judge"
type: concept
aliases: ["llm as judge", "llm judge", "llm evaluator", "model-as-judge", "classification evaluator"]
tags: [ai, agents, llm, evals, testing, quality]
source_count: 3
last_updated: 2026-06-09
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/golden-dataset]]", "[[concepts/generator-evaluator-pattern]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/tracing-observability]]", "[[concepts/deterministic-checks]]", "[[concepts/reward-hacking]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: ["[[concepts/generator-evaluator-pattern]]"]
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]", "[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]"]
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

### From the EDD articles (Masood / Ramchandani)

- **MT-Bench bias taxonomy (Zheng et al.)** — the cornerstone study found empirical flaws in
  LLM judges: **verbosity bias** (longer = assumed better), **authority bias** (confident tone
  fools the judge into missing factual errors), and **self-enhancement bias** (a judge rates its
  own model family higher). A 2024 LLM-as-a-Judge survey catalogs mitigations
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Self-enhancement bias has financial stakes** — paying OpenAI's API to judge your custom
  Claude/Gemini agents rigs the metrics against you; the judge penalizes outputs that don't
  write like a GPT model ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Judges are fragile instruments, not ground truth** — regression-test your judges, build
  adversarial "trap traces" (an agent confidently executing a wrong action) to see if the judge
  is fooled by tone, and periodically re-anchor scores to a human panel. "You're constantly
  testing the tester." (compare [[concepts/reward-hacking]])
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **The judge belongs only where judgment is required** — don't ask a judge to do
  [[concepts/deterministic-checks|deterministic work]] (missing citation, schema break, leaked
  phone number, absent retrieval doc are all code-checkable). Reserve the judge for semantic
  dimensions: faithfulness, completeness, refusal quality, tone
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Why the industry tolerates the flaws** — at 10,000 actions/minute, human grading is an
  impossible bottleneck; automating qualitative grading is unavoidable, which is exactly why
  calibration and adversarial testing matter
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss on custom LLM-as-judge construction, bias taxonomy, meta-evaluation, and the CoreBench story
- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — MT-Bench bias taxonomy; self-enhancement financial stakes; judges as fragile instruments; trap traces; the scale rationale
- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — "the judge belongs where judgment is required"; don't over-trust LLM-as-judge for deterministic things
