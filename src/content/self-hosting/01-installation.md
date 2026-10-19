---
title: Installation
description: Install TasksPipes with Docker in a few minutes: requirements, a quick start with Docker Compose, PostgreSQL and Redis, reverse proxy setup and upgrades.
---

TasksPipes is a single Node.js container serving both the API and the web app, with PostgreSQL and Redis. The
`docker-compose.yml` of the repository runs all three.

## Requirements

- A server with **Docker** and Docker Compose;
- a domain name, and an **HTTPS reverse proxy** (Caddy, Traefik, nginx…);
- optionally, an SMTP account for e-mails, and an Outline workspace.

## Quick start

1. Get the code and the configuration:

   ```shell
   git clone https://github.com/j33f/TasksPipes.git
   cd TasksPipes
   cp .env.example .env
   ```

2. Fill in at least `APP_URL` (the public URL), `APP_SECRET` (`openssl rand -hex 32`) and `POSTGRES_PASSWORD`.
   No Outline server needs to be configured: people type theirs on the sign-in page.

3. Start:

   ```shell
   docker compose up -d --build
   ```

4. Open `APP_URL` and sign in. Add your address to `ADMIN_EMAILS` to manage the instance from
   **Administration** — e-mail, Outline and sign-in can then be set in the app.

## Behind a reverse proxy

With an `https://` `APP_URL`, cookies are `Secure`. The proxy must pass WebSocket upgrades through for live updates
(`/api/events`); Caddy and Traefik do it by default. With Caddy:

```text
tasks.example.com {
	encode zstd gzip
	reverse_proxy 127.0.0.1:3000
}
```

The port is published on `127.0.0.1` only (`APP_BIND`): the app trusts the client address sent by the proxy, so it
must be reached through the proxy alone.

## Upgrading

Pull the new version and rebuild; the database schema is upgraded at start-up:

```shell
git pull
docker compose up -d --build
```

Back up the database first (`docker compose exec db pg_dump -U taskspipes -Fc taskspipes > backup.dump`).
