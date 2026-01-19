---
id: css001
title: "Fix Sidebar Horizontal Overflow"
status: Done
priority: High
project: project
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [css, layout]
assignee: Pickle Rick
---

# Description

## Problem to solve
Task items in the sidebar trigger horizontal scroll and some parts (borders/text) are being clipped.

## Solution
1. Audit `index.css` for `sidebar-list` and `.task-sidebar` styles.
2. Remove `padding-right` or adjust `width` to ensure `box-sizing: border-box` is respected and content doesn't overflow.
3. Ensure the `Draggable` wrapper in `TaskSidebar.jsx` doesn't add unexpected margin.
