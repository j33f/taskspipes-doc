---
title: Translation
description: Add a language with a single file.
---

TasksPipes is available in English, French and Spanish. Each language is **one file**, `locales/<code>.json`, at the
root of the repository, holding the texts of the web app, the server's messages and the built-in catalog.

## Adding a language

1. Copy `locales/fr.json` to `locales/<code>.json` (`de`, `it`, `pt`…).
2. Set `name` (the language's own name), `intl` (e.g. `de-DE`) and `csvSeparator`, and translate the values of
   `web` and `server` — their keys are the English texts.
3. Translate `catalog` from `locales/en.json`: its keys are the French labels of the catalog.
4. Rebuild and restart: the language shows in the menu. No code changes.

Keep the placeholders (`{name}`, `{n}`…) as they are, and keep translations short. A language can be published
partly translated: missing texts show in English, and the tests tell how many are left.
