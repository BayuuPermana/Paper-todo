---
id: desk-002
title: "CSS: Implement Internal Scroll & Pinned Segment"
status: Triage
priority: Medium
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [ui, css]
assignee: Pickle Rick
---

# Description

## Problem to solve
Users lose track of their Pomodoro timer when scrolling through a long list of subtasks.

## Solution
Apply `overflow-y: auto` to `.left-segment` and fix the height of `.paper-container`. Ensure `.right-segment` remains visible at all times.
