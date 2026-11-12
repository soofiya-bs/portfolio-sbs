---
title: "Dockerize and deploy your Node.js AI API"
description: "Package your Express + LLM API in a Docker container, keep secrets out of the image, add a health check, and deploy it to a cloud host so anyone can use it."
date: 2026-11-11
part: 6
tags: [Docker, Deployment, Node.js]
level: Beginner
duration: "40 min"
---

Your AI API works on your laptop. Now it's time to put it somewhere other people can use it. In this tutorial you'll package it with Docker and deploy it to a cloud host.

If Docker is new to you, read [What is Docker?](/blog/what-is-docker-for-ai-engineers) first — it explains the "why" behind each step here.

**What you'll need:** the Express API from the earlier tutorials, [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed, and a GitHub account.

## Step 1: Get the app ready for production

Make three small changes in `server.js`.

**Read the port from the environment** — hosting platforms tell your app which port to use:

```js
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
```

**Make sure there's a health check** — platforms use it to know your app is alive:

```js
app.get("/health", (req, res) => res.json({ ok: true }));
```

**Allow your real frontend's address** in CORS, instead of only localhost:

```js
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
```

## Step 2: Add a start script

In `package.json`:

```json
"scripts": {
  "start": "node server.js"
}
```

## Step 3: Write the Dockerfile

Create a file named `Dockerfile` (no extension) in the project root:

```dockerfile
FROM node:20-slim

WORKDIR /app
ENV NODE_ENV=production

# install dependencies first, so this layer is cached between builds
COPY package*.json ./
RUN npm ci --omit=dev

# then copy the source code
COPY . .

# run as the non-root "node" user that the image provides
USER node

EXPOSE 3001
CMD ["npm", "start"]
```

## Step 4: Keep junk and secrets out of the image

Create `.dockerignore`:

```text
node_modules
.env
.git
notes
*.log
```

**`.env` must never be inside your image.** Anyone who gets the image could read your API key. Secrets are passed in when the container *runs*, not when it's built.

## Step 5: Build and run it locally

```bash
docker build -t ai-api .
docker run --rm -p 3001:3001 --env-file .env ai-api
```

Open `http://localhost:3001/health` — you should see `{"ok":true}`. Test `/ask` with curl as before. If it works in the container, it will work on the server: that's the whole point of Docker.

## Step 6: Deploy to a cloud host

Many hosts can run a Docker container straight from a GitHub repository — for example Render, Railway, Fly.io or Google Cloud Run. The exact screens differ, but the steps are the same everywhere:

1. **Push your code to GitHub.** Double-check that `.env` is in `.gitignore` first.
2. **Create a new web service** on your chosen host and connect the repository.
3. **Choose Docker** as the build method, so it uses your Dockerfile.
4. **Add environment variables** in the host's dashboard: `ANTHROPIC_API_KEY`, `MONGODB_URI`, `FRONTEND_URL`.
5. **Set the health check path** to `/health`, if the host asks for one.
6. **Deploy**, and open the public URL it gives you, followed by `/health`.

If you're using MongoDB, a local database won't be reachable from the cloud — use a hosted cluster such as MongoDB Atlas, and allow connections from your host.

## Step 7: Check it like a professional

- [ ] `/health` returns `{"ok":true}` on the public URL
- [ ] `/ask` works from your deployed React frontend
- [ ] The API key is set only in the host's settings, not in GitHub
- [ ] Logs show requests and errors in the host's dashboard
- [ ] You've set a **spending limit** on your LLM provider account

That last one is easy to forget, and it's your safety net if something goes wrong.

## What you learned

- How to prepare an Express app for production: port, health check, CORS
- How to write a Dockerfile and `.dockerignore` for a Node.js API
- Why secrets are passed at runtime, never baked into the image
- The deployment steps that are the same on almost every cloud host

**You've now built the full series:** an LLM API, chat memory with MongoDB, a streaming React UI, RAG over your own data, an agent with tools — and you've shipped it. That's a genuine MERN + AI portfolio project. Write a clear README, add a demo link, and share it.
