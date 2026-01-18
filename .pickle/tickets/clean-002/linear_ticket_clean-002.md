---
id: clean-002
title: "CSS: Implement Reveal Classes"
status: Triage
priority: Medium
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [ui, css]
assignee: Pickle Rick
---

# Description

## Problem to solve
We need reusable CSS classes to handle the opacity and transition of subtask action buttons.

## Solution
Update `src/index.css` with rules that set action button opacity to 0 by default and 1 when the parent `.sub-task-item` is hovered.
