---
title: Administration
description: Administer a TasksPipes instance: manage accounts, change e-mail, Outline and sign-in settings without a restart, review the history of changes, and follow the backups.
---

Administrators of the instance are named by the `ADMIN_EMAILS` variable, never in the app. Only an e-mail account,
an Outline account of the server set in `OUTLINE_URL`, or a company sign-in account whose address the provider
vouches for can be one. They find **Administration** in the account menu.

## Accounts

The **Accounts** tab lists every account — kind, Outline server, last sign-in, state — and can **disable** one: its
sessions and open pages are closed at once, it can no longer sign in, its tasks and history stay. It can be enabled
again. An administrator cannot disable themselves or another administrator.

## Settings

The **Settings** tab manages the instance while it runs, without a restart:

- **E-mail (SMTP)** — server, port, TLS, user, password, sender, and a *Send me a test e-mail* button;
- **Outline** — on or off (off, Outline accounts are signed out and cannot sign in, their tasks stay), main server,
  its API address, other servers allowed, internal addresses, a single workspace, sign-in with an API key;
- **Outline OAuth** — client id and secret, with the redirect URL to copy;
- **Accounts without Outline** — sign-up, invitations by e-mail, and the **e-mail domains** allowed;
- **Company sign-in (OpenID Connect)** — on or off, issuer, client, secret, button label, scopes, domains;
- **AI agents (MCP)** — whether people may connect AI assistants to their tasks (off by default; see
  [AI agents](/integrations/ai-agents));
- **AI assistant** — the AI built into TasksPipes, one for the whole instance: a provider (Anthropic, OpenAI,
  Mistral AI, OpenRouter, Ollama) or *Other* — any server speaking the OpenAI or the Anthropic API, with its address.
  Then its API key (encrypted), the **model** (*Find the models* lists those the AI offers, even before saving) and the
  **effort** (how much a model that thinks may think). *Test the connection* asks it a short question. An AI on an
  internal address, such as Ollama on the same machine, must be allowed explicitly. Confidential pipes are never sent
  to it. On a task, it [rewords and completes](/guide/tasks#ai-assistant) it and asks its questions; in the [search](/guide/search#ask-the-assistant), it answers questions about your tasks.

A setting given by the server's environment (`.env`) wins and shows **locked**. Secrets are encrypted and never shown
again: they can only be replaced or removed. A change that would leave you, or every administrator, unable to sign in
is refused.

## History of changes

Every change of a setting is listed: who, when, before and after — never a secret.

## Backups

The **Backups** tab shows how the instance is backed up on its server: the plan (when, how many kept, encrypted or not,
the copy on S3-compatible storage), the last good backup, and the recent ones — planned, by hand, before an update
or a restore — with their size and errors. The tab is marked when something is wrong, and the administrators are told
by e-mail and push notification when a backup fails, when its copy fails, or when planned backups stop coming.

Backups are made and planned on the server, not in the app: see
[Backups, restore and moving](/self-hosting/backups).
