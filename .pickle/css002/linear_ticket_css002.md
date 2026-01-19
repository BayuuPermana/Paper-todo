---
id: css002
title: "Fix Sidebar Container Clipping and Gutter"
status: Done
priority: Urgent
project: project
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
  - url: ../clean-003/research_spacing_20260119.md
    title: Research Spacing
  - url: plan_20260119.md
    title: Implementation Plan
labels: [css, ui, layout]
assignee: Pickle Rick
---

# Description

## Problem to solve
Task containers in the sidebar are clipped left/right and overlapped by the scrollbar. Box shadows and borders are not fully visible.

## Solution
1. Update `index.css`:
    - Increase horizontal padding on `.sidebar-list` to `10px 20px 10px 10px` (more on the right for the scrollbar).
2. Update `TaskSidebar.jsx`:
    - Remove `width: '100%'` from the task item style to let it respect parent padding.
    - Add `margin: '0 5px'` or similar to ensure shadows aren't clipped by `overflow-x: hidden`.
    - Change `cursor: 'grab'` element to ensure it doesn't cause width issues.
