---
title: "Agent Evals"
type: concept
aliases: ["agent evals", "agentic evaluation", "evaluation framework", "evals", "eval suite"]
tags: [ai, agents, llm, evals, testing, quality]
source_count: 9
last_updated: 2026-08-31
parent: []
part-of: ["[[concepts/harness-engineering]]"]
defines: ["[[concepts/eval-driven-development]]", "[[concepts/eval-iterate-cycle]]", "[[concepts/deterministic-checks]]", "[[concepts/trajectory-evaluation]]", "[[concepts/failure-taxonomy]]", "[[concepts/continuous-evaluation]]", "[[concepts/long-session-evals]]", "[[concepts/behavioral-evaluation]]", "[[concepts/eval-coverage-matrix]]", "[[concepts/production-to-offline-feedback-loop]]", "[[concepts/perceived-eval]]"]
relates-to: ["[[concepts/llm-as-judge]]", "[[concepts/golden-dataset]]", "[[concepts/verification-loop]]", "[[concepts/reading-traces]]", "[[concepts/tracing-observability]]", "[[concepts/data-flywheel]]", "[[concepts/rag-evaluation]]", "[[concepts/reward-hacking]]", "[[concepts/generator-evaluator-pattern]]", "[[concepts/context-window-management]]", "[[concepts/deflection-rate]]", "[[concepts/evaluation-pipeline]]", "[[concepts/simulations]]", "[[concepts/continual-learning]]", "[[concepts/quality-over-coverage]]", "[[entities/taobench]]", "[[entities/langsmith]]"]
contradicts: []
supports: ["[[concepts/agent-harness]]"]
extends: []
sources: ["[[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]", "[[sources/2026-06-09-eval-driven-development-missing-discipline]]", "[[sources/2026-06-09-eval-driven-development-rag-support-assistant]]", "[[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]", "[[sources/2026-06-09-how-we-solved-context-management-in-agents]]", "[[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]", "[[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]", "[[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]", "[[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]"]
---

# Agent Evals

The systematic evaluation framework for agentic applications — the discipline of measuring
whether an agent is actually doing a good job, at scale, without relying on human vibe-checking.
Evals are the bridge between "it seems to work" and "we can ship this."

Agents make evaluation harder than a simple LLM call because they involve multi-step reasoning,
tool use, and non-deterministic paths. A single wrong tool call early in a chain can cascade
into a completely wrong final answer — and the final answer may still look plausible.

The three tiers of evals, in order of cost and power:

1. **Code evals** — deterministic, cheap, fast. Check format, presence of expected strings,
   structural properties. Write these first.
2. **Built-in LLM evals** — pre-built rubrics from the eval platform (e.g. [[entities/arize-phoenix]]).
3. **Custom LLM-as-judge** — a separate LLM grades semantic quality against a written rubric.
   See [[concepts/llm-as-judge]].

## Key Insights

- **Read traces before writing evals** — 15 minutes of reading real outputs beats hours of
  blind prompt-fiddling; categorize what went wrong first, then decide what to measure
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Impact hierarchy**: data quality > prompting > model selection > hyperparameter tuning.
  Fix the data first; no amount of prompt engineering compensates for stale or wrong data
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Guardrails vs. North Star metrics** — some evals are ship-blockers (hallucinated stock
  price = hard fail); others are informative nice-to-haves. Know which is which before
  shipping ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Capability evals vs. regression evals** — capability evals measure a hill to climb
  (agent is currently failing); regression evals lock in what's already working. Create
  capability evals first; graduate them to regression evals as you pass them
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Sample size math**: 200 samples at 3% defect rate → 95% CI of 0.6–5.4%; 400 samples
  → 1.3–4.7%. Doubling samples halves the confidence interval but doubles cost
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Evals are infrastructure** — treat them like code: version prompts, store them, know
  what they did five versions ago. An unvalidated eval is "a fancy way of being wrong at
  scale" ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Non-technical stakeholders write better evals** — product managers and customer success
  reps know what "good" means for the domain; involve them in writing rubrics
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).
- **Model adoption advantage** — a comprehensive regression suite tells you within minutes
  whether a new model drop makes your agent better or worse
  ([[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications]]).

