---
id: sentient-002
title: "Temporal: Single-Action Undo Buffer"
status: Triage
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [logic, state]
assignee: Pickle Rick
---

# Description

## Problem to solve
Users need a safety net for accidental deletions or edits.

## Solution
Implement a single-level history state in `App.jsx`. Capture the previous `todos` array before any mutation. Map `Ctrl+Z` to restore the captured state.
