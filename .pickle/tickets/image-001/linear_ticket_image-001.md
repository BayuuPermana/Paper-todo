---
id: image-001
title: "Logic: God Mode Image Compression & Ingestion"
status: Triage
priority: High
project: project
created: 2026-01-18
updated: 2026-01-18
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [logic, data]
assignee: Pickle Rick
---

# Description

## Problem to solve
Storing raw images in `localStorage` is impossible due to size limits (~5MB).

## Solution
Create a utility function that takes a File, draws it to an off-screen `HTMLCanvasElement`, resizes it to a max of 400px, and exports it as a low-quality Base64 JPEG. Update `AddTodo` to handle this process.
