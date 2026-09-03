---
title: "Capability Escalation Ladder"
type: concept
aliases: ["capability escalation ladder", "escalation ladder", "capability levers", "model escalation", "bigger model vs better prompt", "escada de escalonamento de capacidade"]
tags: [ai, agents, llm, evals, architecture, production]
source_count: 1
last_updated: 2026-09-02
parent: ["[[concepts/harness-engineering]]"]
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/model-change-management]]", "[[concepts/generator-evaluator-pattern]]", "[[concepts/deterministic-checks]]", "[[concepts/two-sided-trade-off-instruction]]", "[[concepts/constellation-of-models]]", "[[concepts/tool-use]]"]
contradicts: []
supports: ["[[concepts/harness-engineering]]"]
extends: []
sources: ["[[sources/2026-09-02-the-prompting-playbook]]"]
---

# Capability Escalation Ladder

When an agent **fails a hard task**, teams guess which lever to pull: a bigger model, more
reasoning budget, a better prompt, or architectural decomposition. Ad hoc ordering wastes
spend and hides the economic winner. The ladder replaces the guess with an ordered
exploration where **each rung is cheap to test relative to the next**:

| Rung | Lever | What changes | Test cost |
|---|---|---|---|
| 1. Capability | Larger model (tier up) | Config, not code | Minimal |
| 2. Reasoning budget | Adaptive thinking / more reasoning | Model API config | Low |
| 3. Instruction | Better prompt (e.g. [[concepts/two-sided-trade-off-instruction|balanced instructions]], self-check) | Prompt text | Low |
| 4. Architecture | Decomposition into simple agents (e.g. [[concepts/generator-evaluator-pattern|Generator-Evaluator-Repairer]]) | Days of engineering | High |

## Key Insights

- **Measure four things per rung** — pass/fail alone is blind. Record violation counts,
  tokens, and latency alongside: a route that still fails while violations drop (9 → 6)
  is gaining capability before the binary moves
  ([[sources/2026-09-02-the-prompting-playbook]]).
- **The winner is economic among passing routes** — a rung that passes evals while
  tripling tokens and latency "passed the eval and failed the economics". In the source
  case, adaptive thinking passed reliably at ~3x tokens and ~3x latency (100s); the
  three-prompt decomposition passed at the lowest tokens and latency of all routes
  ([[sources/2026-09-02-the-prompting-playbook]]).
- **The order protects engineering** — test the cheap rungs first so decomposition is
  only paid when the cheap rungs fail or pass unacceptably. The economic winner was
  typically the last rung: decomposition. That is the harness-over-model thesis as a
  measured protocol ([[sources/2026-09-02-the-prompting-playbook]]).
- **Output limits are a distinct failure mode** — a better prompt can make a smaller model
  fail not by violating rules but by not finishing within max output tokens. That is a
  budget failure, not a quality failure; inflating the limit to pass destroys the
  token/latency economics ([[sources/2026-09-02-the-prompting-playbook]]).

> [!inference] Relation to the vault's other ladders
> The degradation-ladder patterns (retry → fallback → human) order **runtime failure
> handling**; the capability ladder orders **capability investment** for a task that
> reproves. Different objects, different ladders — conflating them mixes incident
> response with roadmap planning.

## Sources

- [[sources/2026-09-02-the-prompting-playbook|The Prompting Playbook]] — Claude (Anthropic) on the staff-scheduling case: Sonnet 4.6 baseline 0/5, Opus 4.7 fewer violations but still failing, adaptive thinking compliant at 3x cost, better prompt 2/5 with truncation failures, and the generate-evaluate-repair decomposition winning on economics
