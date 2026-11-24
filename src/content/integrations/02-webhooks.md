---
title: Webhooks, Slack, Mattermost, Teams and Discord
description: Send a pipe's task events as signed JSON webhooks to your tools or to a Slack, Mattermost, Teams or Discord channel, and let other applications create tasks with an incoming webhook.
---

On a pipe's page, **Webhooks** (members of its space) sends task events to an https address:
**task created**, **moved** (column or pipe), **given an owner**, **commented** and **done** — and, in pipes that work in
[sprints](/guide/sprints), **sprint started** (its points committed) and **sprint closed** (points done, carried over,
and the velocity it leads to).

## Signed JSON

Each delivery carries the task (key, title, column, owner, due date, priority, labels, link), who acted and the change,
and is signed with the webhook's secret:

```text
X-TasksPipes-Timestamp: 1792354978
X-TasksPipes-Signature: sha256=<HMAC-SHA256 of "<timestamp>.<body>">
```

A failed delivery is retried after 1 minute, 5 minutes, 30 minutes, 2 hours and 12 hours, then given up. The last
deliveries show in the dialog, with their answer; a *Test* button sends a `ping`.

## Chat channels

A webhook can post to a **Slack**, **Mattermost**, **Microsoft Teams** or **Discord** channel instead: choose its
format and paste the channel's incoming webhook address (for Teams, a *Workflows* webhook; for Discord, the address
from the channel's *Integrations › Webhooks*). Each event becomes a short message with a link to the task — *Alice
moved TP-12 “Quote” to Done* — comments quoted up to 300 characters, in the webhook's language. Discord messages never
ping anyone, even when a title or a comment says @everyone.

## Limits

- Addresses on internal networks are refused (the instance's `WEBHOOK_ALLOW_PRIVATE` lifts it).
- **Confidential and team-only pipes have no webhooks**: their content stays in the app.

## Incoming webhook: tasks from other applications

The other way round: another application — a form, a CRM, Zapier, n8n, a script — creates tasks in a pipe.

1. In the pipe's settings, **Incoming webhook** › **Turn on** (members of its space). You get an address
   (`https://<your instance>/hooks/incoming/…`) and a **secret**, with a `curl` example to copy.
2. The other application sends a `POST` with JSON (or a form), and the secret:
   - in the header `X-TasksPipes-Token: <secret>` (or `Authorization: Bearer <secret>`);
   - or as a signature of the body: `X-TasksPipes-Signature: sha256=<HMAC-SHA256 of the body with the secret>`.

```shell
curl -X POST https://tasks.example.com/hooks/incoming/… \
  -H "Content-Type: application/json" \
  -H "X-TasksPipes-Token: <secret>" \
  -d '{"title": "Call ACME", "description": "From the website", "dueDate": "2026-12-01", "priority": 2}'
```

TasksPipes answers `201` with the task (`id`, `number`, `url`).

### What the body gives

| Field | Becomes |
| --- | --- |
| `title` (needed) | the task's title |
| `description` | its description |
| `dueDate` | its due date (a date, or a date and time) |
| `priority` | 1 urgent, 2 high, 3 medium, 4 low |
| `externalId` | the other application's id: sent again, it makes no second task |

When the other application sends fields of its own, set **templates** (*Templates* in the same section): each field
of the task is written with `{{paths}}` into the body, e.g. a title `Lead: {{contact.name}}` and a description
`{{contact.email}} — {{message}}`, an external id `{{id}}`. Lists and nested fields work: `{{items.0.title}}`.

### As whom

Tasks are made **as the member who turned the webhook on** (or last changed its templates), with their rights: they
show in the history as created by that person, from the incoming webhook. Once they may no longer add tasks to the
pipe (they left the team, the pipe was archived…), the webhook is refused (`403`): turn it on again as someone else.

| Answer | Why |
| --- | --- |
| `201` | The task was made. |
| `200` with `duplicate: true` | This `externalId` was already received: nothing new. |
| `400` | No title, or a body that is neither JSON nor a form. |
| `401` | Wrong secret or signature. |
| `403` | The webhook's author may no longer add tasks to the pipe. |
| `429` | More than 60 tasks a minute. |
