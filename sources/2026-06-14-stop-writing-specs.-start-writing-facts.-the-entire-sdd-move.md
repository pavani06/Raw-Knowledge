---
title: "Stop Writing Specs. Start Writing Facts. The Entire SDD Movement Is Already Obsolete."
source: "https://levelup.gitconnected.com/stop-writing-specs-start-writing-facts-the-entire-sdd-movement-is-already-obsolete-9045f7061e26"
author:
  - "[[Jaroslaw Wasowski]]"
published: 2026-05-11
created: 2026-06-14
description: "One test survived Sonnet 3.5, 3.7, 4, and Opus 4.5+. The spec needed four reinterpretations."
tags:
  - "clippings"
---
![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*K0KjAWyrz5ZwuG5LDg-tjw.png)

> *“A theory that explains everything explains nothing.” — Karl Popper, philosopher of science*

Six times over the past months I’ve written on Medium that **Spec-Driven Development is the answer to vibe coding chaos** — today I’m walking back the first part of that sentence, only the first part, and I’ve got data for this movement that you won’t be able to ignore.

If you’re currently rolling out Spec Kit, Kiro, OpenSpec, or BMAD to production and your CI has quietly started chasing Claude model upgrades every few weeks, the problem isn’t on your end — **the fundamental assumption behind these tools is cracking under the weight of** ==**non-deterministic systems**==, and Google Trends shows the movement started declining two months ago, from a peak of 100 in March to 86 in May.

In the next ten minutes you’ll see why one executable test, written in June 2025, has passed CI without modification through Sonnet 3.5, 3.7, 4, and Opus 4.5+ to this day, while a 1,500-word specification describing the same endpoint required four reinterpretations — and how to migrate CI from Spec-Kit-heavy to facts-first in 90 days without losing auditability.

## Quick Win — What Actually Changes Between a Spec and a Fact

==A spec isn’t a contract with the model. It’s== ==**a prediction about the model**====. And models change.==

Every time an LLM reads prose, it’s drawing a sample from a probability distribution of interpretations — **even at temperature 0.0**. Independent research shows variance ranging from a few to over ten accuracy points in deterministic configurations — depending on the model, prompt length, and task. In extreme formatting cases (Sclar et al., 2023) the spread reaches 76 accuracy points, though this applies to extreme format shifts on weaker models, not a typical whitespace change. Your spec — a six-page markdown packed in EARS notation — isn’t a deterministic compiler. It’s prose sampled by the model fresh each time.

A **fact — an executable assertion like** `**expired JWT returns 401**` **— is a deterministic verdict**. It doesn't go through model interpretation. It goes through an exit code. That's the difference between bureaucracy and physics: an office memo requires interpretation by every new intern. The law of gravity doesn't.

After six specials of building ceremony around specifications, I’m in a position where the only artifacts from those projects that still work without modification across all subsequent models are **not the specs — they’re the tests**. The rest of this article explains why that difference is epistemological, not merely operational, and where SDD still wins.

I’ll start with the anatomy of the movement we built over ten months — because without an honest measurement of its scale, the critique is cheap.

![](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*9D-QH0qP9czNWZSgAbs8sQ.png)

SDD interest trajectory in Google Trends: 0→100 in 10 months, decline in the last 2 months.

## Anatomy of a Movement That Jumped from Zero to One Hundred in Ten Months

Google Trends for the phrase `spec driven development` sat at zero for four years. From August 2025 to March 2026 it shot to 100, dropping back to 86 by May 2026. **This isn't the trajectory of a healthy movement — it's a classic "industrialization at peak" curve**, the same shape we saw before the retreat from heavy AOP frameworks and monolithic ESBs.

In that same window, the whole stack emerged: **Spec Kit** from GitHub with around ninety thousand stars (as of Q2 2026), **Kiro** from Amazon with enforced EARS notation, **OpenSpec** with triple-digit star growth in six months, **BMAD** with nearly fifty thousand — collectively, five major SDD frameworks crossed 200,000 GitHub stars. Four tools from Amazon, GitHub, and independent developers, each with its own workflow.

