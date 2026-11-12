---
title: "Embeddings explained simply: how AI understands 'similar'"
description: "What an embedding actually is, why similar ideas end up close together, and where embeddings power search, recommendations and RAG."
date: 2026-11-08
tags: [Embeddings, Vector Search, Fundamentals]
---

Computers are great with numbers and terrible with meaning. "Car" and "automobile" share no letters, yet you know they mean the same thing. Embeddings are how we teach software to notice that.

## An embedding is a list of numbers

An **embedding model** reads a piece of text and returns a long list of numbers — often hundreds or thousands of them. That list is the text's *embedding*, or *vector*.

```js
const vector = await embed("How do I reset my password?");
// → [0.012, -0.338, 0.091, ... ]   (e.g. 1,024 numbers)
```

On their own, the numbers mean nothing to a human. What matters is how they compare to *other* embeddings.

## Similar meaning → nearby numbers

The model is trained so that texts with similar meaning get similar vectors. Imagine every sentence as a point on a map:

- "How do I reset my password?" and "I forgot my login" land **close together**.
- "Best biryani in Kochi" lands **far away** from both.

To measure "close," we usually use **cosine similarity** — a score from roughly -1 to 1, where higher means more similar.

```js
function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}
```

## Where embeddings are used

**Semantic search.** Search by meaning instead of exact keywords. A user typing "can't log in" finds the article titled "Resetting your password."

**RAG.** Embeddings are how a RAG system finds the right chunks of your documents before the LLM answers.

**Recommendations.** "People who read this also liked…" — find items whose embeddings are near the one a user just viewed.

**Clustering and deduplication.** Group thousands of support tickets by topic, or spot near-duplicate questions.

## What is a vector database?

Comparing a question against a million vectors one by one is slow. A **vector database** stores embeddings and finds the nearest ones quickly. You'll hear names like pgvector (an extension for PostgreSQL), Pinecone, Qdrant and Chroma.

For a learning project with a few hundred chunks, you don't need one — an array and the cosine function above are enough.

## Three things to remember

1. **Use the same embedding model** for your documents and your queries. Vectors from different models can't be compared.
2. **Embeddings capture meaning, not facts.** Two sentences can be "similar" and still disagree.
3. **Re-embed when you change models.** Switching models means regenerating every stored vector.

Once embeddings click, a huge part of applied AI — search, RAG, recommendations — suddenly makes sense.
