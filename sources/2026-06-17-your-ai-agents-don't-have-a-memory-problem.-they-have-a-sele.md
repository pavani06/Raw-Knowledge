---
title: "Your AI Agents Don't Have a Memory Problem. They have a Selection Problem"
source: "https://x.com/eng_khairallah1/status/2067159489954881801"
author:
  - "[[@eng_khairallah1]]"
published: 2026-06-17
created: 2026-06-17
description: "We gave agents a million tokens in the context window but they still don’t work.Save this :)You give a capable model some tools and a long t..."
tags:
  - "clippings"
---
![Image](https://pbs.twimg.com/media/HK9whApX0AAHq4F?format=jpg&name=large)

We gave agents a million tokens in the context window but they still don’t work.

Save this :)

You give a capable model some tools and a long task. For the first fifteen steps, it's brilliant. Focused and precise. Answering the questions and interrogating the user well.

However, as the conversations start to scale, the agent starts to drift. The agent starts contradicting its decisions that it made ten steps ago. It starts polluting the context window with made-up information. It knows the user preferences exist, but can’t reliably fetch them. All while you struggle to figure out why things broke.

So you end up reaching out for more. A model with a bigger context window to hold the task for longer. Try optimising the RAG pipeline. Scout the internet for agent memory solutions. And nothing works the way you would expect.

Understanding the why behind this points us straight at the most valuable, least understood layer in the entire agent stack.

## The Failure Is a Loop

The reason agents degrade is not a shortage of capability. It is a feedback loop, and it has four links. Once you see all four, the usual fixes stop looking like solutions.

