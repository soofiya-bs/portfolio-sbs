---
title: "How to evaluate an LLM app (because 'it looked fine' isn't a test)"
description: "A beginner-friendly guide to LLM evaluation: building a small test set, choosing what to measure, and catching regressions before your users do."
date: 2026-10-25
tags: [Evaluation, LLMs, Best Practices]
---

Here's how most LLM features get "tested": the developer tries three questions, the answers look good, and it ships. A week later, someone changes the prompt to fix one complaint — and quietly breaks five other cases nobody checked.

Evaluation is how you stop that cycle. It's the habit that most clearly separates hobby projects from production AI.

## Why LLMs need a different kind of testing

Normal code is deterministic: same input, same output, so `expect(add(2, 2)).toBe(4)` works forever. LLM outputs vary in wording, and "correct" is often a judgment call. You can't assert an exact string — but you *can* still measure quality systematically.

## Step 1: Build a small, real test set

Start with **20–50 examples**. That's enough to catch most problems.

- Real questions or inputs from users (or realistic ones you write)
- The **expected answer**, or what a good answer must include
- A few **hard cases**: vague questions, off-topic requests, questions your data can't answer

Store them in a simple file your code can loop over.

```json
[
  { "input": "How many leave days do new employees get?", "mustInclude": ["12"] },
  { "input": "What's the capital of France?", "expect": "refuse_off_topic" },
  { "input": "", "expect": "graceful_error" }
]
```

## Step 2: Decide what "good" means

Pick a few things to check — not twenty.

| Check | How to measure it |
| --- | --- |
| **Correctness** | Does the answer contain the key facts? |
| **Grounding** | Is it supported by the retrieved context (for RAG)? |
| **Format** | Does it parse and match your schema? |
| **Safety / scope** | Does it refuse what it should refuse? |
| **Length / tone** | Within limits, appropriate for users? |

## Step 3: Score automatically where you can

Some checks are easy to code: valid JSON, contains a keyword, under 120 words.

For fuzzier judgments, a common technique is **LLM-as-judge**: a second model call grades the answer against a rubric, such as "Score 1–5: does this answer correctly use the provided context?" It's not perfect, so spot-check its grades by hand, especially at first.

## Step 4: Run it on every change

Any time you change the prompt, the model, the chunking or the retrieval settings, run the full set and compare scores with the previous version.

```text
v1  correctness 82%   format 100%   grounding 76%
v2  correctness 88%   format 100%   grounding 71%   ← grounding dropped. Why?
```

That comparison is the whole point. Improvements become visible — and so do regressions.

## Step 5: Feed real failures back in

When a user reports a bad answer, add it to the test set. Over time, your evaluation set becomes a record of every way your app has failed — and a guarantee it won't fail that way again.

## Start this week

You don't need a platform or a framework. A JSON file, a loop and a results table are enough to begin. The tooling can come later; the habit is what matters.
