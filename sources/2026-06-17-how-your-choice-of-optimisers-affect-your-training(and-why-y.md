---
title: "How your choice of Optimisers affect your training(and why you should care)"
source: "https://chinmaykarkar.com/blog/optimiser_blog/"
author:
published:
created: 2026-06-17
description: "Walk through SGD, momentum, Adam, AdamW, Lion on toy landscapes and CIFAR-10."
tags:
  - "clippings"
---
## Table of Contents

1. Introduction
2. Keyword Definitions
3. Classical Loss Landscapes
4. The Optimisers
5. CIFAR-10
6. GPT2/NanoGPT
7. How Optimisers Qualitatively affect your model
8. Introduction to Preconditioning / Matrix-based Methods
9. Acknowledgements
10. References (and Suggested Full Reads)

## Introduction

Optimisers are being discussed in the deep learning techspace for a hot minute now, and for good reason. They are literally the driving force for your gradients to converge to minima, and determine how much compute/time you are going to require for similar convergence.

In this blog we will compare some optimisers, how they affect your training runs, and what general descent they show on some different architectures like GPT2/CIFAR-10 and some classical loss landscapes. We will also look at how the optimiser choice qualitatively afffects our model's performance, and have a gentle introduction to Muonn and Matrix based optimisers at the end. I have tried to keep the blog engaging with some cool visualisations and tips GPT2, CIFAR-10 and some animations based on loss landscapes

## Keyword Definitions

Optimisers are the engines of your model car. They will drive your loss down the alley, and make your model better. They take your gradients, optimise your weights. TLDR; Optimisers make your loss go down, and your model perform better(when tuned properly).

Some common terms and optimisers you will see throughout this blog:

Gradient → The slope of your loss function w.r.t. the weights. Think of it as the direction your model should move to reduce error.

Learning Rate (LR) → How big a step you take in the direction of the gradient. Too small → slow learning. Too large → you might overshoot or diverge.

Momentum → Like giving your optimizer “inertia.” It smooths out noisy gradients and helps push through shallow valleys instead of stopping too soon.

Adaptive Methods → Optimisers (like Adam, RMSProp, AdamW, Lion) that adjust the step size for each weight individually based on past gradients. They often converge faster but can overfit if not tuned.

Weight Decay (WD) → A penalty that slowly shrinks weights during training, preventing them from exploding and helping with generalization.

Loss Landscape → Imagine a 3D terrain of hills and valleys. Optimisers are trying to find deep valleys (low loss) without getting stuck in shallow ditches.

We will now see how optimisers perform in different scenarios through some (hopefully nice) visualisations:

## Classical Loss Landscapes

We will be looking at three classical loss landscapes: Himmelblau, Rosenbrock and Saddle.

Himmelblau Surface can be considered as a hill top with 4 different descent directions. Your optimiser will decide which minima you end up in.

Rosenbrock is a steep banana like surface, and tests the optimisers ability to adapt to ill conditioning and different curvatures.

Saddle tests the optimisers performance to escape local minima. starts around 0 and the gradient is neither positive nor negative, and thus tests if the optimiser can escape unstable equilibrium

The global minima coordinates for all three of these landscapes are as below:

Himmelblau’s function *(four global minima, $f=0$)*

- $(3.000000,\; 2.000000)$
- $(-2.805118,\; 3.131312)$
- $(-3.779310,\; -3.283186)$
- $(3.584428,\; -1.848126)$

Rosenbrock function with $a=1,\; b=100$ *(global minimum, $f=0$)*

- $(1.000000,\; 1.000000)$

Saddle $f(x,y)=x^2 - y^2$

- **No global minimum** (unbounded below along $x=0,\; y\to \infty \Rightarrow f\to -\infty$).

## Figure 1 — placeholder

<svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 1</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg>

## Figure 2 — placeholder

<svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 2</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg>

## Figure 3 — placeholder

<svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 3</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg>

## The Optimisers:

In this section, we will have a look at the equations behind these optimisers, so there is a better backed explanation/correlation to the optimisers and their behaviours seen in the above GIFs

**Notation:** At step $t$: parameters $w_t \in \mathbb{R}^d$; mini-batch loss $\mathcal{L}(w_t;\mathcal{B}_t)$; gradient $g_t = \nabla_w \mathcal{L}(w_t;\mathcal{B}_t)$; learning rate $\eta > 0$.

Vector ops are element-wise; $\odot$ = Hadamard product; $\epsilon$ = tiny constant for numerical stability.

### 1) SGD (Stochastic Gradient Descent)

**Update:** 
$$
w_{t+1} = w_t - \eta g_t
$$

**Idea:** Look at the slope (gradient) and take a small step *downhill*. That's it, no memory, no adaptation. This is why you can see it circle around the minima in the himmelblau gif. Also since there is anisotropy(steep curvature), the tails are longer. Tails here are just representative of the last 40 steps.

### 2) SGD with Momentum (Polyak/Nesterov)

**Polyak momentum:** 
$$
v_{t+1} = \beta v_t + g_t, \quad w_{t+1} = w_t - \eta v_{t+1}, \quad \beta \in [0,1)
$$

**Nesterov (look-ahead):** 
$$
v_{t+1} = \beta v_t + \nabla \mathcal{L}(w_t - \eta\beta v_t), \quad w_{t+1} = w_t - \eta v_{t+1}
$$

**Idea:** Keep a **velocity** that averages recent gradients. This adds "inertia" so you don't get stuck or jitter on bumpy terrain.This is almost similar to sgd for the above scenarios (which can be seen as well)

### 3) Adagrad

**Update:** 
$$
s_{t+1} = s_t + g_t \odot g_t, \quad w_{t+1} = w_t - \eta \frac{g_t}{\sqrt{s_{t+1}} + \epsilon}
$$

**Idea:** Track the **cumulative squared gradient** per parameter. Frequently-updated directions get smaller steps; rarely-updated ones get larger steps. As you can see, very very tiny steps and updates.

### 4) RMSProp

**Update:** 
$$
s_{t+1} = \rho s_t + (1-\rho) g_t \odot g_t, \quad w_{t+1} = w_t - \eta \frac{g_t}{\sqrt{s_{t+1}} + \epsilon}
$$

**Idea:** Like Adagrad but with an **exponential moving average** of squared gradients. This prevents the learning rate from collapsing over time.

### 5) Adam

**Update (with bias correction):** 
$$
\begin{aligned}
m_{t+1} &= \beta_1 m_t + (1-\beta_1)g_t \\
v_{t+1} &= \beta_2 v_t + (1-\beta_2)(g_t \odot g_t) \\
\hat{m}_{t+1} &= \frac{m_{t+1}}{1-\beta_1^{t+1}}, \quad \hat{v}_{t+1} = \frac{v_{t+1}}{1-\beta_2^{t+1}} \\
w_{t+1} &= w_t - \eta \frac{\hat{m}_{t+1}}{\sqrt{\hat{v}_{t+1}} + \epsilon}
\end{aligned}
$$

**Idea:** Combine **momentum** (first moment) with **per-coordinate normalization** (second moment). Steps scale sensibly even when gradients vary wildly across dimensions.

**Variant (AMSGrad):** Use a non-decreasing $v$ to tighten convergence theory: 
$$
\tilde{v}_{t+1} = \max(\tilde{v}_t, v_{t+1}), \text{ denominator } \sqrt{\tilde{v}_{t+1}}
$$
 Again, similar to Adamw in this case.

### 6) AdamW (Decoupled Weight Decay)

**Adam moments as above**, plus **decoupled decay:** 
$$
w_{t+1} = (1-\eta\lambda) w_t - \eta \frac{\hat{m}_{t+1}}{\sqrt{\hat{v}_{t+1}} + \epsilon}
$$

**Idea:** Apply **weight decay outside** the gradient step. That keeps "shrink the weights" separate from "follow the gradient," which makes decay behave like true capacity control. Heavily normalised, so the steps are shorter/tail is short.

### 7) Lion (Sign-of-Momentum)

**Core form (common variant):** 
$$
\begin{aligned}
m_{t+1} &= \beta_1 m_t + (1-\beta_1)g_t \\
u_{t+1} &= \beta_2 m_{t+1} + (1-\beta_2)g_t \\
w_{t+1} &= w_t - \eta \operatorname{sign}(u_{t+1})
\end{aligned}
$$

Idea: Use the direction (sign) of a momentum-like blend instead of its magnitude. This makes updates simple and robust to scale, with a characteristic “chunky” motion.This is clear in all gifs, the chunky, zigzagged tail of Lion is a characteristic feature of the same.

#### Note: L2 in the Loss vs. Decoupled Weight Decay (why you should care)

- **L2 regularization** adds $\frac{\lambda}{2}\|w\|^2$ to $\mathcal{L} \Rightarrow$ gradient becomes $g_t + \lambda w_t$. In adaptive methods, this mixes with per-dimension scaling → messy, not uniform shrinkage.
- **Decoupled decay** $(w \leftarrow (1-\eta\lambda)w)$ applies a clean, **uniform shrink** independent of the adaptive denominator. Easier to tune; better behaved (AdamW, LionW).

In further experiments, we can see how optimisers change the convergence/minima.

## CIFAR 10

CIFAR 10 is one of the best beginner projects I have done, and experimenting with it over and over has given me a lot of intuition about the same. It is similar to the gpt2 of the image processing works(not a valid comparison here but you get it).

The task is simple:you have 10 classes of images and your NN has to predict it accordingly and lowest loss/highest accuracy wins.

CIFAR-10 is small, natural-image data (32×32 RGB) with strong local spatial correlation, heavy class overlap, and typical augmentations (crop/flip/normalize). Gradients are noisy (small batches + heavy aug), curvature is anisotropic (different layers/filters learn at very different scales), and even though sharp minima can generalise(as shown [here](https://arxiv.org/abs/1703.04933)) the better generalizationusually comes from ending up in wide/flat basins rather than sharp ones. Basins here refer to the loss landscapes that we will see next.

### Experiment Base

- **Dataset:** CIFAR-10 (`torchvision.datasets.CIFAR10`)
- **Train transforms:** `RandomCrop(32, padding=4)` → `RandomHorizontalFlip()` → `ToTensor()` → `Normalize(mean=(0.4914,0.4822,0.4465), std=(0.2470,0.2435,0.2616))`
- **Val transforms:** `ToTensor()` → same `Normalize`
- **Epochs:** `10`
- **Device:** `cuda` (falls back to CPU if CUDA unavailable)
- **Mixed precision:** autocast is **enabled in code** (see caveats)
- **Loss:** Cross-Entropy
- **LR schedule:** optional cosine annealing over total steps (`--cosine` disabled by default)
- **Seed:** `42`
- **Default:** `torchvision.models.resnet18(weights=None, num_classes=10)`
- **Options:** `resnet18` (default) | `resnet34` | `simple` (a small CNN defined in the script)

### Weight Delta

Let's look at one of the parameters that I have logged here(full wandb report at the end of section), that is weight delta curves.

These curves tell us how stably we are converging towards our ideal weights. Three main characteristics of these curves:

- Early amplitude = how aggressively the optimizer moves at the start (escape speed).
- Decay rate / tail = how quickly steps get geometry-limited (approaching a basin).
- Noise/jitter = how much gradient noise is passed to parameter space.

The weight-delta curves split optimizers neatly: SGD starts moderate with visible jitter before a slow taper; adding momentum (Polyak/Nesterov) smooths that noise and yields a longer, steadier decay, with Nesterov a touch punchier early. Adagrad spikes hard in the first few steps then collapses its step size, producing tiny late updates; RMSProp also launches big but glides instead of collapsing thanks to its EMA(Exponential Moving Average) denominator. Adam family shows the classic monotone slide medium start, low jitter, very stable tail; AMSGrad is slightly more conservative late, and AdamW is the cleanest/least jittery due to decoupled decay. Lion has a distinctive near-linear drift to zero with minimal noise—chunky early moves that steadily shrink.

Some practical tips(from my experience):

1. If the curve shows an explosion, most probably its due to either a bad warmup or a large learning rate or the weight decay being too small.
2. If the curve drops to zero(adagrad like), but val loss is not decreasing, consider switching optimisers or restart with a higher LR

| ## Figure 4 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 4</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 5 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 5</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 6 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 6</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> |
| --- | --- | --- |
| ## Figure 7 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 7</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 8 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 8</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 9 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 9</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> |
| ## Figure 10 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 10</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 11 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 11</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 12 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 12</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> |

### Loss Landscapes

I have visualized a 2-D slice through parameter space around the final weights (darker = lower loss). Different optimisers have landed in different shaped basins in the loss landscape, and I hope I can give you the intuition on what this means as we progress along this section.

For the ideal case condition in CIFAR-10(due to noisy labels and heavily augmented batches along with shared features among classes), flat wide minima are preferred. They are preferred because with a flat wide minima, disturbances in data can perturb the parameters without causing a huge spike in the loss.

For the Adam family(Adam, AdamW, AMSGrad), We can see convergence near rounder basins,with a smooth trajectory due to the second moment being scaled(which actually helps with ill conditioning)

SGD/SGDM/Nesterov, would typically generalise better to noise and reach the desired wide and flat basins, though due to no momentum/lookahead in SGD, it takes off axis paths(similar to himmelblau landscape).

RMSProp: similar roundness to Adam but with subtle ripples/different quarry like loss landscape consistent with a one-moment preconditioner. Adagrad often converges to off-center darker pocket with a small attraction region due to its rapid LR decay you converge early and don’t roam.

Lion, also converges to a fairly roundish bowl, the sign-direction keeps motion controlled even when gradient magnitudes vary.

| ## Figure 13 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 13</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 14 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 14</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 15 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 15</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> |
| --- | --- | --- |
| ## Figure 16 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 16</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 17 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 17</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 18 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 18</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> |
| ## Figure 19 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 19</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 20 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 20</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 21 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 21</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> |

| Optimiser | val/loss (step 587) | val/acc (step 587) |
| --- | --- | --- |
| Nesterov | 0.5854 | 80.49% |
| SGDM | 0.6073 | 79.42% |
| Lion | 0.6910 | 76.37% |
| Adagrad | 0.7823 | 72.66% |
| Adam | 0.8930 | 68.76% |
| AMSGrad | 0.8971 | 68.03% |
| RMSProp | 0.9557 | 66.65% |
| SGD | 0.9571 | 66.14% |
| AdamW | 0.9620 | 66.11% |

[WandB Report](https://wandb.ai/ChinmayK0604/optim-cifar10/reports/CIFAR10-runs-report---VmlldzoxNDM1MjA0MQ?accessToken=pq3vs6qbybz6wfv0hv7tcxdxjjt88ibid9rld4t2cws15x7398z4qvu8sct3oanj)

## GPT2/NanoGPT

This one is personal, as when in january this year I got serious about research in LLMs and related stuff, this was the first thing I implemented and have played around a lot with projects like [nanomoe](https://github.com/ChinmayK0607/nanomoe) and [komorebi](https://github.com/ChinmayK0607/komorebi)

A huge inspiration + entry to this rabbithole was Keller Jordan's [modded nanogpt](https://github.com/KellerJordan/modded-nanogpt) (do check it out), and my introduction to Muon. Even though in this blogpost I have not added it as a part of the experiments, it is genuinely the most impressive work I have seen that has happened as a child of experimentation.

The dataset here(shakespeare), is a text based rich set. The gradients here are driven by word and phrase level token distributions(thanks BPE), which mix frequent words(thees, thous, thy) with different forms and long context dependencies across the text. Thus the optimiser must handle both token frequency imbalance but also stabilise all layers of the transformer. Training noise is much lower compared to CIFAR-10 but curvature shows that different things are learnt at different layers(due to depth and vocab)

### Weight Delta Curves

Some tail characteristics that we want to look out for:

- Flat near zero tail -> optimiser step size has collapsed, and we are not effectively training/exploring the loss surface
- Smooth Decay -> the steps keep shrinking steadily but don’t vanish too early. This indicates stable adaptation, and longer the tail, the more patient the optimiser is in adapting/settling to the surface
- Noisy or oscillatory tail -> The norm doesn’t vanish but keeps bouncing around, reflecting the optimizer passing raw gradient noise into parameter space. This is not necessarily bad: it often helps SGD escape sharp, narrow minima and drift into flatter regions.
- Sustained mid tail -> The optimiser has found a basin and continues exploration.

In general we want to look for a larger area under the curve post spike. It reflects more parameter space exploration, avoiding underfitting.

SGD and its variants show the same kindof characteristics with varying levels of jitter in the tail. Adagrad reflects its shrinking LR. This leads it to settle to earlier basins than desired. RMSProp takes large initial steps but later collapses into a noisy plateau, showing weakness in mid training consistency. Adam and AMSGrad both show similar characteristics. AdamW shows consistent mid training progress, never plateauing to near zero, thanks to its decoupled weight decay. Lion reaches high plateau rapidly and declines slowly.

| ## Figure 22 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 22</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 23 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 23</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 24 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 24</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> |
| --- | --- | --- |
| ## Figure 25 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 25</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 26 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 26</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 27 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 27</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> |
| ## Figure 28 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 28</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 29 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 29</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> | ## Figure 30 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 30</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg> |

### Loss Landscapes

The preferred basin structure for shakespeare text is flat and wide. The model must balance memorizing structure with generalizing to unseen contexts. A sharp minimum might perfectly fit frequent tokens but fail to adapt well to rare tokens or longer syntactic structures. Also, a sharp basin in one subspace can trap training dynamics, making the optimizer overfit certain layers (often embeddings or final linear layers) while underutilizing others. Wide minima distribute curvature more evenly, letting the optimizer maintain balanced updates across the transformer.

Adam-family optimizers converge into wide, cup-shaped basins with smooth trajectories toward the minimum, showing how adaptive scaling equalizes curvature across layers. SGD and SGDM hug narrow grooves, which makes them more stable but leaves the model under-trained within typical compute budgets. Adagrad parks prematurely in a shallow pocket, consistent with its collapsed updates. RMSProp finds a rounder bowl but with small ripples, aligning with the noisy mid-phase updates. Lion carves a broad arc into a reasonably wide valley, showing that its sign-based dynamics still locate robust basins.

Practical defaults AdamW at lr = 3e-4, wd = 0.01, with a 200–500 step warm-up is a safe baseline. Lion works with similar lr but benefits from slightly stronger decay. AMSGrad can be swapped in for stability on longer runs. Also a good time to tell you to always always tune your optimiser hyperparams, can massively affect your performance.

| ## Figure 31 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 31</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg>  SGDM | ## Figure 32 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 32</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg>  SGD | ## Figure 33 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 33</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg>  Nesterov |
| --- | --- | --- |
| ## Figure 34 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 34</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg>  Adam | ## Figure 35 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 35</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg>  AdamW | ## Figure 36 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 36</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg>  AMSGrad |
| ## Figure 37 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 37</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg>  RMSProp | ## Figure 38 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 38</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg>  Adagrad | ## Figure 39 — placeholder  <svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 39</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text></svg>  Lion |

## How your optimiser qualitatively affect your model

A large part of this section is inspired from [this blogpost](https://leloykun.github.io/ponder/steepest-descent-opt/) by leloykun, and he makes an excellent case of choosing optimisers based on which mathematical space do the features of your models live in.

When training a NN, we want to bound the features, a lower bound for the model to learn atleast something, and an upper bound for stable training. But what exactly do we want to normalise, weights, features, or updates to them?

important clarification for people like me, features are the inputs/activations that flow through the network. these are the intermediate representations of the raw data that come at input. Weights are the parameters of the network.

Your features must be large enough so that the model learns something. and weights must not be too large for stable training.

We usually normalise our datasets during input and output, from one layer to another, the norm on the weights is induced instead of having to apply it separately.

```js
Input Features                     Weight Matrix                     Output Features
      x                                W                                   y = Wx
┌─────────────┐                 ┌─────────────┐                    ┌─────────────┐
│   ‖x‖α      │   -- our choice -->  ‖W‖α→β   │  -- induced -->    │   ‖y‖β      │
└─────────────┘                 └─────────────┘                    └─────────────┘
          │                                │                                │
          └────────────────────────────────┴────────────────────────────────┘
                            Induced Operator Norm
                           ‖W‖α→β = max (‖Wx‖β / ‖x‖α)
```

Coming to the question, what space do the features lie in? How does it matter?

Your choice of optimiser decides what minima your model converges to. As shown in [this](https://arxiv.org/abs/2507.12224) paper, optimisers qualitatively affect your model's performance. Your space defines what your optimiser will optimise for. Let's say you are in an Euclidean space, your optimiser(dependent on the scale of the network) will try to optimise for different things like smaller norms and will try to reach a small norm solution with short Euclidean steps.

**Note**: Euclidean spaces are flat cartesian planes, and ordinary coordinate geometry that we are taught in school. Non Euclidean spaces are basically spaces that do not follow the rules of Euclidean geometry. Imagine saddle shaped planes, triangles with sum(angles) < 180 etc.

Incase it chooses a non Euclidean space, there are benefits due to various reasons, like some problems being naturally non Euclidean(embeddings are better fitted on saddles), sparsity of the solutions(better quality, interpretability, less compute). So choosing the right space to optimise in can save you a lot of steps(and compute!!)

The manifold hypotheses argues that Even though real-world data lives in very high-dimensional Euclidean spaces, the data actually lies near a much lower-dimensional manifold embedded in that space. (Eg: for MNIST every vector is 28x28 in Euclidean spaces, but not every vector looks like a digit, real digits form a low dimensional curved manifold here.) So most of our (high dimensional) datasets are locally Euclidean. The norm induced by these input and output spaces is the spectral norm.

**Spectral Norm** -> The spectral norm of a matrix |𝑊| is the largest amount it can stretch a vector, when measuring lengths with the Euclidean (ℓ²) norm

```js
Matrix W acts on input vectors x
────────────────────────────────

   Input Space (ℓ²)              Transformation by W               Output Space (ℓ²)
   ┌──────────────┐         ┌──────────────────────────┐        ┌───────────────┐
   │    unit      │  ---->  │  W stretches directions  │ ---->  │   stretched   │
   │   circle     │         │    by different factors  │        │   ellipse     │
   └──────────────┘         └──────────────────────────┘        └───────────────┘
        (‖x‖₂=1)                                                   (‖Wx‖₂ ≤ σ_max)

                 The spectral norm = σ_max
       (largest singular value of W, max stretch factor)
```

The longest axis of the ellipse can be considered as the spectral norm.

The weights in a neural network do not have to be constrained to Euclidean geometry, because the geometry of the optimization depends on the norms chosen for the input and output feature spaces. When features are measured with the Euclidean (ℓ²) norm, the induced operator norm on the weight matrix becomes the spectral norm, which is itself not simply an ℓ² norm on the matrix entries but rather the matrix’s largest singular value.

In other words, even though the features are Euclidean, the corresponding measure of the weights is non-Euclidean. This highlights why it makes sense to consider steepest descent in non-Euclidean geometries: the notion of “steepest” is always relative to the norm, and different norms induce different biases. By moving beyond Euclidean space, We can tailor the optimization process to emphasize properties like sparsity, stability, or hierarchical structure, depending on the induced norm, instead of being restricted to the behavior imposed by the spectral norm.

This brings an important point to the front, what methods do our optimisers use for the spaces. Scalar based optimisers like AdamW etc, consider each parameter separately and their updates are determined based on gradient magnitudes, so there is ignorance of parameter corelation in a way.

Matrix based optimisers(Soap, Muon and friends) capture correlations between parameters by using matrix-valued preconditioners (like approximate second-order information).It adapts to the true induced geometry (which might be closer to spectral, Schatten-p, or Fisher metrics).

## Figure 40 — placeholder

<svg viewBox="0 0 480 220" width="100%" style="max-width:560px;display:block;margin:0.6rem auto;" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="468" height="208" fill="Canvas" stroke="currentColor" stroke-dasharray="6 6" stroke-width="1.5" rx="6"></rect><text x="240" y="100" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" fill="currentColor" letter-spacing="0.08em">PLACEHOLDER · figure 40</text> <text x="240" y="124" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="11" fill="#888">visual to be added</text> </svg> image credits: \[leloykun\](https://leloykun.github.io/)

In recent works such as [Fantastic Pretraining Optimisers and Where to Find Them](https://arxiv.org/abs/2509.02046) its shown that matrix based methods consistently speedup over scalar based methods.

From my perspective there are these clear wins:

- Faster convergence(and possible compute savings).
- Better conditioning → optimization stable even with ill-scaled problems.
- Implicitly choosing better norms (non-Euclidean descent), which gives better inductive biases.

## Introduction to preconditioning/matrix based methods

In this (I'll try to keep it short) section, we will see what is preconditioning.

Preconditioning is a general technique to accelerate convergence by **reshaping the gradient updates** according to the geometry of the problem. Instead of applying the raw gradient $g_t$, we transform it with a preconditioner $P_t$:

$$
w_{t+1} = w_t - \eta P_t g_t.
$$

In scalar optimizers like AdamW or RMSProp, $P_t$ is a diagonal matrix that rescales each coordinate independently (using moving averages of squared gradients). This corresponds to assuming the optimization space is Euclidean and axis-aligned. Matrix-based preconditioners, however, allow $P_t$ to capture correlations between parameters, effectively performing a geometry-aware change of basis that can dramatically improve conditioning and stability.

There are various such optimisers(Soap, Muon, Kron etc) that allow this type of matrix based optimisation. We will have a look at one specifically, i.e. Muon.

**Muon** takes this regime of preconditioning a step further by enforcing **semi-orthogonal preconditioning** of the momentum-averaged gradients. Specifically, given a momentum-averaged gradient $M_t$, Muon computes an approximate **orthogonal factorization** using the **Newton–Schulz iteration** for matrix inverse square roots:

$$
M_t (M_t^\top M_t)^{-\tfrac{1}{2}} \;\approx\; M_t Q_t,
$$

where $Q_t$ is iteratively refined to approximate $(M_t^\top M_t)^{-\tfrac{1}{2}}$. The effect is to project the update direction onto the nearest orthogonal matrix, ensuring well-conditioned, balanced steps. This orthogonalization avoids pathological stretching along certain directions, leading to faster convergence, better stability, and more consistent generalization than scalar methods.

Diving deep into these methods and explaining these methods will make this blogpost a bit too long, and to do full justice to it demands a separate blogpost on its own. Therfore as I conclude this blog here, I hope you guys(if you got here), enjoyed this journey. I had a ton of fun researching and writing this, and I hope the same for you too.

You can find the code [here](https://github.com/ChinmayK0607/optim-blog)

## Acknowledgements

Thanks to: The friends at [lossfunk](https://lossfunk.com/) along with [Kshitij](https://x.com/Kshitijjkapoor), [Tokenbender](https://x.com/tokenbender), [Aditya](https://x.com/Adi_kmt), [Sankalp](https://x.com/dejavucoder) and [Pushkar](https://x.com/thepushkarp) for proof reading the blog and giving valuable feedback. Thank you to my gf as well for motivating me throughout the weeks:)

Leloykun and Keller, for such amazing contributions with their blogs and (especially for me) the modded nanogpt repo.

## References(and suggested full reads)

1. Keller Jordan. *Modded NanoGPT* \[GitHub repository\]. Available: [https://github.com/KellerJordan/modded-nanogpt](https://github.com/KellerJordan/modded-nanogpt)
2. Chinmay Karkar. *nanomoe* \[GitHub repository\]. Available: [https://github.com/ChinmayK0607/nanomoe](https://github.com/ChinmayK0607/nanomoe)
3. Chinmay Karkar. *komorebi* \[GitHub repository\]. Available: [https://github.com/ChinmayK0607/komorebi](https://github.com/ChinmayK0607/komorebi)
4. Leloykun. *Deep Learning Optimisers as Steepest Descent in Normed Spaces* [\[Blog post\]](https://leloykun.github.io/ponder/steepest-descent-opt)
5. Keller Jordan. *Muon Optimiser* \[GitHub repository\]. Available: [https://github.com/KellerJordan/Muon](https://github.com/KellerJordan/Muon)
6. “ *Fantastic Pretraining Optimisers and Where to Find Them* ” arXiv preprint, arXiv:2509.02046, 2025. Available: [https://arxiv.org/abs/2509.02046](https://arxiv.org/abs/2509.02046)
7. “ *Optimisers qualitatively affect model performance* ” arXiv preprint, arXiv:2507.12224, 2025. Available: [https://arxiv.org/abs/2507.12224](https://arxiv.org/abs/2507.12224)
8. " *Benchmarking Optimizers for Large Language Model Pretraining* " arXiv preprint, arXiv:2509.01440, 2025. Available: [https://arxiv.org/abs/2509.01440](https://arxiv.org/abs/2509.01440)
9. " *Sharp Minima Can Generalize For Deep Nets* " [paper](https://arxiv.org/abs/1703.04933)

### Suggested reads:

1. [Deriving muon](https://jeremybernste.in/writing/deriving-muon) by Jeremy Bernstein
2. [Muon and a Selective Survey on Steepest Descent in Riemannian and Non-Riemannian Manifolds](https://leloykun.github.io/ponder/steepest-descent-non-riemannian/) by LeloyKun
3. [SOAP: Improving and Stabilizing Shampoo using Adam](https://arxiv.org/abs/2409.11321) on arxiv