---
title: "Human-in-Loop vs. AFK"
type: concept
aliases: ["human in loop", "AFK", "human-in-loop vs afk", "human presence", "task classification", "synchronous vs asynchronous"]
tags: [ai, agents, llm, coding, workflow, methodology]
source_count: 2
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/grill-me-skill]]", "[[concepts/shared-design-concept]]", "[[concepts/kanban-for-agents]]", "[[concepts/ralph-loop]]", "[[concepts/feedback-loops]]", "[[concepts/smart-zone-dumb-zone]]", "[[concepts/sub-agents]]", "[[entities/a2-protocol]]", "[[concepts/12-factor-agents]]"]
contradicts: []
supports: ["[[concepts/kanban-for-agents]]", "[[concepts/ralph-loop]]"]
extends: []
sources: ["[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]", "[[sources/2026-06-09-12-factor-agents]]"]
---

# Human-in-Loop vs. AFK

The fundamental task classification in AI-assisted development: **some tasks require the
human to be present** (human-in-loop); **others can be delegated and run unattended** (AFK
— Away From Keyboard). Knowing which is which is the key workflow decision.

The classification is not about trust or capability — it is about the nature of the task:
- **Human-in-loop**: tasks that require domain knowledge, design judgment, or alignment
  decisions that the AI cannot make correctly without human input. The [[concepts/grill-me-skill|grill me skill]] session is always human-in-loop.
- **AFK**: tasks with a clear definition of done, sufficient context, and strong
  [[concepts/feedback-loops|feedback loops]] that let the AI self-correct. Implementation
  of a well-specified [[concepts/kanban-for-agents|Kanban issue]] can be AFK.

## Key Insights

- **Planning is always human-in-loop** — the [[concepts/grill-me-skill]] session, design
  decisions, and alignment work cannot be automated; a human must be present to answer
  questions about domain knowledge and intent
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Implementation can be AFK** — once the [[concepts/shared-design-concept]] is established
  and the issue is well-specified, the agent can implement unattended; the human checks in
  at the end, not throughout ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Feedback loops enable AFK** — AFK implementation is only safe when strong feedback
  loops (tests, types, linters) are in place; without them, the agent can fail silently
  and the human won't know until they return. See [[concepts/feedback-loops]]
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **The [[concepts/ralph-loop]] is the AFK mechanism** — Matt's ralph-once.sh and
  [[entities/sandcastle|Sandcastle]] are the tools for running AFK implementation loops;
  they are the operational form of the AFK classification
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Misclassification is the failure mode** — treating an AFK task as human-in-loop wastes
  human time; treating a human-in-loop task as AFK produces misaligned output that must be
  thrown away ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Context window sizing matters for AFK** — AFK tasks must be sized to fit within the
  agent's [[concepts/smart-zone-dumb-zone|smart zone]]; a task that requires more context
  than the smart zone allows will degrade silently during AFK execution
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

> [!inference] Human-in-loop vs. AFK is the workflow-level expression of the
> [[concepts/harness-engineering]] principle "humans steer, agents execute": steering is
> always human-in-loop; execution is AFK. The harness is the infrastructure that makes
> AFK execution safe — context, feedback loops, and well-specified issues.

### From 12-Factor Agents (Dex Horthy, HumanLayer)

- **Contact humans with tools** — Factor 8: push the tool-call vs. message-to-human
  distinction to the first natural-language token the model generates. This gives the
  model natural-language control over whether to respond, ask for clarification, or
  escalate, rather than forcing it into a binary tool-call-or-text decision
  ([[sources/2026-06-09-12-factor-agents]]).
- **Trigger from anywhere, meet users where they are** — Factor 9: agents should
  integrate into existing communication channels (email, Slack, Discord, SMS) rather
  than requiring users to open yet another chat interface. This is the
  human-in-the-loop surface area made multi-channel
  ([[sources/2026-06-09-12-factor-agents]]).
- **The [[entities/a2-protocol|A2 protocol]] as the consolidation layer** — HumanLayer
  is working on an open protocol to standardize agent-human contact, so builders don't
  reinvent approval flows. This is infrastructure for human-in-the-loop at scale
  ([[sources/2026-06-09-12-factor-agents]]).

## Sources

- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — planning vs. implementation classification; feedback loops as AFK prerequisite; ralph-once.sh and Sandcastle as AFK tools; misclassification as failure mode
- [[sources/2026-06-09-12-factor-agents|12-Factor Agents: Patterns of reliable LLM applications]] — Dex Horthy on contacting humans with tools; multi-channel triggers (email, Slack, Discord, SMS); the A2 protocol as human-contact consolidation layer
