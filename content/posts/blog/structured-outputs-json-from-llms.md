---
title: "Structured outputs: getting reliable JSON from an LLM"
description: "Why free-form text breaks your app, how to ask an LLM for JSON, and how to validate it with a schema so bad responses never reach your users."
date: 2026-10-31
tags: [LLMs, JSON, Node.js]
---

The first LLM feature most developers build returns a paragraph of text. That's fine for a chatbot. But the moment your **code** needs to use the answer — save it to MongoDB, show it in a React component, trigger an action — free-form text becomes a problem.

You need **structured output**: data in a predictable shape, usually JSON.

## Why "just ask for JSON" isn't enough

You can write "respond in JSON" in your prompt, and most of the time it works. But "most of the time" means that sometimes you'll get:

- JSON wrapped in a friendly sentence: *"Sure! Here's your data: {...}"*
- A missing field, or a field with a different name
- A number returned as a string, or a list returned as one long string

Any of these can crash your app. So we use two layers of protection.

## Layer 1: ask clearly, with the exact shape

Describe the structure and show an example.

```text
Extract the event details from the message.
Respond with ONLY a JSON object in this exact shape, and nothing else:

{"title": string, "date": "YYYY-MM-DD" or null, "attendees": string[]}
```

Many LLM APIs now also offer a **JSON mode** or **structured output / tool-calling** feature, where you pass a schema and the API constrains the response to match. Use it when your provider supports it — it removes most formatting failures.

## Layer 2: validate in your code

Never trust the response blindly. Parse it and check it against a schema. In JavaScript, a library like Zod makes this easy.

```js
import { z } from "zod";

const Event = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  attendees: z.array(z.string()),
});

function parseEvent(raw) {
  try {
    const json = JSON.parse(raw);
    return Event.parse(json); // throws if the shape is wrong
  } catch {
    return null;
  }
}
```

Now your app either gets a correct object or `null` — never a half-broken one.

## What to do when validation fails

1. **Retry once**, including the error: "Your last reply was invalid because `date` was not in YYYY-MM-DD format. Try again."
2. If it still fails, **fall back** gracefully — show a message, or save the raw text for a human to check.
3. **Log every failure.** Patterns in the failures tell you how to improve the prompt or schema.

## Keep schemas small

The simpler the shape, the more reliable the output. If you need a lot of fields, consider splitting the job into two smaller calls.

Structured outputs are the bridge between "AI that talks" and "AI that does things." Once you can reliably get clean data out of a model, you can plug it into any part of a full-stack app.
