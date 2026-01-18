---
id: matrix-002
title: "Refactor: Update AddTodo to Matrix Architecture"
status: Triage
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [ui, logic]
assignee: Pickle Rick
---

# Description

## Problem to solve
The `AddTodo` component in the sidebar currently uses a column-based layout with separate buttons.

## Solution
Refactor the JSX to use the `.input-matrix` wrapper. Integrate the '+' and '»' buttons into the bar. Ensure logic remains intact.
