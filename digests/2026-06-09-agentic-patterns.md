# Reusable Patterns for Agentic Systems

Extracted from [[sources/2026-06-09-12-factor-agents]] (Dex Horthy, AI Engineer, 2025).
Filter: only patterns directly applicable to building agentic systems.
Excluded: principles without clear mechanics, delivery/deployment patterns, general strategy.

---

## Pattern 1: Tool as JSON Dispatch

**Problem Solved**
Tool-calling abstractions in agent frameworks introduce opaque machinery: the framework intercepts the LLM output, routes it through internal call stacks, and the builder loses visibility into what tokens were generated, how the dispatch decision was made, and why a tool call failed. Debugging requires reverse-engineering framework internals.

**Inputs**
- LLM output containing a tool invocation (typically JSON with a function name and arguments)
- A registry of available deterministic functions (the actual tool implementations)

**Outputs**
- A dispatched function call with arguments validated before execution
- A structured result appended to the context window for the next LLM turn

**Benefits**
- Tool dispatch becomes a deterministic code path — testable without an LLM.
- Every dispatch is auditable: log, version, and trace like any other software operation.
- Circuit breaking, rate limiting, and input validation happen at the switch statement, not inside the LLM loop.
- The error/recovery loop becomes visible: tool call fails → error in context → retry decision is explicit code, not framework magic.

**Limitations**
- Shifts complexity from "import the framework" to "write the dispatch handler yourself." No free lunch.
- Requires the builder to define the JSON schema that the LLM outputs for each tool — the framework would have auto-generated this.
- Does not eliminate the need for the LLM to actually produce valid JSON; structured output guarantees (e.g., constrained decoding) are still required upstream.

---

## Pattern 2: Agent Loop Ownership (Four-Component Decomposition)

**Problem Solved**
Agent frameworks treat the agent runtime loop as an internal black box: prompt construction, tool dispatch, context accumulation, and loop termination are interleaved in framework code the builder cannot inspect or modify. When behavior degrades, the builder cannot inject interventions (summarization, validation, human approval) at the right points.

**Inputs**
- A system prompt instructing the LLM on how to select the next step
- The current context window (history + state)
- The LLM's raw output (token stream or structured JSON)

**Outputs**
- A decision about the next action: call a tool, return a message to the user, request human input, or terminate
- An updated context window for the next iteration

**Internal Components (all owned by the builder)**

| Component | Role | Intervention Points |
|---|---|---|
| **Prompt** | Instructions for next-step selection | A/B test prompt variants, inject domain rules |
| **Switch statement** | Routes LLM output to deterministic code | Validate, rate-limit, log, circuit-break before dispatch |
| **Context builder** | Assembles the window for the next LLM call | Summarize, trim, clear stale errors, reorder for density |
| **Loop** | Controls iteration: when to continue, break, or escalate | Inject human approval gate, insert validation LLM call, force early termination |

**Benefits**
- Can inject `summarize`, `LM-as-judge`, or human approval at loop boundaries without framework support.
- The context builder can be optimized independently: experiment with message format, token density, and error cleanup strategies.
- Loop termination logic is explicit code — no surprises from framework heuristics about when the agent is "done."

**Limitations**
- The builder must write and maintain the loop, switch, and context builder. For simple agents this is over-engineering.
- Interoperability between components is now the builder's responsibility; a framework would have enforced consistency.
- Increases the surface area for bugs: a mistake in the context builder corrupts every subsequent LLM call.

---

## Pattern 3: Context Window Hygiene

**Problem Solved**
The naive agent loop appends every tool result — including errors — to the context window and feeds the whole thing back to the LLM. When a tool call fails, the full error (stack trace, HTTP status, raw response body) enters the context. The LLM fixates on past failures, retries already-solved problems, or spirals into hallucinated error-recovery loops.

**Inputs**
- The current context window (accumulated history of tool calls and results)
- The most recent tool call result (success or failure)
- Metadata about prior errors still present in the context

**Outputs**
- A cleaned context window ready for the next LLM invocation

**Rules**
1. When a tool call succeeds: clear all previously pending error information from the context.
2. When a tool call fails: append a summarized error description — never the raw stack trace or full HTTP response.
3. Never blindly append: every addition to the context window goes through a curation step that decides format, verbosity, and ordering.
4. Keep only what the model needs to make the *next* decision, not a forensic record of everything that happened.

**Benefits**
- Prevents the primary failure mode of long-running agents: context pollution causing degradation spirals.
- Token density improves because error noise is replaced with curated signal.
- The model stays focused on the current state rather than past failures.

