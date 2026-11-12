---
title: "RAG explained: how to make an LLM answer from your own data"
description: "Retrieval-augmented generation in plain language — why LLMs need it, the four steps of every RAG pipeline, and the mistakes beginners make most."
date: 2026-11-12
tags: [RAG, LLMs, Fundamentals]
---

Ask an LLM about your company's leave policy, your course notes or last week's meeting, and it will either say it doesn't know — or confidently make something up. The model was never trained on your documents.

**Retrieval-augmented generation (RAG)** fixes that. Instead of hoping the model knows, you *find* the relevant information first and hand it to the model along with the question.

## The idea in one sentence

> Search first, then answer — using only what you found.

It's an open-book exam for the model. You don't retrain anything; you just give it the right pages.

## The four steps of every RAG pipeline

**1. Split your documents into chunks.** A 40-page PDF is too big to send in full, so you cut it into pieces of a few hundred words each.

**2. Turn each chunk into an embedding.** An embedding is a list of numbers that captures the *meaning* of the text. Chunks about similar things end up with similar numbers. You store these in a vector database.

**3. Retrieve.** When a question comes in, you embed the question too, and find the chunks whose embeddings are closest to it.

**4. Generate.** You send the question *plus* those chunks to the LLM, with an instruction like "answer only from the context below."

```js
const chunks = await vectorStore.search(question, { topK: 4 });

const prompt = `Answer the question using only the context.
If the answer isn't in the context, say you don't know.

Context:
${chunks.map((c) => c.text).join("\n---\n")}

Question: ${question}`;

const answer = await llm.complete(prompt);
```

That's the whole pattern. Everything else is about doing these four steps *well*.

## Why RAG instead of retraining?

- **Fresh data.** Update a document and the next answer uses it. No training run.
- **Citations.** You know exactly which chunks the answer came from, so you can show sources.
- **Cost.** Embedding and searching is cheap compared to fine-tuning a model.
- **Control.** You decide what the model is allowed to see — useful for permissions.

## Mistakes beginners make

**Chunks that are too big or too small.** Huge chunks bury the useful sentence; tiny ones lose the context around it. Start around 300–500 words with a little overlap, then test.

**Retrieving too few — or too many — chunks.** Too few and you miss the answer. Too many and you drown it in noise and pay for extra tokens.

**Never checking retrieval on its own.** If the right chunk isn't retrieved, no prompt can save the answer. Look at what your search returns *before* blaming the model.

**No "I don't know" path.** Always tell the model what to do when the context doesn't contain the answer. Otherwise it fills the gap itself.

## Start small

Your first RAG project can be tiny: ten pages of your own notes, an embeddings API, and an in-memory list instead of a real vector database. Get the four steps working end to end, then improve one step at a time. That's how production RAG systems are built too.
