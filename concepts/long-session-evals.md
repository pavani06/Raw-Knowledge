---
title: "Long-Session Evals"
type: concept
aliases: ["long session evals", "long-session evals", "long conversation evals", "N+1 turn evals", "context degradation evals"]
tags: [ai, agents, evals, testing, context]
source_count: 1
last_updated: 2026-06-09
parent: []
part-of: ["[[concepts/agent-evals]]"]
defines: []
relates-to: ["[[concepts/context-rot]]", "[[concepts/context-window-management]]", "[[concepts/smart-truncation]]", "[[concepts/agent-memory]]", "[[concepts/tracing-observability]]"]
contradicts: []
supports: ["[[concepts/context-window-management]]", "[[concepts/context-rot]]"]
extends: ["[[concepts/agent-evals]]"]
sources: ["[[sources/2026-06-09-how-we-solved-context-management-in-agents]]"]
---

# Long-Session Evals

Long-session evals test whether an agent still behaves correctly after a conversation has accumulated enough history to stress its [[concepts/context-window-management]]. Arize's pattern for [[entities/alex|Alex]] is to load ten turns and test the eleventh, turning late-session forgetting into a reproducible eval target.

## Key Insights

- **Long conversations are normal product behavior** — Alex users tend to stay in one chat while moving across product pages, so conversation history naturally grows ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Failures appear late** — [[concepts/smart-truncation]] initially looked successful, but long conversations revealed late failures where Alex began forgetting important earlier context ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Load N, test N+1** — Arize loads ten turns and tests the eleventh to measure whether context has degraded enough to change the next answer ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **The eval makes bugs discoverable before users report them** — late-session context bugs become part of the regression suite rather than relying on manual inspection or customer complaints ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Long-session evals are a context-quality proxy** — because Arize lacks formal context-budget metrics, evals provide the operational signal for whether the memory/truncation strategy is preserving the right information ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).

> [!inference] Long-session evals bridge [[concepts/agent-evals]] and [[concepts/context-rot]]: they do not only grade final task quality, they specifically grade how well the agent survives accumulated conversational state.

## Sources

- [[sources/2026-06-09-how-we-solved-context-management-in-agents|How we solved Context Management in Agents]] — Sally-Ann Delucia (Arize) on loading ten turns and testing the eleventh to expose late context-management failures in Alex
