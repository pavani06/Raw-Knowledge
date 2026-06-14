---
title: "The Trap Spec-Driven Development Is Setting"
source: "https://medium.com/activated-thinker/the-trap-sdd-is-setting-48b2ad4f9cdc"
author:
  - "[[Kapil Viren Ahuja]]"
published: 2026-05-16
created: 2026-06-11
description: "More"
tags:
  - "clippings"
---
*Agentic coding and Claude made building nearly free. Spec-driven development was sold as the discipline that controls it; it is doing the opposite, setting a trap that will spring one day, the day is different for everyone, and no one remembers how to ask whether the work was worth doing.*

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*31wyTNxuZ-BtREtdUhmN9w.png)

[If you do not have a Medium subscription, here is the link.](https://howtoarchitect.io/48b2ad4f9cdc?sk=e6bd922772cb6798056d597886ec108d)

*Some observations here are composited and deliberately de-identified. “Zia” is a composite persona standing for a real team role, not an individual. The confession is not.*

Last night, one of my agents spent 100 million tokens building a skill. It is not critical. Anthropic had handed a block of free tokens; I was away from the keyboard for most of it, and after a few redirections, the agent did the heavy lifting on its own. What it produced was a clean, one-page chart showing where the agent’s time and resources went across my projects. Nobody asked for it. No user is waiting for it. I built it because it was free and it was easy.

I spend my working life arguing for discipline in how software gets made, and it still pulled me off mine, alone, at no cost, with nothing telling me to stop. If it can do that to me, it is doing it to your teams, and the difference is that nobody is writing it down.

This is a companion to something I argued earlier: that spec-driven development didn’t break; it collapsed. That piece was read as a debate over methodology. It was never that. Spec-driven development is the industry’s latest attempt to keep one discipline alive once AI made writing code cheap — the discipline of deciding what is worth building before building it. It is collapsing because it is hard, and people will not do hard things when nothing is forcing them. This piece is about what that leaves you holding: the method that was supposed to keep the value question in the process is gone, and so is the price that used to ask the question whenever the method failed. Two brakes, removed at almost the same moment. That is why this is worse than the collapse — the collapse was not the bottom. This is.

## It’s cheap today. It will not be cheap forever.

The cost of producing software has fallen close to zero, and people are building accordingly — not because there is a need, but because the need no longer has to clear any bar to get built. That is the actual condition you are managing, whether or not anyone has named it for you.

The mistake is reading today’s price as the real price. Be precise about why, because the lazy version of this argument is wrong and a sharp reader will know it. Per-token inference is not being sold below cost — at the margin, it is cheap and getting cheaper; Semi-Analysis puts the true blended cost of a frontier model on agentic workloads near a dollar per million tokens against a much higher sticker. That is not where the exposure is. The exposure is that the all-in economics are deeply negative and funded by capital, not operations. The Information reported OpenAI lost roughly five billion dollars in 2024 on something near a ten percent gross margin, with inference compute alone eating about half of revenue; OpenAI’s own CEO said in January 2025 that even the two-hundred-dollar tier loses money because “people use it much more than we expected.” Capital-funded prices do not hold still, and they do not rise uniformly — they reprice toward exactly the behavior this article is about. In mid-2025, Cursor quietly converted its flat twenty-dollar plan into metered credits and then apologized publicly, its CEO conceding that newer models “can spend more tokens per request” and flat pricing could not survive it. That is the repricing. It has already started, and it started with the heaviest builders. So the question for a CXO is not what this costs now. It is what your organization will have turned into by the time it costs what it actually costs. Then the bill. Call it the Deferred Ledger — three debts that accrue while the meter is cheap and come due on enterprises, not on hobbyists:

### Skill Debt

The hard part is deciding what is worth building, and why is exactly the part being skipped. Judgment that is not exercised does not survive. A team that has not made a hard build-or-don’t call in a year cannot make one the quarter it suddenly matters.

### Dependence Debt

Every workflow built on the assumption that generation is free does not function when generation is not. You are not adopting a tool; you are moving load-bearing weight onto it, and that is worse than an outage, because an outage you can at least see. In September 2025, Anthropic published its own postmortem, admitting that for roughly five weeks, about 30% of Claude Code users received at least one degraded response, and most never knew the tool was quietly broken. That is the real shape of it: not the day it goes down, but the weeks it is subtly wrong while your teams ship against it, unable to tell the instrument from the work.

### Carry Debt

Software built without need does not become free because it was cheap to make. It becomes inventory: maintained, secured, and accounted for throughout its life, and repriced upward the moment your access is.

None of these debts shows up this quarter. That is precisely why they are dangerous, and why seeing them before they are due is the job.

## Fast was never supposed to mean build fast

We have spent thirty years buying methodologies sold on speed. Waterfall, then agile, then scrum, kanban, the rest. Everyone promised faster delivery. And somewhere in the buying, the industry quietly changed what the word meant. Fast came to mean *produce* fast, more code, more features, more shipped surface. That is not what it ever meant. Fast meant *deliver value* quickly: get the thing customers actually need into their hands sooner. Speed of production was only ever a stand-in for speed of value — useful because production was the expensive bottleneck.

Agentic coding has now all but solved the issue of production speed. And in solving the stand-in, the industry has let itself forget the thing it stood for. We are producing faster than ever and validating value less than ever — and because production is what everyone learned to measure, the dashboards read like triumph. They are measuring the half that got cheap and ignoring the half that was always the point.

Each of those methods, whatever else it did, was a structure that forced the value question into the process, a stage, a sign-off, a role whose job was to ask whether the work was worth doing. Spec-driven development was the most recent link in that chain, and the only one built specifically for the moment code got cheap. It was the attempt to put the “is this worth building” decision back into a workflow where the agent would otherwise just build. It is the link I argued has collapsed, not because the idea was wrong, but because doing it honestly is hard, and a discipline that is only hard and never enforced does not survive a team under pressure. So the structure that was supposed to carry the value decision into this era is gone, at the exact moment the cost that used to carry it whenever the structure failed went to zero. That is the position you are actually in. Not one safety net down. Both together and nothing under them.

Listen to how the people selling the loop describe it. Anthropic’s CEO says AI now writes most of the code inside his own company, and in nearly the same breath, the human “still needs to specify… the overall design decision.” Both halves are true, and the gap between them is the whole problem. Be precise about the two things people keep blurring: agentic coding is *who runs the loop* now, the agent, with the tools, building, testing, and fixing on its own.

Spec-driven development was *what was supposed to govern that loop,* the reviewable statement of what is worth building and why. They are not rivals and not stages; one is the engine, the other is the brake on it. The CEO is right that the intent still has to come from a human. He just leaves out that the discipline built to carry that intent into the loop has collapsed, and the cost that used to force it whenever discipline failed has gone to zero. He is telling you to keep your hand on a wheel that is no longer connected to anything. That is not a nuance. It is the job description, quietly deleted.

## Prototyping is not the problem. The missing decision is.

The easy version of this argument is wrong, so I want to be careful. Building fast is not the enemy. Prototyping is essential — it is how you find out whether the value is even there, and cheap building makes it faster and better, which is genuinely good. That is lean working as intended: build a little, learn, decide.

The discipline was never “don’t build fast,” and it was never “don’t experiment.” Experiments should be encouraged; most of the value comes from prototypes that earn their keep, and cheap building means you can run more of them, which is a gift. The line is not at the start. It is further down, and it is a stop, not a gate: the moment prototyping stops being the way you find a return and becomes the whole job, build after build, nothing reaching anyone, no return you can point to, that is when it has to stop. Build is not the verb that gets you in trouble. Continue is. A hobbyist never has to notice that moment; the cost of missing it is an evening. An enterprise has to notice it every time, because the cost of missing it is the Deferred Ledger above, paid at scale.

This is not a hypothetical; I am dressing up. I know of one program that ran at $135,000 a month in direct cost, not opportunity cost, real spend, for three years, with a negative return the entire time. That is close to five million dollars to learn something a disciplined stop would have caught in the first quarter. Nobody set out to burn it. It went the way these always go: each month, the build continued because stopping meant conceding the last month was a waste, and no one owned the moment where the honest answer was “there is no return here, and there is not going to be.”

> Nobody approved that. Nobody ever approves that. It approves itself, one month at a time.

And note when that happened: it did not need cheap tokens to go wrong. This failure predates the agentic era entirely. That is the part a CXO has to sit with. If an organization could burn close to five million dollars on a build with no return when building was still expensive and slow, the only thing that's nearly free, nearly instant is how fast and how widely building changes now happen. The trap is not new. The accelerant is. The conditions that used to make this rare just became the default, and the bill scales with the speed.

The signal here is the opposite of what most people expect, and it is the most useful part of this piece. The reckless ones are not the enterprises. Watch where building-for-its-own-sake actually happens, and it is pockets — senior people with free tokens and enough autonomy that no one is in the room when they decide. I watched two such teams build at scale this week, with no one asking whether any of it was needed. Meanwhile, the enterprise itself, the institution, is doing the thing everyone mocks it for: moving slowly. Procurement is cautious. Security review drags. The AI rollout is gated and grudging. For once, that sluggishness is not the dysfunction. It is the only brake still working - and it is working by accident, not because anyone designed it to. That is the real exposure. The discipline did not survive in your best people. It survived in the bureaucracy nobody respects, and bureaucracy cannot be trusted to hold a line it does not know it is holding.

## What discipline looks like when nothing forces it

> Two examples, briefly, because the contrast is the argument.

The product my team ships gets a feature only when there is a need for it — and we treat the client as the product owners. There, the structure holds the line, so no individual has to be strong enough alone.

A tool I built solo has no product owner but me, and still gets a feature only when it is needed. That is the proof that matters: the discipline is not a property of having structure. It is a decision you can make without one. Another personal agent, which can be treated on the same lines, is where I broke the discipline last night. That is the uncomfortable part, and it is the true one: when nothing forces the discipline, it is simply something a person decides to do, or does not.

Now the version closest to home, the one where I trust my own judgment least. We set out to build personal agents for ourselves. We reached for one agent framework, then argued our way to a second, then a third. It was Zia — our Builder, fifteen years in, allergic to waiting — who said what the room was already feeling: “We can just build this ourselves.” She was right that we could. That was never the question, and no one in the room was paid to ask the one that was. We even did the disciplined thing and wrote the specs. Then we realized we couldn't build all of them, so we started building the ones we thought we needed. Read that back. Zia builds — that is her gift and her gravity, and a room full of builders bends toward her. What was missing was the one person whose only job is to stand in front of the Builder and ask whether the thing she is about to make is a thing anyone needs. We are the people who preach this discipline. We were well inside the trap before any of us saw the edge, not the reckless, us.

## The manual brake

Both automatic brakes are gone.

1. Cost stopped forcing the question;
2. The method that was supposed to ask it collapsed.

The bureaucratic slowness that accidentally stands in for them will not survive the first executive who decides slowness is the enemy. So stop waiting for a forcing.

So, as a leader, ask the following questions:

### 1\. Who needs this, and what breaks for them if it never exists?

If the honest answer is “no one,” this is just an experiment. Treat it as one.

### 2\. Would we still build it if it cost a week of engineering time instead of an afternoon of tokens?

This is the question cost. Ask it on purpose now. Most feature inflation will not survive it.

### 3\. Who owns saying no to this?

A decision with no owner is a trap. Name the person whose job is the refusal; it’s their job to also provide the intents.

## The part I haven’t solved

I am not neutral about experimentation, and I should say so. It is seductive. and addictive. The most fun the work offers. It is also not optional. You cannot advise a client well on something you have never built, and the advisory edge comes precisely from having experimented enough to actually know.

The unsolved question is calibration - how to experiment enough to advise correctly. I do not have a formula for “just enough.” I have the forcing function that stops it.

## The Trap and Beyond

Vibe was the flavor last year. We are now in the SDD wave. We all thought it would bring speed, yet we are neither able to build speed nor consistency. And given the complexity, many are falling back to vibe coding.

> Result is \`The Trap\`

I let one of my agents spend 100M tokens. Because I was too lazy to build a spec. This is my personal agent, and I haven't used my IDSD framework. It evolved naturally. But I am seeing the impact of my choices. This is what I am going to do next: use Garura, my Intent Driven Software Development (IDSD) framework.

So the question to take back is not whether your people can build quickly. They obviously can. It is this: when building costs them nothing, what in your organization still makes them ask whether it is worth building at all? Name it. Gather Intents. Then create Specs so that you can test it works. Let the framework do the rest.

## The IDD vs SDD series (all free, no paywall)

This is one connected argument. Wherever you started, here is the whole arc:

1. [The Trap SDD Is Setting](https://medium.com/activated-thinker/the-trap-sdd-is-setting-48b2ad4f9cdc?sk=e6bd922772cb6798056d597886ec108d), why the discipline collapses once building gets cheap
2. [Spec-Driven Development Isn’t Broken. It Collapsed.](https://medium.com/activated-thinker/spec-driven-development-isnt-broken-it-will-collapse-c00609f72496?sk=2da01d7d2abfb5bc0acaed7050a0e797), the deeper failure under the method
3. [The Method That Replaces Spec-Driven Development: IDSD](https://medium.com/activated-thinker/the-method-that-replaces-spec-driven-development-idsd-66e921f6cdf7?sk=2ae7d323c6b780291bfc760ff2bdc592), intent, context, expectations
4. [The Anatomy of Intent from ICE](https://medium.com/activated-thinker/the-anatomy-of-intent-ice-in-idsd-built-from-where-spec-driven-breaks-1597e5a16659?sk=836b8eeaf97cda521f0ad195162011c3), what intent actually is
5. [Spec-Driven Development Is Breaking the Fifty-Year-Old Iron Triangle](https://howtoarchitect.io/78431acba162?sk=cd2a36f452af96ccbfbcfcdeaa92ec06), the new triangle that replaces it

**Sources**

- Anthropic, “A postmortem of three recent issues,” anthropic.com/engineering, September 17, 2025 — ~30% of Claude Code users hit at least one degraded response over a five-week period.
- “Cursor apologizes for unclear pricing changes that upset users,” TechCrunch, July 7, 2025 — flat plan converted to metered credits because frontier-model costs made flat pricing unsustainable.
- OpenAI 2024 financials (~$5B loss, ~10% gross margin, inference ~50% of revenue) as reported by The Information, September 2025.
- Sam Altman on the $200 ChatGPT Pro tier losing money, January 2025 (Fortune; TechCrunch).
- Dario Amodei (Anthropic CEO): AI writes most code within Anthropic while the human “still needs to specify… the overall design decision” — Council on Foreign Relations, March 2025; conversation with Marc Benioff, October 2025; “The Adolescence of Technology,” darioamodei.com, January 2026. Treat all “90%” figures as supervised generation, not autonomous.
- SemiAnalysis, “AI Value Capture — The Shift to Model Labs,” 2026 — the counter-case: per-token inference margins are positive and improving, which is why the argument here is about all-in economics and elastic repricing, not below-cost tokens.