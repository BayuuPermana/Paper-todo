---
id: clean-001
title: "Merge Redundant TaskSidebar Containers"
status: Done
priority: Medium
project: project
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
  - url: research_20260119.md
    title: Research Document
  - url: plan_20260119.md
    title: Implementation Plan
labels: [refactor, cleanup]
assignee: Pickle Rick
---

# Description

## Problem to solve
`App.jsx` and `TaskSidebar.jsx` both have a `.task-sidebar` container. This is redundant and applies styles twice.

## Solution
1. Update `TaskSidebar.jsx` to accept `className` as a prop and merge it with its own styles.
2. Update `App.jsx` to remove the outer `div` and pass the mobile visibility classes directly to `TaskSidebar`.
3. Keep the `DragDropContext` wrapping `TaskSidebar`.
