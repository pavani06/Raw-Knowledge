---
title: "Ship Real Agents: Hands-On Evals for Agentic Applications — Laurie Voss, Arize"
type: source
source_type: video
source: "https://youtu.be/Xfl50508LZM?si=b4dEqxKcbbSeQa1M"
video_id: "Xfl50508LZM"
channel: "AI Engineer"
published: 2026-05-14
created: 2026-06-07
duration: "2:04:18"
extraction_method: api
tags: [ai, agents, llm, evals, observability, testing]
concepts:
  - "[[concepts/agent-evals]]"
  - "[[concepts/llm-as-judge]]"
  - "[[concepts/golden-dataset]]"
  - "[[concepts/eval-driven-development]]"
  - "[[concepts/data-flywheel]]"
  - "[[concepts/closed-loop-evaluation]]"
  - "[[concepts/tracing-observability]]"
  - "[[concepts/eval-iterate-cycle]]"
  - "[[concepts/reading-traces]]"
  - "[[concepts/generator-evaluator-pattern]]"
  - "[[concepts/verification-loop]]"
entities:
  - "[[entities/arize-phoenix]]"
  - "[[entities/anthropic]]"
  - "[[entities/agent-sdk]]"
status: processed
---

# Ship Real Agents: Hands-On Evals for Agentic Applications — Laurie Voss, Arize

> Source: https://youtu.be/Xfl50508LZM?si=b4dEqxKcbbSeQa1M
> Channel: AI Engineer · Extracted: 2026-06-07 · Method: api

## Transcript

