---
title: Webhooks, Slack, Mattermost and Teams
description: Send a pipe's events to your tools or to a chat channel.
---

On a pipe's page, **Webhooks** (members of its space) sends task events to an https address:
**task created**, **moved** (column or pipe), **given an owner**, **commented** and **done**.

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

A webhook can post to a **Slack**, **Mattermost** or **Microsoft Teams** channel instead: choose its format and paste
the channel's incoming webhook address (for Teams, a *Workflows* webhook). Each event becomes a short message with a
link to the task — *Alice moved TP-12 “Quote” to Done* — comments quoted up to 300 characters, in the webhook's
language.

## Limits

- Addresses on internal networks are refused (the instance's `WEBHOOK_ALLOW_PRIVATE` lifts it).
- **Confidential and team-only pipes have no webhooks**: their content stays in the app.
