---
title: Spaces and people
description: Personal and team spaces in TasksPipes: Outline colleagues, accounts without Outline, e-mail invitations, connections and who can see whom.
---

## Spaces

Everyone has a **personal space**; the personal spaces of the people you can see are visible too. **Team spaces** are
created by picking their members. Governance is shared by promoting other members to *admin*; a team always keeps at
least one admin. Team admins manage the team's name, members, roles and deletion.

## Outline colleagues

Once TasksPipes is connected to Outline, everyone in the Outline workspace is there straight away, imported at the
first sign-in. Colleagues who have not signed in to TasksPipes yet show greyed out: they get no task, join no team and
get no e-mail until they sign in once. **Invite** them from the sidebar or their page: they get an e-mail asking them
to sign in with their Outline account, or, when the instance sends no e-mail, the link to give them is copied.

Each Outline server keeps its own people and teams: accounts of one server do not see those of another.

## Accounts without Outline

People without an Outline account can **create an account** from the sign-in page with just their e-mail address and
a display name: a link sent by e-mail confirms the address and signs them in. They sign in with one-time links,
can turn on **two-factor authentication** (TOTP, e.g. Google Authenticator), change their name and upload a profile
picture. They have no access to Outline documents.

With **company sign-in** (OpenID Connect) set up, people can also continue with your identity provider. The first
sign-in creates the account, unless an e-mail account has the same address and the provider vouches for it: that
account is then linked and kept, with its tasks and teams.

## Invitations and connections

From **Invite people** in the account menu, invite someone by e-mail, optionally into one of your teams:

- **a new address**: an e-mail account is created and gets a sign-in link valid for 48 hours; you are connected at
  once. If the link is not used in time, the account is disabled until someone sends a new link or invites the address
  again;
- **someone already on TasksPipes**: they get a **request to connect**, which they accept or refuse. The answer is the
  same whether or not the address has an account, so invitations never reveal who uses TasksPipes.

Connected people see each other and can send each other tasks; the team you chose is joined on acceptance.

## Who sees whom

- Outline accounts of a same server see each other.
- An e-mail or company sign-in account only sees the people it is connected to, and the members of its teams.
- Disabled accounts are seen by no one.
