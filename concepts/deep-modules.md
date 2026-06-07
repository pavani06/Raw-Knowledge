---
title: "Deep Modules"
type: concept
aliases: ["deep modules", "deep module", "Ousterhout principle", "simple interface complex implementation", "module depth"]
tags: [ai, agents, llm, coding, architecture, software-engineering]
source_count: 1
last_updated: 2026-06-07
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: []
relates-to: ["[[concepts/feedback-loops]]", "[[concepts/vertical-slices]]", "[[concepts/codebase-uniformity]]", "[[concepts/non-functional-requirements]]", "[[concepts/context-window-management]]"]
contradicts: []
supports: ["[[concepts/feedback-loops]]", "[[concepts/codebase-uniformity]]"]
extends: []
sources: ["[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
---

# Deep Modules

John Ousterhout's principle from *A Philosophy of Software Design*: **a good module has a
simple interface and a complex implementation**. The interface is small and easy to
understand; the complexity is hidden inside. This is the opposite of a "shallow module"
(simple implementation, complex interface) which leaks its complexity to callers.

In the context of AI coding, deep modules are doubly important: they make the codebase
**testable** (a simple interface is easy to mock and assert against) and **AI-navigable**
(the AI only needs to understand the interface to use a module correctly, not its internals).

The human's job is to **own the interface**; the AI's job is to **implement the internals**.
This division of labor maps cleanly onto the [[concepts/human-in-loop-vs-afk]] distinction:
interface design is always human-in-loop; implementation can be AFK.

## Key Insights

- **Simple interface, complex implementation** — the module's public surface should be as
  small as possible; all complexity lives inside. This is Ousterhout's core principle,
  applied to AI coding ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Testability as a design signal** — if a module is hard to test, its interface is too
  complex; deep modules are naturally testable because their interface is small and their
  behavior is well-defined ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **AI-navigability** — the AI only needs to understand the interface to use a module; it
  doesn't need to read the implementation. Deep modules reduce the context the AI must hold
  to work effectively. See [[concepts/context-window-management]]
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Delegate implementation, own the interface** — the human designs the interface (what
  the module does and how it's called); the AI implements the internals (how it does it).
  This is the correct division of labor for AI-assisted development
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Classic principle, new urgency** — Ousterhout's principle predates AI coding by decades,
  but applies with greater force: a human can navigate a complex interface with effort; an
  AI cannot. Deep modules are a prerequisite for reliable AI coding
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Relation to [[concepts/codebase-uniformity]]** — deep modules and codebase uniformity
  are complementary: uniformity reduces the AI's attention cost per file; deep modules
  reduce the AI's attention cost per module boundary
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

> [!inference] Deep modules are the architectural expression of [[concepts/non-functional-requirements]]:
> the requirement "modules must have simple interfaces" is a non-functional requirement that
> must be written down and enforced — otherwise AI will naturally produce shallow modules
> (complex interfaces, simple implementations) because they are easier to generate.

## Sources

- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — Ousterhout's principle; testability as design signal; delegate implementation, own the interface; AI-navigability
