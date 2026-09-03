---
title: "Generator-Evaluator Pattern"
type: concept
aliases: ["generator-evaluator", "generator evaluator pattern", "generator-critic", "adversarial evaluator", "GAN-style harness"]
tags: [ai, agents, llm, architecture, verification]
source_count: 3
last_updated: 2026-09-02
parent: []
part-of: ["[[concepts/agent-harness]]"]
defines: []
relates-to: ["[[concepts/verification-loop]]", "[[concepts/design-taste-rubric]]", "[[concepts/sub-agents]]", "[[concepts/llm-as-judge]]", "[[concepts/agent-evals]]", "[[concepts/capability-escalation-ladder]]"]
contradicts: []
supports: ["[[concepts/long-running-agents]]", "[[concepts/agent-evals]]"]
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]", "[[sources/2026-09-02-the-prompting-playbook]]"]
---

# Generator-Evaluator Pattern

An [[concepts/agent-harness]] pattern, borrowed conceptually from GANs (generative
adversarial networks): one **generator** agent builds, a separate **evaluator** (critic)
agent grades, and adversarial pressure between them drives quality over long runs. The two
have **separate context windows, system prompts, and jobs**.

The crucial property: the evaluator doesn't just read diffs — it actually *uses the app*
(launching [[entities/playwright|Playwright]], navigating, clicking, screenshotting) and
hands a critique back to the generator, which then reflects and fixes.

## Key Insights

- **Why it beats self-review**: tuning a standalone critic to be harsh is tractable; tuning
  a builder to be self-critical is not. It exploits the gap between an LLM's ability to
  *critique* vs. *generate* — like a human finding it easier to critique art than make it
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- **Self-evaluation is a trap** — models are sycophantic and rubber-stamp their own work
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- **Keep streams clean**: the evaluator should judge *output only*, NOT see the generator's
  reasoning traces — mixing the two streams lets the model kid itself
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- **It can pivot, not just patch**: when the generator is stuck on a criterion, this harness
  throws everything out and restarts — unlike a single pass or [[concepts/ralph-loop]] that
  keeps patching the same thing ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Out of the box, Claude is a *bad* QA agent (it defers bugs as "fix later"); making the
  evaluator harsh required extensive prompt tuning via [[concepts/reading-traces]]
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- The pattern is a *subset* of the [[concepts/agent-teams]] approach — each team member can
  be paired with its own critic
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

### From Evals Workshop (Laurie Voss, Arize)

- **LLM-as-judge is the eval-time instantiation** — the [[concepts/llm-as-judge]] pattern
  is the generator-evaluator pattern applied to evaluation: the generating agent produces
  output; a separate judge LLM grades it. The same adversarial separation principle applies
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Use a different model as judge** — self-preference bias means the generating model
  rubber-stamps its own output; cross-provider judging (Claude generates, OpenAI judges)
  is more reliable — the same logic as keeping generator and evaluator streams clean
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Multi-judge systems** — at the frontier, multiple LLM judges can be run simultaneously
  to get different opinions, look up facts, and verify claims — extending the pattern from
  one evaluator to an evaluator ensemble
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).


- **The repairer can be a third independent prompt (generate-evaluate-repair)** — instead
  of looping feedback back into the generator, a dedicated repairer prompt receives the
  draft plus the violation report and applies targeted fixes. In the scheduling case this
  three-prompt decomposition passed all cases with fewer tokens and lower latency than
  both a larger model and a same-model-with-better-prompt route — and it accepts soft
  requirements at runtime in the evaluator prompt ("Harry doesn't work with Sally")
  without touching the backend checker. This makes the pattern the architecture rung of
  the [[concepts/capability-escalation-ladder|capability escalation ladder]]
  ([[sources/2026-09-02-the-prompting-playbook]]).
## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — the central state-of-the-art pattern presented by Ash
- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — LLM-as-judge as eval-time instantiation; cross-provider judging; multi-judge systems
- - [[sources/2026-09-02-the-prompting-playbook|The Prompting Playbook]] — Claude (Anthropic, Code with Claude breakout) on maintaining a production prompt through a model migration (Meridian Mobile support bot: eval suite, XML-tag hygiene, stop sequences, tool integration, trade-off balancing) and building a scheduler agent from zero (model/thinking/prompt/architecture comparison, generate-evaluate-repair economics) — generate-evaluate-repair as the economic winner: three simple prompts beating model upsizing on tokens and latency
