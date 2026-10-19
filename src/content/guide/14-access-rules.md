---
title: Access rules and privacy
description: Who can see and do what in TasksPipes, how confidential and team-only pipes keep their content in the app, and what stays private about you.
---

## Access rules

| Action | Who |
| --- | --- |
| See a private pipe, a space's incoming | members of the space |
| See an open pipe, add a task to it, comment | everyone who can see its space |
| Find a task with the search | whoever may see it |
| Export a pipe's tasks | everyone who can see the pipe |
| Import tasks into a pipe | members of the space holding the pipe |
| Be suggested in an @mention, be told of it | people who can open the task |
| Make a task wait for another one | those who may edit the task, among the tasks they can open |
| See a linked task one cannot open | its title and owner only; nothing of a confidential or team-only one |
| Move, change the column, assign, due date, document, send | members of the space holding the task |
| Edit title, description, fields, priority and labels | members, or the author of a task in an open pipe |
| Manage a space's labels | members of the space |
| Set an estimate, log one's own time | as for fields |
| Change or delete a time entry | its author; an admin of the team may delete it too |
| Refuse a task | members of the space whose incoming holds it |
| Manage a team | the team's admins |
| Use the API with a token | the token's owner, with their own rights |
| Manage a pipe's webhooks | members of its space (not on confidential pipes) |
| See every account, change the instance's settings | administrators (`ADMIN_EMAILS`) |
| Export one's data; delete one's e-mail account | the person |

## Confidential and team-only pipes

- Their tasks are only named by their key in e-mails and push notifications.
- They have no webhooks, and their tasks show no excerpt in the search.
- Team-only tasks cannot leave their team, and people who leave the team lose access to them.

## Privacy

The app's styles, scripts and font are served by TasksPipes itself, so opening it sends no visitor's address to a
third party; there are no analytics. The only other server the browser reaches is your Outline server, for profile
pictures. Answers to sign-up and invitation forms never reveal whether an address has an account.
