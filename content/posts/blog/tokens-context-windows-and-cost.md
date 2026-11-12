---
title: "Tokens, context windows and cost: what every AI engineer should know"
description: "What tokens are, why context windows matter, and simple habits to keep LLM apps fast and affordable as they grow."
date: 2026-10-28
tags: [LLMs, Cost, Fundamentals]
---

When your LLM app has ten users, cost and speed don't matter much. When it has ten thousand, they matter a lot. Both come down to one unit: the **token**.

## What is a token?

LLMs don't read words or letters — they read **tokens**, small chunks of text. A token is often a whole short word, part of a longer word, or a piece of punctuation.

As a rough rule of thumb for English, **one token is about three-quarters of a word**, so 1,000 tokens is roughly 750 words. Other languages, code and unusual words can use more tokens per word.

You can't guess exact counts by eye. Most providers offer a tokenizer or return the token counts with every response — use those.

## Input tokens and output tokens

Every request has two sides:

- **Input tokens** — everything you send: system prompt, conversation history, retrieved documents, the user's message.
- **Output tokens** — everything the model writes back.

Providers usually charge per token for both, and output tokens often cost more than input tokens. Output length also affects **speed**: the model generates its answer token by token, so longer answers take longer.

## The context window

The **context window** is the maximum number of tokens a model can consider in one request — input and output together. Modern models have large windows, but "it fits" doesn't mean "it's a good idea":

- More input tokens means **higher cost** on every single call.
- More input usually means **slower responses**.
- Burying the important sentence in a huge context can make answers **less accurate**.

## Where tokens quietly pile up

**Chat history.** If you resend the entire conversation every turn, each message gets more expensive than the last.

**Over-retrieval in RAG.** Sending ten long chunks "just in case" when three would do.

**Long system prompts.** A 2,000-token system prompt is paid for on every request.

**Unbounded answers.** No `max_tokens` limit means one chatty response can cost far more than expected.

## Habits that keep apps fast and affordable

1. **Set `max_tokens`** on every call, based on what the feature actually needs.
2. **Trim history** — keep the last few turns, or replace older turns with a short summary.
3. **Retrieve less, but better.** Improve search quality instead of sending more chunks.
4. **Use the smallest model that does the job.** Classification and extraction rarely need the biggest model.
5. **Cache repeated work.** If many users ask the same thing, or share the same long system prompt, look at caching options.
6. **Log token usage per feature** so you know where the money actually goes.

## A quick estimate before you build

```text
cost per request ≈ (input tokens × input price) + (output tokens × output price)
monthly cost    ≈ cost per request × requests per day × 30
```

Doing this napkin maths *before* you launch is one of the simplest ways to look like a senior engineer — and to avoid a very surprising bill.
