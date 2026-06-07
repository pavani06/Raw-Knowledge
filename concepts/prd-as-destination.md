---
title: "PRD as Destination"
type: concept
aliases: ["PRD as destination", "product requirements document", "destination document", "PRD", "destination artifact"]
tags: [ai, agents, llm, coding, workflow, planning]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/grill-me-skill]]", "[[concepts/shared-design-concept]]", "[[concepts/vertical-slices]]", "[[concepts/kanban-for-agents]]", "[[concepts/doc-rot]]", "[[concepts/human-in-loop-vs-afk]]"]
contradicts: []
supports: ["[[concepts/kanban-for-agents]]", "[[concepts/vertical-slices]]"]
extends: []
sources: ["[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
---

# PRD as Destination

The product requirements document (PRD) reframed as a **destination artifact** — not a
specification to be read line-by-line and compiled into code, but a summary of the
[[concepts/shared-design-concept]] that tells the agent where it's going. The PRD encodes
user stories, implementation decisions, testing decisions, and out-of-scope items.

The PRD is the output of the [[concepts/grill-me-skill]] session, not the input to it.
It is generated *after* alignment is reached, not before. This inverts the "specs-to-code"
workflow: the code is always in mind throughout planning, not ignored until the spec is done.

## Key Insights

- **You don't need to read the PRD** — because the [[concepts/grill-me-skill]] session
  already aligned you with the AI; the PRD is a lossy summary of that alignment, not the
  alignment itself ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Modules are in the PRD** — the PRD explicitly names which modules will be modified and
  what their interfaces look like; this keeps the code in mind throughout planning and
  prevents the AI from designing in a vacuum
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Out-of-scope section is critical** — the PRD must document what is NOT being built;
  this gives the agent a definition of done and prevents scope creep
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **PRD → Kanban board** — the PRD is immediately decomposed into independently-grabbable
  issues with blocking relationships; the PRD is a waypoint, not the final artifact
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Delete the PRD after use** — keeping old PRDs in the repo causes [[concepts/doc-rot]];
  the code has evolved past the PRD; close the issue rather than keeping the document
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Specs-to-code is the anti-pattern** — passing a spec to AI and ignoring the code
  produces code that doesn't match intent; the PRD-as-destination approach keeps the code
  as the battleground throughout
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

## Sources

- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — PRD workflow; specs-to-code critique; module naming in PRD; delete-after-use rationale
