---
title: "Simulations"
type: concept
aliases: ["simulations", "simulation layer", "agent simulations"]
tags: [ai, agents, evals, testing, quality, voice]
source_count: 1
last_updated: 2026-08-30
parent: []
part-of: []
defines: []
relates-to: ["[[concepts/agent-evals]]", "[[concepts/no-code-agent-building]]", "[[entities/taobench]]"]
contradicts: []
supports: ["[[concepts/continual-learning]]"]
extends: []
sources: ["[[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]"]
---

# Simulations

Sierra's customer-facing agent evaluation product: every proposed change to an agent is tested across voice, chat, many languages, and many personas — the high-dimensional space the agent will face in production — before a human reviews and ships it. Where benchmarks evaluate model providers, simulations evaluate one customer's specific agent.

## Key Insights

- **Customer-facing evals are a harder problem than internal evals** — internal Agent OS eval is "more similar to the eval problem that any applied AI company has," but customer-facing eval must handle "background noise in voice," adversarial users, and saved persona sets: "I want to save these 20 personas and run all of my simulations against all 20 of the personas and make sure that it works." Sierra "built a product specifically for our customers to eval agents called simulations" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **The change flow: propose → simulate → review → ship** — in workspaces "you can let Ghostwriter run free but still review it before you make any changes," and the simulation layer ensures "every change you make is tested against all the assumptions of the platform across voice and chat and many languages and many personas in this high-dimensional space that you're going to experience in production" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Regression prevention is the payoff** — "you can tell when someone's building an agent if they have good simulations, it's such a great unlock because you can make changes in a way that is constantly improving the agent and being sure that you're not regressing, especially as you get into big teams with complex agents that are doing so many things" ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Simulations vs. benchmarks** — internally, "simulations is the main way that we eval the actual agents that are going out to production. So it's just too customer specific for us to rely on something as general as a benchmark." Benchmarks like [[entities/taobench|TaoBench]] and MuBench evaluate *providers*; simulations evaluate *specific customer agents* ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Simulations survive harness evolution** — even as voice-to-voice models absorb more of the pipeline, "the fallacy would be that... you don't need the harness or you don't need all of the orchestration and simulations" — the orchestration and simulation layer remains ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).

> [!inference] Within the [[concepts/agent-evals]] ontology, simulations sit closest to the multi-persona, multi-environment end of eval design: they are the conversation-agent counterpart of a regression suite, combining [[concepts/deterministic-checks|monitors]] (always-on, per-conversation) with scenario-scale testing before release. The Sierra flow also makes simulations the quality gate for [[concepts/no-code-agent-building|no-code changes]] (Ghostwriter edits journeys; simulations test them) and the deploy-step gate of the [[concepts/continual-learning]] loop.

## Sources

- [[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think|The best AI agents are simpler than you think]] — Zack Reno Wedeen (Sierra) on the simulations product: multi-persona/multi-language/adversarial testing, the propose→simulate→review→ship flow, regression prevention, and simulations-vs-benchmarks scope split