SDD promised four things specifically: **deterministic code generation**, fewer hallucinations, validation before code, intent as a source of truth. My six specials tested each in turn — showed Kiro’s 3-document workflow, EARS notation as an agent contract, the BMAD persona stack, and OpenSpec delta architecture. Today, from every single one of those projects, I use exactly one element — Spec Kit Step 1 as a sketchpad, and nothing else.

**Tooling industrializes at precisely the moment when the fundamental assumption starts to crack** — that’s not a counterargument to my thesis, it’s a signal that I’m seeing it two months before the rest. If you’re deploying Spec Kit as your team standard right now, GT shows you’re adopting technology whose interest halved in sixty days. That doesn’t mean you should drop it immediately — it means you need a Plan B.

The tools themselves aren’t broken. The assumption they stand on is.

## A Spec Is a Prediction About the Model, Not a Contract With the Model

Every LLM reading the same instruction is essentially answering, “What should this sentence statistically mean?” rather than, “What did the author precisely intend?” A spec as an office memo — a disgruntled intern interprets it differently on Monday than on Friday. **Models are giant disgruntled interns, except their mood changes with every API call**.

### The non-determinism mechanism

The mechanism is strictly systemic, not cosmetic. Non-determinism persists **even with temperature set to zero** — independent research documented eighty unique completions across a thousand identical prompts in deterministic mode. The systemic causes are floating-point non-associativity, batch scheduling, and fused-attention kernels — none of which you’ll fix with better prose.

The strongest signal inverts common intuition. In an IBM study on the RAG workflow in the financial domain, ==**a 100B+ model reproduced outputs identically in only 12.5% of runs**====, while 7–8B models were fully consistent.== This is a result for a specific task, not a universal law for all workflows — but the direction is clear: the strategy of “let’s wait until models improve, then specs will work” runs exactly counter to the underlying trend. Separately, Birgitta Böckeler from Thoughtworks noted the same phenomenon, warning that spec-as-source could inherit “the flaws of both MDD and LLMs: inflexibility and non-determinism.”

Cross-format research shows that extreme formatting changes on weaker models can cause accuracy to vary by up to seventy-six points. Newer models are less sensitive — but even a careful change in markdown structure can generate different code. Cross-vendor data is equally uncomfortable: Anthropic models violate their own constitution at the level of a few percent, OpenAI models break it several times more often — and vice versa for each vendor. Specs are vendor-shaped, not universal.

### Intent gap: the distance between intention and code

This isn’t an implementation problem. **Shuvendu K. Lahiri from Microsoft Research called it the *intent gap* — “AI-generated code is plausible by construction but not correct by construction”** — the distance between what the user meant and what the program actually does. Natural language specs are informal and uncheckable — formal specifications are the only scalable verification mechanism. SDD confuses an answer with a statistical approximation of an answer.

Spec drift — the equivalent of schema drift in databases — has stopped being theoretical. Spec Kit shipped the `/speckit.spec-drift` command in May 2026 — a feature that solves a known problem. That's not proof the SDD architecture is cracking, but it confirms that drift is a real operational risk requiring a dedicated tool. Your CI that generates code from a spec today may generate different code from the same spec tomorrow — that's not a bug, it's the mechanism. **A model migration isn't an update — it's a change of interpreter**.

Since prose inherits the model’s non-determinism, what artifact doesn’t?

![A comparison diagram: a single test passing through four Claude model versions without modification, next to the same spec reinterpreted four times by successive models](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*9dyU-SCpmrH4jXKonKwFRQ.png)

A test survives four models unchanged. A spec — four reinterpretations.

## A Fact as an Executable Assertion — What Survives Sampling

A fact is something a machine can check on its own without reading. A test pass/fail. Exit code 0 or non-zero. **No interpretation, no sampling, no mood**. That’s the entire difference.

I keep granularity at three levels: a single test (a specific input/output pair), a property (a universally quantified predicate — “for every sorted list, the result of binary\_search is correct”), and a contract (precondition + postcondition + invariant in the Design by Contract style). Each is an **executable assertion** — a Boolean statement embedded in a test, verified at runtime, passes or fails, never “it depends.”

The public repository defining the facts-first approach demonstrates the mechanism operationally: lifecycle tagging `@draft → @spec → @implemented`, a shell command with exit 0 as a truth condition, and one markdown file that is valid YAML. This isn't a framework — it's discipline embedded in git.

