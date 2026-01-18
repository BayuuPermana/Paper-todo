---
id: desk-003
title: "Refactor: Symmetrical Margins & Viewport Integrity"
status: Triage
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [ui, aesthetic, layout]
assignee: Pickle Rick
---

# Description

## Problem to solve
The app container needs to be "seen fully" with equal top/bottom margins, preventing the bottom of the "paper" from being cut off or touching the screen edge.

## Solution
Adjust `body` padding and `.paper-container` height to ensure perfect vertical centering and spacing within the viewport.
