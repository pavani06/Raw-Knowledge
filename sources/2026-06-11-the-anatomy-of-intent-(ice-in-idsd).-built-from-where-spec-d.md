---
title: "The Anatomy of Intent (ICE in IDSD). Built from Where Spec-Driven Breaks."
source: "https://medium.com/activated-thinker/the-anatomy-of-intent-ice-in-idsd-built-from-where-spec-driven-breaks-1597e5a16659"
author:
  - "[[Kapil Viren Ahuja]]"
published: 2026-05-27
created: 2026-06-11
description: "You're reading via Kapil Viren Ahuja's Friend Link. Upgrade to access the best of Medium."
tags:
  - "clippings"
---
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*EyCt4L3jSqSbBiudxtaNRw.png)

[If you do not have a Medium subscription, use this link.](https://howtoarchitect.io/1597e5a16659?sk=836b8eeaf97cda521f0ad195162011c3)

Let me say what this piece is and what it isn’t. I am not against spec-driven development. I am not against Spec Kit. I am not against the people who built these tools. They moved the conversation forward, and that counts.

Here is what I am against. I keep watching engineers pick up these tools because the people they trust say this is the way. Then I watch them struggle. The output comes out half-right, in a shape that is hard to fix. And the frontier labs and the influencers who made this popular have moved on. They took a stand, engineers carried it into production, and then they went quiet.

That is what pisses me off. If you are a frontier lab, you do not get to plant a flag in a method and then walk away from the engineers who took you at your word. You come back, or you should not have been the one who said go that way to begin with.

> ==This is a major reason I set out to find what works for my team.==

I share what works for us because I learn from what works for you. I am betting a lot on what I do, and on what my team does. The only way I find out where I am wrong is if you tell me, so push back if you have it.

And let me give the method its due before I take it apart. There is a real case for constraining the model. If your team is new to agents, if the codebase is fragile, if the stakes are regulatory, and a wrong build costs you a license, a leash is rational. You want the model boring. You want it predictable. You want the work to come out the same way twice. Spec-driven development was built for that case, and it does the job.

> Use SDD every single time you are starting out. As a matter of fact, SDD is the 2nd step, coming immediately after Vibe Coding. Do not skip that.

==What does not survive is being taken out of that case and run everywhere else. A spec with holes hands the model the very freedom the leash was supposed to remove, but now without the model’s instincts to balance it. You get the constraint without the protection. That is the case that has spread. That is the case I am writing about.==

> This happens really fast. Once you understand the basics, you realize it won't take you far, and that's when you need something more.

The model in your editor is built to chase a goal. That is not a figure of speech. Claude Code now ships a command called `/goal`: you give it a completion condition, and it keeps working, turn after turn, with a small, fast model checking each time whether the condition has been met, and it does not hand control back to you until it has. Hand the machine an end state, and it pursues it. That is the gear it was built in.

**==*Now look at what the industry tells you to do with it. Sit down and write a spec. Not a goal, a spec. Write down what to build and how, in detail, up front, and hand that to the thing that was built to chase a goal. We took a goal-seeking engine and told everyone to feed it a form.*==**

And the most popular tool for writing those forms says the quiet part out loud, in its own documentation.

## The ones who built SDD are selling you a leash for the model

GitHub’s Spec Kit is the tool that brought spec-driven development into the mainstream. Here is how its own manifesto describes what its templates are for: “ *The templates transform the LLM from a creative writer into a disciplined specification engineer.*” There is a section heading in that same document that reads, word for word, “ *How Structure Constrains LLMs for Better Outcomes.*”

Read that again. Constraining the model is not a side effect; they are quietly managing it. It is the pitch. The product is a harness whose stated purpose is to prevent the model from doing what it is built to do. You are being sold a leash and told it is a method.

I have written before about why spec-driven development collapses, so I will not relitigate it here. The short version: a spec has holes because no human writes down everything, and the agent fills them. That was the trap as I first described it. Looking closely at the tooling, it is worse than I said. The tool does not merely leave holes for the agent to fill. It instructs the agent to fill them.

### The proof is in their own files

Open Spec Kit’s spec command. When the description is incomplete, it tells the model to “ **make informed guesses**,” use “ **common patterns** ” to “ **fill gaps**,” and then it caps the model at “ **Maximum 3 \[NEEDS CLARIFICATION\] markers**.” Three. Where the spec goes silent, the model invents the goal, and the tool limits how often it has to admit it is guessing.

The same toolkit argues with itself elsewhere.

1. Its manifesto calls test-first development NON-NEGOTIABLE: no implementation code is written until the tests are written, validated, and confirmed to fail.
2. The task template that ships in the same repository in the same week says, “Tests are OPTIONAL, only include them if explicitly requested.”
3. The file that actually runs the work tells the agent a third thing: “Follow the TDD approach.” Non-negotiable, optional, and mandatory.

Three orders for one decision, shipped together. Hand a goal-seeking model three contradictory rules, and it cannot reason toward an outcome; it picks a dogma, obeys it, and improvises the rest. The exact behavior you adopted a rigid method to prevent.

What should end the argument is that the people who built spec-driven development are quietly walking it back. The doctrine still preaches “precise, complete, and unambiguous” specs. The tooling has stopped believing it: make informed guesses, use reasonable defaults, include optional tests, and write down the assumptions you made where the description did not specify them. When the authors of a method start hedging the method inside the method, that is not me calling it a trap. That is them.

## ICE: Intent, Context, Expectations

### A goal needs a direction.

A goal on its own does not pick a direction. Tell a model “build me a microservice,” and the same sentence can land as Node, Java,.NET, or PHP, and every one of those is a defensible answer to what you asked. Something else has to be picked. That something else is the surround the work runs inside: what stack the team has already chosen, what service this one will sit next to, what was tried before, what good has looked like here. That surround has a name. It is context.

> We build with ICE: Intent, Context, Expectations. Three artifacts, each owned by a human.

Intent is what you want: the goal, the constraints that bound it, and the failure conditions that guard it. Context is the surround the work runs; the harness assembles it. Expectations are what count as done, generated from the intent and the context together, and vetted at a checkpoint.

This piece is about Intent. The rest of it walks through what’s actually inside it.

## Anatomy of an Intent

If you read my [earlier piece](https://medium.com/activated-thinker/the-method-that-replaces-spec-driven-development-idsd-66e921f6cdf7?sk=2ae7d323c6b780291bfc760ff2bdc592), you will remember I said Intent has five parts. Five, not three. The two I just dropped are Connections and Scenarios, and the move wasn't clean. It cost me weeks.

Ira pushed me on Connections. His point was that they are real and they shape the work; an intent that talks to two upstream systems is a different intent than one that talks to none, and you cannot pretend that is Context. He was right that they are part of Intent. The trouble started the moment I tried to add Connections as a fourth slot; the engineer wrote it in the intent. For every team that already had a service mesh, the slot bled straight into Context, and the line stopped being sharp. So Connections stay part of Intent in the model, but are managed differently. That deserves its own piece; jamming it in here breaks the shape.

Scenarios were the harder one. I had Success Scenarios and Failure Scenarios as two halves of one slot. Zia kept asking what the validator was supposed to do in a success scenario: was it an eval, or a hint to the builder? When we tried both, the builder over-fitted to the scenarios, and the validator did not know which side of the line they were on. So I split them. The failure conditions stayed in Intent because they are binary checks that the validator owns. The success scenarios moved to Expectations, generated from the intent and the context together, vetted at a checkpoint. The reason that move is non-negotiable is that LLMs reward-hack. If you hand the builder the same scenarios the validator will check, the builder will game them. Compartmenting is the only structural defense.

> So Intent sits with Goal, constraints, and failure conditions. That is the line I am holding for now.

The cleanest way to teach this is to write one. The example for this piece is a microservice, concrete enough that the moving parts are visible, common enough that anyone shipping software has felt the temptation to overload it.

### The goal

The goal is the outcome you want, expressed as a single sentence or a short paragraph.

There is a clean test for it: can two completely different implementations both satisfy this? If yes, you wrote a goal. If only one implementation could possibly satisfy it, you wrote a spec and called it a goal. A goal is one outcome: one sentence, no “and.” When you need a conjunction, you almost certainly have two goals pretending to be one, and the fix is never to add detail. The fix is to split. The method scales by adding more intents, not by making a single intent heavier.

Take the microservice. “Build a microservice that handles the user-facing product catalog and the cart and checkout funnel” is a goal; a dozen engineers could build it a dozen ways, and every one could be right. Replace it with “Build a Go microservice using gRPC, with PostgreSQL for catalog storage and Redis for cart state, behind an Envoy sidecar,” and you have a spec wearing goal’s clothes. The design choices are already made, by whoever wrote the sentence, in a hurry, possibly wrong. The agent is demoted from decision-maker to typist. If you wanted a typist, you did not need an agent; you needed a keyboard and an afternoon.

### The constraints

Constraints are the qualities the outcome must carry. They are directional; they point the builder toward where the outcome should land on each dimension, without dictating how to get there. They are unconditional; if the output misses a constraint, it fails regardless of how clever the implementation was.

The cleanest way to think about constraints is as non-functional requirements. Performance, scale, reliability, accessibility, security, compliance. Each one has a direction. Each one has a hard floor. The microservice must support 1,000 MAU; the builder picks the architecture that gets there. The microservice must hold p99 under 200ms; the builder chooses the cache, the indexing strategy, and the read path. Constraints say where the outcome must land. Context says what is available. The choice belongs to the builder.

Constraints sit in business language, not implementation patterns. “99.99% uptime against the SLO” is a constraint. “Use the existing Kubernetes setup with three replicas and pod disruption budgets” is not an implementation pattern that belongs in Context, where the org’s standard runtime topology already lives. The line is sharp: if the sentence picks a tool or a pattern, it is not a constraint; it is a spec hiding inside one.

The waterfall trap waits here. The temptation is to write every requirement you know about into the intent in the name of completeness. That is how 1,300-line specs are born. The discipline is to write only the qualities the outcome must carry: five to seven lines, not fifty. Everything else is either Context (what the org has already standardized) or Expectations (what the system generates from the intent and the context together). When the constraints list grows past a handful, stop. Something on it does not belong.

### The failure conditions

Failure conditions are the binary checks that the validator runs against the output. Each one is observable; a script or an eval can determine whether it's true or false without asking a human for an opinion. Each one is post-output; it describes what the validator catches after the work is done, not what shapes the builder as it is being made.

For the microservice: the build fails, unit test coverage drops below 90%, lint reports errors, the Sonar quality gate fails, a secret appears in the source code, and the API contract changes without a version bump. Each is an eval. Each fires automatically. None requires a human in the loop until it trips.

The line between a constraint and a failure condition is where engineers stumble most. The decision rule is one sentence: Would knowing this change how the builder writes code? Yes, it is a constraint; the builder needs it to make the design call. No, it is a failure condition; the validator catches it after. “Must not introduce a new runtime dependency” is a constraint because the builder needs to know it when picking libraries. “Unit test coverage must stay above 90%” is a failure condition because coverage can only be evaluated after the code exists, and giving it to the builder as a constraint invites coverage gaming.

There is a second reason the split matters. Under compartmented evaluation, the builder receives the goal and the constraints. The validator receives the failure conditions, compiled into encrypted evals. The builder cannot teach a test that it cannot see. That is the structural defense against the model optimizing for the checks rather than the outcome, and it only works if you put each requirement on the right side of the line.

### The intent, written out

**Goal.** Build a microservice that handles the user-facing product catalog.

**Constraints**, the qualities the outcome must carry:

- Support 1,000 concurrent monthly active users at peak.
- p99 latency under 200 milliseconds on read endpoints.
- 99.99% uptime against the published SLO.
- WCAG 2.1 AA on any user-facing surface this service exposes.
- OWASP ASVS Level 2 on every endpoint.

**Failure conditions**, the binary checks the validator runs as evals:

- Build fails.
- Unit test coverage drops below 90%.
- Lint reports any errors.
- Sonar quality gate fails on coverage, duplication, or security hotspots.
- A secret appears in the source.
- API contract changes without a version bump.

That is the whole intent. No file paths. No class names. No library choices. No “use the Go service template.” The Go template lives in Context, where the harness assembles it from the org’s standards and passes it to the builder along with the intent. The intent carries only what is irreducible to this work.

### The same anatomy, outside coding

The shape is not unique to software. It is what a well-formed intent looks like in any domain. A consumer outcome carries the same three.

**Goal.** The user wants to buy a red shoe for under thirty dollars.

**Constraints**, the qualities the experience must carry, in business language:

- The price shown is the total the user pays; shipping and tax are included before checkout.
- The inventory shown is real; every item displayed is in stock and shippable to the user.
- Checkout is short; three clicks or fewer once an item is in the cart.
- Payment is safe; the seller never sees card details.
- The experience works for screen-reader and keyboard-only users.
- Personal data is not shared with anyone without the user saying yes.
- The return policy is visible before purchase, not after.
- Sellers shown have a verified track record.

**Failure conditions**, binary checks on what the user sees:

- A shoe priced above thirty-five dollars appears in the results.
- A non-red shoe appears in the results.
- A search returns nothing, and no empty-state message is shown.
- Adding to the cart fails silently.
- The total at checkout differs from the total on the listing.

Same anatomy, different domain. The goal is the outcome. The constraints are the qualities. The failure conditions are the binary checks. The implementation, the recommendation engine, the storefront design, and the payment provider are not in the intent. That is the test of whether the model is the right one. If it handles a piece of software and a piece of commerce using the same three slots, with nothing left over, it is.

## What still catches me out

I can teach the three-part model in a room and watch people nod. I can run the two-implementations test on someone else’s goal in four seconds and show them exactly where they smuggled in the how. Then I sit down to write my own intent, under a deadline, with the outcome clear in my head, and I catch one of three failures, every time.

The first is in the goal. My hands type the method into it. “Build a Go microservice with…” instead of “Build a microservice that…”. I know better, yet on a given day, I would still end up doing that in the flow.

The second is in the constraints. The list grows. I added one item. Then another. I justify each one as essential. Six lines become sixteen. By the time I notice, the constraints have stopped being qualities of the outcome and started being a thinly-disguised spec, each line whispering an implementation choice.

==The third is that I keep mixing constraints with failures.== Every time I sit down to write intents, it eats all my cognitive cycles.

The discipline is to ask, for every line on the list, whether it shapes the builder’s design or is something a validator could check after the fact. If the builder does not need it to make a design call, it is not a constraint. It is a failure condition, and it belongs in a different slot.

The goal is the cheapest thing to get wrong and the most expensive to find late. The constraints are the easiest place to drift the method back toward what we left behind. Both are silent failures. Both compound at exactly the speed the tools keep getting faster.

## Do this one thing, if you are coding using Agents

Take one real outcome you are about to ship this week. Not the system. One outcome. Write the three things for it.

The goal in one sentence. No “and.” No tool. No pattern, no class name, nothing that says how.

Three to five constraints. Each one is a quality the outcome must carry: directional, in business language, unconditional. No “use X.” No “wrap with Y.” If a line picks the implementation, move it to Context.

Three to five failure conditions. Each one binary, each one observable, each one something a validator could check on the output without asking you.

## Next is Context

The intent is three things. The next piece is about Context: the surroundings that surround the work, the layer that carries everything the intent does not. The piece after is Expectations, where the system generates the success scenarios and the recovery plan from the intent and the context together. The three together are ICE; this piece is the first leg.

But Intent is the root, and if the root is a spec in disguise, nothing built on it can be anything else. So start there. Three things, for one outcome. It is the smallest part of the method, and the only part nobody, and nothing, can write for you.

### What I will defend, and what I will not

Two things to say before I close, because the people who picked up spec-driven development on a frontier lab’s say-so deserve better than another flag planted and walked away from.

The first is that this is hard. I still get one of the three wrong on a draft, on the day, under a deadline. I showed you the three places I trip, and I trip in them now, in the year I am writing this, after years of arguing the method. Anyone who tells you the three-part intent is easy to write is selling you the same kind of leash with a friendlier handle.

The second is that taken together, ICE is still a spec. But it’s an intent that lets the model do what it was built to do, not to restrict it. I am not above the thing I am critiquing; I am trying to do it better.

What I will defend is what happens when the three are right, and the harness does the rest. The agents build with very little drift. The failures get caught by evals, not by me reading diffs at midnight. The rework cycle that used to take three rounds takes one. That is not the method alone. The Garura harness is doing the load-bearing work: assembling the context, compartmenting the evals, and checkpointing the expectations. Intent is the part only you can write. Garura is the part that earns the discipline you just spent.

Here is what the workflow looks like now. I spend a day, sometimes two, writing the intents for an epic, the three things, for each outcome, and a set of meta plays as Skills that the harness uses to do the rest. Then I hand it over. The team runs the build end-to-end with very little input back from me. The speed at which we are adding capabilities to the codebase is three to four times faster than before. I have not run the math properly; I am quoting what I can feel from where the days actually go. My suspicion is that the real number is higher than what I am willing to claim out loud, because I keep undercounting the rework cycles we are no longer running.

So write the three things for one outcome. Get them wrong the first few times. Then put a strong harness behind them, one that makes the discipline worth keeping. That is the deal I am offering, and the only one I am willing to defend.

## The IDD vs SDD series (all free, no paywall)

This is one connected argument. Wherever you started, here is the whole arc:

1. [The Trap SDD Is Setting](https://medium.com/activated-thinker/the-trap-sdd-is-setting-48b2ad4f9cdc?sk=e6bd922772cb6798056d597886ec108d), why the discipline collapses once building gets cheap
2. [Spec-Driven Development Isn’t Broken. It Collapsed.](https://medium.com/activated-thinker/spec-driven-development-isnt-broken-it-will-collapse-c00609f72496?sk=2da01d7d2abfb5bc0acaed7050a0e797), the deeper failure under the method
3. [The Method That Replaces Spec-Driven Development: IDSD](https://medium.com/activated-thinker/the-method-that-replaces-spec-driven-development-idsd-66e921f6cdf7?sk=2ae7d323c6b780291bfc760ff2bdc592), intent, context, expectations
4. [The Anatomy of Intent from ICE](https://medium.com/activated-thinker/the-anatomy-of-intent-ice-in-idsd-built-from-where-spec-driven-breaks-1597e5a16659?sk=836b8eeaf97cda521f0ad195162011c3), what intent actually is
5. [Spec-Driven Development Is Breaking the Fifty-Year-Old Iron Triangle](https://howtoarchitect.io/78431acba162?sk=cd2a36f452af96ccbfbcfcdeaa92ec06), the new triangle that replaces it