### 57 years of continuity — not a new paradigm

The second, more important observation: **facts-first isn’t a revolution, just an AI-era synthesis of fifty-seven years of scattered work**. Formal methods and property-based testing had separate trajectories — Hoare led to correctness proofs, QuickCheck to randomized property testing — but both reduce to the same intuition: correctness verifiable by machine, not interpreted by one. The Hoare triple `{P} C {Q}` from 1969 (C.A.R. Hoare, CACM) is "the smallest unit of fact about behavior": if condition P holds before C, condition Q holds after. That's a mathematical contract — and that's where this genealogy begins.

Bertrand Meyer added Design by Contract in Eiffel in 1992 — `require`, `ensure`, `invariant` as runtime-enforced. QuickCheck in 2000 added property-based testing. Agent Behavioral Contracts from 2026 are the AI-era continuation: an early academic paper measures five to seven violations detected per session with overhead below ten milliseconds.

The strongest production case I know comes from John Hughes’s work at Quviq: **sixty thousand lines of production Erlang code at a Swedish automotive manufacturer, four hundred and fifty lines of PBT tests, twenty-five bugs detected** — including race conditions inaccessible to example-based testing. A ratio of one to one hundred and thirty-three.

That same executable test passes through Sonnet 3.5 → 3.7 → 4 → Opus 4.5+ without modification: **it doesn’t pass through model interpretation**. It passes through the Python runtime. Models change — facts don’t.

Your first executable assertion tomorrow morning: take one invariant that’s existed only in a spec (`endpoint /auth/refresh returns 401 for expired tokens`), write one test, and add it to CI. That's a fact. **Start with one**.

This doesn’t invalidate all SDD use cases. There’s exactly one boundary where ceremony is the product, not the cost.

![A fact lifecycle diagram in av/facts (draft → spec → implemented) with a 57-year timeline of formal methods below.](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*Q7JBzOXZYX4-BYxKW14Nmg.png)

Fact lifecycle: from draft to verified-by-command. Plus 57 years of the proving ground this model stands on.

## Where Ceremony Is the Product — Honest Scope of SDD

Marc Brooker from AWS published the strongest defense of SDD I know in April 2026: **“specifications are making explicit, versioned, living artifacts” — in iterative SDD, not waterfall**. I’ll say it plainly: that defense is stronger than most critics suggest. SDD isn’t a mistake — it’s a tool whose domain of application is narrower than its advocates promised.

Three domains where SDD wins clearly:

- **Compliance and regulations** — here a spec isn’t documentation; it’s legal evidence. DO-178C requires bidirectional traceability. ISO 26262 ASIL C/D strongly recommends formal/semi-formal modeling. The European AI Act imposes penalties up to fifteen million euros or three percent of global turnover. In these domains ceremony IS the product — without it there’s no certification.
- **Cross-team B2B integration** — when five hundred engineers work across twenty teams, coordination costs more than implementation. OpenAPI ships on Stripe’s GitHub as a contract with partners. Boost Insurance reported an 80% increase in service stability after adopting Pact (Consumer-Driven Contracts). An executable assertion can’t replace shared understanding of business intent between a PM and a developer.
- **Onboarding and knowledge transfer** — new team members read specs, not tests. Tests without prose are machine-readable. Markdown explains the *why*.

It all comes down to one operational test: **is the artifact read by a human outside the team — an auditor, a partner, a new hire?** Yes → it stays as SDD. No → it goes into the fact-set. Look at your repo, mark the files that someone other than your CI actually reads. Those are your SDD-zone. The rest is your migration target.

Now you know what to keep as a spec. The next section shows what to do with the rest.

![A decision tree showing when to keep Spec-Driven Development (compliance, B2B, onboarding) and when to migrate to facts-first.](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*TPkigAAFdPx7cwXXVY91Cw.png)

Spec or Fact: one decision, three domains, one migration.

## Ninety Days of Migration — Audit, Pivot, Gate

The first month you remove nothing. **The second month you write tests instead of prose. The third month you add a CI gate**. Three phases of thirty days each, every one with an independent ROI signal — you don’t have to believe in the whole thing to start Phase 1.

### Phase 1 — Audit (Days 1–30)

