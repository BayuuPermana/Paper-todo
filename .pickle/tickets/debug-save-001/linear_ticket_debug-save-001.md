---
id: debug-save-001
title: "Bug: Investigate Potential Save Failure"
status: Active
priority: Urgent
project: project
created: 2026-01-20
updated: 2026-01-20
links:
  - url: ../autosave-001/linear_ticket_autosave-001.md
    title: Parent Ticket
labels: [bug, persistence, urgent]
assignee: Pickle Rick
---

# Description

## Problem to solve
User reports that data is lost upon closing the app, even though the "Saving..." indicator appears. This suggests a silent failure in the `db.execute` calls or a path resolution issue in the production build.

## Solution
1.  Add `try/catch` blocks with explicit alerts or file logging to `db.js`.
2.  Verify the database file actually exists on disk after a save.
3.  Check if `tauri-plugin-sql` is correctly loading the DB file in the `release` build (sometimes bundling issues prevent the plugin from writing).

# Implementation Plan
- Modify `src/db.js` to log errors to a physical text file or use `window.alert` (since console is hidden in release).
- Modify `src/App.jsx` to alert if `saveTodo` throws.