**Limitations**
- Summarization can lose information that was genuinely useful for recovery (e.g., a specific API error code that indicates a different retry strategy).
- Requires the builder to define error-summarization logic per tool category; one-size-fits-all summarization may discard critical detail.
- If the summarization itself is done by an LLM, it introduces a second point of potential failure and latency.

---

## Pattern 4: Context Serialization for Pause/Resume

**Problem Solved**
Agents that call long-running tools (human approval, async API, scheduled job) must survive process restarts, deployments, and arbitrary wait times. If the agent runtime is in-memory, a restart loses all state and the workflow cannot resume.

**Inputs**
- A context window (the complete working state of the agent at the moment of interruption)
- A unique `state_id` identifying this workflow instance
- An async callback mechanism (webhook, message queue, polling endpoint)

**Outputs**
- The same context window, reconstructed, with the long-running tool's result appended, ready for the next LLM invocation

**Flow**
1. LLM decides to invoke a long-running tool.
2. Before dispatching: serialize the entire context window to a database row keyed by `state_id`.
3. Dispatch the tool call with the `state_id` as a correlation ID.
4. Release the agent process (it can terminate, restart, or handle other work).
5. When the tool completes, the callback arrives with `state_id` + result.
6. Load the context window from the database by `state_id`.
7. Append the tool result to the context.
8. Feed the reconstructed context back to the LLM.

**Precondition**
The context window must be fully owned by the builder. If a framework constructs the context internally (e.g., through opaque message management), it cannot be serialized and reconstructed deterministically.

**Benefits**
- Agents survive process restarts, deployments, and crashes transparently — the LLM never knows a pause occurred.
- Enables human-in-the-loop workflows: pause for approval, resume hours or days later with full context.
- State inspection at rest enables debugging: examine the serialized context to understand what the agent "knew" at any point.

**Limitations**
- Serialization must be deterministic: the reconstructed context must be token-identical to the original for consistent LLM behavior. Non-deterministic serialization (e.g., JSON key ordering) can cause subtle behavioral drift.
- Database latency adds overhead to every tool call, not just long-running ones, unless the pattern is applied selectively.
- Context windows containing non-serializable references (file handles, network connections, in-memory objects) require explicit cleanup or replacement with serializable handles.

---

## Pattern 5: Micro-Agent DAG

**Problem Solved**
Monolithic autonomous agents with unbounded context windows degrade in quality as the workflow grows. A single agent handling 20+ steps accumulates context pollution, loses focus, and produces unreliable results — especially when steps span different domains (deployment, testing, notification).

**Inputs**
- A mostly deterministic DAG defining the overall workflow structure
- A set of micro-agent nodes, each responsible for a specific decision point (3-10 LLM steps)
- Deterministic transition logic between nodes

**Outputs**
- A completed workflow where deterministic code handles the predictable parts and LLMs handle only the ambiguous decision points

**Structure**
```
[DAG determinístico] → [micro-agent #1: 3-10 steps] → [DAG determinístico] → [micro-agent #2: 3-10 steps] → ...
```

**Architecture rules**
- Each micro-agent has exactly one responsibility (deploy frontend, deploy backend, rollback on failure).
- Micro-agents do not call each other; deterministic code decides which micro-agent to invoke next.
- Context windows are scoped per micro-agent — when the agent completes, its context is discarded, and the next micro-agent starts fresh.
- The LLM recommends the next step within its node; it never designs the overall DAG.

**Concrete example (Deploy Pipeline)**
```
[CI/CD: build, test] → [Deploy Agent: decides deploy order] → [Human approval] → [Deterministic deploy]
    → [E2E tests: deterministic] → [Rollback Agent: only invoked on failure]
```

**Benefits**
- Context windows stay small (3-10 turns each), avoiding the degradation of long-context monolothic agents.
- Each micro-agent can be developed, tested, and prompted independently for its specific domain.
- Failure isolation: if the deploy agent makes a bad decision, the rollback agent handles it — the failure does not cascade through a single shared context.
- 100+ tools across 20 steps become manageable because each micro-agent only sees the tools relevant to its scope.

**Limitations**
- The builder must design and maintain the deterministic DAG — this is the work the "autonomous agent" promise was supposed to eliminate.
- Micro-agent boundaries must be designed correctly up front; a wrong split causes context gaps where one agent lacks information another had.
- Orchestration complexity: state handoff between micro-agents requires explicit serialization of what each agent decided, or reconstruction from side effects.

---

## Pattern 6: First-Token Intent Routing

