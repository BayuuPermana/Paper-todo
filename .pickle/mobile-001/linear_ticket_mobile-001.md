---
id: mobile-001
title: "Fix Mobile Scrolling"
status: Done
priority: High
project: project
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
  - url: ../clean-003/plan_mobile_scroll_20260119.md
    title: Implementation Plan
labels: [css, mobile, bugfix]
assignee: Pickle Rick
---

# Description

## Problem to solve
Users cannot scroll tasks/subtasks on mobile because of `overflow: hidden` on parent containers.

## Solution
Update `index.css` to allow vertical overflow and natural scrolling on mobile viewports.