![Image](https://pbs.twimg.com/media/HK9pYH1XQAEiJWT?format=jpg&name=large)

**Link one: a model cannot use its whole context equally, and it gets worse as the context fills.**

This is the part most people never internalize. A model’s ability to use information is not uniform across its context window. Models reliably use what sits at the very start and the very end, and they systematically under-attend to the middle, even when they are specifically built for long inputs. Pack more in, and reliability drops further. This shows up even on tasks as trivial as repeating back a list of words. Add a single distractor, and performance measurably falls. Add several compound things.

So the effective context, the part the model can actually reason over reliably, is far smaller than the number on the box. And it shrinks as you stuff more in.

Now think about what an agent does. It accumulates. Every tool result, every step of history, every note to self gets appended to the context. Which means the agent is steadily lowering the quality of every step it takes. The growing context is manufacturing per-step errors.

**Link two: those per-step errors do not add. They multiply.**

A little per-step error would be fine if agents took a handful of steps. They take dozens. And the failures compound rather than accumulate. An agent that is 95 percent reliable at five steps does not stay 95 percent reliable over a 20-step task. Run enough steps, and you keep getting closer to a coin flip.

It is worse than that, because the errors are self-reinforcing. One tool call that goes slightly off-trajectory makes the next one more likely to go off too. Stack that on top of link one, where the base error rate is itself climbing as the window fills, and you get the signature failure mode of long-horizon agents. They do not degrade gracefully. They hold and then suddenly they cliff.

**Link three: the task is long, the model is stateless, so you put state somewhere outside the model.**

Language models retain nothing between calls. Every call starts blank. The only thing a model knows is what you feed back into it. So for any long task, you have to externalize the state. Scratchpads. Progress files. Checkpoints. Vector stores. Dedicated memory layers that extract facts and re-serve them across sessions.

This is correct and necessary. And it looks like a clean fix. The agent forgets nothing important, because everything important lives in durable storage.

**Link four: stored memory is inert, and pulling it back in feeds the very problem it was meant to solve.**

Here is where the loop closes. A model cannot reason over a database. It can only reason over what is in its context window. So memory helps only at the instant it is pulled back in. And every retrieval adds tokens. Every summary the agent writes to track progress is a token it has to re-read later. Every compaction step that condenses history to make room is lossy, and the detail it throws away is often the subtle one whose importance only becomes clear later.

So the memory system you built to defeat the context limit ends up feeding it. More memory means more retrieval, which means more noise in the window, which means more per-step error, which compounds, which is what sent you looking for memory in the first place.

The loop is real. And it does not care how big your context window is.

## Capacity Was Never the Axis That Mattered

Once you see the loop, the futility of the standard fixes becomes obvious.

![Image](https://pbs.twimg.com/media/HK9pfAJXAAA7z4t?format=jpg&name=large)

**A bigger context window does not break it.** It just raises the ceiling on how much rot you can accumulate before the cliff. Meanwhile, every study on effective context keeps showing the same thing: the reliably usable fraction grows far more slowly than the advertised number. You are buying capacity you cannot actually use.

**More memory does not break it.** It increases the volume of material competing to re-enter a window that already cannot contain everything in it.

**The next architecture will not break it either.** The challengers lined up against attention, state-space models like Mamba and its hybrids, win by compressing the past into a fixed-size state instead of keeping every token addressable. That buys linear-time inference and a memory footprint that does not grow with the sequence. It cannot buy a recall. A fixed-size state cannot hold everything, so it forgets by design. At scale, pure state-space models lag transformers on exactly the thing external memory exists to provide: pulling a specific fact back from an arbitrary point earlier in the sequence. This is why the serious post-attention efforts are hybrids that keep a minority of attention layers to do the recall, a state model cannot. The wall does not move when you change the architecture. You just reach it from the other side.

So the lesson is not “pick a bigger number.” It is that capacity that was never the binding constraint.

The binding constraint is the quality of the decision about which tokens occupy the window at each step.

That is the whole game. Not the largest available context, but the smallest sufficient one. Relevance over recall. Deliberate forgetting as a first-class operation instead of an accident of truncation. The research backs this directly: order-preserving retrieval of a few thousand well-chosen tokens beats dumping a full 128K window into the model. The advantage is in choosing what enters, not in how much can.

And this is the trap that catches most teams, because the tool they reach for to do the choosing is the wrong shape.

## Similarity Is Not Relevance

The default way to decide what context to pull back in is similarity search. Embed everything, and when the agent needs context, retrieve the vectors closest to the current query.

But similarity answers the wrong question. It returns what is close, not what is related. And those are very different things.

The question an agent actually needs answered is never “what is similar to this.” It is “given this task and this state right now, what connects to what matters.” That is a relational question. It is about dependencies, provenance, what superseded what, and which decision caused which outcome. A store tuned to retrieve similar vectors hands the model a pile of near-misses instead. And near-misses are exactly the distractors from link one, the ones that drive the per-step error that compounds into the cliff.

This is why the fix cannot be a thin cache in front of an embedding store. The intelligence is not in the lookup. It is in the structure.

## The Layer Nobody Is Pricing In

The most important layer to capture in the agent stack is not the model, and it is not the store. It is the layer in between. The one that decides what the model attends to.

![Image](https://pbs.twimg.com/media/HK9pkpqXQAAlvHB?format=jpg&name=large)

And to actually do that job, it has to be three things.

**It has to be neutral.** The internals keep changing under everyone’s feet. Transformer to state space to hybrid. One frontier model to the next, with a new price-performance leader every few months. A context strategy welded to a single model is a bet on a moving target. The thing your organization actually accumulates value in is its context, the hard-won structured record of what your agents know and have done. Lock that to one vendor’s memory features, and you have made your most durable asset a hostage to a roadmap that is not yours. A selection layer that lives outside any single model lets the same organized context serve every model you run, and the next one you have not adopted yet.

**It has to be horizontal.** A framework’s checkpoint knows about one run. A model’s built-in memory knows about one model’s conversations. A vector index knows about one corpus. None of them holds the picture that actually matters once you are running real workloads: many agents, many sessions, many models, all needing one coherent, queryable view of context. That system-of-record role is not something an app or a framework or a lab is shaped to hold, because each one only sees its own slice. It is a layer of its own, sitting horizontally across all of them.

**It has to be structured.** This is what separates it from “just a better database.” Selection is a relevance problem, and relevance is relational. Structure over the context, the relationships and dependencies, and provenance and supersession is what turns retrieval into selection. That is a fundamentally different primitive than storage, and it is the one the loop demands.

## “Won’t the Labs Just Ship This?”

The obvious objection is that the model labs will absorb this. They keep shipping memory and context features, and they have privileged access to the model’s own attention.

They will, and the objection is half right. For a single model wrapping a single app, letting the lab handle it is often enough. That is fine.

But the labs’ incentive is to make their own model stickier. That is the opposite of portability. Curation fused to one model’s internals cannot serve the multi-model, organization-wide case. A real context substrate is not competing with those features head-on. It exists for the situation the labs are structurally not inclined to serve: the one where you run several models across many agents and teams, and you refuse to let the layer that decides what your agents think about be owned by the vendor whose model they happen to run today.

And the trend only sharpens this. The more capable models get, the more they are used. The more they are used, the more agents an organization runs. The more agents it runs, the more a neutral, horizontal, structured selection layer is worth.

## Who’s building this?

This is where [Hydradb](https://hydradb.com/?utm_source=eng-khairallah1&utm_medium=influencer&utm_campaign=articles&utm_content=your-ai-agents-dont-have-a-memory-problem-they-have-a-selection-problem) comes in. Neutral, horizontal and structured. It holds the relationships, dependencies, provenance, and supersession that similarity search flattens away. It is temporally versioned and preference-aware, and therefore knows not just what is true but what replaced it. It unlocks visibility into what a given agent has learned over time. That structure is what turns retrieval into selection.

Underneath, HydraDB runs on tiered storage: a hot in-memory cache for active context, NVMe for warm, object storage for cold. Context is promoted and demoted by recency and importance, so the working set the model reasons over stays small on purpose. Between the model and everything it could know.

## The Question Every Agent Has to Answer

Strip away the architecture debates, the memory products, the context-window arms race. Underneath all of it, every long-running agent answers the same question on every single step.

Of everything it knows, what should it be thinking about right now?

A bigger window does not answer that. It just gives the agent more to ignore. The loop is real, it is permanent, and no amount of capacity closes it.

The industry is still trying to buy its way out with capacity. It cannot. The teams that internalize that it was always a selection problem will ship agents that work, while everyone else ships agents that almost do.

This was never a pure limitation of the models. Anything that operates under a finite budget has to choose what it attends to. Selection is not a workaround for today's limits. It is what reasoning under limits has always required.

**If you found this useful, follow me** [@eng\_khairallah1](https://x.com/@eng_khairallah1) **for more AI content like this. I post breakdowns, courses, and tools every week.**

**hope this was useful for you, Khairallah** **❤️**