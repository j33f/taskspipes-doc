---
title: Installation
description: Install TasksPipes in one command — Docker, HTTPS and updates included — or by hand with Docker Compose: requirements, reverse proxy, and updates in one click or one command.
---

TasksPipes is a single Node.js container serving both the API and the web app, with PostgreSQL and Redis. The
`docker-compose.yml` of the repository runs all three.

## Requirements

- A Linux server — Debian, Ubuntu, Raspberry Pi OS, Fedora, RHEL, CentOS, Rocky or AlmaLinux, amd64 or arm64 — with
  **Docker** and Docker Compose (the installer adds them when missing);
- a domain name pointing to it, and **HTTPS** (the installer can set up Caddy, or use your own reverse proxy);
- optionally, an SMTP account for e-mails, and an Outline workspace.

## Install in one command

```shell
curl -fsSL https://raw.githubusercontent.com/j33f/TasksPipes/main/scripts/install.sh | sudo bash
```

The installer ([read it first](https://github.com/j33f/TasksPipes/blob/main/scripts/install.sh) if you like):

1. installs **Docker** Engine and its Compose plugin from **Docker's official repositories** when they are missing;
2. asks for the public address, the administrator's e-mail and your Outline server (optional), and how to serve
   HTTPS: **Caddy** in front, with an automatic certificate (ports 80 and 443 must reach the server), or **your own
   reverse proxy** (the app then listens on `127.0.0.1:3000`);
3. installs the latest release in `/opt/taskspipes` — its published image, or built from the sources when there is
   none for the machine — and writes `.env` with fresh secrets, readable by root only;
4. sets up updates: **in one click from the app** with the published image, and in any case the
   **`taskspipes-update`** command (an alias for bash and zsh);
5. starts everything and waits until the app is healthy.

Then open the address, sign in with the administrator's e-mail and finish in **Administration › Settings** (e-mail,
Outline OAuth, sign-in…). Running the installer again keeps the configuration. Without questions:

```shell
curl -fsSL https://raw.githubusercontent.com/j33f/TasksPipes/main/scripts/install.sh | sudo bash -s -- --yes \
  --domain tasks.example.com --admin-email admin@example.com --proxy caddy --updates auto
```

Other options: `--dir`, `--outline-url`, `--port`, `--version`, `--ref` (build a branch or tag from the sources);
`--help` lists them.

## Install by hand

1. Get the configuration:

   ```shell
   git clone https://github.com/j33f/TasksPipes.git
   cd TasksPipes
   cp .env.example .env
   ```

2. Fill in at least `APP_URL` (the public URL), `APP_SECRET` (`openssl rand -hex 32`) and `POSTGRES_PASSWORD`.
   No Outline server needs to be configured: people type theirs on the sign-in page.

3. Start, with the image published for the release (`TASKSPIPES_VERSION`, `latest` by default):

   ```shell
   docker compose up -d
   ```

   or build it from these sources with `docker compose up -d --build`.

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

## Updates

Every hour the server looks for a new release on GitHub. The administrators are told once, by e-mail and on their
devices, and **About** shows the new version to everyone with its release notes (turn it off in Administration ›
Settings › Updates, or `UPDATE_CHECK=false`). The database schema is upgraded at start-up.

### In one click

With the **updater** — set up by the installer, or by hand with `UPDATER_TOKEN` and `COMPOSE_PROFILES=updater` in
`.env` — an administrator clicks **Update to …** in **About**. The app restarts with the new version, goes back to the
previous one by itself if it does not start, and open pages reload once it runs. The updater is a separate small
service: it alone holds the Docker socket, answers only the app (with a shared token, on the internal network) and
takes nothing but a version number. See *One-click updates* in the
[hosting guide](https://github.com/j33f/TasksPipes/blob/main/docs/HOSTING.md#one-click-updates).

### In one command

Installed with the installer:

```shell
taskspipes-update            # or: sudo /opt/taskspipes/scripts/update.sh
taskspipes-update --check    # only tell whether a new release exists
```

It backs the database up (`backups/`, the last five kept), moves to the latest release, waits until the app is
healthy, and puts the previous version back if it is not.

### By hand

With the published image, set `TASKSPIPES_VERSION` in `.env`, then `docker compose pull app && docker compose up -d`;
built from the sources, `git pull && docker compose up -d --build`. Back up the database first
(`docker compose exec db pg_dump -U taskspipes -Fc taskspipes > backup.dump`).
