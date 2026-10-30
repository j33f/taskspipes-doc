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

Everything is in PostgreSQL, files included. Back it up regularly:

```shell
docker compose exec db pg_dump -U taskspipes -Fc taskspipes > taskspipes-$(date +%F).dump
```

Keep `APP_SECRET` with the backups: secrets stored in the database are encrypted with it. `taskspipes-update` also
backs the database up before each update, in `backups/` (the last five kept).
