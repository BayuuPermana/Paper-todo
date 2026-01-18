---
id: heat-003
title: "UI: Heatmap Shading & Streak Header"
status: Triage
priority: Medium
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [ui, aesthetic]
assignee: Pickle Rick
---

# Description

## Problem to solve
The user needs to see the data visualized in the "Paper" style.

## Solution
- Add a streak display component above the calendar (e.g., "🔥 5 Day Streak").
- Update `PaperCalendar.jsx` to map daily point totals to 4 levels of graphite grey (`#eee`, `#ccc`, `#888`, `#333`).
- Use CSS transitions for the shading.
