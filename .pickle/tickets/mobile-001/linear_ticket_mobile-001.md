---
id: mobile-001
title: "State: Implement Active Tab Management"
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
We need a way to track which view is active on mobile so we can render only one pane at a time.

## Solution
Add `activeTab` state to `App.jsx` (default: 'archive'). Update rendering logic to conditionally show Sidebar or Workspace based on this state when on mobile.
