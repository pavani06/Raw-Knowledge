---
title: "Reviewer Agents"
type: concept
aliases: ["reviewer agents", "review agents", "automated code review", "persona review agents", "CI review agents"]
tags: [ai, agents, llm, code-review, automation, software-engineering]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]", "[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/non-functional-requirements]]", "[[concepts/prompt-injection-patterns]]", "[[concepts/verification-loop]]", "[[concepts/garbage-collection-day]]"]
contradicts: []
supports: ["[[concepts/harness-engineering]]", "[[concepts/verification-loop]]"]
extends: ["[[concepts/sub-agents]]"]
sources: ["[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]"]
---

# Reviewer Agents

Automated [[concepts/sub-agents|sub-agents]] that trigger on every push and inject persona-based feedback into pull requests — replacing synchronous human code review as the primary quality gate. Each reviewer agent embodies a specific engineering persona (front-end architect, reliability engineer, scalability engineer, security reviewer) and evaluates the diff against the [[concepts/non-functional-requirements|non-functional requirements]] documented for that persona.

Reviewer agents are a key mechanism in [[concepts/harness-engineering|harness engineering]] for converting human review feedback into durable automated guardrails. They close the loop: human review comment → documentation → reviewer agent → automatic enforcement on every future PR.

The implementation agent can **acknowledge, defer, or reject** reviewer feedback — it is not forced to address every comment, which prevents the failure mode of the coding agent being "bullied" into bad changes by over-prescriptive reviewers.

## Key Insights

- **Persona-based organization** — bucket review feedback by engineering persona (front-end, reliability, scalability), then spin up a reviewer agent for each persona that triggers on every push ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Surface P2+ issues only** — reviewer agents are configured to surface only issues that would block a PR from merging, not minutia; this prevents drowning the implementation agent in noise ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Agents can acknowledge, defer, or reject feedback** — the implementation agent uses its own judgment; being super prescriptive ("every comment must be addressed") causes catastrophic failure modes ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Reviewer agents reduce the need for human shoulder-surfing** — a QA plan attached to the PR, validated by a reviewer agent, gives the human enough confidence to trust the output without reading every line ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Security and reliability reviewer agents** run as part of every push and CI — checking things like "are there timeouts and retries on this network code?" and "does this interface have a secure, impossible-to-misuse surface?" ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Continuously appending to persona docs** drives slop reduction over time — as the docs grow, reviewer agents catch more and more bad patterns ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

## Sources

- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — Ryan's description of persona-based reviewer agents and the garbage-collection-day feedback loop
