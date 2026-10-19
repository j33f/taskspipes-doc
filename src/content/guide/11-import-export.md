---
title: Import and export
description: Pipes to CSV and JSON, imports from CSV and Trello, and your own data.
---

**Export and import** is on a pipe's page.

## Exporting a pipe

- **CSV** — key, title, description, column, owner, due date, task type, sub-tasks, one column per field, priority,
  labels, estimate and logged time, author, dates. French pages use semicolons, for spreadsheets.
- **JSON** — the fields' values as stored, with their labels.

Anyone who sees the pipe can export it. A cell a spreadsheet would run as a formula is written as text.

## Importing tasks

Members of the space can import into a pipe that is not archived:

- **CSV** — the separator is guessed; each column is matched to a task property or a field, suggested from its header
  (and the usual words of other tools: *Name*, *List*, *Due*, *Checklist*…), or ignored. Values that match no column
  of the pipe are placed by hand; owners are found by name or e-mail; dates read as `2026-03-09` or `09/03/2026`.
- **Trello** — a board exported as JSON: open cards of open lists, with their description, due date, checklists and
  comments.

A **preview** shows how columns map, the first tasks and every line to correct. Nothing is imported while a line is
wrong; then all lines are created at once (up to 2,000), recorded in their history, without e-mail notifications.

## Your own data

In **Settings › Your data**:

- **Download my data** gives a zip archive: your profile, teams, the tasks you wrote, sent or own with their history,
  every comment you wrote, the time you logged, and the files of those tasks.
- **Delete my account** (e-mail accounts) is confirmed by a two-factor code or a link sent by e-mail. It deletes your
  account, your personal space and its tasks; what you did elsewhere stays in the history under **Deleted account**.
