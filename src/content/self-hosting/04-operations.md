---
title: Running the instance
description: Run a TasksPipes instance day to day: e-mails, notifications and reports, rate limits, calendar feeds, GitHub and GitLab webhooks, and backups.
---

## E-mails, notifications and reports

The server checks every minute: e-mails sent at once go out about two minutes after what caused them, the daily
digest and the daily reports at `REPORT_HOUR` (local to `TIMEZONE`), weekly reports on Fridays. Each sending is
recorded, so nothing goes out twice, even across restarts. Push notifications go out every 15 seconds.

## Rate limits

Routes that sign people in, accept a secret or send an e-mail are rate limited; past the limit, the client is blocked
for the length of the window, then longer at each new offence. Counters live in Redis and are shared by every instance
of the app.

## Calendar feeds

Each person's calendar feed is served at `<APP_URL>/cal/<token>.ics`: calendar apps fetch it without a session, the
token being its only credential. It can be renewed from the app.

## Webhooks from GitHub and GitLab

Connected pipes receive webhooks at `<APP_URL>/hooks/github/…` and `<APP_URL>/hooks/gitlab/…`: GitHub or GitLab must
be able to reach `APP_URL`.

## Backups

Everything is in PostgreSQL, files included, and the secrets that open it are in `.env`. Back up both with one
command, plan backups — encrypted, copied to S3-compatible storage — and restore them or move the instance to another
server: see [Backups, restore and moving](/self-hosting/backups).

```shell
taskspipes-backup             # back up now
taskspipes-backup --setup     # plan backups, encryption, S3 copy
taskspipes-restore --latest   # put the latest backup back
```
