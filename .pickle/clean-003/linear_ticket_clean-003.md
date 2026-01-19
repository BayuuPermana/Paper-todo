---
id: clean-003
title: "Fix Scrollbar Overlap and Restore Scribble Animation"
status: Done
priority: High
project: project
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
  - url: plan_20260119.md
    title: Implementation Plan
labels: [css, bugfix, animation]
assignee: Pickle Rick
---

# Description

## Problem to solve
1. The scrollbar in `.sidebar-list` overlaps the task container borders.
2. The scribble completion animation is missing because I changed some elements to non-buttons and added `overflow: hidden` which might be clipping the pseudo-element.

## Solution
1. Increase `padding-right` on `.sidebar-list`.
2. Update CSS selector from `button.todo-text.completed::after` to `.todo-text.completed::after`.
3. Ensure `overflow: hidden` on `.todo-text` doesn't clip the scribble by adding enough height or vertical padding if necessary.
