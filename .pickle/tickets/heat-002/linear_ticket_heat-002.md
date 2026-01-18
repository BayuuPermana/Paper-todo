---
id: heat-002
title: "Logic: Streak Calculation & Aggregation"
status: Triage
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [logic, math]
assignee: Pickle Rick
---

# Description

## Problem to solve
Raw timestamps are hard to render. We need daily point aggregates and a way to calculate consecutive productive days.

## Solution
Implement a `getDailyStats` selector that returns an object mapping `YYYY-MM-DD` to total points. Implement a `getStreak` function that traverses backwards from today to find the length of the current streak.
