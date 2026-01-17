---
id: timer-001
title: Implement God Mode Pomodoro Timer & Subtask State Linkage
status: Done
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [logic, state, component]
assignee: Pickle Rick
---

# Description

## Problem to solve
Users need to focus on specific subtasks using the Pomodoro technique.

## Solution
- Create a `PomodoroTimer` component in "God Mode" (custom logic).
- Implement state in `App.jsx` to track the "Active Subtask."
- Link the timer to the active subtask:
    - Starting the timer on a subtask sets it as active.
    - Completing the subtask (checkbox) stops the timer.
- Style with "Paper" aesthetic (hand-drawn numbers, etc.).