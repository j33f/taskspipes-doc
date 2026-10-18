---
title: Tasks
description: Owners, sub-tasks, priority and labels, dependencies, recurrence, time, mentions and history.
---

## The essentials

- **Owner** — a task in a personal space belongs to its holder; to hand it to someone, send it to their
  [incoming](/guide/incoming). In a team space, the owner is chosen among the team's members.
- **Due date**, **description** (Markdown, with a preview) and the **fields** of its task type.
- **Sub-tasks** — a checklist inside the task. Paste several lines to add several items, rename, reorder by drag and
  drop; progress shows on cards.
- **Outline document** — search documents or paste a URL to link one, or create an Outline document from the task.
- **History** — every change is recorded with the state before and after (place, column, owner, due date, document,
  fields, files, checked items) and its comment. Tasks are never deleted: they are moved to *Dropped*.

## Priority and labels

- **Priority**: *urgent*, *high*, *medium*, *low* or none, shown as a colored flag on cards and lists.
- **Labels** belong to a space (*a space's page › Labels*): a name and a color. Members of the space manage them; a
  task gets labels of its space only, and loses them when it is sent to another space.

Pipes, *My tasks* and the search filter by label and priority.

## Mentions

Type `@` in a comment, a description or a refusal reason to mention someone: only people who can open the task are
suggested. The person mentioned is told at once in the app, and by e-mail if they are not in the app then.

## Dependencies

A task can **wait for** other tasks (*Dependencies › Add a task it waits for*), from any space or pipe, among those you
can open; loops are refused.

- While one of them is not done (or dropped), the task shows **Blocked**, and its page lists the tasks it blocks.
- Moving a blocked task on asks for confirmation, and is noted in its history.
- Once the last one is finished, the task's owner and author are told.
- A linked task someone cannot open shows them only its title and owner; a confidential one shows as *Task not
  accessible*.

## Recurring tasks

**Repeat** makes a new task on each date of a rule:

- every *n* days;
- every *n* weeks, on chosen days;
- every *n* months, on a day of the month, on the first, second, third, fourth or last weekday (*the first Monday*),
  or on the last business day;
- every *n* years, on the task's date;

until an optional end date. **At fixed dates**, each task is made on its date or some days ahead (up to 90);
**once the previous one is done**, the next one is made as soon as it is finished. Each new task copies the latest one
— title, description, type, fields, owner, document, labels, priority, estimate and sub-tasks (unchecked).

## Estimate and logged time

A task's *Time* section holds its **estimate** (typed as `2h30`, `1.5` or `45min`) and the **time logged** by hand —
who, which day (up to 90 days back), how long, an optional note — with the total against the estimate. Each person
logs their own time; an entry is changed by its author and deleted by its author or an admin of the team. Logged time
counts in the [weekly report](/guide/reports) and exports.

## Changing the type of a task

In a pipe, a task's page turns it into any type the pipe offers. When accepting a task from an incoming, it can be
turned into a type of the chosen pipe. Fields both types share are kept.
