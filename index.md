# Raw Knowledge Index

The agent-maintained catalog of every page in this knowledge base. The `knowledge-indexer`
agent owns this file — it is updated on every ingest. Entries are sorted alphabetically
within each section, with a one-line summary and source count.

## Concepts

- [[concepts/agent-harness|Agent Harness]] — Scaffolding around the model that fills its gaps; co-evolves with the model (1 source)
- [[concepts/agent-teams|Agent Teams]] — Inter-communicating sub-agents that coordinate and report back (1 source)
- [[concepts/compaction|Compaction]] — Server-side context condensing enabling indefinite single-session runs (1 source)
- [[concepts/context-rot|Context Rot]] — Coherence loss / context anxiety as a long-run failure mode (1 source)
- [[concepts/context-window-management|Context Window Management]] — Techniques for staying effective within a finite context window (1 source)
- [[concepts/design-taste-rubric|Design Taste Rubric]] — Written rubric for grading subjective design quality (1 source)
- [[concepts/file-system-state|File System as Shared State]] — Files (esp. JSON) as durable shared memory for multi-agent runs (1 source)
- [[concepts/generator-evaluator-pattern|Generator-Evaluator Pattern]] — GAN-style adversarial builder/critic split (1 source)
- [[concepts/long-running-agents|Long-Running Agents]] — Agents that run autonomously for hours to days (1 source)
- [[concepts/planner-generator-evaluator-architecture|Planner-Generator-Evaluator Architecture]] — Full three-role PM/IC/QA harness with contract negotiation (1 source)
- [[concepts/programmatic-tool-calling|Programmatic Tool Calling]] — Code-driven tool calls that keep intermediate output out of context (1 source)
- [[concepts/ralph-loop|Ralph Loop]] — Loop a prompt through Claude Code until tasks complete; "deterministically bad" (1 source)
- [[concepts/reading-traces|Reading Traces]] — Hand-reading agent traces as the primary harness-debugging discipline (1 source)
- [[concepts/skills-progressive-disclosure|Skills (Progressive Disclosure)]] — Lazy-loaded capability packaging that saves context (1 source)
- [[concepts/sub-agents|Sub-Agents]] — Delegated agents, each with its own context window (1 source)
- [[concepts/verification-loop|Verification Loop]] — The agent actually testing its running output (1 source)

## Entities

- [[entities/agent-sdk|Agent SDK]] — Anthropic's general-purpose harness framework (renamed from Claude Code SDK) (1 source)
- [[entities/anthropic|Anthropic]] — AI company behind Claude, Claude Code, and the Agent SDK (1 source)
- [[entities/claude-code|Claude Code]] — Anthropic's agentic coding tool / harness testing ground (1 source)
- [[entities/model-context-protocol|Model Context Protocol]] — Open protocol for agent tool use via standardized servers (1 source)
- [[entities/playwright|Playwright]] — Browser automation powering the evaluator's verification (1 source)

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — Ash Prabaker & Andrew Wilson (AI Engineer) on building long-running agent harnesses (video, 2026-06-07)

## Digests

- [[digests/2026-06-07|Digest 2026-06-07]] — First synthesis: the long-running-agent harness cluster (1 source, 16 concepts)
