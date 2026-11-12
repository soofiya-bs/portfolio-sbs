---
title: "Build a tiny AI agent with tool calling in Node.js"
description: "Go from chatbot to agent: define tools, let the model decide when to call them, run the agent loop safely with step limits — all in about 100 lines of JavaScript."
date: 2026-11-09
part: 5
tags: [AI Agents, Tool Calling, Node.js]
level: Intermediate
duration: "50 min"
---

A chatbot can only talk. An **agent** can take actions: look something up, run a calculation, check a database — and then decide what to do next based on the result.

In this tutorial you'll build a small study-assistant agent with two tools, and write the agent loop yourself. If the idea is new, read [What is Agentic AI?](/blog/what-is-agentic-ai) first.

**What you'll need:** Node.js 20+ and the `@anthropic-ai/sdk` project from the earlier tutorials.

## Step 1: Understand tool calling

You describe your tools to the model: a **name**, a **description** and the **input** each one expects. When the model decides a tool would help, it doesn't write a normal answer — it replies with a request like *"call `get_deadline` with `{ course: 'DBMS' }`"*.

Your code runs the tool, sends the result back, and the model continues. **The model never runs code itself** — your program stays in control.

## Step 2: Write the tools

Start with plain JavaScript functions. In a real app these would query MongoDB or an API; here we use simple data so you can focus on the loop.

```js
// tools.js
const deadlines = {
  DBMS: "2026-11-20",
  "Machine Learning": "2026-11-28",
  "Web Development": "2026-12-05",
};

export const toolFunctions = {
  get_deadline: ({ course }) => {
    const date = deadlines[course];
    return date ? { course, deadline: date } : { error: `No deadline found for "${course}".` };
  },
  days_until: ({ date }) => {
    const ms = new Date(`${date}T00:00:00`) - new Date();
    return { date, days: Math.ceil(ms / 86_400_000) };
  },
};
```

## Step 3: Describe the tools to the model

Each description uses JSON Schema to define the input. **Clear descriptions matter** — they're how the model decides when to use each tool.

```js
// tools.js (continued)
export const toolDefinitions = [
  {
    name: "get_deadline",
    description: "Get the assignment deadline for a course. Use the exact course name.",
    input_schema: {
      type: "object",
      properties: { course: { type: "string", description: "e.g. DBMS, Machine Learning" } },
      required: ["course"],
    },
  },
  {
    name: "days_until",
    description: "Calculate how many days are left until a date in YYYY-MM-DD format.",
    input_schema: {
      type: "object",
      properties: { date: { type: "string", description: "Date in YYYY-MM-DD format" } },
      required: ["date"],
    },
  },
];
```

## Step 4: Write the agent loop

This is the heart of every agent: call the model → if it wants a tool, run it and send back the result → repeat until it gives a final answer.

```js
// agent.js
import Anthropic from "@anthropic-ai/sdk";
import { toolDefinitions, toolFunctions } from "./tools.js";

const client = new Anthropic();
const MAX_STEPS = 6;

export async function runAgent(goal) {
  const messages = [{ role: "user", content: goal }];

  for (let step = 1; step <= MAX_STEPS; step++) {
    const response = await client.messages.create({
      model: "claude-haiku-5-5",
      max_tokens: 800,
      system: "You are a helpful study assistant. Use tools when you need facts. Be concise.",
      tools: toolDefinitions,
      messages,
    });

    messages.push({ role: "assistant", content: response.content });

    if (response.stop_reason !== "tool_use") {
      return response.content.find((b) => b.type === "text")?.text ?? "";
    }

    const results = [];
    for (const block of response.content) {
      if (block.type !== "tool_use") continue;
      const fn = toolFunctions[block.name];
      const output = fn ? await fn(block.input) : { error: `Unknown tool ${block.name}` };
      console.log(`  step ${step}: ${block.name}(${JSON.stringify(block.input)}) →`, output);
      results.push({ type: "tool_result", tool_use_id: block.id, content: JSON.stringify(output) });
    }
    messages.push({ role: "user", content: results });
  }

  return "I couldn't finish that within the step limit.";
}
```

The **`MAX_STEPS`** limit is a safety net: an agent that gets confused can't loop forever, or run up your bill.

## Step 5: Run it

```js
// run.js
import "dotenv/config";
import { runAgent } from "./agent.js";

console.log(await runAgent("How many days do I have left for my DBMS assignment?"));
```

```bash
node run.js
```

You should see the agent chain two tools on its own:

```text
  step 1: get_deadline({"course":"DBMS"}) → { course: 'DBMS', deadline: '2026-11-20' }
  step 2: days_until({"date":"2026-11-20"}) → { date: '2026-11-20', days: 8 }
You have 8 days left for your DBMS assignment (due 20 November 2026).
```

Nobody told it to call `get_deadline` first and then `days_until`. It worked out the plan from the tool descriptions.

## Step 6: Make it safe before it does real things

Right now, the tools only read data. The moment an agent can **change** things — send emails, update records, spend money — add these rules:

- **Validate tool inputs** in your code; never trust them just because the model produced them.
- **Check permissions** in the tool itself: is this user allowed to do this?
- **Ask for confirmation** before anything irreversible.
- **Log every tool call**, so you can see exactly what the agent did and why.

[Prompt injection: the security basics](/blog/prompt-injection-llm-security-basics) explains why these matter so much.

## What you learned

- How tool calling works: the model requests, your code executes
- How to write the agent loop from scratch, with a step limit
- Why clear tool descriptions drive good agent behaviour
- The safety rules to add before an agent can take real actions

**Next step:** [Dockerize and deploy your Node.js AI API](/tutorials/dockerize-and-deploy-your-ai-api).
