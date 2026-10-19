---
title: Administration
description: Administer a TasksPipes instance: manage accounts, change e-mail, Outline and sign-in settings without a restart, and review the history of changes.
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
- **Company sign-in (OpenID Connect)** — on or off, issuer, client, secret, button label, scopes, domains.

A setting given by the server's environment (`.env`) wins and shows **locked**. Secrets are encrypted and never shown
again: they can only be replaced or removed. A change that would leave you, or every administrator, unable to sign in
is refused.

## History of changes

Every change of a setting is listed: who, when, before and after — never a secret.
