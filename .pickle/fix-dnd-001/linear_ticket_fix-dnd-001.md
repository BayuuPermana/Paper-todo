---
id: fix-dnd-001
title: Fix Missing Drag and Drop for Task Sidebar
status: Plan in Review
links:
  - url: ../linear_ticket_dnd_parent.md
    title: Parent Ticket
  - url: research_20260119.md
    title: Research Findings
  - url: plan_20260119.md
    title: Implementation Plan
labels: [bug, ui, react-beautiful-dnd]
assignee: Pickle Rick
---

# Description

## Problem to solve
The "Drag and Drop" feature is implemented for the `TodoList` component (which currently only shows a single selected task), rendering it useless. The main list of tasks in `TaskSidebar` ("Archive Rack") is static and cannot be reordered, which is the expected behavior for the `todos` state reordering logic in `App.jsx`.

## Solution
1. Move/Expand `DragDropContext` usage to cover `TaskSidebar`.
2. Implement `Droppable` and `Draggable` within `TaskSidebar`.
3. Ensure the `onDragEnd` handler in `App.jsx` correctly updates the `todos` state based on Sidebar reordering.
