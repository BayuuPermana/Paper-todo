---
id: fix-dnd-snapback
title: Fix Drag and Drop Snap-Back Issue
status: Done
links:
  - url: prd.md
    title: PRD
  - url: plan_20260119.md
    title: Implementation Plan
labels: [bug, ui, dnd]
assignee: Pickle Rick
---

# Description

## Problem to solve
Sidebar items snap back to their original position when dropped. This implies `result.destination` is null in `onDragEnd`, or the state update is failing to re-render the list.

## Solution
1. Verify `onDragEnd` is firing.
2. Verify `result.destination` is not null.
3. Verify `draggableId` and `droppableId` match expectations.
4. Check for CSS issues blocking drop target.
5. If `react-beautiful-dnd` is broken in React 18, consider a more robust StrictMode fix or replacing the library (unlikely needed if we just fix the implementation details).
