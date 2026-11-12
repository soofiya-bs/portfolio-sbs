---
title: "Stream AI responses into a React chat UI"
description: "Make your AI app feel instant: stream tokens from Express as they're generated, and render them word by word in React with fetch and a ReadableStream."
date: 2026-11-04
part: 3
tags: [React, Streaming, Node.js, MERN + AI]
level: Intermediate
duration: "45 min"
---

A user asks a question and stares at a spinner for eight seconds. Then a whole paragraph appears at once. It works — but it feels slow.

**Streaming** fixes that. The model generates its answer piece by piece anyway; streaming sends each piece to the browser the moment it's ready. The total time is the same, but the user sees the answer start in under a second.

**What you'll need:** the Express API from the earlier tutorials, and a React app (Vite is a quick way to create one).

## Step 1: Understand the flow

```text
LLM API ──text chunks──▶ Express ──res.write()──▶ browser ──reader.read()──▶ React state
```

Express acts as a relay: it receives chunks from the LLM and immediately writes them to the HTTP response, without waiting for the end.

## Step 2: Add a streaming endpoint in Express

The Anthropic SDK has a `messages.stream()` helper that emits a `text` event for each new chunk.

```js
app.post("/ask/stream", async (req, res) => {
  const question = String(req.body?.question ?? "").trim();
  if (!question) return res.status(400).json({ error: "Please send a question." });

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");

  const stream = client.messages.stream({
    model: "claude-haiku-5-5",
    max_tokens: 600,
    system: "You are a friendly tutor. Answer clearly.",
    messages: [{ role: "user", content: question }],
  });

  // if the user closes the tab, stop generating (and stop paying for tokens)
  req.on("close", () => stream.abort());

  stream.on("text", (chunk) => res.write(chunk));

  try {
    await stream.finalMessage();
  } catch (err) {
    console.error(err);
    if (!res.writableEnded) res.write("\n\n[The answer was interrupted. Please try again.]");
  } finally {
    res.end();
  }
});
```

Two details matter here: the **`close` handler** stops generation when nobody is listening, and the **`finally`** block always ends the response.

## Step 3: Test the stream from the terminal

```bash
curl -N -X POST http://localhost:3001/ask/stream \
  -H "Content-Type: application/json" \
  -d '{"question": "Explain recursion with a simple example."}'
```

The `-N` flag turns off buffering, so you'll see the text appear gradually.

## Step 4: Read the stream in React

`fetch` gives you the response body as a `ReadableStream`. You read it chunk by chunk and append each one to state.

```jsx
import { useState } from "react";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask(e) {
    e.preventDefault();
    if (!question.trim() || loading) return;
    setAnswer("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/ask/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setAnswer((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={ask}>
      <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask anything…" />
      <button disabled={loading}>{loading ? "Thinking…" : "Ask"}</button>
      <p style={{ whiteSpace: "pre-wrap" }}>{answer}</p>
    </form>
  );
}
```

Note the functional update `setAnswer((prev) => prev + …)`. Chunks arrive quickly, and this form guarantees none are lost between renders.

## Step 5: Allow requests from your React app

If React runs on a different port (for example 5173), the browser will block the request until you allow it:

```bash
npm install cors
```

```js
import cors from "cors";
app.use(cors({ origin: "http://localhost:5173" }));
```

## Step 6: Polish the experience

- **Show a blinking cursor** at the end of the answer while `loading` is true.
- **Disable the button** while streaming, so users don't send the same question twice.
- **Add a Stop button** that calls `controller.abort()` on an `AbortController` passed to `fetch` — the server's `close` handler will stop the model too.

## What you learned

- Why streaming makes AI apps feel faster, even when they aren't
- How to relay chunks from an LLM through Express with `res.write()`
- How to read a stream in React with `getReader()` and `TextDecoder`
- Why to stop generation when the user leaves

**Next step:** [Build a RAG chatbot over your own notes](/tutorials/build-a-rag-chatbot-over-your-notes), so the model answers from your documents.
