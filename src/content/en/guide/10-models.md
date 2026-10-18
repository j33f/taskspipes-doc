---
title: Models
description: Design your own pipe and task types, and share them as YAML files.
---

When no built-in type fits, design your own in **Models** (sidebar).

## Designing a type

- **Pipe types**: name, category, icon and color, **columns** (each with its state and an optional work in progress
  limit), the **task types** it offers, confidentiality (*confidential*, *team-only*), the weekly time report and
  **starter tasks** offered when a pipe is created.
- **Task types**: name, icon, description and **fields**, with a live preview.

Start from scratch or from an existing model. A model starts **private** — seen and used by its author only — and can
be made **public**. Only its author can change it. A type in use cannot be deleted, and the kind of a saved field
cannot change.

## Model files

Models can be exported and imported as **YAML files**, to share them between instances or keep them under version
control.

- **Export**: the *Export* button of a type downloads it (with the custom task types a pipe type offers);
  *Export my models* downloads all of yours.
- **Import**: *Import…* creates the file's types as **new private models** of yours. A file is imported all or
  nothing: if one type is not valid, nothing is created and the error says why.

```yaml
taskspipes: 1                 # format version (required)

taskTypes:
  - id: company_visit
    label: Company visit
    icon: briefcase
    fields:
      - { id: company, label: Company, type: text }
      - { id: result, label: Result, type: select, options: [OK, To redo] }

pipeTypes:
  - id: work_study
    label: Work-study
    icon: graduation
    color: "#9E5CF7"
    confidential: true
    columns:                  # two or more, at least one "done"
      - { id: to_plan, label: To plan, status: backlog }
      - { id: visit, label: Visit planned, status: ready, wipLimit: 5 }
      - { id: closed, label: Closed, status: done }
    taskTypes: [company_visit]
    templates:
      - Sign the work-study contract
```

- **Column states**: `backlog`, `ready`, `started`, `ongoing`, `blocked`, `done`, `abandoned`.
- **Field types**: `text`, `textarea`, `number`, `money`, `date`, `url`, `email`, `phone`, `select`, `multiselect`
  (with `options`), `checkbox`, `user`, `rncp`, `docs`, `files`.
- **Limits**: 15 columns, 40 fields, 50 starter tasks, 100 models per file.
