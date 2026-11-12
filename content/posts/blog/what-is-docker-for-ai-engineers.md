---
title: "What is Docker? The real problem it solves for applied AI engineers"
description: "Why 'it works on my machine' hits AI projects especially hard, what Docker actually is, and a minimal Dockerfile for a Python AI API."
date: 2026-10-22
tags: [Docker, Deployment, Python]
---

You build an AI app. It works perfectly on your laptop. You send it to a friend, or push it to a server, and it breaks: wrong Python version, a missing system library, a package that installed differently.

That problem has a name — *"it works on my machine"* — and Docker exists to end it.

## Why AI projects feel this pain more

AI projects stack up dependencies quickly:

- A specific **Python version**
- Heavy libraries with exact versions (an LLM SDK, a vector database client, PDF parsers)
- **System packages** that `pip` can't install by itself
- Environment variables for API keys and settings

Every one of these is a chance for two machines to disagree.

## What Docker actually is

Docker packages your app **together with everything it needs to run** into an *image*. When you run that image, you get a *container* — an isolated, identical environment, wherever it runs.

Three words to know:

- **Dockerfile** — the recipe: start from this base, install these things, copy my code, run this command.
- **Image** — the built result of the recipe. Like a snapshot you can share.
- **Container** — a running copy of an image.

It's not a virtual machine. Containers share the host's operating system kernel, so they start in seconds and use far less memory.

## A minimal Dockerfile for a Python AI API

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# install dependencies first, so Docker can cache this layer
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# then copy the code
COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run it:

```bash
docker build -t my-ai-api .
docker run -p 8000:8000 --env-file .env my-ai-api
```

Now anyone with Docker gets exactly the same environment you have.

## Two habits that save you trouble

1. **Never bake API keys into the image.** Pass them at runtime with `--env-file` or your host's secrets settings.
2. **Add a `.dockerignore`** so `node_modules`, `.venv`, `.env` and datasets don't get copied into the image.

## The takeaway

Docker doesn't make your AI app smarter. It makes it **portable and predictable** — which is exactly what you need the moment your project leaves your laptop. For an applied AI engineer, that's the difference between a demo and something people can actually use.
