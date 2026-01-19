---
id: desk-001
title: "Tauri Scaffolding and SQLite Setup"
status: Done
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
labels: [rust, tauri, sqlite]
assignee: Pickle Rick
---

# Description

## Problem to solve
App is trapped in the browser. Data is stored in fragile `localStorage`.

## Solution
1. Install `@tauri-apps/api` and `@tauri-apps/cli`.
2. Initialize Tauri project.
3. Configure `tauri-plugin-sql` for SQLite.
4. Set up the basic database schema in Rust.
