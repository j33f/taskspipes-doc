---
title: Sprints and Planning Poker
description: Work in sprints in TasksPipes — complexity points, sprint planning, learned velocity, burndowns, sprint reports, a timeline of sprints and tasks, and real-time Planning Poker for teams.
---

The **Sprint** pipe type (in the *Software* group) plans its tasks in sprints of a few weeks. It has the columns and
task types of *Software development*. A model of your own can work in sprints too: check *Work in sprints* in the
designer.

## Settings

In *Edit the pipe › Sprints*: the length of a sprint (1 to 4 weeks), the day it starts, the days worked, and the
velocity — learned from the last sprints, or set by hand. Check *E-mail the report of each closed sprint* to send each
report to the space's members.

## A sprint

A sprint has a name, a goal and dates; a new one follows the last one. It is **planned**, then **under way** — one at
a time: starting it commits the points of its tasks — then **closed**. Closing it keeps the points done and freezes a
report; its unfinished tasks go to the next sprint (made if there is none) or back to the backlog. A closed sprint can
be marked *exceptional* (holidays, an incident…) to leave it out of the velocity.

The **board** shows the sprint under way, under a banner: its dates, goal, day of work, the points done out of those
planned, against the velocity. A selector shows another sprint, all of them, or the backlog. A task added while a
sprint is shown goes in it.

## Planning

The **Planning** view shows the backlog beside the sprints still open, each with its points against the velocity.
Move tasks by drag and drop, or with their *Sprint* menu (on a phone too), and set their points there.

## Velocity

Set by hand, or **learned**: from the last 6 closed sprints, as points done per week. Sprints marked exceptional are
left out, and so are those far from the others; the velocity is the average of the values left that are not above
their median — a cautious figure — times the length of a sprint. Until 3 sprints count, the velocity typed in the
settings is used. *Progress of the work* (in the planning) shows how it was learned, sprint by sprint.

## Burndowns and reports

- **A sprint's burndown** (*Burndown* on its banner): the points still to do at the end of each working day, against
  the ideal line, and the points of all its tasks, which rise when tasks are added. Hover a day for its figures; they
  are all in a table below.
- **The work's progress**: at the end of each sprint, the points of the pipe done and still to do, the tasks without
  points, and the **expected end** at the current velocity.
- **A closed sprint's report** (*Report* on its banner): points committed, done, carried over and added on the way, its
  burndown, what was done per person and per task type, and the velocity it leads to. It can be published to Outline, by hand or
  automatically as each sprint closes (see [Time and reports](/guide/reports#in-outline)).

They are read from the tasks' history, so they are right whenever you open them.

## Timeline

The **Timeline** view draws each task as a bar from its **start date** to its due date (set on the task's page); a
missing date comes from its sprint, and the bar is then dashed. With *All the sprints*, each sprint is a band with its
tasks below (the closed ones folded). Releases are milestones; arrows join a task to those it waits for, in red when
it starts before they end. Members drag a bar to move it, or its ends to change its dates.

## Planning Poker

In team pipes — on by default in Sprint pipes, and turned on or off in a pipe's settings — the team estimates tasks
together:

1. Open a session from the planning (*Planning Poker*) with the tasks to estimate; you lead it. The others see a
   banner to join it.
2. For the task being estimated, everyone picks a card. **No one sees the others' cards** until they are shown —
   only who picked one.
3. The one leading shows the cards, with their spread, median and a suggestion, starts another round if they differ
   too much, then sets the points. They go on the task (its history says *Planning Poker*) and the next task comes.

Anyone of the team can take the lead, or close the session.
