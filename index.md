# Raw Knowledge Index

The agent-maintained catalog of every page in this knowledge base. The `knowledge-indexer`
agent owns this file — it is updated on every ingest. Entries are sorted alphabetically
within each section, with a one-line summary and source count.

## Concepts

- [[concepts/_moc-agent-harness|MOC: Agent Harness]] — Map of Content for the agent-harness cluster: technical substrate, context discipline, adversarial architecture, verification, and the human discipline (4 sources)
- [[concepts/agent-evals|Agent Evals]] — Three-tier evaluation framework (code → built-in → LLM-as-judge) for agentic systems (1 source)
- [[concepts/agent-harness|Agent Harness]] — Scaffolding around the model that fills its gaps; co-evolves with the model (2 sources)
- [[concepts/agent-memory|Agent Memory]] — Context retention across steps enabling multi-step task completion (1 source)
- [[concepts/agent-planning|Agent Planning]] — Decomposing a goal into ordered steps before execution; the Planner role in agentic workflows (1 source)
- [[concepts/agent-teams|Agent Teams]] — Inter-communicating sub-agents that coordinate and report back (1 source)
- [[concepts/agentic-ai|Agentic AI]] — AI that plans, uses tools, remembers context, and executes multi-step tasks autonomously (1 source)
- [[concepts/brownfield-codebases|Brownfield Codebases]] — Existing/complex/legacy codebases where naive AI coding fails; the problem domain RPI targets (1 source)
- [[concepts/closed-loop-evaluation|Closed-Loop Evaluation]] — Autonomous self-improvement where eval output feeds directly back to a coding agent (1 source)
- [[concepts/code-as-free-resource|Code as Free Resource]] — The axiom that code is abundant, disposable, and no longer the scarce resource (1 source)
- [[concepts/codebase-uniformity|Codebase Uniformity]] — Making code maximally consistent to reduce agent attention cost and improve token predictability (1 source)
- [[concepts/compaction|Compaction]] — Server-side + intentional context condensing enabling indefinite single-session runs and small working context (3 sources)
- [[concepts/context-rot|Context Rot]] — Coherence loss / context anxiety as a long-run failure mode (1 source)
- [[concepts/context-window-management|Context Window Management]] — Techniques for staying effective within a finite context window; the core of "context engineering" (4 sources)
- [[concepts/data-flywheel|Data Flywheel]] — Compounding eval data as a competitive moat; each iteration deepens the dataset (1 source)
- [[concepts/deep-modules|Deep Modules]] — Ousterhout's principle: large simple-interface modules that are easy to test and AI-navigable (1 source)
- [[concepts/design-taste-rubric|Design Taste Rubric]] — Written rubric for grading subjective design quality (1 source)
- [[concepts/doc-rot|Doc Rot]] — Stale documentation that actively misleads agents; prefer closing issues over keeping old PRDs (1 source)
- [[concepts/dont-outsource-thinking|Don't Outsource the Thinking]] — AI amplifies (or exposes the lack of) human thinking; no perfect prompt, no silver bullet (1 source)
- [[concepts/eval-driven-development|Eval-Driven Development]] — Writing capability evals before building features; the agent analog of TDD (1 source)
- [[concepts/eval-iterate-cycle|Eval-Iterate Cycle]] — The core loop: instrument → trace → eval → annotate → improve → repeat (1 source)
- [[concepts/feedback-loops|Feedback Loops]] — Tests, types, and linters as the quality ceiling for AI coding output (1 source)
- [[concepts/file-system-state|File System as Shared State]] — Files (esp. JSON) as durable shared memory for multi-agent runs (1 source)
- [[concepts/garbage-collection-day|Garbage Collection Day]] — Weekly ritual to convert human review feedback into automated guardrails (2 sources)
- [[concepts/generator-evaluator-pattern|Generator-Evaluator Pattern]] — GAN-style adversarial builder/critic split (2 sources)
- [[concepts/golden-dataset|Golden Dataset]] — Curated ground truth of human-labeled examples; the encoded judgment of domain experts (1 source)
- [[concepts/grill-me-skill|Grill Me Skill]] — Relentless AI interviewing to reach shared design concept before planning (1 source)
- [[concepts/harness-engineering|Harness Engineering]] — Methodology where humans steer and agents execute; the operational discipline of building self-improving harnesses (3 sources)
- [[concepts/human-in-loop-vs-afk|Human-in-Loop vs. AFK]] — Task classification: planning requires human presence; implementation can be delegated (1 source)
- [[concepts/kanban-for-agents|Kanban for Agents]] — Parallelizable issue board with blocking relationships enabling multi-agent work (1 source)
- [[concepts/llm-as-judge|LLM-as-Judge]] — Using a separate LLM to grade semantic quality; requires CoT, single-dimension rubrics, meta-evaluation (1 source)
- [[concepts/llm-vs-agents|LLM vs. Agents]] — The key distinction: LLMs suggest; agents suggest and act on the world (1 source)
- [[concepts/long-running-agents|Long-Running Agents]] — Agents that run autonomously for hours to days (1 source)
- [[concepts/mental-alignment|Mental Alignment]] — Code review's true purpose: keeping the team aligned on how/why the codebase changes; review plans not code (1 source)
- [[concepts/non-functional-requirements|Non-Functional Requirements]] — The undocumented quality bar that must be written down to be visible to agents (1 source)
- [[concepts/planner-generator-evaluator-architecture|Planner-Generator-Evaluator Architecture]] — Full three-role PM/IC/QA harness with contract negotiation (1 source)
- [[concepts/prd-as-destination|PRD as Destination]] — Product requirements document as the AI's destination artifact, not a spec to be read line-by-line (1 source)
- [[concepts/programmatic-tool-calling|Programmatic Tool Calling]] — Code-driven tool calls that keep intermediate output out of context (1 source)
- [[concepts/prompt-injection-patterns|Prompt Injection Patterns]] — Taxonomy of mechanisms for surfacing context to agents at the right time (1 source)
- [[concepts/ralph-loop|Ralph Loop]] — Loop a prompt through Claude Code until tasks complete; "deterministically bad" (2 sources)
- [[concepts/react-pattern|ReAct Pattern]] — Reasoning and action interleaved: think → act → observe → repeat (1 source)
- [[concepts/reading-traces|Reading Traces]] — Hand-reading agent traces as the primary harness-debugging discipline (2 sources)
- [[concepts/research-plan-implement|Research-Plan-Implement (RPI)]] — Three-phase coding-agent workflow built around context compaction; staying in the smart zone (1 source)
- [[concepts/reviewer-agents|Reviewer Agents]] — Automated persona-based sub-agents that inject feedback into PRs on every push (1 source)
- [[concepts/semantic-diffusion|Semantic Diffusion]] — Fowler's term: good terms dilute into uselessness; why "spec-driven dev" and "agent" broke (1 source)
- [[concepts/shared-design-concept|Shared Design Concept]] — The mutual understanding between human and AI that precedes effective implementation (1 source)
- [[concepts/skills-progressive-disclosure|Skills (Progressive Disclosure)]] — Lazy-loaded capability packaging that saves context; go deep not wide (3 sources)
- [[concepts/smart-zone-dumb-zone|Smart Zone / Dumb Zone]] — Model quality degrades past the smart zone (~40% of window / ~100K tokens); size tasks to stay in it (2 sources)
- [[concepts/sub-agents|Sub-Agents]] — Delegated agents, each with its own context window; for controlling context, not roles (4 sources)
- [[concepts/tool-use|Tool Use]] — Agents calling search, files, APIs, and other external capabilities to act on the world (1 source)
- [[concepts/tracing-observability|Tracing & Observability]] — Capturing raw execution data (spans, traces) as the prerequisite for any eval (1 source)
- [[concepts/verification-loop|Verification Loop]] — The agent actually testing its running output (3 sources)
- [[concepts/vertical-slices|Vertical Slices]] — Thin end-to-end features that cross all layers for fast feedback; also a research primitive (2 sources)

## Entities

- [[entities/agent-sdk|Agent SDK]] — Anthropic's general-purpose harness framework (renamed from Claude Code SDK) (1 source)
- [[entities/anthropic|Anthropic]] — AI company behind Claude, Claude Code, and the Agent SDK (1 source)
- [[entities/arize-phoenix|Arize Phoenix]] — Open-source LLM observability and eval platform; used for tracing, annotation, and experiments (1 source)
- [[entities/claude-code|Claude Code]] — Anthropic's agentic coding tool / harness testing ground (1 source)
- [[entities/codex|Codex]] — OpenAI's coding agent; primary harness in Ryan Lopopolo's harness engineering setup (1 source)
- [[entities/humanlayer|HumanLayer]] — AI company building an agentic IDE; originator of the RPI workflow and viral research/plan/implement prompts (1 source)
- [[entities/linear|Linear]] — Ticket/project management tool used as the entry point for agent work (1 source)
- [[entities/model-context-protocol|Model Context Protocol]] — Open protocol for agent tool use via standardized servers (1 source)
- [[entities/openai|OpenAI]] — AI company behind GPT models and Codex; context for harness engineering at scale (1 source)
- [[entities/playwright|Playwright]] — Browser automation powering the evaluator's verification (1 source)
- [[entities/sandcastle|Sandcastle]] — Matt Pocock's TypeScript library for parallelized AFK agent loops in Docker sandboxes (1 source)

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — Ash Prabaker & Andrew Wilson (AI Engineer) on building long-running agent harnesses (video, 2026-06-07)
- [[sources/2026-06-07-beginners-guide-to-learning-agentic-ai|The Beginner's Guide to Learning Agentic AI]] — Harsh Singh (ai.plainenglish.io) on agentic AI fundamentals: building blocks, workflow patterns, and beginner roadmap (article, 2026-06-07)
- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — Matt Pocock (AI Engineer) on software engineering fundamentals applied to AI coding workflows (video, 2026-06-07)
- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — Ryan Lopopolo (OpenAI) on the harness engineering methodology: humans steer, agents execute (video, 2026-06-07)
- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss (Arize, AI Engineer) on the three-tier eval framework, golden datasets, and the eval-iterate cycle (video, 2026-06-07)
- [[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases|No Vibes Allowed: Solving Hard Problems in Complex Codebases]] — Dex Horthy (AI Engineer, HumanLayer) on context engineering for brownfield codebases: research-plan-implement, intentional compaction, the dumb zone (video, 2026-06-08)

## Digests

- [[digests/2026-06-07|Digest 2026-06-07]] — Full-day synthesis: the agent-harness cluster across 2 sources, 23 concepts, 8 entities (2 sources)
