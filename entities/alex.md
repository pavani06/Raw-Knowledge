---
title: "Alex"
type: entity
entity_type: project
aliases: ["Alex", "Arize Alex"]
tags: [ai, agents, harness, context]
source_count: 1
last_updated: 2026-06-09
relates-to: ["[[entities/arize-phoenix]]"]
part-of: []
sources: ["[[sources/2026-06-09-how-we-solved-context-management-in-agents]]"]
---

# Alex

Alex is Arize's AI harness for helping teams build AI applications. In Sally-Ann Delucia's talk, Alex is the production system that exposed Arize's context-management loop: it analyzes traces and span data from AI applications, but that data can grow large enough to constrain the agent doing the analysis.

Alex includes advanced planning, 40-plus skills, prompt optimization, data generation, data augmentation, annotations, and workflows over Arize's observability data. The talk focuses less on the product surface and more on the context strategies that make Alex usable: [[concepts/smart-truncation]], [[concepts/agent-memory]], [[concepts/long-session-evals]], and [[concepts/sub-agents]].

## Mentioned In

- [[sources/2026-06-09-how-we-solved-context-management-in-agents|How we solved Context Management in Agents]] — Sally-Ann Delucia describes Alex as Arize's AI harness and explains how its trace-analysis workload drove smart truncation, long-session evals, and sub-agent delegation
