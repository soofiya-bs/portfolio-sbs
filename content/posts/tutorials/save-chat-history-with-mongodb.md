---
title: "Save AI chat history with MongoDB and Mongoose"
description: "Give your LLM API a memory: store every conversation in MongoDB, send recent history back to the model, and keep token costs under control."
date: 2026-11-01
part: 2
tags: [MongoDB, Node.js, LLMs, MERN + AI]
level: Beginner
duration: "40 min"
---

Right now, your API from [Build your first LLM-powered API](/tutorials/build-your-first-llm-api-with-node) forgets everything after each request. Ask "What is an API?" and then "Give me an example of one", and the model has no idea what "one" means.

In this tutorial you'll store conversations in MongoDB and send recent messages back to the model, so it can follow a conversation.

**What you'll need:** the project from the previous tutorial, and a MongoDB database — either installed locally or a free cluster on MongoDB Atlas.

## Step 1: Install Mongoose and connect

```bash
npm install mongoose
```

Add your connection string to `.env`:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/llm-api
```

Then connect at the top of `server.js`:

```js
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI);
console.log("Connected to MongoDB");
```

## Step 2: Design the conversation model

Each conversation holds a list of messages. Each message has a **role** — `user` or `assistant` — and its **content**. This mirrors the format LLM APIs expect, which makes the next steps simple.

Create `models/Conversation.js`:

```js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
  },
  { _id: false, timestamps: true }
);

const conversationSchema = new mongoose.Schema(
  {
    title: { type: String, default: "New chat" },
    messages: [messageSchema],
  },
  { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
```

## Step 3: Create a conversation

Add an endpoint that starts a new chat and returns its id:

```js
import { Conversation } from "./models/Conversation.js";

app.post("/conversations", async (req, res) => {
  const convo = await Conversation.create({});
  res.status(201).json({ id: convo._id });
});
```

## Step 4: Send history with each question

This is the important part. Load the conversation, take the **last few messages**, add the new question, and send them all to the model.

```js
const HISTORY_LIMIT = 10; // last 10 messages = about 5 exchanges

app.post("/conversations/:id/messages", async (req, res) => {
  const question = String(req.body?.question ?? "").trim();
  if (!question) return res.status(400).json({ error: "Please send a question." });

  const convo = await Conversation.findById(req.params.id);
  if (!convo) return res.status(404).json({ error: "Conversation not found." });

  const history = convo.messages.slice(-HISTORY_LIMIT).map((m) => ({ role: m.role, content: m.content }));

  try {
    const message = await client.messages.create({
      model: "claude-haiku-5-5",
      max_tokens: 500,
      system: "You are a friendly tutor. Answer clearly in under 120 words.",
      messages: [...history, { role: "user", content: question }],
    });
    const answer = message.content.find((b) => b.type === "text")?.text ?? "";

    convo.messages.push({ role: "user", content: question }, { role: "assistant", content: answer });
    if (convo.messages.length === 2) convo.title = question.slice(0, 60);
    await convo.save();

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "The AI service is unavailable right now." });
  }
});
```

Notice that we **save only after the model replies successfully**. If the API call fails, the conversation isn't left with a question and no answer.

## Step 5: Read a conversation back

Your React app needs to load past chats after a page refresh:

```js
app.get("/conversations/:id", async (req, res) => {
  const convo = await Conversation.findById(req.params.id).lean();
  if (!convo) return res.status(404).json({ error: "Conversation not found." });
  res.json(convo);
});
```

## Step 6: Test the memory

```bash
# start a chat
curl -X POST http://localhost:3001/conversations

# ask two related questions (use the id from above)
curl -X POST http://localhost:3001/conversations/<id>/messages \
  -H "Content-Type: application/json" -d '{"question": "What is an API?"}'

curl -X POST http://localhost:3001/conversations/<id>/messages \
  -H "Content-Type: application/json" -d '{"question": "Give me a real example of one."}'
```

The second answer should clearly follow on from the first.

## Why we limit the history

Every message you send back costs input tokens, on **every** request. A 200-message chat sent in full would get slower and more expensive with each turn. Keeping the last 10 messages is a simple, effective default. Later, you can replace older messages with a short summary.

## What you learned

- How to model conversations in MongoDB in the same shape LLM APIs use
- How "memory" really works: you send the history back each time
- Why to save only after a successful reply, and why to cap history

**Next step:** [Stream AI responses into a React chat UI](/tutorials/stream-llm-responses-in-react), so answers appear word by word.
