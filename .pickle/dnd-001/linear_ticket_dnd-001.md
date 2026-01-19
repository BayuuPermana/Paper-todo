---
id: dnd-001
title: "Subtask Drag-and-Drop Reordering"
status: Done
priority: High
project: project
created: 2026-01-19
updated: 2026-01-19
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
  - url: research_20260119.md
    title: Research Document
  - url: plan_20260119.md
    title: Implementation Plan
labels: [ux, react, dnd]
assignee: Pickle Rick
---

# Description

## Problem to solve
Users cannot reorder steps within a todo item. This makes organization tedious.

## Solution
1. Wrap subtask list in `TodoItem.jsx` with `DragDropContext` (or use a shared context if possible).
2. Implement `Droppable` for the subtask container.
3. Wrap `SubTaskItem` in `Draggable`.
4. Update `App.jsx` state logic to handle subtask reordering in `onDragEnd`.
