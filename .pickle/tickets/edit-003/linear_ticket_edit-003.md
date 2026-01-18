---
id: edit-003
title: "UI: Implement Edit Mode in Todo and SubTask Items"
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
The user needs a way to trigger edit mode and save their changes visually.

## Solution
Add an edit button/toggle to `TodoItem` and `SubTaskItem`. When active, swap the text display for a styled input field. Handle "Save" on Enter and "Cancel" on Escape or blur.
