---
id: rack-002
title: "Component: Create TaskSidebar"
status: Triage
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [ui, component]
assignee: Pickle Rick
---

# Description

## Problem to solve
The sidebar needs to display the high-level tasks and handle creation of new ones.

## Solution
Create `TaskSidebar.jsx`. Move `AddTodo.jsx` into the sidebar. Display a list of tasks with their step counts (e.g., "Build Rocket (2/5)"). Add click handlers to select a task.
