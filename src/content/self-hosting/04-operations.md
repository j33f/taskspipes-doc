---
title: Running the instance
description: Run a TasksPipes instance day to day: e-mails, notifications and reports, rate limits, several instances, calendar feeds, GitHub and GitLab webhooks, and backups.
---

## E-mails, notifications and reports

The server checks every minute: e-mails sent at once go out about two minutes after what caused them, the daily
digest and the daily reports at `REPORT_HOUR` (local to `TIMEZONE`), weekly reports on Fridays. Each sending is
recorded, so nothing goes out twice, even across restarts. Push notifications go out every 15 seconds.

## Rate limits

Routes that sign people in, accept a secret or send an e-mail are rate limited; past the limit, the client is blocked
for the length of the window, then longer at each new offence. Counters live in Redis and are shared by every instance
of the app.

## Several instances

TasksPipes can run as several instances on one PostgreSQL database, behind a load balancer, with nothing to turn on:

- sessions, pictures and settings live in the database, so requests need no sticky sessions;
- background work (recurring tasks, e-mails, push, webhooks, reports) is claimed in the database and done once;
- live updates, and who has a page open, are shared between instances through PostgreSQL (`LISTEN`/`NOTIFY`);
- instances starting together take turns to bring the database schema up to date.

Give them all the same `APP_SECRET` and the same `REDIS_URL`. Health checks: `/livez` answers while the process runs,
`/healthz` also reaches the database. One-click updates only apply to the Docker Compose setup. To run it on Kubernetes, see
[Kubernetes](/self-hosting/kubernetes); without containers, [Without Docker](/self-hosting/without-docker).

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
