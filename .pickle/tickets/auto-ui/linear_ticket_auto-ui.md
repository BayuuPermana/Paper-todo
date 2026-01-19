---
id: auto-ui
title: "Feature: Autosave Indicator"
status: Done
priority: High
project: project
created: 2026-01-20
updated: 2026-01-20
links:
  - url: ../autosave-001/linear_ticket_autosave-001.md
    title: Parent Ticket
  - url: plan_20260120.md
    title: Implementation Plan
labels: [feature, ui]
assignee: Pickle Rick
---

# Description

## Problem to solve
Users need visual feedback when data is saved.

## Solution
- Create a `SavingIndicator` component.
- Add `isSaving` state to `App.jsx`.
- Trigger `setIsSaving(true)` before DB calls and `false` after.
- Ensure the indicator is subtle but visible.

# Discussion
- 2026-01-20 Pickle Rick: Implemented `SavingIndicator` and wrapped all DB calls in `App.jsx` with `withSaving` logic. Build verified.