**Problem Solved**
Agent output schemas typically separate "tool call" from "message to human" as a top-level field (e.g., `{"action": "tool_call", ...}` vs `{"action": "message", ...}`). The model must commit to this binary choice before generating the actual content. This forces the most important decision into a structural token the model has less "confidence" in than natural language, and it prevents expressing nuanced intents like "I need manager approval" vs "I need user clarification" vs "I'm done."

**Inputs**
- The LLM's output stream (token by token)
- A mapping from natural language intent patterns to dispatch actions

**Outputs**
- A routing decision (tool call, message to human, escalate, terminate)
- The full LLM response (tool invocation or natural language message)

**Mechanism**
Instead of a separate `action` field in the output schema, the first natural language token(s) the model generates encode the intent:

| First token(s) | Interpreted intent | Dispatch action |
|---|---|---|
| "I'll send..." / "Let me call..." | Tool invocation incoming | Parse subsequent tokens for tool + args |
| "I need clarification..." / "Can you confirm..." | Message to human requesting input | Route full text to human channel |
| "The task is complete." / "Done." | Workflow complete | Terminate loop |
| "I need to escalate..." | Human escalation (e.g., to manager) | Route to escalation channel |

**Benefits**
- The model operates in its strongest domain (natural language) for the highest-stakes decision (what to do next).
- Intent vocabulary is open-ended: the model can express "talk to a manager" without a schema change.
- The first token is where the model places the most probability mass and where sampling has the most impact — moving the routing decision there maximizes reliability.

**Limitations**
- Intent parsing is fuzzy: natural language patterns can be ambiguous or misspelled, requiring fallback logic.
- Hard to enforce guarantees: a schema with `"action": "tool_call"` can be validated structurally; "I'll send an email" requires a classifier that can be wrong.
- The pattern works against structured output APIs that enforce JSON from the first token — these APIs would need to support natural language prefix before structured output begins.

---

## Pattern 7: Dual State Model (Execution State + Business State)

**Problem Solved**
Agent frameworks often conflate execution metadata (retry counts, current step number, next step pointer) with business domain state (user messages, pending approvals, displayed data). This makes it hard to persist and resume workflows: the execution state is framework-specific while the business state is application-specific. Serializing one without the other leads to incomplete recovery.

**Inputs**
- **Execution state**: current step, next step, retry count, loop iteration counter, LLM call history
- **Business state**: conversation messages, data being displayed to the user, pending approvals, domain entities being manipulated

**Outputs**
- A clean separation that allows each state category to be serialized, stored, and loaded independently
- Full workflow recovery by loading both state categories and reconstructing the context window

**Implementation**
```
state = {
  execution: {                    # Framework/infra concerns
    current_step: 3,
    next_step: "deploy_backend",
    retry_count: 0,
    llm_call_count: 7,
  },
  business: {                     # Application concerns
    messages: [...],
    pending_approval: { type: "deploy", target: "backend" },
    display_data: { status: "awaiting_approval", started_at: "..." }
  }
}
```

The context builder reads both state categories and assembles the LLM prompt from whichever subset is relevant to the current decision. The execution state determines *where we are* in the workflow; the business state determines *what we know*.

**Benefits**
- Execution state can be managed by infrastructure tooling (serialization, migration, inspection) independently of business logic.
- Business state can be validated, versioned, and evolved without touching the agent runtime.
- Enables cross-cutting concerns: logging, auditing, and monitoring hook into execution state without coupling to domain data.

**Limitations**
- Two sources of truth mean two things that can get out of sync; the context builder must reconcile them correctly.
- Adds indirection: a developer debugging "why did the agent say that?" must inspect both state layers.
- Framework lock-in risk if the execution state format is not standardized across tooling.

---

## Quick Reference

| # | Pattern | Factor | Core Mechanic |
|---|---|---|---|
| 1 | Tool as JSON Dispatch | 4 | LLM outputs JSON; deterministic switch statement routes it |
| 2 | Agent Loop Ownership | 3, 5 | Own prompt, switch, context builder, and loop as explicit components |
| 3 | Context Window Hygiene | 3 | Clear errors on success; summarize failures; never blind-append |
| 4 | Context Serialization for Pause/Resume | 7 | Serialize context to DB; agent resumes unaware of the pause |
| 5 | Micro-Agent DAG | 10 | Small LLM loops (3-10 steps) as nodes in a deterministic workflow |
| 6 | First-Token Intent Routing | 8 | Route tool vs. human vs. terminate by parsing first NL token |
| 7 | Dual State Model | 6 | Separate execution state from business state for serialization flexibility |

All patterns derived from lines 135-552 of the source transcript. None are speculative.
