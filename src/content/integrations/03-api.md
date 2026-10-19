---
title: Public API
description: The TasksPipes public REST API: create personal access tokens, call the documented, versioned endpoints, and see what tokens are not allowed to do.
---

## Access tokens

In **Settings › Access tokens**, create a token for a script or another tool:

- it is shown **once**, at creation; only its hash is kept;
- it has a name, an expiry (30 days, 90 days or a year) and a scope: **read only**, or **read and write**;
- it acts with exactly your rights, and can be revoked at any time.

## Calling the API

The API lives under **`/api/v1`**. Send the token as a bearer token:

```shell
curl -H "Authorization: Bearer tp_…" https://tasks.example.com/api/v1/me/tasks
```

It covers your account, people, spaces, pipes and their tasks, your tasks, the calendar, the search, creating,
changing, moving, sending and commenting tasks, dependencies, labels, logged time and sub-tasks.

The **OpenAPI** description is at `/api/v1/openapi.json`, browsable at **`/api/v1/docs`** (Swagger UI) on your
instance.

## What tokens cannot do

Tokens are accepted on `/api/v1` only. They never manage tokens, account settings, data export, account deletion or
administration: those need a signed-in session. The API is limited to 600 requests per minute per token.
