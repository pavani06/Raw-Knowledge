---
title: "Continual Learning"
type: concept
aliases: ["continual learning", "self-improving agents", "agents improving themselves"]
tags: [ai, agents, learning, feedback, operations]
source_count: 1
last_updated: 2026-08-30
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/agent-evals]]", "[[concepts/feedback-loops]]", "[[concepts/no-code-agent-building]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]"]
---

# Continual Learning

The production loop by which a deployed agent keeps improving: **detect → suggest → review → deploy**. At Sierra today, "you can automatically detect an issue with a monitor. Ghostwriter can automatically suggest a fix to an issue. And you can review that issue and push it to your agent" — humans stay in the loop, with automation advancing only as confidence grows ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).

## Key Insights

- **The loop is closed but human-gated** — "you're still in the loop or people are still in the loop in all of the cases. But it's as automated as it can be with still giving you authority over that" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Confidence gating is the path to autonomy** — "in the near future, you will start to see the first cases of Sierra agents improving themselves where they have a confidence level to the fix. For example, if there's an error in a knowledge article and it can tell that there's a contradiction and it can go check the website and... it's very clear what the true answer is, it could give you an FYI instead of needing approval. Same way, I do some work, I ask for approval, I do some other work, I give FYI." The knowledge base gets corrected from production evidence, not manual audits ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **The primitives already exist; trust is the constraint** — "all of the primitives are there, it's just around the confidence that people have in the level of control that they want to have" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Pace follows the customer, not the tech** — "Most of our customers, they want to review every change that goes into the agent. This is a really important part of their business. We don't want to pull the future forward too quickly... we want to move at the pace our customers are excited about" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **The flywheel runs on production data** — once agents are live, the daily routine is analyze → build → release: "Often, Ghostwriter will actually proactively suggest an improvement on the insights to kind of close that loop and build that flywheel" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).

> [!inference] Continual learning is the conversation-agent counterpart of the vault's existing self-improvement concepts, at a different point on the automation dial: [[concepts/continuous-evaluation]] runs evals on live traffic but doesn't author fixes; [[concepts/closed-loop-evaluation]] feeds eval output back to a coding agent autonomously. Sierra's loop sits between them — fixes are authored ([[concepts/no-code-agent-building|Ghostwriter writes journeys]], not code), validated by [[concepts/simulations]], and deployed only through human review, with confidence gating as the announced direction. Monitors make it a production [[concepts/feedback-loops|feedback loop]]: signal from real conversations, not synthetic tests.

## Sources

- [[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think|The best AI agents are simpler than you think]] — Zack Reno Wedeen (Sierra) on the monitor → Ghostwriter → review → push loop, confidence-gated self-improvement (FYI vs. approval), and moving at the customer's pace
