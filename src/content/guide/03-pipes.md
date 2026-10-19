---
title: Pipes
description: Pipes are kanban boards with a purpose: built-in or custom pipe types, typed tasks and fields, visibility, work in progress limits, swimlanes and archiving.
---

Pipes are kanban boards with drag and drop. Each column belongs to a generic state — *Backlog, Ready to start,
Started, In progress, Blocked, Done, Dropped* — which the dashboard, due dates, reports and archiving rely on.

## Visibility

- **Private** (personal or team): only the person, or the team's members, see the pipe.
- **Open**: everyone who can see its space sees it; anyone can add tasks and comment, only the space's members move
  them forward.
- Every personal space has a **Personal** pipe for general tasks, which cannot be archived or deleted.

## Pipe types

Each pipe has a type, with its own columns, task types and starter tasks. The built-in catalog covers:

- **Training centres** — general tasks, sales, prospecting, communication, instructional design, documentation,
  trainers & schedule, learner follow-up, disability follow-up, quality & Qualiopi, admin & finance, and processes
  (admission, session start, exams, session end) that can fill their first column with starter tasks;
- **Software** — UX research, UI design, product documentation, translation, R&D, software development (with an *In
  review* column) and testing / QA;
- **Personal life** — chores (flat share, couple, family), moving house, shared custody, home improvement, parties, job
  search, house hunting, health care, paperwork & budget and trips.

Some types are special:

- **Confidential** types (learner follow-up, personal types holding private data) are always private; their tasks are
  only named by their key in e-mails and send no webhooks.
- **Team-only** types (disability follow-up) exist only in team spaces; their tasks cannot leave the team, and people
  who leave the team lose access to them.

Each person can **turn off** the pipe types they do not need: they are no longer offered when creating a pipe.
Need another type? Design it in [Models](/guide/models).

## Task types and fields

Pipe types offer task types with their own fields: short and long text, number, amount, date, link, e-mail, phone,
choice list, multiple choices, checkbox, person, RNCP / RS qualification, Outline documents and files (50 MB max per
file).

## Work in progress limits

A column of a pipe type can have a limit (set in the designer). Its header shows `tasks / limit` and turns red once
the column holds more tasks. The limit only warns: it never blocks a move.

## Swimlanes and filters

A board can show one row of columns per **owner** (team pipes) or per **task type**; the choice is remembered in your
browser. Dropping a task in another lane gives it that lane's owner or type.

Above the board, filter tasks by text, label, priority, owner and task type, or show only yours.

## Archiving

An archived pipe leaves the lists, pickers and *My tasks*, and takes no new tasks. It can still be viewed and
unarchived. A pipe can be archived once all its tasks are done or dropped; its recurring tasks stop.
