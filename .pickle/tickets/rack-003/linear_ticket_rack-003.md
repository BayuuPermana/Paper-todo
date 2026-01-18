---
id: rack-003
title: "Refactor: Update Grid & Workspace"
status: Triage
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [ui, css, layout]
assignee: Pickle Rick
---

# Description

## Problem to solve
The main 2/3 workspace currently tries to render all tasks. It needs to be updated to show only the detail view of the selected task.

## Solution
Update `App.jsx` render logic. Wrap the layout in a broader 3-pane grid. Refactor the `paper-container` to render `TaskDetail.jsx` (which shows subtasks) instead of the full list. Update CSS for the new 3-column layout.
