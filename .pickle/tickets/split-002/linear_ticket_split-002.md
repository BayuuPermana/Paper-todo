---
id: split-002
title: "Architecture: Create Specialized Layout Components"
status: Triage
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [ui, architecture]
assignee: Pickle Rick
---

# Description

## Problem to solve
`App.jsx` is becoming a bloated mess of conditional JSX.

## Solution
Create `src/components/DesktopLayout.jsx` and `src/components/MobileLayout.jsx`. Move the respective rendering logic and structures into these dedicated components. They should accept all necessary state/actions as props.
