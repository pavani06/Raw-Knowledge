---
title: "Grill Me Skill"
type: concept
aliases: ["grill me skill", "grill me", "relentless interviewing", "alignment interview", "grilling session"]
tags: [ai, agents, llm, coding, workflow, planning, alignment]
source_count: 1
last_updated: 2026-06-07
parent: ["[[concepts/skills-progressive-disclosure]]"]
part-of: ["[[concepts/harness-engineering]]"]
defines: ["[[concepts/shared-design-concept]]"]
relates-to: ["[[concepts/shared-design-concept]]", "[[concepts/prd-as-destination]]", "[[concepts/human-in-loop-vs-afk]]", "[[concepts/skills-progressive-disclosure]]", "[[concepts/context-window-management]]"]
contradicts: []
supports: ["[[concepts/shared-design-concept]]", "[[concepts/prd-as-destination]]"]
extends: ["[[concepts/skills-progressive-disclosure]]"]
sources: ["[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
---

# Grill Me Skill

A [[concepts/skills-progressive-disclosure|skill]] that instructs the AI to interview the
human relentlessly about every aspect of a plan — walking down each branch of the decision
tree, resolving dependencies one by one, asking one question at a time, and providing its
recommended answer for each. The goal is not a plan but a **[[concepts/shared-design-concept]]**:
mutual understanding between human and AI before any implementation begins.

The skill prompt is deliberately short: "Interview me relentlessly about every aspect of
this plan until we reach a shared understanding. Walk down each branch of the decision tree
resolving dependencies one by one. For each question provide your recommended answer. Ask
the questions one at a time."

## Key Insights

- **Alignment over planning** — the grill me skill is not about producing a plan; it's about
  reaching the same wavelength as the AI. Frederick P. Brooks' "design concept" — the shared
  idea held between all participants — is what you're building
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Prevents eager planning** — without the grill me skill, AI in plan mode eagerly produces
  a plan before it has enough information; the skill forces it to ask first
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **The conversation is the asset** — the grilling session history (25K tokens of aligned
  discussion) is more valuable than the resulting PRD; it encodes the design concept
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Always human-in-loop** — the grilling session cannot be automated; a human must be
  present to answer questions, especially about domain knowledge and design decisions.
  See [[concepts/human-in-loop-vs-afk]]
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Can last 40–100 questions** — a thorough grilling session can run for an hour; this is
  not a bug, it's the alignment work that makes AFK implementation possible
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Works with meeting transcripts** — feed a domain expert meeting transcript into a
  grilling session to surface and validate assumptions that weren't explicitly discussed
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Tunable** — if the AI is asking too many questions, the skill prompt can be adjusted to
  add stop points or reduce intensity; owning the skill means owning the behavior
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

> [!inference] The grill me skill is the [[concepts/non-functional-requirements]] discipline
> applied to planning: just as non-functional requirements make the implicit quality bar
> explicit, the grilling session makes the implicit design assumptions explicit — before
> they become bugs.

## Sources

- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — central workflow step; Brooks' design concept; conversation-as-asset; human-in-loop requirement
