---
title: "Build a RAG chatbot over your own notes in Node.js"
description: "Build retrieval-augmented generation from scratch: chunk your notes, create free local embeddings, search by meaning and answer with sources — no vector database required."
date: 2026-11-06
part: 4
tags: [RAG, Embeddings, Node.js]
level: Intermediate
duration: "60 min"
---

In this tutorial you'll build a chatbot that answers questions from **your own notes** — and tells you which note each answer came from. You'll build every piece of RAG yourself, so you understand what frameworks and vector databases do for you later.

If RAG is new to you, read [RAG explained](/blog/rag-explained-for-beginners) and [Embeddings explained simply](/blog/embeddings-explained-simply) first.

**What you'll need:** Node.js 20+, the Express project from earlier tutorials, and a folder of `.md` or `.txt` notes.

## Step 1: Install a local embedding model

We'll use a small open-source embedding model that runs **on your own machine**, through the Transformers.js library. It's free, needs no extra API key, and downloads the model the first time you run it.

```bash
npm install @huggingface/transformers
```

Put a few text files in a `notes/` folder — lecture notes, documentation, anything you know well enough to check the answers.

## Step 2: Split notes into chunks

Long documents need to be cut into smaller pieces. We split by paragraphs and group them into chunks of roughly 150 words, so each chunk keeps a complete idea.

```js
// rag/chunk.js
export function chunkText(text, source, maxWords = 150) {
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const chunks = [];
  let current = [];
  let count = 0;

  for (const p of paragraphs) {
    const words = p.split(/\s+/).length;
    if (count + words > maxWords && current.length) {
      chunks.push({ text: current.join("\n\n"), source });
      current = [];
      count = 0;
    }
    current.push(p);
    count += words;
  }
  if (current.length) chunks.push({ text: current.join("\n\n"), source });
  return chunks;
}
```

## Step 3: Create embeddings and build the index

```js
// rag/index.js
import fs from "node:fs/promises";
import path from "node:path";
import { pipeline } from "@huggingface/transformers";
import { chunkText } from "./chunk.js";

const extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

export async function embed(text) {
  const output = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

export async function buildIndex(dir = "notes") {
  const index = [];
  for (const file of await fs.readdir(dir)) {
    const text = await fs.readFile(path.join(dir, file), "utf8");
    for (const chunk of chunkText(text, file)) {
      index.push({ ...chunk, vector: await embed(chunk.text) });
    }
  }
  console.log(`Indexed ${index.length} chunks`);
  return index;
}
```

The index is just an array in memory. For a few hundred chunks, that's perfectly fast.

## Step 4: Search by meaning

Because we asked for **normalized** vectors, cosine similarity is simply the dot product.

```js
// rag/search.js
import { embed } from "./index.js";

const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);

export async function search(index, query, topK = 4) {
  const q = await embed(query);
  return index
    .map((chunk) => ({ ...chunk, score: dot(q, chunk.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
```

**Test retrieval on its own before adding the LLM.** Log the results for a few questions and check that the right chunks come back. If they don't, no prompt will fix it.

## Step 5: Answer from the retrieved chunks

Now give the model the question **and** the chunks, and tell it to answer only from them.

```js
// server.js
import { buildIndex } from "./rag/index.js";
import { search } from "./rag/search.js";

const index = await buildIndex();

app.post("/rag/ask", async (req, res) => {
  const question = String(req.body?.question ?? "").trim();
  if (!question) return res.status(400).json({ error: "Please send a question." });

  const hits = await search(index, question);
  const context = hits.map((h, i) => `[${i + 1}] (from ${h.source})\n${h.text}`).join("\n\n");

  const message = await client.messages.create({
    model: "claude-haiku-5-5",
    max_tokens: 500,
    system:
      "Answer using ONLY the numbered context. Cite sources like [1]. " +
      "If the context does not contain the answer, reply: I couldn't find that in your notes.",
    messages: [{ role: "user", content: `Context:\n${context}\n\nQuestion: ${question}` }],
  });

  res.json({
    answer: message.content.find((b) => b.type === "text")?.text ?? "",
    sources: hits.map((h) => ({ source: h.source, score: Number(h.score.toFixed(3)) })),
  });
});
```

## Step 6: Test it — including the "I don't know" case

```bash
curl -X POST http://localhost:3001/rag/ask -H "Content-Type: application/json" \
  -d '{"question": "What did my notes say about normalization in databases?"}'
```

Then ask something your notes **don't** cover. A good RAG system says it couldn't find the answer, instead of making one up. If yours invents an answer, tighten the system prompt.

## Step 7: Know what to improve next

| Problem | Try |
| --- | --- |
| Right chunk not retrieved | Smaller chunks, or add overlap between chunks |
| Answers miss detail | Retrieve more chunks (`topK` 5–6) |
| Restarting re-embeds everything | Save the index to a JSON file, or store vectors in MongoDB Atlas or pgvector |
| Hundreds of thousands of chunks | Move to a real vector database |

## What you learned

- All four steps of RAG — chunk, embed, retrieve, generate — built by hand
- How to search by meaning with normalized vectors and a dot product
- How to make the model cite sources and admit when it doesn't know

**Next step:** [Build a tiny AI agent with tool calling](/tutorials/build-an-ai-agent-with-tool-calling).
