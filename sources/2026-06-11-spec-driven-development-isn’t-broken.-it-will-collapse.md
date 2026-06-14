---
title: "Spec-Driven Development Isn’t Broken. It will collapse."
source: "https://medium.com/activated-thinker/spec-driven-development-isnt-broken-it-will-collapse-c00609f72496"
author:
  - "[[Kapil Viren Ahuja]]"
published: 2026-05-03
created: 2026-06-11
description: "You're reading via Kapil Viren Ahuja's Friend Link. Upgrade to access the best of Medium."
tags:
  - "clippings"
---
*Vibe coding has already collapsed. Spec will collapse next. What rises from the fusion is three layers and four crafts.*

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*MJ7Z0gciPBHyHMy4d-Aotw.png)

[If you do not have access to Medium, use this link.](https://howtoarchitect.io/c00609f72496?sk=2da01d7d2abfb5bc0acaed7050a0e797)

Also read articles in the same series:

- [https://medium.com/activated-thinker/the-method-that-replaces-spec-driven-development-idsd-66e921f6cdf7](https://medium.com/activated-thinker/the-method-that-replaces-spec-driven-development-idsd-66e921f6cdf7)
- [https://medium.com/activated-thinker/the-anatomy-of-intent-ice-in-idsd-built-from-where-spec-driven-breaks-1597e5a16659](https://medium.com/activated-thinker/the-anatomy-of-intent-ice-in-idsd-built-from-where-spec-driven-breaks-1597e5a16659)

Three months last quarter, I spent building the core agent group for Phoenix — my own architecture, my own codebase, my own rules — using a spec-driven framework. I wrote specs. I covered every case I could think of. I built what the specs said to build.

I ended up with something completely wrong. The code matched the specs. The agent's behaviors matched the acceptance criteria. It was still the wrong thing.

I tried again with spec-kit. Different codebase, same discipline, same ending. Then, mid-build, I moved the deployment target from Vercel to GCP. A reasonable change. Spec-kit blew the entire specification apart — every downstream task inheriting assumptions that no longer held. The structure couldn’t survive a single upstream pivot.

That’s the one that broke me. Spec-driven was supposed to solve exactly this. The bullshit of handcrafting rules for AI, arriving on my own machine, in my own codebase, with my own system. I’d burned three months pretending the methodology was working.

That’s when Ira walked into my office.

A validation error in the checkout flow. Small bug. Something Ira could have fixed in five minutes with a text editor open and the file in front of her. But we now had a methodology, so she did it the methodology’s way.

==Opened the spec. Updated it. Fed it to the agent. Watched it run. Checked the output. Re-ran because the first pass missed an edge case. An hour in, tokens still burning, she fired the agent and walked away.==

I told her to skip the methodology. Just talk to the agent like you would a senior engineer. She did. The bug was fixed in fifteen minutes.

Then we opened the pull request. The commit message didn’t follow our convention. The PR didn’t follow our template. The change wasn’t linked to the issue. The audit trail was gone.

So Zia came at it from the other direction. She vibed ten defects in the same time it had taken Ira to get one through the methodology. Ten bugs, ten patches, ten PRs, fast. Then the inconsistencies showed. Each of the ten had been written against a slightly different interpretation of the same underlying behavior. Three contradicted each other outright. Reviewers spent longer unwinding contradictions than they’d have spent on ten compliant PRs.

> Both ways, the PRs got rejected. Both ways, we were stuck.

Spec-driven was too heavy — burned tokens on the ceremony. Vibe was too loose — burned time on reconciliation. Different evils, same underlying failure: both approaches were treating one layer as if it were three.

Then Anya walked in, the way she does when she’s about to connect two things nobody else has linked, and said it plainly: *“There is intent here. You’re both missing it.”*

The four of us spent the weeks that followed building out what that meant. Four points of view. Four tensions. A pattern we couldn’t quite name.

Then I watched Nate B. Jones’s 2026 explainer arguing *“prompting has split into four skills”* — Context, Intent, Specification, Prompt. Everyone matched a tension one of us had brought into the room. And once they had names, something else clicked: the four crafts mapped cleanly onto **P-CAM** — Perception, Cognition, Agency, Manifestation — the architecture I’d been using for a year to describe how any intent-driven system works, whether agentic engineering or consumer AI. The foundation underneath both wasn’t two separate foundations. It was one. The Four Crafts proved it.

That’s the moment the fusion went from a local team discovery to a methodology with a spine.

This article is about what that incompleteness on either side actually means — and why every team I’ve watched adopt spec or vibe is going to hit the same wall we did.

## The industry’s fight is the wrong fight

For the last eight months, the argument has been spec versus vibe. Structure versus flow. Waterfall versus emergence. The two camps are not small.

### In one corner: spec-driven development.

AWS’s Kiro pulled 250,000 developers in three months. GitHub’s spec-kit crossed 16,000 stars in its first week. Tessl quietly raised and launched a private beta. ThoughtWorks called SDD “2025’s *key new engineering practice”* in their Medium post and placed it in the “Assess” ring of their Technology Radar. The pitch: AI is non-deterministic — tame it with structure. Turn feature requests into specs, specs into tasks, tasks into code. Structure as a moat against hallucination.

### In the other corner: vibe coding.

Cursor is at $2 billion in annualized revenue, valued at $50 billion as of April 2026, used by roughly 70% of the Fortune 1000, growing faster than any SaaS company in history, with revenue doubling every two months. Lovable closed a $330M Series B at a $6.6 billion valuation. Replit grew from $10M to $100M ARR in nine months after launching Agent mode. Google acquired Windsurf for $2.4 billion. Andrej Karpathy coined the term in February 2025, and it won Collins Dictionary’s Word of the Year. The pitch: stop writing specs. Stop structuring. Stop pretending you know what you want before you see it. Just talk to the model. Accept everything. Forget the code exists.

Two camps. Tens of billions of dollars of venture capital. Millions of developers on the Vibe side. Hundreds of thousands on the spec side. Both confident. Both are visibly working for a slice of users.

> And both wrong — in the same fucking way.

==Andrej Karpathy himself has said vibe coding is now== ==*“passé”*== ==— the inventor of the term admitting the paradigm doesn’t hold.== Martin Fowler called Kiro-style SDD *“like using a sledgehammer to crack a nut”* when it inflated a one-line bug fix into sixteen acceptance criteria. ThoughtWorks, for all that “Assess” positioning, paired it with a warning underneath: handcrafting detailed rules for AI ultimately doesn’t scale — the “bitter lesson” of AI, returning with fresh clothes.

> Every one of these critiques lands. None of them goes far enough.

The waterfall framing misses the real failure. SDD doesn’t fail because it’s waterfall. Vibe coding doesn’t fail because it’s ungoverned. Both fail for the same underlying reason: neither side understands that what they’re doing operates across three different layers jammed into one. They just compress the three layers differently. SDD over-specifies everything as spec. Vibe refuses to specify anything.

SDD: intent is buried inside spec. Spec is buried inside spec. Implementation is pre-locked inside the spec. Everything is spec. Nothing is separable.

Vibe: There is no spec. Intent is implicit in whatever you said last. Implementation is whatever the model generated this minute. The model resolves all three layers in real time, with no memory, no contract, and no audit trail.

Different compressions. Same structural root.

The methodology itself is not well-explained. On either side. Either the spec absorbs everything, or nothing absorbs anything. Either way, the contract property that should hold the whole thing together is destroyed. The document — or the absence of a document — that was supposed to verify delivery can’t.

Every standard critique of SDD, and every standard critique of vibe, traces back to the same thing. Not two sets of failures. One failure, surfacing on both sides of the debate. The three-layer collapse.

## What “the spec” is actually hiding

Start on the consumer side. It’s easier to see there.

A user says: *“I want red shoes between ₹3,000 and ₹5,000, and they need to last eight hours on my feet without hurting my soles.”*

That sentence contains three things most spec documents jam together and lose:

**The intent.** What the user wants, under what constraints, with what success and failure conditions. Red shoes. ₹3,000–5,000. Eight hours, no sole pain. If no red shoe is available, does the system recommend alternatives or fail silently? That branch is intent. Not spec. Not implementation. Intent.

**The specification.** Given that intent, what must be testable? That a page renders with a red shoe. That price filters correctly across the ₹3,000–5,000 band. That is when no red shoes are stocked; the recommendation engine fires based on a documented criterion. That sole-comfort metadata survives from the product page to checkout. Each of these is an evaluation. Each can be written as a pass/fail test. That’s what makes it a contract.

**The implementation.** Which architecture delivers it? Microservice or monolith? In-process cache or distributed? This answer isn’t in the user’s sentence. It can’t be. Because the architecture depends on a fact that the user never said: how many concurrent users? If the intent is to have a million people coming in together, the architecture and implementation will be very different from those of a startup with just ten people. People put all of that into the spec. That’s not really a contract, and that’s where the failure happens.

Two levels of intent actually get tracked in a real system. **Consumer intents** — “find me red shoes, ₹3,000–5,000, eight hours comfort” — become epics in the organization. **Engineering intents** — “commit this code, grouped by concern, following conventional commit format, halting when an issue can’t be mapped” — become plays. Both kinds of intent obey the same three-layer schematic. Both need specs underneath them. Both need implementation decisions made by the system, not authored by the user.

When a team writes SDD’s single “spec document,” they typically produce something like:

> *“Build a microservice to search red shoes for users in ₹3,000–5,000 range.”*

The intent is buried (what were the success and failure conditions?). The spec is gone (how do we test this?). The implementation is pre-locked (microservice — based on what scale assumption?). The document is technically correct and methodologically useless. And it only gets worse as the feature grows, because there’s no principled separation between what changes when user needs change, when architecture changes, and when test criteria change.

There’s a reference point the industry should sit with before defending SDD. OpenAI published the specification for Symphony — their multi-agent orchestration system — and it runs to roughly 1,400 lines. End-to-end. Every agent role, every handoff, every failure condition, every constraint on what each component can and cannot do. It is the level of fidelity that SDD actually requires to work.

Nobody writes that. Not your team. Not mine. Not the 250,000 developers who adopted Kiro. The implicit assumption underneath every SDD framework is that you can produce a spec complete enough to drive deterministic agent behavior. Symphony proves what “complete enough” actually means. It means 1,400 lines of exhaustive coverage — authored before a single line runs, held intact across the entire build, updated with the same discipline as the code itself.

That fidelity no longer exists in the industry. It probably never did outside of a handful of organizations with the engineering resources to maintain it.

Here’s the uncomfortable inversion: if you *can* write at Symphony-grade fidelity before touching the agent — if your team can produce 1,400 lines of complete, testable, constraint-locked specification from scratch — you’re not doing SDD. You’re at Level 4. The spec itself has become the system. You’ve accidentally built the thing SDD was trying to approximate. Congratulations. You might be the only team on the planet that has.

Everyone else is producing “Build a microservice to search for red shoes.” The gap between those two documents is where the methodology collapses.

This is what was pushing Ira off the cliff. One document. Three concerns. Zero separation — and not even close to the depth the system actually needed.

## The three-layer schematic

==Separate the three, and the methodology becomes an engineering discipline instead of a documentation exercise.==

**Intent is authored by the user.** Goal, constraints, success conditions, failure conditions, and — critically — the scale and quality expectations the rest of the system will derive architecture from. *“One million concurrent shoppers”* is intent, not spec. *“Must recover within thirty seconds of an availability-zone failure”* is intent, not spec. Non-functional requirements don’t belong in the spec. They belong in the intent, because they drive architecture decisions the spec never makes.

**Spec is the evaluable contract.** The litmus test: ==can you write a spec that can be converted into an eval that will validate that this has been delivered?== If not, it isn’t spec. It’s either intent disguised as spec or noise disguised as spec. A real spec is test-shaped. It passes or fails. It doesn’t describe; it verifies.

**Implementation — the architectural layer — belongs to the system.** Not to the user. Not to the spec document. This is the line the industry keeps crossing. The user should not be writing *“use a microservice architecture”* in the spec. The user doesn’t know. The system knows — or should know, if it has an empirical memory of what architectures have worked under what constraints. Microservice versus monolith is a system decision: it depends on scale (intent), on industry history (empirical memory), on the team’s existing stack, and on risk tolerance. Push it back up into the spec and you’ve destroyed the separability that makes the whole system evolvable.

The rule I keep coming back to: the decision has to stay within the system. The user should not put that into the spec.

This splits the work cleanly. The user authors intent and spec. The system owns implementation decisions. And the fusion of the two — what happened when Ira’s vibe instinct met Zia’s engineering discipline, two personalities infused into what the intent layer becomes — is where methodology becomes the product. Ira’s rigor on constraints and failure conditions. Zia’s urgency on getting the thing built and shipped. Intent is where both personalities land.

We haven’t earned that yet in this article. First, the crafts.

## The Four Crafts

Quick note on provenance. The vocabulary below — Intent, Spec, Context, Prompt — comes from **Nate B. Jones’s** 2026 framing *“prompting has split into four skills.”* He named what we’d already started calling four different things. The reorganization — which crafts sit with the human, which sit with the system, how both sides map onto the three-layer schematic above, and how all four map onto P-CAM underneath — is mine. I’m standing on the shoulders.

What’s mine is not the inventory. It’s the split: **which crafts sit with the human, which sit with the system, and how both sides map onto the three-layer schematic above.**

==**The crafts the human performs**==**:**

### Intent Crafting.

The discipline of expressing what you want with enough structure that a machine can reason about it. Not a one-liner. Not a user story. A complex schema of constraints, successes, and failure conditions. Most of the industry still treats intent as a tagline. *“User wants to buy shoes”* is not the intent. It’s a headline for intent. Intent is the full schema underneath the headline.

### Spec Crafting.

The discipline of writing the test. Every claim in the spec must be convertible to an evaluation. If it can’t be tested, it doesn’t belong. Half the industry’s spec documents would fail on contact — they describe behaviors in prose that could be interpreted a dozen ways. Spec crafting demands a tighter contract than prose.

### Context Crafting.

The decision layer is backed by empirical memory. Given this intent, under these constraints, with this organizational history — which architecture, which patterns, which tools? The system answers. If it has a knowledge base. If it doesn’t — if every greenfield project starts from scratch with no memory — context crafting becomes architect guesswork, and you’re right back to pre-locking decisions at the top of the methodology that should have been reasoned live. The knowledge base is the differentiator. It’s the asset that takes context crafting out of the realm of architectural intuition and into repeatable engineering.

### Prompt Crafting.

The execution layer. In the system I’m building, prompt crafting looks like plays and playbooks: structured, reusable, intent-encoded interaction patterns that give the system determinism. Zia — the builder on the team who’d push anything into production if the planning meeting ran too long — is the reason plays exist the way they do. The methodology has to meet the builder's urgency. Plays are how it does.

But plays are scaffolding, not a destination. In a truly intent-driven model, there won’t be a playbook. An intent is going to get resolved based on the intent definition itself, the description, and the key constraints. The model will figure out how to proceed and build it. We believe people and models aren’t there yet, so they really can’t do that piece yet. Hence, we precompile plays based on pre-existing workflows that we follow. We understand that’s a trade-off we are building.

That last sentence matters. Plays are a bridge across the maturity gap between where models are today and where they need to be to resolve intent directly. When the gap closes, prompt crafting thins — it doesn’t vanish, but it shrinks from *“compile every workflow”* to *“define the outer governance and let the system reason within it.”*

## The Substrate Stack

Step back from the crafts and look at the field. Agentic software development is moving through five levels of maturity. Each level has a different substrate — a different thing you bet on to make it work.

The framework below — the Substrate Stack — is mine. It’s a maturity model, and it’s measurable. Each level has a distinct technological bet, not just a behavioral difference. Which level you’re at isn’t a matter of opinion; it’s a matter of what your organization has actually built underneath it. A measurement framework for locating a team on this stack is a separate piece, still coming.

**Level 1 — Vibe.** Model plus an IDE plugin. Copilot, Cursor, Claude Code. You talk to the model; the model writes code. No memory. No structure. No contract. Great for solo work on small surfaces. Already collapsed as a serious enterprise methodology — Ira experienced it directly in the bug story above. At the individual scale, vibe works. At the team scale, it’s fragile. At enterprise scale, it’s a liability — broken commits, missed conventions, lost audit trail. She fixed the bug in fifteen minutes. The PR took three days of cleanup to become shippable.

**Level 2 — Spec-driven.** Structured tooling layered on top of the model. Kiro, GitHub spec-kit, Tessl. The industry bet of 2025 and early 2026. Two hundred and fifty thousand developers adopted Kiro in three months, which tells you how badly the market wanted structure after the vibe era. It’s not working at enterprise scale for the reason this article is about: one document, three jobs, zero separation. Collapsing now.

**Level 3 — Intent-driven.** Plays plus knowledge base plus the Four Crafts, with the three layers cleanly separated. Where the next wave of serious tools sits — including the one I’m building. The bet: separate the three layers, give the human the two crafts they own, give the system the two crafts it owns, let empirical memory deepen over time. This is where my team lives. Not fully at Level 3 yet, though — more on that in the confessions below.

**Level 4 — Autonomous.** Guardrails move from individual plays to shared substrate. The system begins to reason across plays instead of within them. I have a theory on Level 4. I haven’t lived Level 4. That’s a separate article.

**Level 5 — Dark Factory.** The term isn’t mine. **Dan Shapiro’s** January 2026 framework coined “dark factory” as the top of a five-level autonomy model, and it’s become the industry’s shorthand for the fully autonomous state. What I’m claiming here is not the label — it’s the substrate underneath. At Level 5, the entire methodology runs itself. Intents go in. Software comes out. There’s still a play — there always will be — but the precompiled plan inside the play is gone, replaced by live resolution. How do you build a prompt that carries a factory forever? I don’t know. Anyone claiming to know is selling something.

## Three practitioner confessions

I’m writing this as someone inside the shift, not above it. So here’s what I got wrong, and what I’m still getting wrong.

### Confession one: my own corpus drifted.

Until a thinking session last week, the pitch deck for the internal platform I’ve been building on these principles listed the Four Crafts as *“intent, context, spec, model.”* The fourth craft was wrong. It should have been prompt — per Nate’s framing, which I’d internalized and then, over months of document editing, slowly corrupted. Model selection is a sub-decision inside prompt crafting — not a craft in its own right. That error sat in a load-bearing document for months. When I caught it, my first reaction was embarrassment. My second was: of course. This is exactly the failure mode this article is about. Even the person arguing for three-layer separation couldn’t keep his own corpus clean. Separation is harder than it sounds. SDD-style drift happens to IDD writers, too.

### Confession two: we’re at Level 2.5, not Level 3.

The tool I’m building isn’t fully intent-driven yet. It’s somewhere between 2.5 and 2.75 on the substrate stack. Why? Because we still make pre-lock decisions at prepare-time that a truly Level 3 system would resolve at implement-time. We want to lock the pieces down while still giving the agents the freedom to make their own decisions. We don’t trust the empirical memory deeply enough yet. So we compile plays. We fix architectural choices early. We give the agents freedom within narrow bands. That’s a conscious compromise, not a failure — but it’s not Level 3. It’s a bridge across the maturity gap.

### Confession three: I don’t know what the dark factory looks like.

I have a metaphor for Level 5. I don’t know if the metaphor survives contact with a real implementation. It might. It might break the moment we try to wire it. I’m stating this publicly because every time someone paints a confident picture of Level 5, I’d like a reader to point back and say: Kapil admitted this was still theory. I’m still at Level 2.5 to 3, and I haven’t even touched autonomous. I really don’t know what a dark factory would look like. The thing that keeps me up isn’t the unknown — it’s the number of people out there selling certainty about something none of us has lived yet. That scares the shit out of me. The honest answer is: we’re early. The honest practice is: name your level of certainty, then do the work.

## The CXO question

If you’re a CTO, CIO, or engineering leader reading this, there’s one diagnostic question that cuts through the methodology noise:

> **Are you jamming all three layers into one document and calling it “the spec”?**

If yes — and if your organization has adopted Kiro, spec-kit, Tessl, or an internal equivalent — you are experiencing the collapse. The ceremony will feel heavy. The specifiers will drown. The builders will revolt and try to vibe their way past the process. The agents will ignore instructions. The documents will get longer. The outcomes will not improve.

The math is brutal once you run it honestly. An epic that should save your team 50% in delivery time — agent-assisted, spec-driven, the whole promise — gives back 30% to drift recovery. The spec lies, the context is lost, the archaeology begins. What you’re left with is 20%. Real savings, but nothing close to what was on the slide.

That’s the number that doesn’t make the YouTube video. The promise was 50. The reality is 20. And the missing 30 doesn’t feel like inefficiency. It feels like something was taken. You did the work. You adopted the discipline. You wrote the specs. And the system forgot anyway.

Separating the layers is the way out. It’s also boring work. Unsexy. Nobody publishes a case study about *“we split one document into three.”* No conference keynote celebrates the team that made their methodology auditable. The fusion my team stumbled into — plays that carry determinism, intent that carries constraints, spec that carries evals, implementation decisions that stay inside the system with empirical memory behind them — isn’t a product. It’s a discipline.

That’s the part the industry keeps trying to skip.

The code I burned three months on? It worked. But when I came back, the spec had drifted — and a drifted spec is worse than no spec, because it lies with confidence. The system had forgotten what it was building, why, and how. It had gone into a kind of dreamstate, and woken up on a different date with no memory of where it was standing.

I revived it the hard way: questions, git history, and the discipline that Garura had forced me to build — intent files that remembered the goal, context isolation that remembered the constraints, a framework that remembered the why even when the spec had forgotten it. It worked. But it shouldn’t have required archaeology.

That’s the gap SDD misses entirely. It solves for structure at the moment of creation. It has no answer for continuity across time. If you want to reach Level 4, the system needs to know where it’s standing — not just what it was told to build on day one. Memory isn’t a feature. It’s the prerequisite.

Vibe coding collapsed because it had no contract. Spec-driven development is collapsing because it has three contracts pretending to be one. What rises from the fusion isn’t a new brand. It isn’t a better tool. It’s a separation of concerns — the oldest principle in software engineering — applied one layer up, to the documents we use to instruct the machines that write the documents.

The methodology is the product now.

Get it right, or watch your specifiers drown.

But here’s what “getting it right” actually requires: the courage to admit you’re struggling first. Not to your board. To yourself. The methodology isn’t working and you know it — the specs are drifting, the agents are ignoring instructions, the documents are getting longer while the outcomes stay flat. That’s not a tooling problem. That’s a signal.

Get your hands dirty. Not with another framework adoption. With the actual failure. Dig into why the spec lied. Check the git. Ask the system what it remembers. That archaeology is where the real learning is.

And stop taking methodology advice from YouTube. I mean it. The CTOs making SDD work on camera are running startups — three engineers, greenfield codebase, no legacy, no compliance, no enterprise change management, no team of 40 trying to follow a spec they didn’t write. That’s a different world. Their methodology works in their world. In yours — enterprise teams, distributed ownership, systems that need to survive across quarters, not sprints — the fidelity gap is real and the dreamstate is coming.

The courage isn’t in adopting the right framework. It’s in being honest about where you actually are on the stack before you commit to where you want to go.

So — are you being honest with your fucking self?

## Credits and acknowledgments

- **Four Crafts** (Context, Intent, Specification, Prompt) — framework lineage belongs to **Nate B. Jones**, whose 2026 video *“‘Prompting’ Just Split Into 4 Skills”* named the four as a coherent set. The split between human-performed crafts and system-performed crafts, and the mapping onto the three-layer schematic and onto P-CAM, are my reorganizations.
- **Dark Factory** — the term and the five-level autonomy model it sits at the top of are **Dan Shapiro’s**, from his January 2026 framework.
- **P-CAM** (Perception, Cognition, Agency, Manifestation) — my framework, developed across 2025–2026 as the architectural substrate for both agentic coding systems and consumer-facing AI. First introduced publicly in the Three Lanes article (March 2026).
- **Substrate Stack** and the **three-layer schematic** (Intent / Spec / Implementation) are my own framings.

I just took this further. Agentic coding has quietly broken the fifty-year-old project triangle; time, cost, quality, and spec-driven development is what breaks it. Here is the new triangle that replaces it, and how to hold it: [Spec-Driven Development Is Breaking the Fifty-Year-Old Iron Triangle](https://howtoarchitect.io/78431acba162?sk=cd2a36f452af96ccbfbcfcdeaa92ec06)

## The IDD vs SDD series (all free, no paywall)

This is one connected argument. Wherever you started, here is the whole arc:

1. [The Trap SDD Is Setting](https://medium.com/activated-thinker/the-trap-sdd-is-setting-48b2ad4f9cdc?sk=e6bd922772cb6798056d597886ec108d), why the discipline collapses once building gets cheap
2. [Spec-Driven Development Isn’t Broken. It Collapsed.](https://medium.com/activated-thinker/spec-driven-development-isnt-broken-it-will-collapse-c00609f72496?sk=2da01d7d2abfb5bc0acaed7050a0e797), the deeper failure under the method
3. [The Method That Replaces Spec-Driven Development: IDSD](https://medium.com/activated-thinker/the-method-that-replaces-spec-driven-development-idsd-66e921f6cdf7?sk=2ae7d323c6b780291bfc760ff2bdc592), intent, context, expectations
4. [The Anatomy of Intent from ICE](https://medium.com/activated-thinker/the-anatomy-of-intent-ice-in-idsd-built-from-where-spec-driven-breaks-1597e5a16659?sk=836b8eeaf97cda521f0ad195162011c3), what intent actually is
5. [Spec-Driven Development Is Breaking the Fifty-Year-Old Iron Triangle](https://howtoarchitect.io/78431acba162?sk=cd2a36f452af96ccbfbcfcdeaa92ec06), the new triangle that replaces it

*Note on characters: Ira, Zia, and Anya are composite personas drawn from real roles on agentic engineering teams — the specifier who lives at the intent-specification seam, the builder who lives at the execution seam, and the designer who sees across domains and names the thing everyone else is missing. The bug moment, the agent-fired-and-walked-away behavior, the vibed PR that broke the conventions, the ten-bug reconciliation burn, the moment Anya named the intent layer, the four of us building out the crafts — all happened. The names are symbolic, used because the people themselves prefer not to be identified in public writing. If you recognize your team in theirs, that’s intentional. The problem isn’t unique.*