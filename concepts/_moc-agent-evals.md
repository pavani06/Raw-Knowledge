---
title: "MOC: Agent Evals"
type: concept
aliases: ["agent evals cluster", "eval cluster", "evaluation map", "moc agent evals", "eval-driven development cluster"]
tags: [ai, agents, llm, evals, testing, moc, quality]
source_count: 3
last_updated: 2026-06-09
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/agent-evals]]", "[[concepts/eval-driven-development]]", "[[concepts/llm-as-judge]]", "[[concepts/golden-dataset]]", "[[concepts/tracing-observability]]", "[[concepts/failure-taxonomy]]", "[[concepts/release-gates]]", "[[concepts/continuous-evaluation]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]", "[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]"]
---

# MOC: Agent Evals

A **Map of Content** for the agent-evals cluster — the second dense region of this ontology,
sitting alongside the [[concepts/_moc-agent-harness|agent-harness cluster]]. Where the harness
cluster answers *"how do agents build software?"*, this cluster answers *"how do you know an
agent is actually any good?"* It indexes and contextualizes the atomic eval pages without
duplicating them; read each linked page for the full treatment.

The cluster grew from three complementary sources: Laurie Voss's hands-on Arize workshop (the
mechanics), Adnan Masood's enterprise/governance framing (the *why*), and Toni Ramchandani's
concrete RAG implementation (the *how*, in code).

> [!inference]
> This cluster has **no single parent concept**. [[concepts/agent-evals]] (the measurement
> framework) and [[concepts/eval-driven-development]] (the methodology that wraps it) are
> peers — one is the toolset, the other is the discipline. The web also bridges into the
> harness cluster: [[concepts/agent-evals]] is `part-of` [[concepts/harness-engineering]],
> and [[concepts/eval-driven-development]] is the eval-time twin of [[concepts/feedback-loops]].
> A web, not a tree — hence a MOC, not a parent page.

## The two load-bearing nodes

- [[concepts/agent-evals|Agent Evals]] — the **measurement framework**: the three-tier stack
  (deterministic code checks → built-in/rubric scoring → custom LLM-as-judge), the impact
  hierarchy (data > prompting > model > tuning), capability-vs-regression evals, and the
  sample-size math. "An unvalidated eval is a fancy way of being wrong at scale."
- [[concepts/eval-driven-development|Eval-Driven Development]] — the **methodology**: write the
  eval before the feature; define success, encode it, measure continuously, ship only on
  evidence. The "quality operating system" for agentic AI; the agent analog of TDD.

## What you grade (the eval targets)

- [[concepts/trajectory-evaluation|Trajectory Evaluation]] — grade the *process/trace*, not
  just the final output; outcome/process/style/efficiency. "Grade the scratchpad."
- [[concepts/rag-evaluation|RAG Evaluation]] — split retrieval from generation: recall@k,
  precision@k, MRR, groundedness, and citation validation.
- [[concepts/failure-taxonomy|Failure Taxonomy]] — categorize failures by *engineering cause*,
  not "the bot was wrong." "Hallucination is too small a diagnosis."

## How you grade (the grader stack)

The recurring "greater stack taxonomy": cheap deterministic checks first, expensive judgment last.

- [[concepts/deterministic-checks|Deterministic Checks]] — hard, code-checkable rules (schema,
  citations, leakage). The first and cheapest layer; "the judge belongs where judgment is required."
- [[concepts/llm-as-judge|LLM-as-Judge]] — a separate LLM grades semantic quality; requires
  chain-of-thought, single-dimension rubrics, cross-model judging, and meta-evaluation. Carries
  verbosity / authority / self-enhancement bias — calibrate it.
- [[concepts/golden-dataset|Golden Dataset]] — the curated, human-labeled ground truth both the
  agent and the judge are measured against; grows via failure backfill.

## The evidence layer (you can't grade what you can't see)

- [[concepts/tracing-observability|Tracing & Observability]] — the instrumentation that captures
  spans, traces, latency, and cost; the prerequisite for any eval and any failure taxonomy.
- [[concepts/reading-traces|Reading Traces]] — the human skill of hand-reading traces (bridges
  into the [[concepts/_moc-agent-harness|harness cluster]]).

## The release & operations layer

- [[concepts/release-gates|Release Gates]] — the ship/block decision as a predefined
  probabilistic threshold; eval back-pressure on every change.
- [[concepts/continuous-evaluation|Continuous Evaluation]] — evals on every change *and* on live
  production traffic; deployment is the start, not the end.
- [[concepts/eval-governance|Eval Governance]] — evals as audit/compliance evidence (EU AI Act,
  NIST AI RMF, SR 11-7, ISO 42001); "mathematical proof of safety."

## The failure modes & the frontier

- [[concepts/reward-hacking|Reward Hacking]] — Goodhart's Law: when a metric becomes a target,
  the agent games it without fulfilling the objective. The dark mirror of eval-driven development.
- [[concepts/data-flywheel|Data Flywheel]] — production failures become tomorrow's tests; the
  compounding eval dataset as a competitive moat.
- [[concepts/eval-iterate-cycle|Eval-Iterate Cycle]] — the core offline loop: instrument → trace
  → eval → annotate → improve → repeat.
- [[concepts/closed-loop-evaluation|Closed-Loop Evaluation]] — the frontier: feed eval output
  back to a coding agent that improves itself; "are we still programming the AI, or just building
  the labyrinth?"

## Bridges into the harness cluster

- [[concepts/generator-evaluator-pattern|Generator-Evaluator Pattern]] — the LLM-as-judge is the
  eval-time instantiation: adversarial separation beats self-review.
- [[concepts/verification-loop|Verification Loop]] — evals are systematic verification replacing
  vibe-checking; the agent actually using its output.
- [[concepts/feedback-loops|Feedback Loops]] — the coding-cluster sibling: define the success
  criterion first, then let the agent climb.

## See also

- [[concepts/_moc-agent-harness|MOC: Agent Harness]] — the peer cluster; `agent-evals` is
  `part-of` `harness-engineering`, so the two MOCs overlap at the verification/feedback boundary.
- [[digests/2026-06-09|Digest 2026-06-09]] — the synthesis of the two eval-driven-development
  articles that pushed this cluster past the MOC threshold.
