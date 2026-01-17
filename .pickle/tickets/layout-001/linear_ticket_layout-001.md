---
id: layout-001
title: Implement 2/3 - 1/3 Responsive Split Layout
status: Done
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
The current UI is a single centered column. We need a dual-pane layout for the "Desk" experience.

## Solution
- Refactor `App.jsx` to wrap content in a layout container.
- Use CSS Grid or Flexbox to create a 2/3 (left) and 1/3 (right) split.
- Ensure the layout stacks vertically on mobile (breakpoint: 1024px or similar).
- Apply "Paper" container styling to the new panes if necessary.