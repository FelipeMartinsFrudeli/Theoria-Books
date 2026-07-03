# Theoria Books

Read books to sharpen thought, deepen memory, and achieve your life goals.

Theoria Books is a philosophical reading tracker for people who want to turn reading into practice. It combines local PDF reading, reading progress, markdown notes, simple tasks, streaks, and study groups.

## Current Status

This repository currently contains a frontend prototype.

The app is built to explore:

- personal book tracking
- local-first PDF import and reading
- reading progress and streaks
- markdown notes linked to books
- a simple tracker for reading tasks
- study group screens and shared reading concepts

## Local-First PDFs

PDF privacy is a core rule of the project.

PDF files should stay on the user's device. The app may store and sync tracking metadata, but it must not upload PDF files to a server.

Allowed PDF metadata:

- title
- total pages
- current page
- progress
- local file name or browser-visible file reference
- file size
- imported date
- source type
- local-only flags

Not allowed:

- PDF uploads
- PDF binary storage on the server
- full PDF text storage on the server
- backend PDF parsing or indexing

## Tech Stack

Frontend:

- React
- TypeScript
- Vite
- MUI
- TanStack Query
- React Hook Form
- Zod
- React Router
- Lucide React
- PDF.js

Planned backend:

- NestJS
- Passport with JWT
- TypeORM

## Project Structure

```text
theoria_books/
  frontend/
    src/
      app/
      shared/
      features/
        auth/
        books/
        reader/
        notes/
        dashboard/
        study-groups/
        gamification/
  TODO.md
  AGENTS.md
  .agents/
```

## Running Locally

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server is configured to bind to `0.0.0.0`, so it can be accessed on the local network.

Build:

```bash
cd frontend
npm run build
```

## Roadmap

See [TODO.md](./TODO.md).

## Agent Rules

This repository includes persistent AI coding rules in [AGENTS.md](./AGENTS.md) and [.agents/](./.agents/). Future agents should read those files before changing the project.

