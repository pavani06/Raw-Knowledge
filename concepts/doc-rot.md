---
title: "Doc Rot"
type: concept
aliases: ["doc rot", "documentation rot", "stale documentation", "stale docs", "outdated docs"]
tags: [ai, agents, llm, coding, workflow, documentation]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/prd-as-destination]]", "[[concepts/non-functional-requirements]]", "[[concepts/context-window-management]]", "[[concepts/codebase-uniformity]]", "[[concepts/garbage-collection-day]]"]
contradicts: []
supports: ["[[concepts/codebase-uniformity]]"]
extends: []
sources: ["[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
---

# Doc Rot

Stale documentation in the repository that **actively misleads agents** — old PRDs, outdated
READMEs, superseded architecture decisions that no longer reflect the codebase. Doc rot is
more dangerous for AI coding than for human coding: a human can notice that a document
feels old; an AI cannot. It will follow stale instructions faithfully.

The antidote is not better documentation maintenance — it is **closing issues instead of
keeping documents**. When a feature is built, close the PRD issue rather than leaving the
PRD file in the repo. The code is the truth; the document is a snapshot that immediately
begins to rot.

## Key Insights

- **Stale docs mislead agents** — an AI will follow a stale PRD or outdated architecture
  doc as faithfully as a current one; it cannot distinguish "this was true six months ago"
  from "this is true now" ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Close issues, don't keep PRDs** — the [[concepts/prd-as-destination|PRD]] is a
  destination artifact; once the destination is reached, delete the map. Close the issue
  rather than keeping the document in the repo
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **The code is the truth** — the codebase is always more current than any document about
  it; prefer pointing agents at the code over pointing them at documentation
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Doc rot compounds** — each stale document is a potential source of agent confusion;
  as the codebase evolves, the gap between documentation and reality widens, and the
  misleading signal grows ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Relation to [[concepts/garbage-collection-day]]** — GC day eliminates stale guardrails
  and outdated review patterns; doc rot elimination is the same discipline applied to
  documentation: systematically remove anything that no longer reflects reality
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **[[concepts/codebase-uniformity]] as the positive form** — where doc rot is the failure
  mode (inconsistency between docs and code), codebase uniformity is the success mode
  (consistent, predictable code that agents can navigate without documentation)
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

> [!inference] Doc rot is the documentation equivalent of [[concepts/context-rot]]: just
> as context rot degrades agent coherence within a session, doc rot degrades agent accuracy
> across sessions by poisoning the context with false information. Both are failure modes
> of accumulated state that no longer reflects reality.

## Sources

- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — stale PRDs misleading agents; close-issues-not-keep-PRDs; code as truth
