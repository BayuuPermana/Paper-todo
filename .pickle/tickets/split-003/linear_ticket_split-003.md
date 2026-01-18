---
id: split-003
title: "Refactor: Specialized Component Variants"
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
The `PomodoroTimer` and `PaperCalendar` are trying to be too many things at once.

## Solution
Ensure these components have clean internal logic for their 'full' vs 'header' variants. Remove all 'mobile-hide' and 'mobile-show' CSS classes in favor of structural rendering in the layout components.