> [!inference] Evals are the [[concepts/harness-engineering]] discipline applied to quality
> measurement: the same "humans steer, agents execute" logic applies — humans define what
> good looks like (rubrics, golden datasets), agents execute the measurement at scale.

### From the EDD articles (Masood / Ramchandani)

- **The three tiers, restated as the "greater stack taxonomy"** — both EDD articles independently
  arrive at the same layering: [[concepts/deterministic-checks|deterministic code checks]] →
  rubric/[[concepts/llm-as-judge|judge]] scoring → human calibration. Each layer catches a
  different failure class; over-delegating to the judge makes the system slow and untrustworthy
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).
- **Agent evals grade the trajectory, not just the output** — the key difference from chatbot
  evals; see [[concepts/trajectory-evaluation]]. OpenAI and Anthropic both define agent evals as
  prompt → captured run (trace + artifacts) → checks → comparable score
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **A taxonomy of eval dimensions** — scope (skill / workflow / system), artifact (final answer
  vs. [[concepts/trajectory-evaluation|trace]]), grader (deterministic / rubric / calibrated),
  data ([[concepts/golden-dataset|synthetic / production / curated]]), behavior
  (outcome/process/style/efficiency), and benchmark (external sanity check only)
  ([[sources/2026-06-09-eval-driven-development-missing-discipline]]).
- **Evals as a release discipline** — expected behavior encoded as eval data, every run leaves a
  [[concepts/tracing-observability|trace]], failures categorized into engineering causes (see
  [[concepts/failure-taxonomy]]), changes shipped only via [[concepts/release-gates|gates]]
  ([[sources/2026-06-09-eval-driven-development-rag-support-assistant]]).

### From More Context Makes Your Agent Dumber (Nupur Sharma, Qodo)

- **Vanity metrics** — metrics that look great on dashboards but mean nothing in the real
  world. Agent metrics must tie to user satisfaction and business outcomes, not just accuracy
  and precision — which can be deceiving ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Multi-layered evaluation** — unit tests for the agent → integration tests for the full
  workflow → an evaluator agent on top that grades both the result (against metrics) and
  the *process* (did the agent follow instructions? hallucinate? use the right tools?)
  ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Multi-agent evaluation > single evaluator** — a security agent evaluated by another
  agent expert in security yields better results than a generic evaluator; this is the
  [[concepts/generator-evaluator-pattern|adversarial separation]] principle applied to
  evaluation ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).
- **Feedback loop** — implement → evaluate → if below threshold, go back and change. The
  same [[concepts/eval-iterate-cycle|eval-iterate cycle]] described in prior sources,
  restated from a practitioner's debugging perspective ([[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou]]).

> [!inference] Nupur's "vanity metrics" warning sharpens a gap in the existing eval
> framework: the current ontology covers *how* to measure (three-tier stack, trajectory
> grading, LLM-as-judge) but not *what* to measure. The distinction between metrics that
> look good and metrics that matter is a specification problem — it connects back to
> [[concepts/non-functional-requirements|non-functional requirements]] and the human's role
> in defining what "good" means.

### From Context Management in Agents (Sally-Ann Delucia, Arize)

- **[[concepts/long-session-evals|Long-session evals]] expose late failures** — Arize loads ten turns and tests the eleventh to make context degradation measurable before users report it ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Evals stand in for context-quality metrics** — Arize does not yet have a principled context budget or clear context-quality metric, so eval performance is the practical signal for whether context selection is working ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).
- **Memory and evaluation co-evolve** — as [[entities/alex|Alex]] adds long-term memory, its eval suite must catch whether longer sessions and cross-session references preserve useful context rather than accumulating noise ([[sources/2026-06-09-how-we-solved-context-management-in-agents]]).

> [!inference] This source turns context management into an eval target. Prior eval sources focused on output quality, traces, and release gates; Arize's long-session setup makes *context degradation over conversation length* a first-class behavior to measure.

### From The Best AI Agents Are Simpler Than You Think (Zack Reno Wedeen, Sierra)

