---
title: "Feedback Loops"
type: concept
aliases: ["feedback loops", "feedback loop", "quality ceiling", "tests types linters", "automated feedback"]
tags: [ai, agents, llm, coding, workflow, testing, quality]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/verification-loop]]", "[[concepts/eval-driven-development]]", "[[concepts/agent-evals]]", "[[concepts/vertical-slices]]", "[[concepts/human-in-loop-vs-afk]]", "[[concepts/deep-modules]]"]
contradicts: []
supports: ["[[concepts/verification-loop]]", "[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
---

# Feedback Loops

The quality ceiling for AI coding output: **the quality of your tests, types, and linters
is the maximum quality the AI can achieve**. Without feedback loops, the AI codes blind —
it cannot know whether its output is correct, and neither can you. With strong feedback
loops, the AI can self-correct in real time.

The principle is borrowed from classic software engineering (TDD, type systems, linting)
but applies with even greater force to AI coding: a human can notice when something feels
wrong; an AI cannot. The feedback loop is the AI's substitute for intuition.

Feedback loops operate at multiple timescales:
- **Immediate** — type errors, lint failures, test failures caught in the same session
- **Per-slice** — [[concepts/vertical-slices]] ensure each issue produces something testable
- **Per-session** — [[concepts/verification-loop]] closes the loop at the end of a run
- **Systematic** — [[concepts/agent-evals]] make feedback loops scalable and measurable

## Key Insights

- **The quality ceiling** — the quality of your tests, types, and linters is the ceiling
  on AI output quality; without feedback loops, AI codes blind and produces plausible-looking
  but incorrect code ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **TDD as the primary feedback loop** — test-driven development (red-green-refactor) is
  Matt Pocock's primary verification discipline; writing the test first gives the AI a
  concrete, machine-checkable success criterion ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Types as always-on feedback** — TypeScript's type system provides continuous feedback
  without running tests; type errors are immediate, cheap, and precise
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Linters as style enforcement** — linters catch patterns the AI repeats incorrectly;
  they are the automated equivalent of [[concepts/garbage-collection-day]] for code style
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Feedback loops enable AFK implementation** — once feedback loops are in place, the
  human can step back; the AI will self-correct against the feedback. Without them, the
  human must stay in the loop to catch errors. See [[concepts/human-in-loop-vs-afk]]
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Convergence with eval-driven development** — Matt Pocock's TDD for AI coding and
  Laurie Voss's [[concepts/eval-driven-development]] for agent evals are the same principle:
  define the success criterion first (test / eval), then let the agent climb to it
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

> [!inference] Feedback loops are the [[concepts/harness-engineering]] discipline applied
> to code quality: just as the harness provides context and guardrails for the agent,
> feedback loops provide the quality signal the agent needs to self-correct. A harness
> without feedback loops is a harness that can only fail silently.

## Sources

- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — TDD as primary feedback loop; types and linters; quality ceiling framing; AFK implementation dependency
