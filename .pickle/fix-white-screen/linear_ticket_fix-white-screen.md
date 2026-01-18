---
id: fix-white-screen
title: Fix White Screen Crash (Orphaned DnD Components)
status: Done
links:
  - url: prd.md
    title: PRD
  - url: plan_20260119.md
    title: Implementation Plan
labels: [bug, crash, urgent]
assignee: Pickle Rick
---

# Description

## Problem to solve
The application crashes (white screen) because `TodoList.jsx` contains `Droppable` and `Draggable` components that are no longer wrapped in a `DragDropContext` after the recent refactor. `DragDropContext` was moved to `TaskSidebar`, leaving `TodoList` orphaned.

## Solution
Remove `react-beautiful-dnd` components (`Draggable`, `StrictModeDroppable`) from `TodoList.jsx`. The Detail View (`TodoList`) displays a single selected todo and does not need drag-and-drop reordering capabilities (which were broken/useless anyway).
