---
title: "Shared Design Concept"
type: concept
aliases: ["shared design concept", "design concept", "mutual understanding", "alignment", "shared understanding"]
tags: [ai, agents, llm, coding, workflow, planning, alignment]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/grill-me-skill]]", "[[concepts/prd-as-destination]]", "[[concepts/human-in-loop-vs-afk]]", "[[concepts/non-functional-requirements]]"]
contradicts: []
supports: ["[[concepts/grill-me-skill]]", "[[concepts/prd-as-destination]]"]
extends: []
sources: ["[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
---

# Shared Design Concept

The mutual understanding between human and AI that must exist before effective implementation
can begin — the "same wavelength" state where both parties have internalized the same design
decisions, constraints, and goals. Borrowed from Frederick P. Brooks' *The Design of Design*:
the design concept is the shared idea held between all participants in a design process.

The [[concepts/grill-me-skill]] is the primary mechanism for building a shared design concept.
The [[concepts/prd-as-destination|PRD]] is the artifact that encodes it — but the concept
itself lives in the conversation history, not the document.

## Key Insights

- **You need an asset, not a plan** — the goal of the planning phase is not a document but
  a state of mutual understanding; the PRD is a side-effect of reaching that state
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **The conversation is the asset** — 25K tokens of aligned grilling session history encodes
  the design concept more faithfully than any summary document; the PRD is a lossy
  compression of it ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Alignment enables AFK implementation** — once the shared design concept exists, the
  human can step back and let the agent implement AFK; without it, the agent will make
  wrong design decisions autonomously
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Specs-to-code is a false shortcut** — passing a spec directly to AI and ignoring the
  code skips the shared design concept step; the result is code that doesn't match the
  human's actual intent, because the intent was never fully articulated
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Team alignment** — in a team setting, the grilling session can include multiple humans;
  the shared design concept must be shared across the whole team, not just between one
  developer and the AI ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

> [!inference] The shared design concept is the planning-phase equivalent of
> [[concepts/non-functional-requirements]]: both make implicit knowledge explicit before
> agents act on it. Non-functional requirements make quality bars explicit; the shared
> design concept makes design intent explicit.

## Sources

- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — Brooks' design concept; conversation-as-asset; specs-to-code critique; team alignment