Hi everybody. Uh my name's Laurie Voss.
I am head of developer experience at
Arize AI.
Uh in a former life, I co-founded npm
Inc. So, some of you may remember me
from when I used to talk incessantly
about JavaScript. Now, I talk
incessantly about AI.
Uh
what I think about mostly is how to test
AI systems, how to make AI systems that
actually work.
Uh
so, we've got a good long stretch of
time today.
Uh so, we're going to cover a lot of
ground.
Uh we're going to start with the
fundamentals, uh what evals are, uh why
you need them, and why agents make
evaluation harder than a simple LLM call
is.
Uh and then we're going to set up
tracing,
uh which is how you capture the raw data
that you need to run evals in the first
place.
Uh
We're also going to
uh run a simple AI agent with the Claude
agent SDK,
uh and look at the traces that it
produces. Once we've looked at the data,
uh we're going to do something that most
of the tutorials skip. Uh we're going to
actually look at the data. We're going
to read our traces, categorize what went
what went wrong, uh and figure out what
to
uh measure before we write a single
eval.
Uh then we're going to write three kinds
of evals. We're going to write uh a
simple code eval, deterministic, uh
cheap, easy to run. Uh we're going to
use some of Arize's built-in evals.
Uh
and then we're going to use uh LLM
evals, uh where an LLM uh judges the
semantic content of the output, uh and
writing an eval is to uh get it to
uh think out loud about what it is
doing. Chain of thought for judges uh
demonstrably improves how the judges
work.
Uh
so, you tell it to explain its thinking
first before it outputs that label. Uh
and that is going to that is, you know,
measurably, demonstrably going to
improve the quality of the output that
you get uh because it's going to do a
bunch of uh token generation before it
decides whether or not the thing is
good.
Uh
so, if you are coding along, now is the
time for you to see if you can write a
better eval than I can.
Uh
this is what a custom LLM as a judge
looks like. It is just a really big
prompt. This has all of the things that
I just mentioned. So,
uh
you are an expert financial analyst, uh
list of things that make it actionable,
things that make it not actionable, an
example, uh uh,
uh, begin date and an end date a block
where I put in the input and the output,
uh,
and based on the criteria above, is this
financial report actionable or not
actionable? Uh,
you are probably not going to be able to
write a better like off the top of your
head going to be able to write a better
prompt than this cuz I had a lot of goes
at it. Uh,
but it's fun to try. So, feel free to,
uh,
plug in your your examples of what, uh,
an actionable report should look like
now. Uh, and then we're going to write
it down.
Uh,
to actually use this once we've written
our prompt, uh, we're going to use a
helper called the classification
evaluator. This, uh, creates an LLM as a
judge for Phoenix,
uh, and we only have to give it four
things. We have to give it a name,
actionability, which is the label it's
going to show up with in Phoenix.
Uh, we have to give it that prompt
template, which is the thing that I just
showed you above. We give it an LLM
because it has to do the judging
somehow.
And then we give it choices, uh,
which are labels with scores. So, it's
either actionable, which we're saying is
a 1.0, or it's not actionable, which
we're saying is zero.
Once again, we suppress tracing, yeah?
>> Oh, yeah. Sorry. So, so what about the
channel posts uh, thing
what what I'm saying that you have first
write your reasoning and then and then
just
>> That's true. I left that out. I told you
you should and then I didn't. Well
spotted. Somebody's actually paying
attention. This is amazing.
Uh,
uh, cuz it's really warm in here and
it's like 4:30. Uh,
so let's look at the scores and see, uh,
what stuff came in as an actionable and
what did not. Uh,
this is a capability eval. I was talking
about regression evals versus capability
evals. This is a perfect capability eval
because it's not doing very well. Uh,
in, uh,
six, I think, of the cases, uh, it came
up with actionable stuff and in the rest
of the cases it came up with not
actionable stuff.
Uh, that means it has a hill to climb.
That means that we can
uh, tell the agent to get better. Um,
uh,
and it's actually going to have some
head room to get better.
Um,
so we log the annotations back to
Phoenix uh, and now we can look at
Phoenix and you can see the
actionability scores inside of Phoenix.
We can do the same filtering that we did
before. Uh,
actionability
I did not think about when I was doing
this whether or not I was going to be
typing with one hand. I would have
chosen shorter labels.
Right.
So that's actionable or we can say not
actionable.
And we can get the ones where it failed.
Uh, and we can like we did with the
other ones we can click through
to our annotations, look for
actionability, and get an explanation.
So we can say the financial report is
described lacks a concrete buy, sell,
hold recommendation.
Uh, Haiku is messing up here. This is
what This is why we picked Haiku cuz it
was going to mess up. Uh,
and
uh,
you can filter and sort by anything. So
you can filter by latency, you can
filter by number of tokens, you can
filter by cost. You don't just have to
You don't have to filter by just your
labels. So
uh,
one of the ways that you can use that is
for instance if you have an agent that
is getting the right answer but very
expensively, right? It's doing a hundred
web searches and eventually getting your
answer.
Uh, that is not good in production and
you can go and look for those expensive
calls, those expensive operations, and
tweak your prompt such that it does
things in a cheaper way. So you don't
have to just uh, Phoenix is giving you a
bunch of things uh, to search for that
are not just uh, the stuff that you put
in. It's giving you a bunch of extra
information.
Uh,
like I said uh, this one uh,
it said that it was not
lacto concrete by sell by sell hold. If
we filter through to other ones, we can
get other actionability explanations. Uh
The report which presents strong
financial data and forward-looking
analysis uh and provides context. Uh
But the the absence of an explicit
recommendation or actionable investment
directive places it in the in the not
actionable category. Great. That is what
we wanted this thing to do.
So, uh you should be treating your evals
like code. Uh Your evals, the wording of
that prompt that we just put together of
how exactly to measure whether or not
your agent was doing a good job uh is
going to drastically change word by word
inside of that prompt because LLMs are
so non-deterministic. So, you should be
versioning your prompts. You should be
storing them. You should make sure that
you know like five versions ago what did
this prompt do if things go radically
off the rails.
Uh
And you should test them on examples
where you know the right answer. So, if
the judge disagrees with your human
labels on 40% of examples,
that means you're the prompt you've
written is not very good. Uh
You can iterate on rubrics without
touching code.
An eval that you haven't validated is
just a fancy way of being wrong at
scale.
Um
One other thing that I want to flag in
writing custom evals is in custom LLM as
a judge is the god evaluator. It is very
is very tempting to write a single LLM
evaluation that tries to test for
everything. So, it's going to test for
accuracy, tone, completeness, policy
compliance, formatting,
and don't do that because it is a
nightmare to calibrate. Uh If it fails,
you don't know why it has failed. You'd
have to get it to output an extra word
saying this is the one of the five
things I was testing.
Instead, uh
split your evaluator into one thing per
dimension.
Uh, so, test for accuracy, test for
completeness, test for tone, uh, but
test for all of those with a separate
LLM eval.
Um,
and, uh, I want to talk about guardrails
versus North Star metrics. Uh, some
evals are guardrails, like they're ship
blockers, like,
uh, if,
uh, the agent hallucinates a stock
price, that's probably a hard fail for
this one, right? We don't want it to say
buy when it should have said sell. Uh,
but if we say that you should always
recommend complimentary investments,
that is a nice to have, not a deal
breaker. Uh, so, you need to know which
of your evals is which, which ones
should be ship blockers, and which ones
are just informative.
Uh,
meta-evaluation is the thing that we've
been dancing around so as far. Uh, how
do you know that this custom rubric that
you've written is actually working? How
do you know that, uh,
these this thing where this this code
that you wrote that is now saying
whether stuff is actionable or not
actionable is trustworthy?
Uh,
the way to think about it is, uh, your
judge is a classifier. It is an an ML
classifier, that is the mental model.
Uh, so, it takes an input and it makes a
prediction,
um, and just like any classifier, you
can measure its performance by, uh,
comparing its predictions against ground
truth.
Uh, so, in this case, your own human
judgment, you can use to, uh,
check the LLM's work.
Uh, the problem with human judgment is
that it involves a lot of human effort.
Uh, you have to actually look at the
results of your evals and compare them
manually, saying, do I agree with it in
this particular instance? Uh,
if I go into a span in Phoenix,
uh, I can add an annotation,
uh,
so, in here, I could create a new
annotation which is like, does the human
trust this? And say yes or no. Uh
and I can do this programmatically or I
can do this in the UI. Uh and I can put
in a whole list of human evaluations of
my evaluations, whether or not I think
these things are actionable. And then I
can do a comparison of the LLM as a
judge to my human annotations.
Uh
I'm not going to go into the detail of
how that is done cuz it is boring. But,
um
what we're doing here is we are building
a golden data set. Uh golden data sets
are incredibly helpful. I mentioned them
right at the beginning. Uh they're a way
of measuring whether or not your
evaluator is doing a good job. Uh and
the way that you do this is the same
thing that the LLM LLM did. You should
give yourself real concrete criteria for
deciding whether or not
uh this thing is a success or not a
success. So, don't just go in as a human
and be yes, it worked or no, it didn't
work uh
because that is you're going to have the
same problem the LLM is having. You're
going to be arbitrary. Uh you should be
essentially reading the same prompt that
you've given the LLM and deciding
whether or not you believe uh according
to these rules that you've given
yourself whether or not this thing is or
is not actionable. So, give yourself
examples, eliminate ambiguity,
uh and uh eliminate the chance to get
lazy.
Um
as you do this, you should build you
should uh keep your tasks unambiguous.
Um
if your agent scores 0% consistently,
that's almost always a broken task. That
always means that, you know, your agent
is failing to do anything. Uh so, it's
not a good eval. Uh
if you This can happen if you've made
your eval task something only a human
could do. And your LLM you've made it
something that your agent couldn't
possibly manage. Uh
so, for each the way to avoid that is
for each task create a reference
solution. Decide in advance what it was
that you wanted an LLM to have output in
this situation, and then you'll be able
to judge whether or not the LLM is
getting anywhere close to that.
Uh, you can also test in both
directions. You can test uh, cases where
the behavior should occur and cases
where it shouldn't. Uh,
and you should only test uh,
for instance, if you if you had a test
that was does it search the web? That is
absolutely a thing that you want a
financial agent to do.
Uh,
you could accidentally create an agent
that always that cheats the eval. You
could create an agent that always
searches the web whether or not it needs
to. So, you need to make sure that you
have test cases in your eval set that
are this is a case where it doesn't need
to search the web, uh, and did it not
search the web when that happened?
And your golden set is not just test
data. It is the encoded judgment of the
people who know your domain the best.
Uh, so it's going to grow as you find
more test cases. Uh, and today's
production failure are going to become
tomorrow's test case.
Uh,
if you're doing this for real, the other
thing you should do is you should split
your golden data set.
Uh, it is possible to create an eval
that is overfit to your golden data set.
It passes your golden data set, but it
hasn't properly generalized. It's just
accumulated a bunch of examples of
exactly your golden data set, and so it
passes them. So, you should split your
golden data set, uh, you know, 75 25
into the ones that you are training it
on and the ones that you tested against.
So, every time you make a change to your
prompt, uh, you can then run against the
25 that it's never seen before.
Uh,
and you can see whether or not it
actually does uh, a good job.
So,
uh, let's run our actionability judge.
Um,
uh,
on the exact same examples that we did
before.
Um I've used a span query to do the
filtering just like we can do in the UI.
Um
And I've got uh only the failing ones.
Uh
Sorry, no. I've got the human actionable
ones.
Uh
So, and I've done this line here where
I've ta- taken the
complicated attributes that input that
value and turned it into input and
attributes that output that value and
turned it into output cuz that is what
our eval is expecting.
Um
So, now let's see whether our agents
disagree or agree uh with the
annotations that I put in uh about human
actionable stuff.
Uh
What we get here is
uh
two out of six times
uh my human actionable label and my
actionable label
uh have disagreed.
Uh
I will
confess that what I didn't do is
actually come up with uh human
actionable labels. I just assigned human
actionable versus not actionable kind of
at random so that I would have some real
data to point out because I only have
six
six answers here. Uh
six places where it failed. Uh
and so uh it's really not enough to do a
real set. A real set would be 20, 50,
100, 200.
Uh So, to have actual data to look at uh
I just uh put stuff in at random.
Um
Uh but what this gives us is, you know,
if I had done it for real, what this
would give me is uh
a sense of whether or not uh my judge my
human judgment is matching up to the
judgment of the LLM. This is uh
the this is my golden data set testing
against
uh the LLM as a judge and figuring out
where they disagree.
Um,
which brings us to, uh, rubric
iteration. Um,
in the same way that we can take our
agent and we can improve our agent by
improving the prompt, uh, we can take
our LM as a judge and we can, uh,
improve the LM as a judge through
iteration.
Uh, to do that, we need to think about,
uh, uh, precision and recall, which are,
uh, more of those opaque ML terms that
the researchers snuck into our AI
engineering, uh, lives. Um, they're not
that complicated. Imagine a spam
predictor. Uh,
a spam predictor is going to say whether
stuff, uh,
is spam or isn't, uh, and you can
compare your spam predictor against
whether or not things are actually spam.
So, there's four possible outcomes. It
can say that it's spam, uh,
and it is spam, which is a true
positive. You can say that it's spam
when it's not not spam, which is a false
positive. Uh, you can say it's not spam
and it's not spam, a true negative, or
you can say it's not spam and it is
spam, uh, which means that you missed.
Um,
machine learning engineers have two ways
of measuring this data, uh, and they
conflict with each other. So, you have
to pick,
uh, you have to decide for your use case
which of these things you want to
optimize for. So, the first way is
precision. Precision is out of the
number of true positives out of the
total number of positives. If high
precision if you've got high precision,
that means you've made the false prompt
false positives number small. Uh, that
means you're minimizing false positives.
If you're in a use case where,
uh, false positives are really
dangerous,
uh, that is what you want to do. That's
great for spam, for instance, uh,
because you don't want to send a real
email to spam and you were okay with
getting a certain amount of actual spam,
uh, in exchange for not doing that. Uh
but recall is the opposite. It is out of
the real positives and the misses, what
percentage uh were really positive. Uh
this is uh for this one, to make it go
up, you want to minimize the number of
misses. You want to minimize the number
of false negatives. Uh
a good example of when you do this is if
you were doing like uh health stuff. If
you were doing cancer screening, uh
you would absolutely want as few misses
as possible. You're okay with a ton of
false positives uh when you're doing
cancer screening as long as you don't
miss somebody who actually has cancer.
So,
uh those these two uh measures are going
to go in opposite directions if you
optimize. So, you have to pick one for
your use case and decide how to optimize
it.
Uh so, let's look about look at what
that looks like uh in practice.
Uh I wrote a bunch of code here that
calculates all of these things
uh and it came up with uh precision and
recall
uh
for my judge. So, uh the precision of
this one uh is really good. When the
judge says fail, is it right?
Uh 100% of the time it is correct. Uh
and its recall is really bad,
uh which is of all the real fai- fails,
how many does it catch? Uh
this is what you would expect. You would
not expect to get 100% on one of them.
So, I have made something uh
that is really good at precision. It's
really good at avoiding false positives.
Um
uh
With such a small sample, these numbers
are basically useless, right? You want,
you know, fif- you want a golden data
set of 50, 100, 200 things, uh and then
you're going to get real numbers for
precision and recall. This is very much
a toy example.
Um
And in most eval scenarios, you're
probably going to want to prioritize
recall because it is better to flag a
few false positives than to miss real
failures. A false positive just means
you have to review something as a human
uh that's actually fine, whereas a
missed failure
uh means that
bad output reaches your users. But like
I said, there are some use cases, for
instance medical use cases, where you'd
want to do the opposite.
Um, a few known pitfalls
uh
with using LLM judges are worth keeping
in mind. One is position bias.
Uh if you present two options, the judge
tends to favor, depending which model it
is, either always the first one or
always the last one. Uh
there's length bias. LLMs prefer longer
responses over shorter responses just in
general
uh and will tend to prefer them. Uh
there's confidence bias. Your judge can
get fooled by a response that sounds
confident,
uh just like humans can.
Uh and there's self-preference bias. If
you're using the same model to judge as
you are to generate the output in the
first place,
uh they tend to like their own output.
Uh which is another one of the reasons
that we use uh a different model as a
judge uh than we do as the one that is
running the agent itself.
Um
you can also consider using a completely
different provider. So you can use
Claude to do your agent, you can use
OpenAI uh to do your evals. Uh and
you're going to get more reliable evals
than you would if you use Claude for
everything.
Um
how do you know if these biases are
affecting your results? Uh you have to
track judge accuracy across different
categories of inputs. So if the judge
always passes long responses and always
fails short ones, then you know that
you've got a long bias problem. Uh if it
passes everything from one category of
query
uh and fails everything from another,
you have to dig into why.
Um
and the your benchmark here should be
human performance, not perfection. Uh
which is the last thing I want to say
about meta-evaluation. If you give two
humans the task of producing your golden
data set and say, "Tell me whether or
not, for instance, this report is
actionable or not actionable." They're
not going to agree all the time. In
fact, they're going to disagree a
surprising amount of the time. Uh
inter-rater reliability is often as low
as 0.2 or 0.3 of the time. Uh so two
experts, the same output, the same
rubric, and they will disagree. Uh so if
your judge LLM judge achieves higher
consistency with you than that, if it
achieves 0.4, it's doing really, really
well.
Uh so the judge disagreeing with you is
not necessarily a reason to throw out
your eval. It's if the judge disagrees
with you more often than a human would
disagree with you.
The other thing you should do is that
your failures should seem fair. This is
something that Anthropic brought up when
they talked about meta-evaluations. Uh
when a task fails, it should be clear
what the agent got wrong and why. Uh so
if you look at a failing trace and think
that answer looks fine to me, uh
the problem is probably the eval, uh not
the agent. Um
this actually happened at Anthropic.
Claude Opus uh initially scored 42% on a
benchmark called CoreBench, uh and they
that seemed low, and they went and
looked into what it is that CoreBench is
actually doing, and they found multiple
problems, not with the model, but with
the eval itself. Uh so uh for instance,
the eval was checking for uh an answer
of 96.12,
and Claude was giving it the answer of
96.124991,
and it was saying, "No, that's not
right, cuz that's not what I was
expecting." Uh after fixing the eval,
Opus's score jumped to 95%. So, uh your
evals can be uh completely uh can be
judging things as wrong when they are
just being too strict, or they are being
they are judging something that is not
what you were trying to judge.
And the lesson here is that you should
not take evals at face value. You should
always be looking into the explanations
of your evals. You should be looking
into the output of your evals. You
should be checking it against the data
golden data set uh
to uh make sure that you're actually
improving the agent.
So, the
uh step seven and the last thing I'm
sure you'll all be glad to know
is
uh
uh data sets and experiments. This is
how you go from just measuring where the
things are wrong to actually improving
your agent.
Uh so, you've found some failures,
you've read the explanations, you know
what to improve.
Um
So, you change the prompt and then what?
How do you know that your fix actually
worked? How do you know that you have
improved your agent?
Uh how do you know that you didn't break
something that was working before? If
you just run the agent again on a couple
of examples and eyeball it, that's just
going back to vibes. You need a
systematic way of testing whether or not
your changes to your evals uh to your
agent have actually improved your evals
in a systematic way, and that is what uh
experiments are for.
So,
for this we go to a completely different
part of the Phoenix UI. We go to the
whoops, there we go.
You didn't see that. Uh
we go to our experiments uh evaluation.
To do that, uh I'm going to you can go
to
to produce your data set, uh you go to
your
uh
uh to your traces, and you take for
instance a bunch of failing traces,
uh and you click add to data set.
Uh you can create a new data set using
this little plus here, you can or you
can add to an existing data set, and
that gives you in this case
uh
AI agent financial failures. So, you can
click through to examples, and you can
see I've taken the six times when our
actionability trace failed.
Uh sorry, when our actionability eval
failed, uh and I've put them into a data
set. Cuz this is what I want to do. I
don't want to run all 13 every time or,
you know, in production all 1,000 every
time. I want to run my my new prompt
against only the times
uh that it failed, and I want to see if
if getting any better.
Um
So, now we improve the agent. Uh we can
look at what the evals told us. Uh the
actionability eval said that some
reports were not actionable cuz they
summarized data, they didn't give
explicit recommendations.
Uh
So, we can update both prompts. The
research prompt, like I said, now
explicitly requires uh specific
financial ratios. Uh it requires recent
news, current price data, uh and the
writing prompt now explicitly demands a
buy buy sell hold recommendation.
Uh
That's happening here.
Uh
If you are still coding along, well, all
the power to you. Uh
and this is where you can try and do a
better job than I did of improving the
agent. Uh you can give it a better
research prompt, you can get a give it a
better write prompt.
Um
Notice how every change that I've made
to the prompts here maps to a specific
thing that we found wrong in the evals.
I'm not just randomly changing my my
agent prompt. I am changing it in
response to specific things that we
noted in the evals. So,
uh
financial ratios, news in the last 6
months,
uh a buy sell hold recommendation, those
were things that in the explanations
from our previous LLM as a judge, it
said were missing, and we've said,
"Okay, include those things." So,
uh we are not just getting
uh
a notice that we are wrong, we are
getting direction from our evals on what
we could do to do better, and we are
feeding that directly into our agent and
making the agent better that way.
Um
This is data-driven prompt engineering.
This is what uh ARISE is all about. It's
about taking a bunch of stuff uh
that uh LLMs tell us about what our what
is failing and what is not failing, and
turning it into real improvements to our
agent.
Um
So, now let's run an actual experiment.
Uh
To do that, you need a task for your
experiment to run. Uh in this case, it
is our improved financial report. It's
basically exactly the same agent again.
Uh
and we've given it and we've taken that
agent and we've put it into a task
function uh which just runs that agent
with the input and output that we're
expecting.
Uh
we've created a new classification
evaluator.
Uh again with the label actionability.
Uh we've given it uh the same
actionability template. Um
and the
uh
created this new evaluator and now we
are running
uh
our
we are fetching our data set the of just
the failures.
Uh
and we are going to uh
run our
uh
async client which is faster, basically,
uh against that set of just the
failures.
Uh so you can see here
uh
ta-da! Uh my appro- my improvements to
my agent have uh one-shotted the agent
from getting uh five out of the 13
responses as actionable or not
actionable.
Uh
and it is uh all six of my previously
failing
uh tests are now running correctly. So
you can see that here.
Uh you can see the results in this
graph.
What I've done here is not how it would
look in production. If you were in
production, you would have got a you
would have made some very small change
to your prompt and you would have got
some very marginal improvement across a
thousand sets and you would get this
small you would get this graph of uh
your agent slowly getting better at all
of these things. I've one-shotted it
here because uh you know, it's already
been 90 minutes. We need to get out of
this thing sometime.
Um
but this is the hill that you're
climbing. This is this is literally uh
how you get from zero to 100% score is
you measure inside of your experiments,
did my prompt change prove prove
anything, did my experiment get a higher
score or a lower score the next time?
Sometimes you're going to make a change
that's going to make your score get
worse
and you're going to have to undo it, go
back to your previous version of your
prompt, change something else. That's
why you treat them like code.
Um
the key thing here is that
uh
a Phoenix experiment doesn't care what
your task does
at all. So, in this case, the task that
I gave my experiment was the run the
full agent again against a new set of
data. But if
if our eval had told us
that our tool calling was bad, I could
have just run an eval that only runs the
tool calling and that would have been
much cheaper and much faster than an
eval that runs the entire agent. Uh so,
you can run experiments against a chunk
of what your agent is doing, a small
subset of what it's doing, and improve
that part uh without having to
expensively run your whole agent every
single time.
Uh the power of experiments is
controlled comparison. So,
uh
you get the same inputs, the same
evaluator, the only thing that's changed
is the agent's prompts and that means
that any difference in scores is
attributable to your change.
Uh you're not wondering whether it
scored higher because of your prompt
change or because the web search happens
to return better results this different
this time.
Uh you've eliminated a major source of
variation.
Um
Ideally, what you do is you run each of
these multiple times to account for the
non-determinism of your output.
That is the pass at K concept that I'm
going to touch on just towards the end.
But for now, a single run per example
gives us a good enough signal uh
to tell us whether things were right or
wrong.
Um
and this eval iterate cycle is where the
real value lives in evaluation.
Uh you get your results, you improve
your results, you improve your results,
and you slowly improve your your app. Uh
one of the things that you could do at
this point is say, "Why am I as a human
doing this at all? What if I got the
output of the eval tool and gave it to
Claude code and said, 'Hey Claude code,
go back to my app and improve it
somehow.'" And that is closed-loop
evaluation, which we think is very
exciting and it's definitely going to
happen as the models get better. Where
you've written the initial version of an
app and then you use evals as the
feedback mechanism uh to your coding
agent, which then automatically improves
your app without you needing to be
involved at all. Uh I'm not doing that
here because again, uh we've all been
sitting here and we're very warm. So,
I'm not going to, you know,
stretch my welcome uh any further than
I've already stretched it.
Um
A good question that you probably have
is how many samples do you need? I've
mentioned 50, 100, 200, 400 samples.
Um
you don't have to just eyeball this, you
can use math. Uh
if you're aiming for an agent that fails
only 5% of the time uh or if, you know,
3% of the time,
uh 200 samples at 3% defect rate will
give you 95% confidence interval
uh
which would be anywhere between 0.6 and
5.4%. Um
3% of failure sounds good, right? 3% is
less than 5% uh which is what you were
trying to get to. But, because of the
confidence interval, your actual uh
failure rate could be anywhere from 0.6
to 5.4%. Um
if you double the size of your sample to
400, uh you reduce your confidence
interval to 1.3% to 4.7%, which means
that you're now constantly below the 5%
threshold and you can ship. Uh but, to
do it, you had to double the number of
samples. So, that means you had to
double all of the effort, you had to
double the size of your golden data set,
you had to double everything.
Uh
so, at some point uh you need to make a
uh cost-benefit analysis of like how
accurate do I need this agent to be? How
much effort am I willing to put in uh to
get this thing to be 2% more accurate
than it used to be?
Uh
From workshop scale experiments like
today,
12 to 20 examples gets you directional
signal. Uh for shipping decisions, 200
to 400 examples is a good target.
Uh how do you make the cycle systematic?
When you're iterating, uh where do you
invest your effort? Not every change has
the same impact. Uh there is a
hierarchy.
This is the impact hierarchy that I
mentioned right at the beginning. Uh the
impact hierarchy tells you where to
focus first. Data quality fixes have by
far the highest impact. Uh
if your agent is searching the wrong
sources, if your knowledge base has
stale data,
uh no amount of prompt engineering is
going to get you there. Uh
so,
uh
you should fix the data first. Once
you've Once you're sure that the data
you're giving to your agent is high
quality, uh prompting improvements are
the next highest thing to do. Uh
few-shot examples in your prompt,
explicit instructions, constraints on
what the agent should and shouldn't do,
those are often the highest ROI changes.
Uh
And then, model selection comes third in
the impact hierarchy. Sometimes a more
capable model solves problems that
prompting can't, uh but it also costs
more, so you have to make a trade-off
about whether or not that's worth it. Uh
and then, uh
hyperparameter tuning, things like
temperature, top P, that kind of thing,
uh they're right down at the bottom.
They very seldom make a meaningful
difference to the outcomes of your
evals.
Uh
One thing that you can consider doing is
writing your evals before you build a
feature. Uh
If you want your agent to always vest
verify customer identity before
processing a refund, for instance, you
can write an eval that checks for that
first, and that gives you a capability
eval and a hill to climb. Uh
This is the same as test-driven
development, which is to say that
everyone says it's a good idea and few
people actually do it.
Uh
Eval-driven development in practice uh
is how things like Claude Code evolved.
Anthropic built capability evals uh and
then gave Claude Code a hill to climb.
Um
When a new model dropped, they would run
the suite uh and immediately see uh
which of their bets had paid off. They'd
immediately see which of the changes
they'd put in in advance uh had actually
helped it uh
do things better and which ones had not.
Um
So, who can write these evals? Like I
said earlier, uh you should be getting
your uh non-technical stakeholders
involved because they are going to have
a much better idea of what good and bad
are for the purposes of writing your
evals.
Um
So, product managers, customer success
reps, uh sales people, they can all
contribute to eval tasks and make your
evals better.
Sorry?
Absolutely, cuz they can tell you, you
know, they can tell you a simple test
would be
uh this should be present in every
single answer and you can turn that into
a code eval.
Uh
but mostly they're going to be working
in prompts.
Um the other pattern worth knowing about
is the data flywheel. Uh
So, the more uh expert and uh the more
expert judgment you add, the bigger your
golden data set, uh
the better your eval suite is going to
get, uh and each each iteration
compounds. So, as your eval suite gets
more comprehensive, your agents get
better, your understanding of failure
modes deepens, uh and what this does is
this creates a differentiated data set
that becomes a competitive advantage.
Nobody has your evals but you. Nobody
but you has this long list of production
data and production evals that say uh
these are all the ways the agent can
fail. This creates a moat that other
people don't have uh that can help you
differentiate your agent against an
another agent in the marketplace that is
trying to do the same thing.
And one last practical benefit of evals
is the model adoption advantage. Like I
said, new models drop all the time. If
you've got a comprehensive set of
regression evals, then
you're going to be able to know
within a couple of minutes whether or
not this new model makes your evals
makes your agent worse or better
and whether or not you can ship using
the new model.
So now you'll all be relieved to know
that we are nearly at the end of this
workshop. Thank you all for staying
through to the end. I'm very impressed
with you all.
Uh
I'm going to give you now a quick tour
of the things that we didn't cover so
that you know what to Google
to go even further than where we went
today.
One is production monitoring.
This is something that our enterprise
products uh
um
puts a lot of emphasis on that Phoenix
does not.
Once you've shipped an agent to
production, you can send a certain
percentage of your traffic
to an evaluation suite and be
consistently evaluating all of the time
whether or not your agent is performing
well.
This can show up drops in model quality
because sometimes those happen without a
model change.
It can show adversarial attacks where
people have discovered a way to make
your agent fail
and testing against production can guard
against that. And it can also test uh
agent drift, model drift.
As your use case changes, as your
product changes, things that used to
work in your agent will stop working
and continuous production evals
can find those.
You can also do cost aware evaluation.
Like I said, we used Haiku for our agent
and Sonnet for our judge
because those are cheap models and they
go fast.
But in production you can go further. Um
you can use different models for
different types of queries. So, you
know, if the query is what are your
hours,
that doesn't need the same horsepower
as, you know, analyze the comparative PE
ratios of these five semiconductor
companies. So, you can do tiered model
selection. You can do cheap models for
simple queries and expensive models in
your agent for complex queries.
Um
one of the ways you can do this is cost
normalized accuracy, which is a Google
phrase that I'm dropping in here just so
you can Google it.
It's a way of making these trade-offs
concrete. It is accuracy divided by
cost. So, an agent that's 92% accurate
at 2 cents a query might be better than
one It might be better value than one
that's 95% accurate at 15 cents a query.
And the Evals will tell you whether or
not that trade-off is worth it.
Uh and then there's pairwise evaluation.
Uh
like I said earlier, one of the things
that it's tempting to do with the Evals
is ask the agent to rate something from
1 to 10. It's very bad at doing that. A
thing that it's much better at doing is
is give it two examples and ask it to
compare which one is better.
That is pairwise evaluation. You can say
out of these two outputs, which one did
better? And it it does a much better job
of comparing the two because it has two
concrete examples to work with.
Uh this is especially useful for AB
testing prompt versions or model
upgrades.
Um
and then there's reliability scoring. I
mentioned pass at K. Um pass at K asks
whether uh can the agent succeed at
least once in
in K tries?
Uh
and then there's pass to the power of K,
which is can it succeed every time in K
tries?
As as the value of K increases,
these two measures of reliability
diverge dramatically. Um
pass at K approaches zero. Sorry, pass
at K approaches 100% and pass to the
power of K approaches zero. Um
which one you care about is going to
depend on your use case.
Uh, a coding assistant that eventually
gets it right, that's great for pass at
K. You can just keep trying and and
trying until it produces something that
works.
Uh, whereas a customer support assistant
that gets it wrong after five try, you
know, every fifth try uh, is a failure
as far as your customers are concerned.
So, uh, pass at the power of K is how
you would measure a customer service
bot.
Um,
and then there's the frontier. There's
multi-judge systems where you can, you
know, your LLM as a judge can use
multiple judges simultaneously uh, to
get different opinions,
uh, to look up facts, they can verify
claims. Um,
but that is
fundamentally
uh, the end of what we've covered today.
This is the loop. Uh, you instrument,
you trace, you eval, you human annotate,
you analyze those annotations, you
improve your agent, and then you go back
again.
Uh,
some final tips is one is you should
start small. Uh, you don't have to do
all of this at once. Start by reading
your traces.
Um, 15 minutes of reading real outputs
is going to do a lot better than, you
know, hours of fiddling with your prompt
if you haven't read the traces and
haven't read the explanations.
Um,
write one code eval as your very first
eval. Check that it's in the format that
you expected. Check that the string
you're expecting to be there is there.
Uh, and then slowly build up your eval
suite from there.
Create capability evals first, and then
as you pass them, turn them into
regression evals.
Uh, evals are infrastructure. Uh, some
teams create evals at the very start of
development, some add them once they're
at scale. Uh,
but the time that you need evals is when
vibe checking becomes a bottleneck to
improvement. When you find uh, that
changing one thing has broken three
other things without you noticing, that
is when you need e-vals.
Uh the first time a regression shows up
before it reaches your users instead of
after,
uh you will have justified the cost of
building your e-vals.
Uh so now is the time to go and try it
for real. Uh you already have a Phoenix
Cloud account. Uh this is the link to
the Phoenix docs. Uh and Phoenix itself
is open source, so if you feel like
contributing to Phoenix,
uh that's great. Um
And
just as a final plug, I should mention
that there's a Rise AX. So you can do
everything that you can do in Phoenix in
Rise AX, but there are some things that
you can do a Rise A in Rise AX that you
cannot do in Phoenix, and they're all
enterprise-y things. So uh
if your company is very, very touchy
about its data, then you're going to
want things like SOC 2 and other
compliance measures. Uh AX can provide
those for you. If you need things like
uh multiple teams interacting,
uh you can do SAML and SSO.
Uh if you have a production agent that
is running at billions of rows and
billions of traces, uh we have a
technology called Rise DB that helps us
do that.
Uh
AX gives you session-aware agent
tracing, so not just individual agent
turns, but a user's entire session from
the time they logged in to the time they
logged out.
Uh we have an AI assistant called Alex.
Uh
we have beautiful graphical
representations of what your agent is
doing.
Uh we have metrics, we have dashboards,
we have monitoring.
Uh it is uh significant upgrade in terms
of the things that you can do.
Um
but that uh is basically it. Um thank
you all for staying all the way to the
end.
Uh if you have more questions, uh I have
some time now for questions. If you
would like if you think of them later, I
am seldo.com on Blue Sky,
uh and you can get these uh slides from
that URL. Thank you so much for your
time and attention.
>> Do I have any questions now or is
everybody eager to get home? Okay.
>> Hello.
So for Cody bells and LLM bells, can
both be defined on the platform itself,
so it is run by the platform rather by
individual scripts? I might might have
missed that in the beginning.
>> Uh no, that's a great question. Uh
Cody bells and LLM is a judge e-bells in
Phoenix uh are run on the client and
relayed back to the server.
Uh in AX, they can run online on the
platform itself.
>> Um is is there any chance of using
something like the Anthropic batch APIs
where it uses much cheaper version of
like open source stuff like that to
parse large volumes volumes of data?
>> Um
Ask me again afterwards. There's a
gentleman behind you with a question.
>> Hello.
>> Oh.
>> Hello.
>> Yes.
>> for context, I work with a construction
AI company and we look at like
architectural checks and compliance. And
one of the issues we have is we have
tons of these checks we get from
architects. We try to like scope them
out to understand what it's actually we
need to build.
>> Right.
>> And we don't have a ton of
labeled data on that. What we've been
starting to do is like try to
automatically have cloud code scope it
out and then look at consistency. So if
we have it scoped out 10 times, is the
same solution every single time? We've
been using like consistency as a
like a almost like an e-val for
complexity of the problem.
>> Uh-huh.
>> We've been kind of like piecing more of
these kinds of things together, calling
them like meta e-vals, just to like when
you're have a problem we're still trying
to solve. Can you think of anything else
like that? Like the actual problem
itself, you're creating like the process
of solving the problem, you're creating
e-vals for, not just the solution to the
problem.
>> Yes, absolutely. I mean, we touched on
already with meta evaluations, right?
Like one of a situation where you're
using an an LLM to judge another LLM's
output immediately becomes an LLM meta
evaluation. Uh
you can absolutely use an LLM to judge
which of these, you know, uh 10 possible
agent configurations would have been the
better one. Uh that is what I was
talking about with multi-agent
configurations and multi-LLM
configurations. Uh
you can get you can do a closed-loop
situation where an agent is coming up
with five possible prompts variations
and testing all of them at the same time
against the eval uh to see which of
these variations, without a human
getting involved, which of these
variations is going to improve.
Does that answer your question?
>> Yeah, it does.
>> Okay.
Uh in the front.
>> Thank you um for the talk. It was it was
really great. Uh I had a question on
um on how
how much evaluation you need to write
for uh feature cuz especially when you
run against live traces,
sometimes the the evaluation can cost
more than the actual feature. And yeah,
so how do you know when you wrote enough
uh
of evaluation?
>> That is a really good question.
Um
how do you know when you have written
uh an evaluation that is good enough?
Is really what you're asking, right? Um
the
uh
the answer is mostly in uh
the uh cost equations that I was showing
earlier. Um
but uh it's partly in regression evals
versus capability evals. If you have a
suite of 100 regressions and one
capability eval, then you're going to be
spending an enormous amount of money
doing regression testing, and it's
probably the case that you don't need
all 100 of those regression evals. You
can throw, you know, 80% of them out and
still have a representative sample of
regression evals.
Uh
the one where you don't want to skip the
where you don't want to skimp on cost is
the capability eval. So, you can
downgrade, you can shrink, you can
compress your regression evals uh and
your capability eval is where you
probably want to push the boat out in
terms of cost. You're like, let's not
care about what model we're using. Let's
make this as expensive as possible
because that is where the agent is
actually getting better.
>> Okay, thank you. And on live traces, you
run both regression and
capability eval or just regression?
>> Um on live traces, there's no point in
writing running your capability eval
because it's not changing. Uh
>> Yeah, you can cut cost here as well.
>> Yeah.
>> Okay. Thank you.
>> I have no idea.
>> Um yeah, just a question on like your
actionability template or your custom
eval. So, like
>> Sorry, can you speak up?
>> Yeah, sorry. So, a question on like the
way you've defined your custom LLM as
judge.
>> Yeah.
>> So, in your example, you kind of have
basically eight separate things. So,
here's four actionable things. Here's
four non-actionables. And that's all
being run as one yes or no. Uh there's
some advice online from other people
that would say, oh no, you should split
that up into eight separate single
checks. So, like then you get a score
between zero and eight, basically.
>> Right.
>> And you're running each of those single
checks one time as a separate LLM as
judge.
Do you think that's the right way to go
or do you think kind of bundling them a
bit more is is fine?
>> Um it's a very good question because
it's a very um
it's kind of arbitrary, right? It's like
uh
what I was trying to measure there, like
this This where you have to get your
non-technical stakeholders involved.
Like, what are we trying to measure?
We're trying to measure actionability.
Are we trying to measure
specifically whether or not it mentioned
price earnings ratios? If that is a
specific thing that the stakeholder says
is important and I need to see that
every single time, then you should have
an eval about that.
If the specific thing you're looking for
is a buy-sell-hold recommendation, which
is what I said I was looking for, then a
PE ratio is going to help the agent get
there, but it's not the thing I'm
looking for. Uh so, it absolutely is
context-dependent and and based on what
your stakeholders say is the thing that
is actually the actual definition of
correct as opposed to a contributor to
correct, if you see what I mean.
>> So, sometimes it's unavoidable like it's
kind of an either/or as long as it does
one of these things.
>> Exactly.
>> Cheers.
>> Uh there was another question back
there.
>> Thank you for the talk. It was really
good.
>> Uh I have a two question. The first
question is um it seems like there are a
lot of deterministic
factors in the whole eval pipeline.
Like, for example, if we have this
result, what does it mean? Like, does it
mean like the agent prompt is bad or
does it mean the rubric we provide is
bad or does it mean like if there's a
human annotation, maybe the human
themselves is not reliable. Do you think
it makes sense to go through like
phases? Like, first you make sure this
is reliable, then we go to next phase,
which is to compare, I don't know,
whatever.
>> Yeah, absolutely. That's one of the
reasons that I I recommend
uh building your evals iteratively.
Like, start with the code eval and make
sure that the code code eval works all
the time, then build your first LM as a
judge and make sure that one is running
the way that you want it to. If you
introduce multiple evals at the same
time, then you're going to have the same
uh multi-prompt problem that you had
before. Like, your prompt change is
going to start changing multiple evals
simultaneously, which is not what you
want to do. That's why you want one
capability eval that you're trying to
hill climb at a time. Uh while you've
got
uh
existing trusted evals as regression
evals that you're expecting not to
change.
>> Oh, thank you. And the second question
is like you also mentioned a lot of a
version, the rubric version or the agent
prompt version or something, but uh my
question will be um for example, when we
change the criteria, um
and we need Do we need to run the you
know, the whole evals against
the new rubrics again? Maybe we have
like 500
um
I don't know, data in the data set that
we do Do we need to run all of this
again? Or would they consider as also
part of this
data set like file example, I don't
know, we can use later?
>> Um
So, uh that's an excellent question. Um
that is what experiments are for.
Experiments give you a smaller set uh
that you can test against your set of
failures that you can test against and
say, "Am I getting better at this?"
Uh so, experiments allow you to use a
small set and rapidly hill climb. Once
you think you Once you believe that
you've climbed to the top of the hill or
you're, you know, hitting diminishing
marginal returns on your hill climb, you
should then go back and run against the
entire data set to make sure that you
haven't accidentally
uh overfit or produced a regression that
runs against the entire data set. So,
you don't need to run Like that's what
experiments are for. You don't need to
run against your entire corpus every
single time you make a change, uh but
you should do it periodically when you
think that you've reached a stopping
point or you're about to ship.
>> Thank you so much.
>> Cool. Uh there's one more in the back
and then I think we're out of time.
>> Uh thank you. Super informative. Um as
someone who's like worked in ML and like
deep deep learning research in the past,
I thought that the the idea of doing
like closed-loop optimization seems
really exciting and I think it's one
prospect I'm excited about in
particular, but I I've used things like
DSPy in the past and I think I don't
know if if it's exactly helpful, but I
think
Andrej Karpathy's like auto research
ideas also somewhat related,
but I haven't found anything to be
particularly amazing beyond getting me
to like a certain threshold where it's
like working okay and then I take it
manually and tweak it from there. I
don't know, do you have any thoughts on
where that space is headed or if there's
like particular work that seems
promising or interesting to you?
>> Um
Come to AIE World's Fair. We are hoping
to present something there where
we've actually made that work.
But no, the answer is it's very much the
frontier right now.
The closed-loop autonomous
self-improving software is something we
can see on the horizon. We think it's
the agent, you know,
you know, maybe when they release Mythos
suddenly it will automatically work. Uh
but um
uh it is it is very difficult to get to
work right now, which is one of the
reasons I didn't present it today cuz
it's kind of
it's kind of loose right now.
>> All right, thank you.
>> All right, thank you so much for
sticking around.

