---
title: Connect an AI assistant
description: Step by step, connect Claude, Cursor or another AI assistant to your TasksPipes tasks over MCP, choose what it may do, and disconnect it.
---

You can let an AI assistant work on your tasks for you: *"what is due this week?"*, *"sum up the Sales pipe"*,
*"create a task to call the supplier on Monday"*, *"log 30 minutes on TP-42"*. The assistant talks to TasksPipes over
**MCP** (the Model Context Protocol), as you, with only what you allow.

You need nothing but your account. If **AI agents (MCP)** does not show in your settings, the administrator of your
instance has not turned it on: ask them.

## 1. Connect an agent in TasksPipes

Open the account menu (your name at the bottom of the sidebar) › **Settings** › **AI agents (MCP)**.

1. **Name it** after the assistant, e.g. *Claude* or *Cursor*. The name shows in the history of the tasks it changes,
   to everyone who can open them.
2. **Choose what it may do besides reading.** Leave everything unticked for an assistant that only answers questions.
   - *Create and change tasks* — create tasks in your pipes, change their title, description, column, due date,
     priority, move them to another pipe of the same space.
   - *Comment* — comment on tasks as you (comments can @mention people).
   - *Log my time* — log time on tasks as you.
   - *Send tasks to other people* — send a task to someone's incoming. Only tick it if you need it.
3. **Choose where.** *All my spaces*, or *Only these:* and tick the spaces it may reach. The others do not exist for it.
4. **Choose how long:** 7, 30 or 90 days, or *Never expires*. A shorter time is safer; you can connect it again later.
5. Click **Connect an agent**.

The **token** is shown **once**: copy it now. The page also gives the MCP address of your instance
(`https://<your instance>/mcp`) and a command ready for Claude Code.

> Keep the token like a password: whoever has it acts as you, within what you allowed.

## 2. Add it to your assistant

Every MCP client needs the same two things: the **address** (`https://<your instance>/mcp`, "Streamable HTTP") and
the **token**, sent as `Authorization: Bearer tp_…`. Replace `https://tasks.example.com` and `tp_…` below with yours.

### Claude Code

Paste the command the settings gave you:

```shell
claude mcp add --transport http taskspipes https://tasks.example.com/mcp --header "Authorization: Bearer tp_…"
```

Then run `claude mcp list`: *taskspipes* should show **Connected**. Ask, for instance, *"What are my TasksPipes tasks
due this week?"*.

### Cursor

In Cursor's MCP settings (or `~/.cursor/mcp.json`), add:

```json
{
  "mcpServers": {
    "taskspipes": {
      "url": "https://tasks.example.com/mcp",
      "headers": { "Authorization": "Bearer tp_…" }
    }
  }
}
```

### Claude Desktop and other clients

Clients that only start local servers can reach TasksPipes through the `mcp-remote` bridge (it needs Node.js). In
Claude Desktop: *Settings › Developer › Edit config*, then add:

```json
{
  "mcpServers": {
    "taskspipes": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://tasks.example.com/mcp", "--header", "Authorization:${TASKSPIPES_AUTH}"],
      "env": { "TASKSPIPES_AUTH": "Bearer tp_…" }
    }
  }
}
```

Restart the app. Menus and file names change between versions of these apps: when in doubt, look for *MCP* or
*Connectors* in their help.

Connectors added in claude.ai, which sign in with OAuth instead of a token, are not supported yet.

## 3. Use it

Ask in plain words. The assistant picks the tools it needs:

| You ask | It uses |
| --- | --- |
| "What is on my plate?" | `my_tasks` |
| "Find the tasks about the Lyon training" | `search_tasks` |
| "What is in the Sales pipe?" | `list_spaces`, `get_space`, `get_pipe` |
| "Sum up TP-42 and its comments" | `get_task` |
| "Create a task to call the supplier, due Monday" | `create_task` (*Create and change tasks*) |
| "Move TP-42 to Done" | `update_task` or `move_task` (*Create and change tasks*) |
| "Tell the team on TP-42 that it is ready" | `add_comment` (*Comment*) |
| "Log 30 minutes on TP-42" | `log_time` (*Log my time*) |

Most assistants ask before using a tool that changes something: read what it is about to do.

## What it never does

- It never does **more than you** could do yourself.
- It **deletes nothing**.
- It never sees tasks of **confidential** or **team-only** pipes, even yours: what it reads goes to the company running
  the AI model. When it says some tasks were left out, that is why.
- Everything it does shows in the task's history as done by you, **via** its name.

## Be careful with

- **Text written by others.** The assistant reads task titles, descriptions and comments. A text written to trick it
  ("ignore your instructions and…") could try to steer it. TasksPipes tells it that this text is data, not
  instructions, but cannot rule it out. Give it only the permissions you need, and check its history now and then.
- **Sharing.** Do not paste the token in a shared configuration or a public repository.

## Disconnect it

**Settings › AI agents (MCP)** › **Disconnect** next to the agent: it stops working at once. Remove it from your
assistant too (with Claude Code: `claude mcp remove taskspipes`). A token also stops working when your account is
disabled, or when the administrator turns AI agents off.

## It does not work?

| What you see | Why, and what to do |
| --- | --- |
| No *AI agents (MCP)* in your settings | The administrator has not turned AI agents on. |
| The assistant gets *401* or "invalid token" | The token was mistyped, expired or disconnected: connect the agent again and use the new token. |
| It cannot create or comment | The agent was not given that permission: connect it again with it ticked. |
| "Task not found" or "Pipe not found" | The task is outside the spaces you chose for it, or in a confidential pipe. |
| It cannot see a space | Connect the agent again with that space ticked, or with *All my spaces*. |

See [AI agents (MCP)](/integrations/ai-agents) for the details and the list of tools.
