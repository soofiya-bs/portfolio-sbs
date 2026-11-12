---
title: "Build your first LLM-powered API with Node.js and Express"
description: "A step-by-step beginner tutorial: set up an Express server, call an LLM safely from the backend, and return structured answers your React app can use."
date: 2026-10-29
part: 1
tags: [Node.js, Express, LLMs, MERN + AI]
level: Beginner
duration: "45 min"
---

In this tutorial you'll build a small backend that takes a question, sends it to an LLM, and returns a clean JSON answer. It's the first building block of almost every MERN + AI project.

**What you'll need:** Node.js 20 or newer, a code editor, and an API key from an LLM provider (Anthropic, OpenAI or similar).

## Step 1: Set up the project

```bash
mkdir llm-api && cd llm-api
npm init -y
npm install express dotenv @anthropic-ai/sdk
```

In `package.json`, add `"type": "module"` so you can use modern `import` syntax.

## Step 2: Keep your API key secret

Create a file called `.env` in the project folder:

```bash
ANTHROPIC_API_KEY=your-key-here
```

Then create `.gitignore` and add `.env` to it. **Your API key must never be in your frontend code or on GitHub** — that's why the LLM call lives on the server.

## Step 3: Create the server

Create `server.js`:

```js
import "dotenv/config";
import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
app.use(express.json());

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(3001, () => console.log("API running on http://localhost:3001"));
```

Run `node server.js` and open `http://localhost:3001/health`. You should see `{"ok":true}`.

## Step 4: Add the /ask endpoint

Add this above `app.listen`:

```js
app.post("/ask", async (req, res) => {
  const question = String(req.body?.question ?? "").trim();
  if (!question) return res.status(400).json({ error: "Please send a question." });
  if (question.length > 2000) return res.status(400).json({ error: "Question is too long." });

  try {
    const message = await client.messages.create({
      model: "claude-haiku-5-5",
      max_tokens: 500,
      system: "You are a friendly tutor. Answer clearly in under 120 words.",
      messages: [{ role: "user", content: question }],
    });
    const answer = message.content.find((b) => b.type === "text")?.text ?? "";
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "The AI service is unavailable right now." });
  }
});
```

Notice three habits here: **validate the input**, **limit the output** with `max_tokens`, and **never send raw errors** to the user.

## Step 5: Test it

Restart the server, then in a new terminal:

```bash
curl -X POST http://localhost:3001/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is an API, in one paragraph?"}'
```

You should get back something like `{"answer": "An API is..."}`.

## Step 6: Call it from React

In your React app, the frontend only ever talks to **your** server:

```js
const res = await fetch("http://localhost:3001/ask", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question }),
});
const data = await res.json();
setAnswer(data.answer ?? data.error);
```

## What you learned

- Why LLM calls belong on the **backend**, not in the browser
- How to keep API keys out of your code with `.env`
- Input validation, output limits and safe error handling

**Next step:** [Save AI chat history with MongoDB](/tutorials/save-chat-history-with-mongodb), so your API remembers the conversation. That turns this into a real MERN + AI feature.
