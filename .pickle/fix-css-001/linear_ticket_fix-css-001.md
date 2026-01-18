---
id: fix-css-001
title: Fix CSS Specificity for Mobile-Only Elements
status: Done
priority: High
project: Paper-todo
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [css, bugfix]
assignee: Pickle Rick
---

# Description

## Problem to solve
`.command-header` and `.bottom-matrix` display on desktop because their `display: flex` rule overrides `.mobile-only`'s `display: none` due to cascade order.

## Solution
1. Modify `src/index.css`.
2. Ensure `.mobile-only` uses `!important` or is defined with higher specificity/later in the cascade to strictly hide these elements on desktop (>1200px).
3. Verify on both desktop and mobile viewports.
