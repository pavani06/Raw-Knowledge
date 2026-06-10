---
title: "Context Window Management"
type: concept
aliases: ["context window management", "context management", "context window", "context engineering"]
tags: [ai, llm, context, architecture]
source_count: 7
last_updated: 2026-06-09
parent: []
part-of: []
defines: ["[[concepts/context-rot]]", "[[concepts/smart-zone-dumb-zone]]"]
relates-to: ["[[concepts/compaction]]", "[[concepts/skills-progressive-disclosure]]", "[[concepts/programmatic-tool-calling]]", "[[concepts/long-running-agents]]", "[[concepts/prompt-injection-patterns]]", "[[concepts/harness-engineering]]", "[[concepts/research-plan-implement]]", "[[concepts/smart-zone-dumb-zone]]", "[[concepts/controlled-rag]]", "[[concepts/12-factor-agents]]", "[[concepts/agent-state-management]]", "[[concepts/smart-truncation]]", "[[concepts/long-session-evals]]", "[[concepts/agent-memory]]"]
contradicts: []
supports: []
extends: []
sources: ["[[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]", "[[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]", "[[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]", "[[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]", "[[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]", "[[sources/2026-06-09-12-factor-agents]]", "[[sources/2026-06-09-how-we-solved-context-management-in-agents]]"]
---

# Context Window Management

The set of techniques for keeping a model effective within a finite context window — the
single biggest constraint on [[concepts/long-running-agents]]. Each new session starts with
"amnesia," so memory components, fresh-context strategies, and disciplined use of the window
are required.

Many of the harness improvements over the past year were fundamentally context-window
improvements: [[concepts/skills-progressive-disclosure]], [[concepts/programmatic-tool-calling]],
[[concepts/compaction]], and using the file system (see [[concepts/file-system-state]]) as
external memory instead of cramming everything into context.

## Key Insights

- A new session has no memory — the agent restarts from scratch, so memory components are
  needed ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Models became progressively more **context-aware**, tracking tokens consumed and managing
  their own context as they approach the window's end (Sonnet 4.5 onward)
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- The 1M-token context window reaching GA shifts the design space — you may run a lot within
  a single window instead of needing new sessions
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).
- Audience "smart zone / dumb zone" framing: model quality reportedly degrades past a
  context threshold (~100K with 1M windows); slicing tasks small keeps the model in its
  smart zone — a motivation behind the [[concepts/ralph-loop]]
  ([[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours]]).

### From Harness Engineering (Ryan Lopopolo, OpenAI)

- **Just-in-time context surfacing** — don't frontload all instructions (which overwhelms the agent); defer them to lint/test time so the agent can prototype freely, then receive targeted corrections at the moment they are relevant ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **Context refresh during long runs** — with auto-compaction, context gets paged out; [[concepts/reviewer-agents|reviewer agents]] and lint/test failures serve as continuous context refreshers that remind the agent of requirements throughout a long task ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **File size limits as context engineering** — writing a test that limits files to ≤350 lines is a context-efficiency measure: smaller files mean the model can hold more of the relevant code in its window at once ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).
- **[[concepts/codebase-uniformity|Codebase uniformity]] as context management** — making code maximally consistent means the model builds transferable context regardless of where in the repo it is working; less attention needed per new file ([[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent]]).

### From AI Coding Workflow (Matt Pocock)

- **[[concepts/smart-zone-dumb-zone]] as the practitioner's mental model** — Matt's smart
  zone / dumb zone framing gives context window management a concrete, actionable shape:
  you're either in the smart zone or you're not, and the entire workflow is about staying
  in it ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **System prompt size discipline** — a 250K-token system prompt sends you straight into
  the dumb zone before any work begins; keep the system prompt tiny and use
  [[concepts/skills-progressive-disclosure|skills]] to load context on demand
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **Clear context as a context management strategy** — Matt prefers clearing context
  (returning to a known state) over [[concepts/compaction]] for parallelized AFK loops;
  each [[entities/sandcastle|Sandcastle]] sandbox starts with a clean context window,
  guaranteeing smart-zone entry ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).