- **Evals get more robust with model switching** — when you switch an agent from OpenAI to Anthropic, "you'll learn the first time that your eval wasn't quite as good as you thought." Model switching acts as a stress test that exposes eval gaps ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Customer-facing evals are more complex than internal evals** — internal Agent OS eval is standard applied-AI work; customer-facing eval must handle voice noise, adversarial users, 20+ personas, and high-dimensional conversation paths. This led to the [[concepts/simulations|simulations]] product ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Monitors as always-on evaluators** — monitors run on every conversation, flagging issues for review. They "narrow the set of 'I don't have to wake up every morning and try to read 10,000 conversations. I can read five.'" The solution to AI problems is more AI: 90% accurate detection + 90% accurate verification → three-to-four nines of reliability ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Simulations prevent regression** — workspace → Ghostwriter proposes changes → simulations test against all assumptions (voice, chat, languages, personas) → human reviews → ship. This prevents changes from breaking existing agent behavior ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).
- **Benchmarks evaluate providers, not agents** — [[entities/taobench|TaoBench]] and MuBench are used internally to evaluate model providers; simulations evaluate specific customer agents. Benchmarks are too general for customer-specific quality measurement ([[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think]]).

> [!inference] Sierra's monitors + simulations architecture maps onto the three-tier eval stack: monitors = [[concepts/deterministic-checks|deterministic checks]] (always-on, per-conversation); simulations = [[concepts/llm-as-judge|LLM-as-judge]] at scale (multi-persona, multi-language); and the human review step = [[concepts/golden-dataset|golden dataset]] calibration. The difference is the domain: coding-agent evals vs. conversation-agent evals.

### From the Databricks Production Playbook (Bhaumik)

- **3-layer evaluation architecture** — deterministic checks (regex, classic ML for NER/intent
  classification, PII detection) → semantic/LLM-as-judge (groundedness, safety, relevance) →
  [[concepts/behavioral-evaluation|behavioral]] (tool call correctness, duplicate API calls,
  loop detection). The behavioral layer is "very, very important" and most organizations miss
  it ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Define success in business numbers, not technical metrics** — accuracy, latency, and
  groundedness are inputs; the business goal (e.g., 60% deflection of simple queries from
  human agents, 85% accuracy target) is the output. See [[concepts/deflection-rate]]
  ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **Eval infrastructure before model selection** — the retail banking case study built the
  evaluation pipeline in weeks 1-2 (200 real cases, success metrics, automated pipeline) and
  selected the model in week 7 of an 8-week POC. The eval dataset enabled rapid, data-driven
  model comparison ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).
- **The automated eval pipeline** — capture user question + AI response → compare against eval
  dataset → rate → if below threshold, human review → fix → add test case to dataset. See
  [[concepts/evaluation-pipeline]] ([[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]]).

### From GTM AI Agents at Snowflake (Sait Izmit)

- **Scope is an eval decision** — the 150-question test written from the sales process *before* the agent had the data (first run: 50% accuracy) forced the [[concepts/quality-over-coverage]] cut: answer 50 questions at 95%, not 100 at 70% ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).
- **Eval infrastructure arrived post-launch** — CI/CD and the eval stack (unit tests, routing tests) were built only after shipping to 6,000 users, when nine pages of agent instructions versioned in a Google Doc stopped scaling ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).
- **Question logs as demand-side evaluation** — LLM classification of 1.2M user questions into a topic taxonomy gives real-time feature-gap and quality signals; see [[concepts/log-taxonomy]] ([[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users]]).

> [!contradiction] Contradicts [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc]] and [[sources/2026-06-09-eval-driven-development-missing-discipline]]
> Both sequence eval infrastructure *before* launch (Databricks: eval pipeline in weeks 1–2, model selection in week 7; EDD: write the eval before the feature). Snowflake launched to 6,000 users with instructions in a Google Doc and built the eval/CI-CD stack only when scale forced it — while still exiting beta at >70% weekly retention. Reconcilable — the pre-launch 150-question test served as the initial [[concepts/golden-dataset|golden dataset]] — but the sequencing doctrine genuinely differs. Unresolved as of 2026-08-30.

### From Inside Clay's Eval Stack (LangChain channel)

