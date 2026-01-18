---
id: sentient-004
title: "VFX: CSS Crumple Deletion Animation"
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
Deletions are currently instantaneous and digital. They need physical weight.

## Solution
Create a `.crumple` CSS animation class that uses `transform`, `skew`, and `scale` to make the item look like it's being wadded up before disappearing.