- **[[concepts/kanban-for-agents|Kanban issue sizing]]** — each issue should be sized to
  fit within the smart zone; large tasks are broken into small independently-grabbable
  issues precisely to keep each agent session within the ~100K token smart zone ceiling
  ([[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock]]).

### From No Vibes Allowed (Dex Horthy, HumanLayer)

- **"Context engineering" as the named umbrella** — Dex frames the whole discipline as
  *context engineering*: "how can we get the most out of today's models? How do we manage our
  context window?" Context window management is the operational core of context engineering
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Optimize for correctness, completeness, size, trajectory** — the four axes of a good
  context window; the error hierarchy is incorrect > missing > noise. Note **trajectory**: a
  conversation full of "the human yelled at me for being wrong" makes "be wrong again" the
  most likely next token — be mindful of the conversation's trajectory
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Spend as many tokens as possible — meaningfully** — the goal isn't to minimize tokens but
  to offload as much *meaningful* work to the AI as possible; what you can meaningfully
  offload is high leverage ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **On-demand compressed context beats static onboarding** — rather than maintaining
  ever-staling onboarding docs (the y-axis of doc/comment/code is "amount of lies"), a good
  research prompt launches [[concepts/sub-agents|sub-agents]] to take
  [[concepts/vertical-slices|vertical slices]] through the codebase and build a research doc
  that is "a snapshot of the actually-true parts of the codebase that matter. We are
  compressing truth." See [[concepts/doc-rot]]
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).
- **Sharded onboarding (progressive disclosure)** — instead of one giant onboarding file that
  burns the whole [[concepts/smart-zone-dumb-zone|smart zone]] just learning the repo, put a
  small file at each level of the tree so the agent pulls root context then sub-context as it
  descends. See [[concepts/skills-progressive-disclosure]]
  ([[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases]]).

> [!inference] This page's `"context engineering"` alias is load-bearing here: Dex uses
> "context engineering" as the field name and "context window management" as its practice.
> [[concepts/harness-engineering]] is, in his framing, "part of context engineering" — making
> context window management the root discipline the entire harness cluster serves.

### From More Context Makes Your Agent Dumber (Nupur Sharma, Qodo)

- **Accuracy drops with token count** — a meta-analysis shows ~70% accuracy at 4K tokens
  dropping to ~50% at 90K tokens. Context window size is not the solution; it's a challenge.
  *"We need to think about what we put in the context rather than how much we can put in the
  context window"* ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **More context makes agents dumber** — the talk's thesis: dumping everything into a giant
  context window degrades quality. The solution is not bigger windows but smarter curation of
  what enters them ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Static prompts are context overhead** — every agent call carries a base prompt that consumes
  a chunk of the window regardless of the task; Google's "Agents Hack" paper recommends shorter
  prompts to reduce this overhead ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **[[concepts/controlled-rag|Controlled RAG]]** — system-side checkpoints (stop at 20K tokens /
  7 documents), metadata filtering, and human-in-the-loop refinement prevent retrieval from
  silently inflating the context window ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Specialized sub-agents save context** — a coding agent, a security agent, and a review
  agent each carry their own smaller static prompts and focus areas, saving tokens vs. a
  monolithic agent with a giant combined prompt ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).

> [!inference] Nupur's accuracy-drop data provides the empirical backbone for the
> [[concepts/smart-zone-dumb-zone|smart-zone]] intuition that multiple prior sources arrived
> at anecdotally. The meta-analysis showing accuracy halving between 4K and 90K tokens gives
> a concrete number to the "dumb zone" concept.

### From 12-Factor Agents (Dex Horthy, HumanLayer)

