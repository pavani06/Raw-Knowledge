---
title: "Data Flywheel"
type: concept
aliases: ["data flywheel", "eval flywheel", "compounding eval data", "eval moat"]
tags: [ai, agents, llm, evals, data, strategy]
source_count: 5
last_updated: 2026-08-31
parent: []
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/golden-dataset]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/garbage-collection-day]]", "[[concepts/agent-evals]]", "[[concepts/continuous-evaluation]]", "[[concepts/failure-taxonomy]]", "[[concepts/log-taxonomy]]", "[[concepts/tool-unification-flywheel]]", "[[concepts/agent-first-data-foundation]]"]
contradicts: []
supports: ["[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]", "[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]", "[[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]", "[[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]"]
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

- **Test case library as a living system** — Bhaumik's case study: starting with 200 cases collected from real human agent responses, the eval dataset grows with every production incident. There is "no correct number" — start with what you have, and as each failure is diagnosed and fixed, the test case is added to the library with categorization (security, login, etc.). The bigger it grows, the better the system becomes. This is the data flywheel running on production traffic: each incident enriches the dataset that prevents the next one ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

### From GTM AI Agents at Snowflake (Sait Izmit)

- **The demand-side flywheel** — once the GTM platform tapped its question logs (1.2M questions LLM-classified into a topic taxonomy), "the first features are difficult to get out. The next ones are easy... this hockey stick exponential thing actually starts happening." Log-derived demand data compounds into roadmap and content — the demand-side mirror of the failure-harvest flywheel; see [[concepts/log-taxonomy]] ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).

### From Inside Clay's Eval Stack (LangChain channel)

- **The tool-surface flywheel** — [[entities/clay|Clay]] compounds a *shared tool API* the
  way this page compounds eval data: internal agents ([[entities/sculptor|Sculptor]]) use
  exactly the tools exposed via CLI/API to external agents, so every invocation failure
  (caught by automated checks and human vibe-based review) improves the harness or the tool
  for everyone. See [[concepts/tool-unification-flywheel]]
  ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **The closing image: a self-iterating loop on a unified foundation** — customer +
  third-party data → orchestrate → execute → feed back, "so all parts of the product are
  feeding into a single unified data foundation that agents can reason over and build better
  iterations of themselves" — the flywheel at platform scale; see
  [[concepts/agent-first-data-foundation]]
  ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss on the data flywheel as competitive moat and model adoption advantage
- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — the closed-loop failure-harvest; adaptive eval generation; continuous evaluation as the flywheel's engine
- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook]] — Sandipan Bhaumik on test case library as living system; start with 200 cases, grow forever
- [[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users|GTM AI Agents: Lessons from Deploying to 6,000 Users]] — Sait Izmit (Snowflake) on the demand-side flywheel: classified question logs driving the hockey-stick compounding
- [[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel|Inside Clay's Eval Stack: 300M Agent Runs, One LangSmith Pipeline]] — the tool-unification flywheel (shared tool surface compounded by agent failures) and the self-iterating loop over a unified data foundation
