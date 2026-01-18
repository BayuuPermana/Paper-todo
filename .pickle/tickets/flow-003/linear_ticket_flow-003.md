---
id: flow-003
title: "Logic: Implement Flow Mode & Burnout Shield"
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
The core logic for auto-counting up (Flow) and tracking cumulative focus (Burnout) must be robust and state-aware.

## Solution
Update the timer logic to handle transitions from countdown to count-up. Implement a persistent tracker for cumulative focus time and a lockout state for the Burnout Shield.