---

## Key Takeaways

- **Read traces before writing evals** — 15 minutes of reading real agent outputs beats hours of prompt-fiddling blind; categorize failures first, then measure ([[concepts/tracing-observability]])
- **Evals are a hierarchy**: code evals (deterministic, cheap) → built-in LLM evals → custom LLM-as-judge; start simple and build up ([[concepts/agent-evals]])
- **LLM-as-judge requires chain-of-thought** — forcing the judge to reason before labeling demonstrably improves judge quality; one dimension per judge, never a "god evaluator" ([[concepts/llm-as-judge]])
- **Golden datasets are encoded domain judgment** — today's production failures become tomorrow's test cases; split 75/25 to avoid overfitting ([[concepts/golden-dataset]])
- **The eval-iterate cycle is the real value** — measure → improve prompt → measure again; every prompt change maps to a specific failure found in evals ([[concepts/eval-iterate-cycle]])
- **Impact hierarchy**: data quality > prompting > model selection > hyperparameter tuning — fix data first, prompt second, swap models last ([[concepts/agent-evals]])
- **Eval-driven development** — write capability evals before building features; Anthropic built Claude Code this way ([[concepts/eval-driven-development]])
- **Data flywheel** — comprehensive evals compound into a competitive moat; nobody else has your production failure dataset ([[concepts/data-flywheel]])
- **Closed-loop evaluation** is the frontier — feeding eval output back to a coding agent to auto-improve the app; not reliable yet but clearly coming ([[concepts/closed-loop-evaluation]])
- **Use a different model as judge** — self-preference bias means the generating model rubber-stamps its own output; cross-provider judging (Claude generates, OpenAI judges) is more reliable ([[concepts/llm-as-judge]])

