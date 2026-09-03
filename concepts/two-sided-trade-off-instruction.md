---
title: "Two-Sided Trade-off Instruction"
type: concept
aliases: ["two-sided trade-off instruction", "balanced instruction", "counter-cost instruction", "instruction economics", "both sides of the trade-off", "single-objective overfit", "instruction overfit"]
tags: [ai, agents, llm, prompts, production]
source_count: 1
last_updated: 2026-09-02
parent: ["[[concepts/prompt-as-code]]"]
part-of: ["[[concepts/prompt-as-code]]"]
defines: []
relates-to: ["[[concepts/reward-hacking]]", "[[concepts/capability-escalation-ladder]]", "[[concepts/model-change-management]]", "[[concepts/deterministic-checks]]", "[[concepts/llm-as-judge]]"]
contradicts: []
supports: ["[[concepts/prompt-as-code]]"]
extends: []
sources: ["[[sources/2026-09-02-the-prompting-playbook]]"]
---

# Two-Sided Trade-off Instruction

An instruction-design rule for prompts that control the frequency of a costly action
(escalate to a human, issue a refund, hand off): **state the cost of acting AND the
counter-cost of wrongly not acting**. Instructions that declare only one side make the
model — an optimizer — over-fit the single stated objective. "Escalation costs $8, avoid
unnecessary escalations" produces under-escalation even when escalating is the correct
move ([[sources/2026-09-02-the-prompting-playbook]]).

## Key Insights

- **Single-objective overfit is the failure mode** — the model optimizes for what the
  prompt states. A one-sided cost instruction conflicts with the eval when the eval
  expects the action in specific cases; the fix is stating both sides and letting the
  model exercise per-case judgment ([[sources/2026-09-02-the-prompting-playbook]]).
- **As models improve, both sides matter more** — newer models are better at making
  trade-offs themselves, but only if the prompt supplies both sides of the ledger: "$8 to
  escalate, but getting it wrong costs a refund plus customer trust"
  ([[sources/2026-09-02-the-prompting-playbook]]).
- **Information withholding is the inverse of hallucination** — the model can withhold
  information it verifiably has. This is usually a stale defensive patch: an instruction
  written for an older model's failure ("never give plan details, point to the URL") that
  a newer, more instruction-following model now over-complies. The rebalancing move is
  the same as for hallucination: designate the in-context data as the **accurate source
  of truth** instead of banning output ([[sources/2026-09-02-the-prompting-playbook]]).
- **Align framing with the eval** — the instruction and the eval suite must describe the
  same desired behavior; a prompt that forbids what the eval rewards is a conflict the
  model resolves by failing one of them
  ([[sources/2026-09-02-the-prompting-playbook]]).
- **Boundary: judgment vs hard rule** — this pattern applies to actions whose correct
  frequency varies per case. For safety/PII-class behaviors there is no trade-off to
  weigh; those stay deterministic constraints handled by
  [[concepts/deterministic-checks|code]], not by balanced prose.
  > [!inference] Stale one-sided instructions are a cousin of [[concepts/reward-hacking]]:
  > in both, the system optimizes a stated proxy instead of the intended objective.

## Sources

- [[sources/2026-09-02-the-prompting-playbook|The Prompting Playbook]] — Claude (Anthropic) on the Meridian Mobile support bot: the $8 escalation instruction producing under-escalation, and the grandfathered-plan ban producing information withholding; both fixed by stating both sides / designating the source of truth
