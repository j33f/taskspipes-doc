---
title: Configuration
description: Every environment variable, and which settings can be managed in the app.
---

TasksPipes is configured with environment variables, in `.env`.

The e-mail, Outline and sign-in settings can also be managed in the app by an administrator (*Administration ›
Settings*). A variable set here (and not empty) wins and shows locked there; leave it out to manage the setting in the
app. Those are `SMTP_*`, `MAIL_FROM`, `OUTLINE_*`, `ALLOW_API_KEY_LOGIN`, `ALLOW_EMAIL_SIGNUP`,
`ALLOW_EMAIL_INVITATIONS`, `EMAIL_DOMAINS` and `OIDC_*`.

## Essentials

| Variable | Purpose |
| --- | --- |
| `APP_URL` | Public URL of TasksPipes (OAuth callbacks, links in e-mails and calendars). |
| `APP_SECRET` | At least 32 characters. Encrypts tokens, secrets and settings in the database. |
| `POSTGRES_PASSWORD` | Password of the bundled database (`DATABASE_URL` with a database of your own, whose account may create the `pgcrypto` and `unaccent` extensions). |
| `APP_PORT`, `APP_BIND` | Port published on the host (3000) and its address (`127.0.0.1`). |
| `ADMIN_EMAILS` | Administrators of the instance, comma-separated addresses. |

## Outline

| Variable | Purpose |
| --- | --- |
| `OUTLINE_ENABLED` | `false` turns Outline off: no sign-in with Outline, no Outline documents. |
| `OUTLINE_URL` | Outline server known to the instance, needed for OAuth sign-in. |
| `OUTLINE_API_URL` | Internal URL the server uses to reach Outline (e.g. `http://outline:3000`). |
| `OUTLINE_OAUTH_CLIENT_ID`, `OUTLINE_OAUTH_CLIENT_SECRET` | OAuth sign-in (see [Sign-in](/self-hosting/sign-in)). |
| `ALLOW_API_KEY_LOGIN` | `true` (default) lets people sign in with a personal Outline API key. |
| `OUTLINE_TEAM_ID` | Only accept accounts of one workspace of `OUTLINE_URL`. |
| `OUTLINE_ALLOWED_HOSTS` | Outline servers people may type (`*.example.com` allowed); empty: any public https server. |
| `OUTLINE_ALLOW_PRIVATE` | `true` also accepts servers over http or on internal addresses. |

## E-mail and accounts without Outline

| Variable | Purpose |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | The SMTP server (587 with STARTTLS, or 465 with `SMTP_SECURE=true`). |
| `MAIL_FROM` | Sender, e.g. `TasksPipes <tasks@example.com>`. |
| `ALLOW_EMAIL_SIGNUP` | `true` (default) lets anyone create an account with an e-mail address (needs SMTP). |
| `ALLOW_EMAIL_INVITATIONS` | `true` (default) lets people invite others by e-mail. |
| `EMAIL_DOMAINS` | E-mail domains allowed to sign up or be invited, comma-separated (all by default). |

## Company sign-in (OpenID Connect)

| Variable | Purpose |
| --- | --- |
| `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET` | The provider and the confidential client registered there, with the redirect URI `APP_URL/auth/oidc/callback`. |
| `OIDC_NAME` | Label of the button (*Continue with …*). |
| `OIDC_SCOPES` | Scopes asked; `openid email profile` by default. |
| `OIDC_ALLOWED_DOMAINS` | E-mail domains allowed to sign in this way. |
| `OIDC_ENABLED` | `false` turns it off while keeping its settings. |

## Everything else

| Variable | Purpose |
| --- | --- |
| `REDIS_URL` | Redis holding the rate limit counters (the bundled one by default). |
| `TIMEZONE`, `REPORT_HOUR` | Time zone and hour (18 by default) of the reports. |
| `DEFAULT_LOCALE` | Language when neither the profile nor the browser gives one (`en`, `fr`, `es`…). |
| `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT` | Push notification keys; derived from `APP_SECRET` by default. |
| `WEBHOOK_ALLOW_PRIVATE` | `true` lets webhooks reach http and internal addresses. |
| `SESSION_DAYS` | Session length, 30 days by default. |
| `LOG_LEVEL` | `info` by default. |