## Concepts

- [[concepts/agent-evals|Agent Evals]] — the full evaluation framework for agentic systems; three tiers (code, built-in, LLM-as-judge)
- [[concepts/llm-as-judge|LLM-as-Judge]] — using a separate LLM to grade semantic quality of agent output; requires CoT, single-dimension rubrics, and meta-evaluation
- [[concepts/golden-dataset|Golden Dataset]] — curated ground truth of human-labeled examples; the benchmark for evaluator quality and the encoded judgment of domain experts
- [[concepts/eval-driven-development|Eval-Driven Development]] — writing evals before features; the agent analog of TDD
- [[concepts/data-flywheel|Data Flywheel]] — compounding eval data as a competitive moat; each iteration deepens the dataset
- [[concepts/closed-loop-evaluation|Closed-Loop Evaluation]] — autonomous self-improvement where eval output feeds directly back to a coding agent
- [[concepts/tracing-observability|Tracing & Observability]] — capturing raw execution data (spans, traces) as the prerequisite for any eval
- [[concepts/eval-iterate-cycle|Eval-Iterate Cycle]] — the core loop: instrument → trace → eval → annotate → improve → repeat
- [[concepts/reading-traces|Reading Traces]] — hand-reading agent traces to categorize failures before writing evals
- [[concepts/generator-evaluator-pattern|Generator-Evaluator Pattern]] — LLM-as-judge is a form of this; separate generator and critic
- [[concepts/verification-loop|Verification Loop]] — evals as systematic, automated verification replacing ad-hoc vibe-checking

## Entities

- [[entities/arize-phoenix|Arize Phoenix]] — open-source observability and eval platform used throughout the workshop
- [[entities/anthropic|Anthropic]] — mentioned for Claude Code eval-driven development and CoreBench meta-eval story
- [[entities/agent-sdk|Agent SDK]] — used to run the demo financial agent whose traces were evaluated

## Connections

- Relates to [[concepts/reading-traces]] — Laurie's "read your traces first" mirrors Anthropic's hand-reading discipline; evals formalize what trace-reading discovers
- Relates to [[concepts/generator-evaluator-pattern]] — LLM-as-judge is the eval-time instantiation of the generator-evaluator split; the judge is the evaluator role
- Relates to [[concepts/verification-loop]] — evals are the systematic, scalable form of the verification loop; capability evals → regression evals mirrors the build-then-lock pattern
- Relates to [[concepts/garbage-collection-day]] — both convert human review findings into automated guardrails; Garbage Collection Day is the harness-engineering equivalent of building a golden dataset from production failures
- Relates to [[concepts/harness-engineering]] — eval infrastructure is harness infrastructure; the eval suite is part of the harness that makes agents shippable
