---
title: "What is Agentic AI, and what are AI agents?"
description: "A plain-language guide to agentic AI: how an AI agent differs from a chatbot, the loop every agent runs, and when you actually need one."
date: 2026-11-05
tags: [AI Agents, LLMs, Fundamentals]
---

"Agent" is one of the most overused words in AI right now. Every product with a chat box calls itself agentic. So let's slow down and define it properly, because once you see the core idea, it becomes much easier to build with.

## A chatbot answers. An agent acts.

A regular LLM call is a single round trip: you send a prompt, the model sends back text. That's it. The model can't check anything, look anything up or do anything in the world.

An **AI agent** is an LLM placed inside a loop, with access to **tools**. Instead of answering immediately, it can decide:

- "I need more information — let me search."
- "I should run this code and look at the result."
- "Now I can update the database and report back."

The model is still just predicting text. What makes it an agent is the **system around it**: the loop, the tools, and the memory.

## The loop every agent runs

Almost every agent, from a simple script to a large framework, follows the same cycle:

1. **Think** — the model reads the goal and everything so far, and decides on the next step.
2. **Act** — it calls a tool: a search, an API, a database query, a file write.
3. **Observe** — the tool's result is added back into the context.
4. **Repeat** until the goal is met, or a limit is reached.

In code, the heart of it is surprisingly small:

```js
while (!done && steps < MAX_STEPS) {
  const reply = await llm.chat(messages, { tools });
  if (reply.toolCall) {
    const result = await runTool(reply.toolCall);
    messages.push(reply, { role: "tool", content: result });
  } else {
    done = true;
    console.log(reply.text);
  }
  steps++;
}
```

Everything else — planning, memory, multi-agent setups — is built on top of this loop.

## The four building blocks

| Block | What it does | Example |
| --- | --- | --- |
| **Model** | Reasons and decides the next step | Claude, GPT, Gemini |
| **Tools** | Let the model act on the world | Web search, SQL, email, code runner |
| **Memory** | Keeps context across steps and sessions | Conversation history, a vector store |
| **Guardrails** | Keep it safe and on track | Step limits, approvals, input validation |

## When do you actually need an agent?

Agents are powerful, but they are slower, more expensive and less predictable than a single LLM call. A good rule:

- **Fixed, known steps?** Write a normal program, and call the LLM where you need language understanding. This is a *workflow*, not an agent.
- **Steps depend on what you discover along the way?** That's where an agent earns its keep — research, debugging, multi-step customer requests.

Many of the most reliable "AI products" are mostly workflows with one or two agentic steps inside them.

## Where to start as a self-learner

1. Make a single LLM API call from your own code.
2. Add **one** tool (for example, a function that fetches the weather) and let the model decide when to call it.
3. Wrap it in the loop above, with a step limit.
4. Only then reach for a framework — you'll understand what it's doing for you.

Building one tiny agent from scratch teaches you more than reading about ten frameworks.
