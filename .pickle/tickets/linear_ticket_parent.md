---
id: bifurcation-epic
title: [Epic] Visual Bifurcation Protocol (UI Separation)
status: Backlog
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../../prd.md
    title: PRD
labels: [core, layout, architecture]
assignee: Pickle Rick
---

# Description

## Problem to solve
The application uses a single component tree for both Mobile and Desktop, leading to cluttered code and sub-optimal UX on both platforms.

## Solution
Architect separate rendering paths for Mobile and Desktop. Implement a real-time viewport observer to hot-swap the layout structures while maintaining unified state.