Take inventory of existing specs and divide them into **three piles**. First: those read post-merge by people outside the team — they stay; that’s your SDD-zone from the previous section. Second: dead documents nobody’s opened since the commit — deprecation candidates. Third: so-called *implicit invariants* in production — the top ten high-risk endpoints (auth, payment, data federation) where a rule exists only as a prose declaration.

Here you use an agent in retrofitting mode to reverse-engineer actual runtime invariants from source code. Deliverable: a list of `@draft` facts plus a list of deprecation candidates.

### Phase 2 — Pivot (Days 31–60)

You convert boundary specs into facts. Every API contract → Pact test. Every property/invariant → Hypothesis or QuickCheck. Every data model invariant → runtime assertion. **Invert the testing pyramid**: fewer unit tests, more contract/integration tests.

On new features, run in parallel — spec and facts live together for thirty days, giving A/B confidence. Deliverable: top-10 invariants pushed from `@spec` to `@implemented`, each verifiable by command.

### Phase 3 — Gate (Days 61–90)

`facts check` becomes a required CI step blocking the merge. New features require a failing fact before implementation — TDD rhythm in a new skin. Deprecate prose specs outside compliance/onboarding (per the principle from the previous section).

Deliverable: facts-first CI gate active, audit-only specs preserved, brownfield code passing through facts, not prose.

A practical observation: practitioners report hitting Pro plan limits under intensive SDD tooling workflows (most clearly documented with OpenSpec, but the pattern extends across the whole class). `facts check` verifies an entire repo using fewer tokens than reading the spec aloud. **Migration doesn't just reduce cognitive overhead — it also cuts the bill**.

Start with one fact. Genuinely one. One production invariant tomorrow morning.

![A 90-day migration infographic from Spec Kit to facts-first: three phases of 30 days each with concrete deliverables.](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*woO6dxbFpzFHYFs-hSVwOA.png)

90 days: 30 audit + 30 pivot + 30 gate. Each phase delivers an independent ROI signal.

## Synthesis — Six Conclusions That Stand

SDD won the tooling war: roughly ninety thousand stars on Spec Kit, triple-digit OpenSpec growth in half a year, two hundred thousand stars in the ecosystem. **It’s losing the epistemological war** — non-determinism, intent gap, spec drift aren’t bugs to fix; they’re the mechanism. Facts-first isn’t a new paradigm — it’s an AI-era synthesis of fifty-seven years of scattered work: Hoare → Meyer → QuickCheck → Agent Behavioral Contracts.

One methodological caveat: these conclusions come from my six projects, not from a controlled study with a comparison group. I maintain that distance, and you should too. Independent convergence with Birgitta Böckeler (Thoughtworks) and Marc Brooker (AWS) — from two opposing starting positions — strengthens the direction, but doesn’t prove it.

Four concrete takeaways from this article:

- **A spec is a prediction about the model, not a contract with the model**. Prose is sampled by an LLM at every call — even at temperature zero.
- **A fact = an executable invariant tested by a machine**. It survives a model upgrade because it doesn’t pass through model interpretation.
- **SDD wins where an auditor, partner, or new hire reads the artifact**. Everywhere else it loses.
- **Ninety days to migration**: Phase 1 audit → Phase 2 pivot → Phase 3 gate. Each phase delivers an independent ROI signal — you don’t have to believe in the whole thing to start.

![A summary infographic: the world of prose specifications (with four diverging model interpretations) vs. the world of facts (one test passing through four models unchanged); five migration steps along the central axis.](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*tDJHnDihWWnyOPFzIdLQ0g.png)

Specs are sampled. Facts are verified. Five steps from one to the other.

## Closing

**PRDs are going away. Specs are leaving the inner loop. Facts survive everywhere.** In compliance, B2B, and onboarding they’re not going anywhere — ceremony remains the product there. Everywhere else: publish your first fact-set — one invariant, one test, one exit code 0.

*Thanks for making it this far — I wrote about this movement as an advocate; today I’m writing as an architect who’s drawn his conclusions. If this piece changed how you think about specs, share it with someone who’s rolling out Spec Kit to production right now. Disagree? Write me in the comments about where my thesis breaks. I’m looking for cases where a prose spec survives a model upgrade more cleanly than a test.*