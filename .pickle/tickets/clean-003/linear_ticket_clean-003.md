---
id: clean-003
title: "UI: Refactor SubTaskItem for Reveal Logic"
status: Triage
priority: Medium
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [ui, logic]
assignee: Pickle Rick
---

# Description

## Problem to solve
`SubTaskItem` needs to apply the correct CSS classes and handle state so that the Focus button stays visible if it's the active focus.

## Solution
Apply the "reveal" classes to Edit and Delete buttons. Add logic to ensure the Focus button (🎯) is always visible if `isFocused` is true, otherwise it follows the reveal pattern.
