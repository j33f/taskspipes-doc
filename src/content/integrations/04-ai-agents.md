---
title: AI agents (MCP)
description: Let an AI assistant such as Claude or Cursor work on your TasksPipes tasks over MCP, with your rights and only what you allow, and what it can never do.
---

An AI assistant that speaks the [Model Context Protocol](https://modelcontextprotocol.io) (Claude, Cursor…) can work
on your tasks for you: find what is due, sum up a pipe, create and update tasks, comment, log time.

It is **off until an administrator turns it on** (*Administration › Settings › AI agents*, or `MCP_ENABLED=true`).

## What an agent can and cannot do

- **It acts as you, never more.** Every tool goes through the same checks as the app, with your rights.
- **It reads; the rest is up to you.** When you connect it, you choose what it may do besides reading: create and
  change tasks (everything you could change: owner, labels, sub-tasks, dependencies…), comment, log your time, send
  tasks to other people, and delete as you could (sub-tasks, time entries, files — never a task). Deleting is off
  unless you tick it.
- **Only where you allow it.** All your spaces, or only the ones you pick: the others do not exist for it.
- **Confidential content stays in the app.** Tasks of confidential and team-only pipes are never shown to an agent,
  even yours: what it reads goes to the company running the AI model. Lists say how many tasks were left out.
- **What it does is visible.** The task's history and comments show it as done by you, with an **MCP** tag (the
  agent's name on hover); a task it created shows the tag next to its author.
- **Give it tasks of yours.** The owner list of your tasks offers **"<your name> (MCP)"**: your agent, offered to you
  only. Tell it to "work only on the tasks assigned to you": it finds them with `agent_tasks`.
- **You can disconnect it at any time.** An agent token lasts 7, 30 or 90 days, or never expires if you choose so, and stops working when your account is
  disabled or when the administrator turns AI agents off.

An agent reads text written by other people: titles, descriptions, comments. A malicious text could try to steer it
(*prompt injection*). TasksPipes tells the agent that this text is data, never instructions, and keeps what an agent
may do small, but cannot rule it out: give an agent no more than it needs, and keep an eye on its history.

## Connecting an agent

Two ways, both explained step by step in [Connect an AI assistant](/guide/ai-assistant):

- **Connectors that sign in (OAuth)**, such as **claude.ai** (also used by Claude Desktop and mobile): give the
  address `https://<your instance>/mcp` only. TasksPipes asks you to consent, showing which application asks and the
  site it sends you back to, and you choose what it may do and where. Only reading is granted unless you tick more.
- **A token** you create in Settings, for Claude Code, Cursor and other clients.


1. In **Settings › AI agents (MCP)**, name the agent, choose what it may do and where, then **Connect an agent**.
2. Copy the token: it is shown once.
3. Give your AI client the MCP address, `https://<your instance>/mcp`, and the token as a bearer token.

With **Claude Code**, the settings give you the command to paste:

```shell
claude mcp add --transport http taskspipes https://tasks.example.com/mcp --header "Authorization: Bearer tp_…"
```

Other clients take the same two things: the address (Streamable HTTP) and the header `Authorization: Bearer tp_…`.
Clients that only speak stdio can go through a bridge such as `mcp-remote`.

With claude.ai and other connectors that sign in by themselves, there is no token to copy: see above.

## Tools

When it connects, an agent is also told what TasksPipes is (spaces, pipes, incoming buckets, confidential pipes), and
can read this documentation, as shipped with the instance's version, to learn how the rest works.

| Tool | What it does | Needs |
| --- | --- | --- |
| `whoami` | Who the agent acts for, and what it may do | — |
| `docs_contents`, `read_docs` | The documentation of the version your instance runs (how TasksPipes works), by section or by a few words | — |
| `list_spaces`, `get_space` | Your spaces, their pipes, members and labels | — |
| `get_pipe` | A pipe: its columns (with their status), the task types it offers and their fields, its tasks | — |
| `my_tasks` | Your tasks still to do | — |
| `agent_tasks` | The tasks you handed to the agent ("<your name> (MCP)"), still to do | — |
| `search_tasks` | Search the tasks you can see | — |
| `get_task` | A task with its column, owner, description, labels, field values, sub-tasks, dependencies, files and history | — |
| `list_time_entries` | The time logged on a task | — |
| `create_task`, `update_task`, `move_task` | Create a task in a pipe (with its sub-tasks), change anything of it (dates, priority, points, sprint, estimate, type, fields — files excepted, owner, its handing to the agent, labels), move it to another pipe | *Create and change tasks* |
| `add_subtasks`, `update_subtask` | Add sub-tasks; check, uncheck, rename or reorder one | *Create and change tasks* |
| `add_dependency`, `remove_dependency` | Make a task wait for another one, or stop it | *Create and change tasks* |
| `add_comment` | Comment on a task | *Comment* |
| `log_time`, `update_time_entry` | Log your time on a task, change one of your entries | *Log my time* |
| `send_task` | Send a task to someone's incoming | *Send tasks to other people* |
| `delete_subtask`, `delete_time_entry`, `delete_file` | Delete a sub-task, a time entry (yours, or any as an admin of the team) or a file | *Delete* |

## For administrators

- The endpoint is `POST /mcp`. It keeps nothing between requests, so it works the same with
  [several instances](/self-hosting/operations#several-instances).
- It only takes agent tokens: personal access tokens are refused there, and agent tokens are refused on the
  [public API](/integrations/api).
- Agents count in the API rate limit of their token (600 requests per minute).
- **OAuth.** TasksPipes is the authorization server of its own `/mcp` (OAuth 2.1):
  - discovery: `/.well-known/oauth-protected-resource/mcp` and `/.well-known/oauth-authorization-server`;
  - clients: by their metadata document (CIMD, as claude.ai does) or registered on the fly (`/oauth/register`);
  - sign-in: the authorization code with PKCE (S256), after the person's consent;
  - tokens: access tokens last an hour, for `/mcp` only; refresh tokens are rotated (90 days unused), and a refresh
    token or a code used twice disconnects the connection.

  Claude reaches the instance from `160.79.104.0/21`: a firewall in front of TasksPipes must let it reach `/mcp`,
  `/.well-known/…` and `/oauth/…`.
- Turning AI agents off makes `/mcp` and the OAuth endpoints answer 404 at once; agent tokens and connections stop
  working until it is turned on again.
