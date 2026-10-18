---
title: Sign-in methods
description: Outline OAuth and API keys, e-mail accounts and company sign-in.
---

Each method below can be set in `.env` or, by an administrator, in **Administration › Settings**.

## Outline OAuth (recommended)

People sign in with their Outline account in one click. It works with the server set as the main Outline server, and
needs an admin of the Outline workspace:

1. In Outline, **Settings › Applications › New application**: name `TasksPipes`, redirect URL
   `<APP_URL>/auth/outline/callback`.
2. Copy its **Client ID** and **Client secret** into the settings (or `OUTLINE_OAUTH_CLIENT_ID` and
   `OUTLINE_OAUTH_CLIENT_SECRET`).

The redirect URL must match exactly, including `https`.

## Outline API keys

With API key sign-in on, people can paste a personal API key created in Outline (**Settings › API**), with read and
write access to documents. They type the address of their Outline server; only public https servers are accepted,
unless internal addresses are allowed.

## E-mail accounts

People without Outline sign in with one-time links sent by e-mail: set up SMTP. They get an account by **signing up**
or by being **invited**. Without SMTP, sign-up is not offered and an invitation shows the link for the inviter to pass
on. The allowed **e-mail domains** can be restricted.

## Company sign-in (OpenID Connect)

Any OpenID Connect provider works (Keycloak, Okta, Entra ID, Google Workspace, Authentik…):

1. Register a **confidential client** with the redirect URI `<APP_URL>/auth/oidc/callback`.
2. Set the issuer URL, client id and secret, and the button's label.

The flow uses PKCE, and the ID token is checked against the provider's keys. An e-mail account with the same address
is linked only when the provider vouches for it (`email_verified`).
