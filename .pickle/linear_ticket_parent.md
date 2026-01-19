---
id: fix-persistence-epic
title: [Epic] Fix Persistence in Build
status: Active
priority: Urgent
project: project
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../prd.md
    title: PRD
labels: [core, bug, build]
assignee: Pickle Rick
---

# Description

## Problem to solve
Production builds fail to save data because they write to `Program Files`.

## Solution
Relocate database to `AppLocalData`.