---
title: "Eval-Driven Development"
type: concept
aliases: ["eval-driven development", "EDD", "evaluation-first development", "capability-eval-first"]
tags: [ai, agents, llm, evals, testing, methodology]
source_count: 3
last_updated: 2026-06-09
parent: ["[[concepts/agent-evals]]"]
part-of: ["[[concepts/harness-engineering]]"]
defines: ["[[concepts/continuous-evaluation]]", "[[concepts/release-gates]]", "[[concepts/eval-governance]]"]
relates-to: ["[[concepts/agent-evals]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/verification-loop]]", "[[concepts/feedback-loops]]", "[[concepts/continuous-evaluation]]", "[[concepts/failure-taxonomy]]", "[[concepts/deterministic-checks]]", "[[concepts/reward-hacking]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]", "[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]"]
---

# Eval-Driven Development

Writing capability evals *before* building a feature — the agent-engineering analog of
test-driven development (TDD). The eval defines what success looks like; the agent then has
a hill to climb. Like TDD, everyone agrees it's a good idea and few people actually do it.

Anthropic built [[entities/claude-code|Claude Code]] this way: capability evals were written
first, and when a new model dropped, the team immediately saw which bets had paid off and
which hadn't — without manual inspection.

## Key Insights

- **Write the eval before the feature** — if you want your agent to always verify customer
  identity before processing a refund, write an eval that checks for that first; this gives
  you a capability eval and a hill to climb
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Capability evals → regression evals** — create capability evals first (agent is failing);
  as you pass them, graduate them to regression evals (lock in what's working). The eval
  suite evolves with the agent
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Evals are infrastructure, not afterthoughts** — some teams add evals at the start of
  development, some at scale; the right time is when vibe-checking becomes a bottleneck to
  improvement, or when changing one thing breaks three others without you noticing
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **The first regression that surfaces before users** — the moment an eval catches a
  regression before it reaches production, the cost of building the eval suite is justified
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

> [!inference] Eval-driven development is to [[concepts/agent-evals]] what [[concepts/feedback-loops]]
> are to AI coding: the quality of the feedback mechanism is the ceiling on the quality of
> the output. Both Matt Pocock (TDD for AI coding) and Laurie Voss (EDD for agent evals)
> converge on the same principle: define the success criterion first, then let the agent climb.

### From "The Missing Discipline" (Adnan Masood)

- **EDD as the quality operating system for Agentic AI** — it replaces intuition-led iteration
  with an evidence loop: define success, encode it in evals, measure continuously, use failures
  to drive system changes. Prompts/tools/retrieval/models are approved because they improve
  measurable outcomes, not because they "feel better"
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Evals move upstream and downstream** — upstream they force requirement clarity before a
  capability exists; midstream they become [[concepts/release-gates|build gates]], regression
  suites, and model-upgrade safety checks; downstream they become trace-aware
  [[concepts/continuous-evaluation|monitoring]] of [[concepts/trajectory-evaluation|trajectory quality]]
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Enterprise value is threefold** — faster delivery with lower regression risk, better
  model/vendor portability, and stronger [[concepts/eval-governance|governance evidence]]; the
  cost is investment in datasets, graders, trace infrastructure, and human calibration
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **From vibe checks to evidence** — early LLM dev was "vibes-based iteration" (tweak prompt,
  eyeball output); the transition to autonomous agents broke that model because behavior is
  probabilistic and path-dependent ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).

### From "RAG Support Assistant" (Toni Ramchandani)

- **EDD ≠ prompt testing with better branding** — it is the engineering loop where expected
  behavior is made explicit, [[concepts/failure-taxonomy|failures become reusable tests]], and
  every meaningful change is compared before release. "The model produces the final text, but
  the application produces the behavior"
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **EDD vs. TDD** — TDD's deterministic input→output contract still works for small components,
  but a RAG app's behavior is system-level (retrieval, prompt version, history, model version
  all move the output), so the evaluation must be system-level too
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Sharp quality contract, not "be helpful"** — answer only from public KB, retrieve the right
  docs, cite the used chunks, refuse unsupported/unsafe, no private leakage, preserve topic
  across turns, schema-valid output, within latency/cost. The eval suite cannot be stronger
  than the contract it tests ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Layered eval stack** — unit/integration tests, golden-dataset evals,
  [[concepts/deterministic-checks|deterministic checks]], [[concepts/rag-evaluation|RAG metrics]],
  judge-based evals, multi-turn evals, safety evals, [[concepts/release-gates|release gates]],
  [[concepts/continuous-evaluation|production monitoring]] — each catches a different failure
  class ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).

> [!inference] All three sources converge on the same definition from different altitudes:
> Laurie Voss (conference) gives the capability→regression mechanics; Adnan Masood (enterprise)
> frames EDD as a governance/quality operating system; Toni Ramchandani (hands-on) builds the
> layered stack on a concrete RAG system. The shared spine: **define success first, encode it,
> measure continuously, ship only on evidence** — the eval-time twin of [[concepts/feedback-loops]].

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss on EDD, the Claude Code example, and the capability→regression graduation pattern
- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — EDD as quality operating system; upstream/downstream evals; enterprise value; vibe-checks-to-evidence
- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — EDD vs. TDD; the sharp quality contract; the layered eval stack
