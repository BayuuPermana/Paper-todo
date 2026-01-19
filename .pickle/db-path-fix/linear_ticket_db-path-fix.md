---
id: db-path-fix
title: Fix Database Path for Production
status: Done
priority: Urgent
project: project
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [bug, backend]
assignee: Pickle Rick
---

# Description

## Problem to solve
`db.js` uses `sqlite:paper-todo.db`, which resolves to CWD. In production, this is often read-only.

## Solution
1. Import `BaseDirectory` from `@tauri-apps/api/path`.
2. Update `initDb` to resolve `paper-todo.db` in `BaseDirectory.AppLocalData`.
3. Update connection string.

# Implementation
Updated `src/db.js` to use `@tauri-apps/api/path` and `@tauri-apps/plugin-fs` to resolve `AppLocalData` and ensure the directory exists.
Installed `@tauri-apps/plugin-fs` and updated `src-tauri` config.