---
title: "Trajectory Evaluation"
type: concept
aliases: ["trajectory evaluation", "trajectory grading", "trace grading", "process evaluation", "trajectory quality", "grade the scratchpad"]
tags: [ai, agents, llm, evals, observability, quality]
source_count: 2
last_updated: 2026-06-09
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/tracing-observability]]", "[[concepts/failure-taxonomy]]", "[[concepts/llm-as-judge]]", "[[concepts/react-pattern]]", "[[concepts/verification-loop]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]"]
---

# Trajectory Evaluation

Grading the **process** an agent took — its trace/trajectory — not just the final output.
This is the key difference between evaluating a chatbot and evaluating an agentic system: an
agent can reach a technically-correct answer via a bizarre, inefficient, or unsafe route, and
output-only grading misses it entirely.

The grading-the-scratchpad analogy: you cannot grade a math test by the final answer alone —
you read the working to confirm the student understood the formula and didn't guess. For
agents, "the scratchpad" is the captured system prompt, every step-by-step artifact, the
chain-of-thought, the sequence of tools invoked, and the final environment state. Both OpenAI
and Anthropic define agent evals in terms of traces/transcripts plus artifacts, not final
strings.

## Key Insights

- **Outcome / process / style / efficiency** — a practical agentic rubric decomposes into four
  measurable families: outcome goals, process goals, style goals, and efficiency goals
  (thrashing, command loops, excess token spend)
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **The 47-API-calls problem** — an agent that books the flight correctly but checks the
  calendar API 47 times in a loop first is a failure on efficiency even though the outcome is
  right; only trajectory grading catches it
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Pass/fail-at-release is obsolete** — because behavior is probabilistic and path-dependent,
  the same input may take a slightly different path each run; you evaluate the decision-making
  process, ensuring the reasoning is sound even when steps vary
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Process defects are first-class** — "skill doesn't trigger," "skips a required step,"
  "leaves extra files behind," "invoked the wrong tool with wrong argument types," silent
  partial completion — these are process failures invisible to final-answer grading
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **You can only grade what the trace records** — the RAG assistant logs rewritten query,
  retrieved chunks, retrieval scores, prompt/retriever versions, citations, refusal flag,
  latency, and cost precisely so the trajectory is gradeable; "a final answer tells us what
  the user saw; a trace tells us how the system got there"
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).

> [!inference] Trajectory evaluation is [[concepts/tracing-observability]] turned into a
> grading target, and it is what makes the [[concepts/failure-taxonomy]] possible — you can
> only categorize a failure by layer if you graded the trajectory through those layers. It
> extends the [[concepts/react-pattern|think→act→observe]] loop into the eval domain: grade
> each step, not just the terminal observation.

## Sources

- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — grade-the-scratchpad; trace/trajectory; outcome/process/style/efficiency; the 47-calls example; process defects
- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — trace records as the gradeable artifact; "a trace tells us how the system got there"
