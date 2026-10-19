# doc.taskspipes.com

The documentation of [TasksPipes](https://github.com/j33f/TasksPipes).
SvelteKit, prerendered to static files, served by Caddy.

```sh
npm install
npm run dev      # http://localhost:5173
npm run check
npm run build    # static files in build/
docker build -t taskspipes-doc .   # Caddy serving the docs on port 80
```

## Writing pages

Pages are Markdown files in `src/content/<section>/<NN-slug>.md` (`index.md` is the home page):

```md
---
title: Pipes
description: Kanban boards with a purpose.
---

Text…
```

- `NN` sets the order in the sidebar; the file name without it gives the URL (`/guide/pipes`).
- Sections are declared in `SECTIONS`, interface texts in `UI` (`src/lib/docs.ts`).
- Link between pages with their path (`[Pipes](/guide/pipes)`).
- The search index is built at `/search.json`.

## Hosting

It runs behind the front proxy of the server (`site-modulaweb`), which handles TLS for `doc.taskspipes.com`.
