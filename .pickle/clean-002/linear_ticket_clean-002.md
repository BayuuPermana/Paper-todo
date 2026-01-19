---
id: clean-002
title: "Truncate Task Names and Shorten Sidebar"
status: Done
priority: Medium
project: project
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [ui, css, cleanup]
assignee: Pickle Rick
---

# Description

## Problem to solve
Long task/subtask names cause layout issues. Sidebar is slightly too wide after previous expansion.

## Solution
1. Update `index.css`:
    - Set `.app-layout` sidebar width to 300px.
    - Update `.todo-text` to include `overflow: hidden`, `text-overflow: ellipsis`, and `white-space: nowrap`.
2. Update `TaskSidebar.jsx`:
    - Ensure the task name div has the truncation logic (either via class or inline style).
