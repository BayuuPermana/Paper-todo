---
id: split-001
title: "Logic: Implement useIsMobile Viewport Observer"
status: Triage
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [logic, hook]
assignee: Pickle Rick
---

# Description

## Problem to solve
We need a robust way to detect when the viewport crosses the 1200px threshold to trigger the UI hot-swap.

## Solution
Create a `useIsMobile` custom hook. It should:
- Use `window.matchMedia('(max-width: 1200px)')`.
- Add a listener for changes.
- Return a boolean state.
- Clean up listeners on unmount.
