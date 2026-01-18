---
id: matrix-001
title: "CSS: Implement Unified Matrix Bar Styles"
status: Triage
priority: High
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
We need a reusable CSS architecture for the integrated input bars.

## Solution
Create `.input-matrix` wrapper styles in `index.css`. This should:
- Use `display: flex`.
- Have a single outer border.
- Handle internal button alignment and border-stripping.
- Ensure the text input fills the remaining space.
- Maintain horizontal orientation on mobile.
