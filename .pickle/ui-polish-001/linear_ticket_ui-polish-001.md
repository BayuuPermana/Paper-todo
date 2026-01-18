---
id: ui-polish-001
title: Fix Mobile Start Button & Footer Icons
status: Plan in Review
links:
  - url: ../linear_ticket_ui_polish_parent.md
    title: Parent Ticket
  - url: research_20260119.md
    title: Research Findings
  - url: plan_20260119.md
    title: Implementation Plan
labels: [css, svg, mobile]
assignee: Pickle Rick
---

# Description

## Problem to solve
User feedback indicates the mobile start button is "whack" and footer emojis are "unrelated to theme".

## Solution
1. **Refactor `PomodoroTimer.jsx` (Header Variant)**:
    - Remove emoji buttons.
    - Implement a proper "Start" / "Pause" button design (likely CSS border + text or simple SVG).
    - Ensure hit targets are adequate.
2. **Refactor `App.jsx` (Bottom Matrix)**:
    - Remove `🗄️` and `🎯`.
    - Replace with inline SVGs representing "Archive" (Box/Folder) and "Focus" (Target).
    - Style them to look hand-drawn or at least consistent with `scribble.svg` aesthetic (monochrome, rough edges if possible).
