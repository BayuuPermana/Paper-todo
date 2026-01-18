---
id: rack-001
title: "State: Implement Selection Logic"
status: Triage
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [logic, state]
assignee: Pickle Rick
---

# Description

## Problem to solve
We need a way to track which task is currently being focused on so we can filter subtasks in the main view.

## Solution
Add `selectedTodoId` state to `App.jsx`. Initialize it with the first task if available. Implement a `selectTodo` handler.
