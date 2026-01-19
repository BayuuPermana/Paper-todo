---
id: desk-002
title: "Migrate App State to SQLite"
status: In Dev
priority: High
project: project
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
  - url: research_20260118.md
    title: Research Findings
  - url: plan_20260118.md
    title: Implementation Plan
labels: [react, sqlite, migration]
assignee: Pickle Rick
---

# Description

## Problem to solve
`App.jsx` still uses `localStorage` for data persistence.

## Solution
1. Update `App.jsx` to load initial state from SQLite on mount.
2. Replace `useEffect` persistence logic with async database calls.
3. Ensure all CRUD operations (add, toggle, delete, edit, reorder) update the database.
4. Implement a migration from `localStorage` to SQLite for existing users.
