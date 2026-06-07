---
title: "Sandcastle"
type: entity
entity_type: tool
aliases: ["Sandcastle", "sandcastle"]
tags: [ai, agents, llm, coding, parallelization, docker]
source_count: 1
last_updated: 2026-06-07
relates-to: ["[[entities/claude-code]]"]
part-of: []
sources: ["[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]"]
---

# Sandcastle

Matt Pocock's TypeScript library for running parallelized AFK agent loops in isolated Docker
sandboxes. Sandcastle takes a [[concepts/kanban-for-agents|Kanban board]] of independently-
grabbable issues and dispatches multiple [[concepts/ralph-loop|Ralph Loop]]-style agent
sessions in parallel, each working on a separate issue in its own container.

The Docker sandbox isolation ensures that parallel agents cannot interfere with each other's
file system state, making true parallelization safe. Each sandbox gets a clean environment,
runs the agent loop to completion, and reports results back.

## Mentioned In

- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — Matt's primary tool for AFK parallelization; TypeScript library; Docker sandbox isolation; Kanban issue dispatch