- **Scale makes evals non-negotiable** — [[entities/claggent|Claggent]] at 300M+ runs/month and [[entities/sculptor|Sculptor]] at 100k+ messages/week are both "past that threshold of where we could actually look at every trace or talk to every customer" ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **A good eval suite enables agentic development** — with trustworthy evals, you can let Claude Code / Codex / Devin-class coding agents make prompt changes for you, "and you know that you're not shipping anything that is going to ruin production" ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **Multi-level evals, developer-shaped** — local evals are a cheap, fast CLI suite (no sandbox, no VFS); CI/staging runs the same harness as close to the production configuration as possible; every run is persisted and versioned in [[entities/langsmith|LangSmith]] even when executed locally; new product areas plug in their own evaluators (their own LLM judges) into a shared harness ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).
- **Coverage as a matrix** — Clay reasons about eval coverage on a deterministic↔non-deterministic × offline↔online grid with "a few things in each box"; see [[concepts/eval-coverage-matrix]], [[concepts/perceived-eval]], and the [[concepts/production-to-offline-feedback-loop|production-to-offline feedback loop]] Clay calls the hardest part ([[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel]]).

> [!inference] Clay's contribution to this page is the *where* axis: the three-tier stack
> (and the greater stack taxonomy) says how to grade; the coverage matrix crosses grader
> type with offline/online placement, folding [[concepts/continuous-evaluation]] into the
> same grid as unit-level checks. Their eval suite is also the stated precondition for
> letting coding agents modify prompts — [[concepts/eval-driven-development]] becoming
> [[concepts/closed-loop-evaluation|closed-loop]].

## Sources

- [[sources/2026-06-07-ship-real-agents-hands-on-evals-for-agentic-applications|Ship Real Agents: Hands-On Evals for Agentic Applications]] — Laurie Voss (Arize) full workshop on the three-tier eval framework, impact hierarchy, and eval-iterate cycle
- [[sources/2026-06-09-eval-driven-development-missing-discipline|Eval-Driven Development — The Missing Discipline in the Agentic AI Lifecycle]] — the greater stack taxonomy; trajectory grading; the multi-dimension eval taxonomy
- [[sources/2026-06-09-eval-driven-development-rag-support-assistant|Eval-Driven Development for AI Apps: RAG Support Assistant]] — layered eval stack on a concrete RAG system; evals as a release discipline
- [[sources/2026-06-09-why-more-context-makes-your-agent-dumber-and-what-to-do-abou|Why More Context Makes Your Agent Dumber]] — Nupur Sharma on vanity metrics, multi-layered evaluation, evaluator agent, and the feedback loop
- [[sources/2026-06-09-how-we-solved-context-management-in-agents|How we solved Context Management in Agents]] — Sally-Ann Delucia (Arize) on long-session evals and evals as the practical signal for context quality
- [[sources/2026-06-25-the-best-ai-agents-are-simpler-than-you-think|The best AI agents are simpler than you think]] — Zack Reno Wedeen on Sierra's [[concepts/simulations|simulations]] product (multi-persona, multi-language, adversarial evals) and monitors (always-on evaluators flagging conversations for review)
- [[sources/2026-06-25-the-production-ai-playbook-deploying-agents-at-enterprise-sc|The Production AI Playbook: Deploying Agents at Enterprise Scale]] — Sandipan Bhaumik (Databricks) on the 3-layer eval architecture, defining success in business numbers, building eval infrastructure before model selection, and the automated eval pipeline
- [[sources/2026-08-30-gtm-ai-agents-lessons-from-deploying-to-6000-users|GTM AI Agents: Lessons from Deploying to 6,000 Users]] — Sait Izmit (Snowflake) on quality-over-coverage scoping, post-launch eval infrastructure, and log-classification demand radar
- [[sources/2026-08-31-inside-clay-s-eval-stack-300m-agent-runs-one-langsmith-pipel|Inside Clay's Eval Stack: 300M Agent Runs, One LangSmith Pipeline]] — multi-level CLI-to-prod eval suite on LangSmith; the eval coverage matrix; scale (300M runs/month) as the forcing function; evals as the precondition for agentic development