- **Own your context window** — Factor 3 of the [[concepts/12-factor-agents]] framework.
  Don't blindly append errors to context; when the model screws up and calls a wrong API,
  clear or summarize the error rather than dumping the full stack trace. "Figure out what
  you want to tell the model so you get better results" ([[sources/2026-06-09-12-factor-agents]]).
- **Optimize token density and clarity** — if you're not looking at every single token and
  optimizing how you pass information to the LLM, "you might be missing out on upside and
  quality." The model's output quality is a function of input token quality
  ([[sources/2026-06-09-12-factor-agents]]).
- **Own how you build the context** — you can model event state and thread history however
  you want (single user message, system message, custom stringification). The standard
  OpenAI messages format is just one option; own the construction so you can optimize
  density ([[sources/2026-06-09-12-factor-agents]]).
- **Context window is what enables pause/resume** — by owning the context window, you can
  serialize it to a database before awaiting a long-running tool, then rehydrate and
  continue seamlessly. See [[concepts/agent-state-management]]
  ([[sources/2026-06-09-12-factor-agents]]).

### From Context Management in Agents (Sally-Ann Delucia, Arize)

- **Context engineering > prompt engineering** — Sally-Ann Delucia echoes Karpathy's "+1 context engineering over prompt engineering" framing: the stack shifted from prompt-focused work to choosing strategically what the model sees ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Context management is product/UX, not just engineering** — if the agent sees the wrong data, users experience bad answers; the context strategy directly shapes the product experience ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Trace-analysis vicious loop** — [[entities/alex|Alex]] analyzing agent traces created more span data, hit context limits, retried with even more data, and failed again: "the system analyzing the data was constrained by the data" ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **[[concepts/smart-truncation|Smart truncation]] as a working strategy** — keep the head and tail, move the middle into a retrievable memory store, and let the agent decide when omitted context matters ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Context budgets remain heuristic** — Alex still uses basic first-100/last-100 selection and lacks a principled context budget or clear context-quality metrics; evals currently stand in as the measurement signal ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).

> [!inference] This source adds a product-operational layer to context engineering: context quality is not only a model-performance concern but a UX contract. If the product cannot decide what the agent should remember and forget, the user experiences that as an unreliable product rather than as a token-budget issue.

## Sources

- [[sources/2026-06-07-anthropic-workshop-build-agents-that-run-for-hours|Anthropic Workshop: Build Agents That Run for Hours]] — recurring theme across the history tour and Q&A
- [[sources/2026-06-07-harness-engineering-how-to-build-software-when-humans-steer-agent|Harness Engineering: How to Build Software When Humans Steer, Agents Execute]] — just-in-time surfacing; file size limits; codebase uniformity as context management
- [[sources/2026-06-07-full-walkthrough-workflow-for-ai-coding-matt-pocock|Full Walkthrough: Workflow for AI Coding — Matt Pocock]] — smart zone / dumb zone framing; system prompt size discipline; clear-context strategy; Kanban issue sizing
- [[sources/2026-06-08-no-vibes-allowed-solving-hard-problems-in-complex-codebases|No Vibes Allowed: Solving Hard Problems in Complex Codebases — Dex Horthy, HumanLayer]] — "context engineering" as the named umbrella; four optimization axes + trajectory; compressing truth via on-demand research; sharded onboarding
- [[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou|Why More Context Makes Your Agent Dumber]] — Nupur Sharma on accuracy-drop data (70%→50% from 4K→90K tokens); static prompts as overhead; controlled RAG; sub-agents for context savings
- [[sources/2026-06-09-12-factor-agents|12-Factor Agents: Patterns of reliable LLM applications]] — Dex Horthy on owning context construction; error clearing/summarization over blind appending; token density optimization; context window as pause/resume enabler
- [[sources/2026-06-09-how-we-solved-context-management-in-agents|How we solved Context Management in Agents]] — Sally-Ann Delucia (Arize) on context engineering as product/UX, trace-analysis context loops, smart truncation, long-session evals, and sub-agents for heavy data
