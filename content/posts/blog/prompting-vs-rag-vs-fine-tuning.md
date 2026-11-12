---
title: "Prompting, RAG or fine-tuning? How to choose"
description: "Three ways to make an LLM fit your problem — what each one actually changes, when to use it, and why most teams should start with the simplest."
date: 2026-10-18
tags: [RAG, Fine-tuning, Architecture]
---

You have a model and a problem. The model isn't quite right yet: it doesn't know your data, or it doesn't answer in the style you need. There are three main ways to close that gap, and choosing the wrong one wastes weeks.

## The three options

**Prompting** — change the instructions and examples you send with each request. Nothing about the model changes.

**RAG (retrieval-augmented generation)** — look up relevant information and include it in the request, so the model answers from your data.

**Fine-tuning** — further train the model on your own examples, so its behaviour changes permanently.

## What each one is actually good at

A useful way to think about it:

- **RAG changes what the model knows** in the moment.
- **Fine-tuning changes how the model behaves** by default.
- **Prompting can do a surprising amount of both** — for free.

| | Prompting | RAG | Fine-tuning |
| --- | --- | --- | --- |
| Adds new or private knowledge | Only what fits in the prompt | ✓ Best fit | Poorly, and goes stale |
| Keeps up with changing data | — | ✓ Update a document | Retrain needed |
| Changes style, format or tone | ✓ Often enough | — | ✓ Strong |
| Shows sources | — | ✓ | — |
| Effort to start | Minutes | Days | Weeks, plus data |
| Cost to change | Free | Low | High |

## A simple decision path

**1. Start with prompting.** Write a clear prompt with a few examples. Measure it on a small test set. Many problems end here.

**2. Is the problem missing knowledge?** If the model needs your documents, products, policies or anything recent, add **RAG**. Don't try to fine-tune facts into a model — it's expensive, hard to update and can still produce wrong facts.

**3. Is the problem consistent behaviour at scale?** If you need a very specific format or tone across thousands of requests, and prompting has truly hit its limits, consider **fine-tuning** — but only once you have a good set of high-quality examples and an evaluation set to prove it helped.

## Common misconceptions

**"We'll fine-tune it on our docs so it knows our company."** This is the most common mistake. For knowledge, RAG is almost always the better tool.

**"RAG and fine-tuning are competitors."** They solve different problems and can be combined: a fine-tuned model for behaviour, with RAG for knowledge.

**"Fine-tuning is the professional option."** The professional option is the simplest one that passes your evaluation.

## The takeaway

Go in order — **prompting → RAG → fine-tuning** — and only move to the next step when your measurements tell you the current one isn't enough. It's faster, cheaper and much easier to maintain.
