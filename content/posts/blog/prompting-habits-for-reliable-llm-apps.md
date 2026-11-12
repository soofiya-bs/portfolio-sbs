---
title: "Prompting isn't magic: 7 habits for reliable LLM apps"
description: "Practical prompting habits for engineers — clear roles, examples, delimiters, output formats and testing — so your LLM features behave the same way every time."
date: 2026-11-03
tags: [Prompting, LLMs, Best Practices]
---

Prompt engineering has a reputation for secret phrases and magic words. In real applications it's much more boring — and much more useful. It's about writing **clear, testable instructions**, the same way you'd brief a smart new colleague.

Here are seven habits that make the biggest difference.

## 1. Say who the model is and who it's talking to

A short role sets tone and level instantly.

```text
You are a patient tutor for first-year engineering students.
Explain ideas simply and avoid jargon unless you define it.
```

## 2. Be specific about the task

"Summarise this" is vague. "Summarise this support ticket in two sentences: the customer's problem, then what they want us to do" is a task the model can't misread.

## 3. Separate instructions from data

When you insert user input or documents, wrap them in clear delimiters so the model knows what is instruction and what is content.

```text
Summarise the review between the <review> tags.

<review>
{{userReview}}
</review>
```

This also makes it harder for text inside the data to be mistaken for instructions.

## 4. Show, don't just tell

One or two examples of the exact output you want beat a paragraph of description. This is called **few-shot prompting**.

```text
Classify the sentiment as positive, negative or neutral.

Review: "Delivery was fast and the product works great."
Sentiment: positive

Review: "It's okay, nothing special."
Sentiment: neutral

Review: "{{review}}"
Sentiment:
```

## 5. Ask for a format your code can use

If your app needs to parse the answer, say exactly what shape it should be — and validate it. (More on this in the post on structured outputs.)

## 6. Give the model a way out

Tell it what to do when it can't complete the task: "If the answer isn't in the context, reply exactly: I don't know." Without an exit, models tend to guess.

## 7. Test prompts like code

The most important habit. Keep a small set of real inputs — including awkward ones — and run every prompt change against them. If you only test the happy path, you'll find the failures in production.

| Input | Expected | Pass? |
| --- | --- | --- |
| Normal review | Correct label | ✓ |
| Sarcastic review | Negative | ? |
| Empty string | Handled gracefully | ? |
| Review in Malayalam | Correct label | ? |

## The real secret

There's no perfect prompt to find once and keep forever. Models change, users surprise you, and requirements grow. The engineers who build reliable LLM features aren't the ones with clever wording — they're the ones who **write clearly, version their prompts and test them every time**.
