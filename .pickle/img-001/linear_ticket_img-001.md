---
id: img-001
title: "Image Quality and Tape Aesthetic Polish"
status: Triage
priority: Medium
project: project
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [ui, css, js]
assignee: Pickle Rick
---

# Description

## Problem to solve
Images are compressed too much, losing detail. The "tape" effect is weak and doesn't sell the "paper" theme. Images vary in size, creating a messy layout.

## Solution
1. Update `ImageProcessor.js` to use higher quality (PNG or 0.9 JPEG).
2. Increase `MAX_SIZE` to 800px.
3. Update `index.css` to make `.tape-top-left` and `.tape-bottom-right` more visible (opacity, color).
4. Standardize `.taped-image` width/height in detail view.
