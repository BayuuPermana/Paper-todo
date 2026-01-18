---
id: heat-001
title: "Data: Persistent Completion Logging & Scoring"
status: Triage
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [logic, storage]
assignee: Pickle Rick
---

# Description

## Problem to solve
We need a persistent record of every completion event to calculate heatmap intensities.

## Solution
Add `activityLog` to the application state and `localStorage`. Update `toggleComplete` and `toggleSubTask` to push entries into this log (Date, Type, Points).
- Subtask = 1pt
- Task = 3pts
- Entries are only added when `completed` becomes `true`.
