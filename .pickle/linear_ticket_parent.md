---
id: parent-css-fix
title: [Epic] Fix Mobile Header/Footer Visibility on Desktop
status: Backlog
priority: High
project: Paper-todo
created: 2026-01-19
updated: 2026-01-19
links:
  - url: prd.md
    title: PRD
labels: [epic, css, ui]
assignee: Pickle Rick
---

# Description

## Problem to solve
The "Sticky Mobile Header" and "Bottom Matrix" are visible on desktop (>1200px) due to CSS specificity issues, causing visual clutter ("slop").

## Solution
Implement the PRD requirements: Ensure strict visibility rules for mobile-only elements using CSS overrides or specificity corrections.
