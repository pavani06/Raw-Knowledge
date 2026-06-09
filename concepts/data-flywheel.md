---
title: "Data Flywheel"
type: concept
aliases: ["data flywheel", "eval flywheel", "compounding eval data", "eval moat"]
tags: [ai, agents, llm, evals, data, strategy]
source_count: 2
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/golden-dataset]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/garbage-collection-day]]", "[[concepts/agent-evals]]", "[[concepts/continuous-evaluation]]", "[[concepts/failure-taxonomy]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]", "[[sources/2026-06-09-eval-driven-development-missing-discipline]]"]
---

# Data Flywheel

The compounding dynamic where each iteration of the [[concepts/eval-iterate-cycle]] deepens
the [[concepts/golden-dataset]], which improves the eval suite, which improves the agent,
which surfaces new failure modes, which grow the dataset further. The flywheel creates a
**differentiated competitive moat**: nobody else has your production failure data and the
evals built from it.

## Key Insights

- **Expert judgment compounds** — the more domain expert judgment you add to the golden
  dataset, the better the eval suite, the better the agent, the deeper the understanding of
  failure modes; each iteration builds on the last
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Nobody has your evals but you** — production data and production evals encoding all the
  ways an agent can fail are unique to the team that built them; this creates a moat against
  competitors building the same thing
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Model adoption advantage** — a comprehensive regression suite lets you evaluate a new
  model drop within minutes; teams without evals must manually re-verify everything
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Parallel to [[concepts/garbage-collection-day]]** — both are self-improving feedback
  loops that convert human review findings into automated guardrails; the data flywheel is
  the eval-infrastructure version of the garbage collection day ritual
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

> [!inference] The data flywheel is the long-term compounding argument for investing in
> [[concepts/agent-evals]] early. The short-term argument is catching regressions; the
> long-term argument is that the eval dataset becomes a strategic asset that is hard to
> replicate.

### From "The Missing Discipline" (Adnan Masood)

- **The closed-loop failure-harvest** — a support bot solves your hard problem today because it
  failed that exact task weeks ago; the failure trace was captured, labeled, categorized via the
  [[concepts/failure-taxonomy]], and fed back into the offline eval dataset. This is the flywheel
  running on production traffic ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Adaptive eval generation** — the future state where tooling auto-generates new test cases
  from near-miss production incidents (synthesize a dozen variations of a tricky scenario and
  add them to the regression suite without human intervention), accelerating the flywheel
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **[[concepts/continuous-evaluation|Continuous evaluation]] is the flywheel's engine** — if
  production failures are not converted back into eval cases, the benchmark goes stale and the
  flywheel stalls ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss on the data flywheel as competitive moat and model adoption advantage
- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — the closed-loop failure-harvest; adaptive eval generation; continuous evaluation as the flywheel's engine
