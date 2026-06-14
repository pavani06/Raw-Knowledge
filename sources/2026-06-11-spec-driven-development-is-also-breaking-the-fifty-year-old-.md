---
title: "Spec-Driven Development Is Also Breaking the Fifty-Year-Old Iron Triangle"
source: "https://medium.com/codetodeploy/spec-driven-development-is-also-breaking-the-fifty-year-old-iron-triangle-78431acba162"
author:
  - "[[Kapil Viren Ahuja]]"
published: 2026-06-04
created: 2026-06-11
description: "You're reading via Kapil Viren Ahuja's Friend Link. Upgrade to access the best of Medium."
tags:
  - "clippings"
---
*I have written a whole series tearing spec-driven development apart. Then I caught myself doing it, on my own build, last week. And I started thinking about what it does to my core PM Iron Triangle*

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*YBuQZKIDbDIc5KEnkPI1Zw.png)

[If you do not have a Medium subscription, please use this link.](https://howtoarchitect.io/78431acba162?sk=cd2a36f452af96ccbfbcfcdeaa92ec06)

> ***🚨 HIRING: Tech Talent****  
> 💰 $50–$120/hr | 🔥 Multiple Roles*
> 
> *Frontend • Backend • Full Stack • Mobile • AI/ML • DevOps  
> *[*👉* ***Apply Here***](https://codetodeploy.substack.com/)

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*pkQFf0NUnzoFbVEVQCF5WQ.png)

Five people. Three months. Weeks of specs, the kind of document that feels like progress because it keeps getting longer.

I sat in and asked one question. Why are we building this?

Nobody had an answer. Even a bad answer would be good enough. Yet, all I got was no answer. The spec had been busy describing how, and nobody had stopped to defend the why. Ten minutes of that question, and the specs were gone. Not edited. Gone.

> *The intent, once it was in the room, made most of the document irrelevant.*

When the intent was clear, the actual solution was a two-day job. Okay, okay, maybe ten days. Five people, three months the first way, ten days the second. You do the math: specs drive us to about $96,000, intent drives us to about $16,000. $80,000 sat in the gap between a spec and a question.

$80,000 was never the point. The point is that one question moved the whole frame, and not a single line in that spec had considered asking it. The spec was complete and detailed and wrong about the only thing that mattered, and its completeness is exactly what hid that from the room.

## The triangle we used to balance

For thirty years, software lived inside one triangle, the iron triangle of project management: time, cost, quality. Pick two. Fast and cheap, but not good. Fast and good, but not cheap. Good and cheap, but slow. Every methodology we ever bought was a different way of choosing which corner to give up.

Agentic coding broke that triangle, and most teams have not noticed.

Speed went first. You used to buy it two ways: with people, more engineers, and more cost, or with accelerators, the pre-built assets and frameworks that meant a team did not start from scratch. Now, an agent ships in hours what a team shipped in weeks, so speed stopped being something you buy and became something the client assumes. It is table stakes. It is off the triangle.

The accelerator is changing shape, too, and I will only plant the idea here because it is my next piece. You stop pre-building the asset. You keep the intent and the expectations ready, the parts that hold across clients, and let the client supply the only piece that is theirs, the context. The software gets built when the need is real, not before. I am calling it proto-software, software that waits in the wings until a client’s context calls it into being. And once you have all three in front of you, the intent, the context, the expectations, you can finally see how many tokens the build will cost. That is the next article.

Quality went next, more quietly. It dropped to the floor. The deterministic checks, the evals, SonarQube, and its kind hold quality now without a human reading every diff. Quality became a floor you weld down rather than a corner you trade. And the danger sits right there: when speed is free, and tokens are the number you watch, quality is the corner that gives in the dark, unless you have nailed it to the floor on purpose.

So two corners are gone, one to table stakes, one to the floor. One lever is still moving: cost. And cost is not the simple thing your client expects. They hear “AI” and picture fewer engineers and a smaller bill. The real equation has three parts. Human cost drops in headcount but rises per head, because the people who write the intent and build the evals cost more than the coders they replace. Token cost is being added and is climbing, not falling. And the third part, the discipline that turns the tokens into shipped value instead of a blown budget, is the actual service you sell. Balancing those three is the whole commercial game, and if you let the client keep score on cost alone, you lose, because you cannot out-discount a meter that is going up.

That meter is already biting. Uber burned through its 2026 AI coding budget in about four months, after Claude Code adoption jumped to 84% of its engineers, with per-engineer spend running from $500 to $2,000 a month. Its CTO said they were back to the drawing board. Its COO put the real question plainly: the link between that spend and shipped value “is not there yet.” One Microsoft division canceled Claude Code over cost and moved its engineers to an in-house tool. The meter is running, it is pricing upward, and the value side is still unsettled. The cost is here now; the value is the thing you have to prove.

## We have tried to hold intent before

The failure to hold intent is not new, and neither is the attempt to fix it. The clearest attempt was Agile. It moved the conversation forward, sprints, user stories, ship and learn instead of ship and pray, and underneath the ceremony, it was asking teams to hold the why and stop worshipping the document. Then teams turned Agile into a spec process with shorter cycles. Same documents, same front-loading, now in two-week increments. The problem outlived the fix because nobody named what the fix was actually for, which was never the ceremony but the intent the ceremony was supposed to surface.

That is the part no method escapes. A framework cannot sit in a room full of momentum and ask why. That part is yours, in every era, no matter what the method is called.

### No one is immune, not even me

I caught that team in ten minutes because I was outside it. I have written a whole series on [where spec-driven development breaks](https://medium.com/activated-thinker/the-trap-sdd-is-setting-48b2ad4f9cdc) and [what to do instead](https://medium.com/activated-thinker/the-method-that-replaces-spec-driven-development-idsd-66e921f6cdf7). Then last week I sat down to build something of my own, a small simulator, no client, no deadline but mine.

I went straight for the architecture. The full picture, the layered diagram, every box in its place, before a single line of it ran. I produced one version. It was wrong. I produced another. Cleaner, still wrong. The boxes looked right, the vocabulary was right, and the thing missed the point in a way an expert would have spotted in four seconds, and it took me four tries.

Then I stopped, and the floor dropped out, because I saw what I was doing. I was writing the spec first. I was front-loading the whole design of a thing I had not built enough of to understand. I was doing the exact move I had spent the week writing against as I did it.

So I dropped the architecture. I named the smallest shape that would actually run, the few boxes I needed, and nothing else, and said the rest gets filled in when we know more. The work came unstuck the moment I stopped pretending I could draw it all in advance.

I caught it because I was already looking for it. That is the only reason. Take that away, and I am the team with the ninety-six-thousand-dollar spec, and so are you.

## The Agentic Iron Triangle

The iron triangle governed the deal with the client. Down where the work actually happens, its successor took over, and it is worth naming, because it is the iron triangle remade. Call it the Agentic Iron Triangle. The three old constraints are all still there; agentic coding just moved each one. Time became Speed and left for table stakes. Quality dropped to the floor, where the evals hold it. And Cost, the one corner still alive, split in two.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wlHCqCY6c7qXdpltfp5Ung.png)

That split is the whole of it. You now spend two things to get work done: tokens and your own cognition, the attention it takes to direct the agents and hold the intent in your head. Quality stays on the floor underneath, non-negotiable, a deterministic pipeline holding it so it cannot quietly slip. And speed is no longer a corner you choose; it is what those two levers buy you, and it has a ceiling. You go only as fast as your tokens and your attention allow, and when the scarcer of the two runs out, you hit the wall.

That changes the question. The fast models from OpenAI and Anthropic are effective, they are addictive, and I love them, and they are expensive, and leaning on them is the trap. So stop asking how fast a single agent finishes. Ask how many agents you can run at once before your own head can no longer hold the load. That is where speed comes from now, parallelization, not a faster model. You buy it with tokens, running many agents with a clear intent, or you buy it with attention, driving fewer of them yourself harder. Either way, you pay, and the bill comes due in one of the two.

## The fix (if there is one)

Maybe there isn’t a fix. Agile decayed into a spec process; maybe ICE decays into a thirty-field intent form, and we land right back here, a new name on the door. TDD did not survive either, and here I am denouncing SDD and telling you IDD is the way to go. I am not going to pretend mine is the one that lasts. But here I am, still trying, so here is what holds for me.

And what do I do, knowing each method dissolves, knowing the industry is consuming concepts faster than we have ever seen? Vibe coding died in six months. SDD is starting to collapse within a year. Maybe IDD survives a little longer. None of that changes the next move, because the move was never the method. It is the discipline underneath whatever the method is called this year.

### What do I do

I weld the floor down before anything else. The evals are already built, and I make sure they never get skipped.

I built a skill for it, craft-ice, that knows my conversation and picks the thread up from there. I give it the intent in one sentence, who this is for and what they need, and if I cannot say it in a sentence, I stop, because I do not understand it yet. Then I check that the intent and expectations align, and only then do I move. If they do not, I restart.

> *Yes, it takes time. It is worth it.*

That is the cheapest, highest-leverage thing I do. It is also just the input. The rest is how I spend the two levers. Speed I buy by running many agents in parallel against that intent, not by reaching for the fastest model, and I run only as many as my own head can still hold. The moment I lose the thread across them I have hit my ceiling, and pushing past it is exactly where quality starts to slip.

And I no longer build the whole thing up front. The harness keeps the systems locked and a rough shape in my head, but the individual plays build when the need is real. The architecture I could not write on day one writes itself a few days in, after the building has taught me what it is. That is the proto-software move.

### If you are a CTO or CIO

You cannot write every intent yourself, and you should not try. What you can do is make sure someone owns the why. Name the person whose job, on every build, is to ask who needs this and what breaks for them if it never exists, and make that same person the one who supplies the intent. A decision with no owner is where the why quietly disappears.

And watch what you measure. If your dashboards count specs written and features shipped, that is what your teams will give you, and whether anyone needed the work never comes up. Measure something harder: whether anyone asked who this was for before it started. Your job now is to define value, not count output.

And build skills that review more than the code. SonarQube and Snyk already handle the code. What you do not yet have is a skill that reviews the intent itself and checks the ICE before a line of it is built. Build that one.

### If you are an engineer

Build the skills that build your intents. The code-writing is the part that LLMs and the harness have made easy; the skill worth having now is writing the software that guides them to do what they do best.

And do not measure yourself by tokens burned. Peter Steinberger posted a single month of 603 billion tokens, worth $1.3 million, while building an open-source project on OpenAI’s Codex. OpenAI paid; he works there. Most of the people posting their token counts are not paying that bill. You will be. Be the one who builds smart and spends tokens to ship software, not to top a leaderboard. Build your plays and measure both their outcomes and their cost in tokens.

## Why SDD collapses it, and why IDSD brings it back

Now put the spec against both triangles and watch what it does.

At the execution level, it spends the two things you cannot afford to waste. It burns your attention up front on the how, the part the agent was built to handle, instead of the why, the part only you can give. Then, because the spec has holes, the agent fills them wrong, and you spend tokens on the rework and more attention catching the drift. Both levers spike, so the ceiling drops and you go slower, not faster. And the spec looks so complete while it does this that the quality floor cracks underneath without a sound, because the document was wrong about the only thing that mattered. It lowers your ceiling and cracks your floor, and it does both while looking like rigor.

At the business level, it breaks the one remaining lever you have. The promise of this era is that token spend offsets human cost. The spec inverts that. You pay humans, expensive and slow, to write it up front, then pay tokens to build the wrong thing, then pay humans again to fix it. The offset goes negative. And you still miss the speed the client now takes as given. Every surviving corner of the old triangle is gone.

Which is what I was looking at in both rooms at the start. Five people, three months, ninety-six thousand dollars, that was the iron triangle breaking: cost with no offset, no speed, and wrong at the core. My simulator and I were the Agentic Iron Triangle breaking: my own attention poured into an architecture the building had not yet earned, the agent handing me confident, wrong boxes; the ceiling hit in four tries. The same mistake both times. We wrote the spec before we held the intent.

That is the collapse, and it is what SDD does. It was supposed to govern the model. It breaks it instead, in the room and in the editor, both, and the harder a team leans on the spec, the faster it goes.

The same two triangles come back the moment you stop writing the spec first. Hold the intent instead, and the levers reverse. Human cost drops to the few minutes it takes to form the intent, not the three months it took to spec. The quality floor holds, because the evals hold it, not because someone read every diff at midnight. And the tokens convert because an agent with a clear intent builds the thing once rather than building the wrong thing three times over. The offset goes positive. The ceiling lifts. That is what IDSD does. It brings the model back.

And it does not stop at bringing it back. The old triangle made you pick two of three and pay for the third, every time. Intent plus a harness loosens that. Speed is free now. Quality is held by machines that do not tire. The cost lever reaches further than human labor ever could. You end up with more of all three than the iron triangle ever let anyone have, not because the constraint is gone, it is not, but because the thing that always costs the most, deciding and holding the why, is the one thing that got cheap the day you learned to write it in a sentence and let the rest of the machine earn it.

I started with a room that could not answer one question. You will be in that room, if you are not already. So on your next build, before the spec gets long, ask it out loud: who is this for, and why are we building it? If the room goes quiet, you have just found the eighty thousand dollars before you spent it. That question is the one thing the machine will never ask of you. Everything else, it can now do.

## The IDD vs SDD series (all free, no paywall)

This is one connected argument. Wherever you started, here is the whole arc:

1. [The Trap SDD Is Setting](https://medium.com/activated-thinker/the-trap-sdd-is-setting-48b2ad4f9cdc?sk=e6bd922772cb6798056d597886ec108d), why the discipline collapses once building gets cheap
2. [Spec-Driven Development Isn’t Broken. It Collapsed.](https://medium.com/activated-thinker/spec-driven-development-isnt-broken-it-will-collapse-c00609f72496?sk=2da01d7d2abfb5bc0acaed7050a0e797), the deeper failure under the method
3. [The Method That Replaces Spec-Driven Development: IDSD](https://medium.com/activated-thinker/the-method-that-replaces-spec-driven-development-idsd-66e921f6cdf7?sk=2ae7d323c6b780291bfc760ff2bdc592), intent, context, expectations
4. [The Anatomy of Intent from ICE](https://medium.com/activated-thinker/the-anatomy-of-intent-ice-in-idsd-built-from-where-spec-driven-breaks-1597e5a16659?sk=836b8eeaf97cda521f0ad195162011c3), what intent actually is
5. [Spec-Driven Development Is Breaking the Fifty-Year-Old Iron Triangle](https://howtoarchitect.io/78431acba162?sk=cd2a36f452af96ccbfbcfcdeaa92ec06), the new triangle that replaces it

### Sources

- Uber exhausted its 2026 AI coding-tools budget in roughly four months as Claude Code adoption rose to about 84% of its engineers, with per-engineer spend running $500 to $2,000 a month; CTO Praveen Neppalli Naga said the team was “back to the drawing board.” The Information, “Uber CTO Shows How Claude Code Can Blow Up AI Budgets,” May 2026. COO Andrew Macdonald on the value gap, that the link between spend and shipped value “is not there yet” and the trade becomes “harder to justify”: Fortune, May 26, 2026 (Rapid Response podcast).
- One Microsoft division, Experiences & Devices, cancelled Claude Code licenses and moved its engineers to GitHub Copilot CLI by June 30, 2026; the stated reason was “toolchain unification,” with cost the implied driver. Tom Warren, The Verge (Notepad newsletter), May 2026.
- Peter Steinberger spent about $1.3 million, 603 billion tokens, in a single month building OpenClaw on OpenAI’s Codex (GPT-5.5); the cost was borne by OpenAI, which he joined in February 2026. Steinberger on X, May 15, 2026; reported by Tom’s Hardware and The Next Web.

## Thank you for being a part of the community

*Before you go:*

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*d9QTaaaxboQP_gKSLedW_w.png)

👉 Be sure to **clap** and **follow** the writer ️👏 **️️**

👉 Follow us: [**Linkedin**](https://www.linkedin.com/in/bhumika-ch-3784391b9/) | [**Medium**](https://medium.com/codetodeploy)

👉 CodeToDeploy Tech Community is live on Discord — [**Join now!**](https://discord.gg/ZpwhHq6D)

**Disclosure:** This post includes affiliate and partnership links.