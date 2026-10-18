# doc.taskspipes.com

The documentation of [TasksPipes](https://github.com/j33f/TasksPipes), in English (`/`) and French (`/fr`).
SvelteKit, prerendered to static files, served by Caddy.

```sh
npm install
npm run dev      # http://localhost:5173
npm run check
npm run build    # static files in build/
docker build -t taskspipes-doc .   # Caddy serving the docs on port 80
```

## Writing pages

Pages are Markdown files in `src/content/<lang>/<section>/<NN-slug>.md` (`index.md` is a language's home page):

```md
---
title: Pipes
description: Kanban boards with a purpose.
---

Text…
```

- `NN` sets the order in the sidebar; the file name without it gives the URL (`/guide/pipes`, `/fr/guide/pipes`).
- Sections are declared in `SECTIONS`, interface texts in `UI` (`src/lib/docs.ts`).
- Link between pages without the language (`[Pipes](/guide/pipes)`): French pages get `/fr` added.
- A page should exist in both languages under the same file name; the language switch links them.
- The search index is built at `/search-<lang>.json`.

## Hosting

It runs behind the front proxy of the server (`site-modulaweb`), which handles TLS for `doc.taskspipes.com`.
