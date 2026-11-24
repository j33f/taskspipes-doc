---
title: Time and reports
description: Time each task spends in each step, lead time, daily activity and weekly time reports in TasksPipes, shown in the app, sent by e-mail and published to Outline.
---

## Time per step

Each task shows how long it spent in each column (and in incoming buckets), the step it is in and for how long, its
lead time (creation to done) and the time it was worked on. It is computed from the history.

## Daily activity

*Reports* on a pipe shows, for any day (from the day before at the report hour to that day at the report hour): tasks
new in the pipe, started, done, blocked, dropped, and those still in progress or blocked at the end.

## Weekly time

Development and R&D pipes also get a weekly report, over a week ending on Friday: the time tasks spent in progress and
blocked per task type, the tasks done, those that took the most time, and the **time logged by hand**, per person and
per task, against estimates.

## By e-mail

Members of a pipe's space can have its daily report sent every day at the report hour, and the weekly report every
Friday. Each member gets it in their language; a day without activity sends nothing.

## In Outline

Reports can be published to [Outline](https://www.getoutline.com) as documents — headings, task lists linking back to
TasksPipes, tables — each one a child of a **parent document**.

- **By hand**: *Publish to Outline* in the daily activity, the weekly time report or a closed sprint's report. It is
  published with your own Outline account, under the pipe's parent document or any document you pick (search, or
  paste its address). Available to Outline accounts.
- **Automatically**: in *Reports* › *In Outline*, a member of the space chooses the parent document, gives an
  **Outline API key** (Outline › Settings › API) and checks what to publish:
  - the daily activity, every day at the report hour (days with activity only);
  - the weekly time report, every Friday at the report hour (development pipes) — under its **own document** if you
    choose one, else under the parent;
  - each sprint's report when it closes (pipes in sprints).

  Reports are published as the key's Outline account, even when nobody is signed in, in the language of the member
  who set it up. The key is stored encrypted and never shown again; leave the field empty to keep it when changing
  other settings. Other members can turn the reports on or off, but publishing under other documents takes their own
  key. When Outline cannot be reached or fails on its side, the pipe is tried again every 10 minutes until midnight,
  without publishing the same report twice. If Outline refuses the key (revoked or expired), publishing stops, the
  settings say why, and the member who gave it is told by e-mail; a new key starts it again.

The report hour (18:00 by default) and time zone are set by the instance.
