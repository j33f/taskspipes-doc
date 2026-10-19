---
title: GitHub and GitLab
description: Pull and merge requests that move tasks along, by their key.
---

A pipe can be connected to GitHub and GitLab repositories: pull requests, merge requests and commits that name a task
are linked to it, and the task moves along with its pull or merge request.

## Naming a task

Every task has a key, **`TP-<number>`**, shown in its *Development* section with a button to copy a branch name such
as `tp-42-login-page`. Put the key, in any case, in:

- the **branch name** of a pull/merge request (`tp-42-login-page`, `feature/TP-42`…);
- its **title** or **description** (`Login page (TP-42)`);
- or a **commit message** (`TP-42: validate the form`).

## What happens

| Event | The task |
| --- | --- |
| A draft is opened, or a request goes back to draft | moves to the first *started* column (In progress) |
| A request is opened, reopened or marked ready | moves to the first *ongoing* column (In review) |
| The request is merged | moves to the first *done* column (Done) |
| The request is closed without merging | stays where it is |
| Commits are pushed | the commits are linked, the task does not move |

Columns are found by their state, so this works with any pipe type. A dropped task is never moved. Each move and link
is recorded in the task's history.

## Connecting a pipe

In the pipe's settings, open **GitHub / GitLab** and click **Connect**: TasksPipes gives a webhook URL and a secret.

**GitHub** — in the repository, *Settings › Webhooks › Add webhook*: the URL as *Payload URL*, content type
`application/json`, the secret, and the events **Pull requests** and **Pushes**.

**GitLab** — in the project, *Settings › Webhooks › Add new webhook*: the URL, the secret token, and the triggers
**Push events** and **Merge request events**.

Several repositories can send to the same pipe. **New secret…** replaces the secret, **Disconnect** stops the
integration. GitHub signatures and GitLab tokens are checked; anything else is refused.
