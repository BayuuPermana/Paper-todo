# Track Specification: Atomic Decomposition

## Overview
This track focuses on transforming the existing linear Todo list into a hierarchical structure that allows users to break down overwhelming tasks into smaller, manageable sub-tasks. It also introduces "Paper-like" tactile feedback to make the experience more grounded and satisfying.

## Core Features to Implement
1.  **Nested Sub-tasks:**
    -   Ability to add sub-tasks to any main task.
    -   Visual nesting/indentation to show hierarchy.
    -   Progress tracking: Main task completion status should reflect sub-task progress (e.g., if 2/4 sub-tasks are done, main task shows 50%).

2.  **Tactile Interactions:**
    -   **Completion Animation:** When a task is checked, it shouldn't just disappear or change color. It should feel like it's being "scribbled out" or "struck through" with a satisfying animation.
    -   **Drag-and-Drop Reordering:** Ensure `react-beautiful-dnd` works smoothly for both main tasks and sub-tasks (if feasible, otherwise prioritize main task reordering first).

## Technical Requirements
-   **Data Structure Update:** Update the `TodoItem` data model to support a `subTasks` array (recursive structure not strictly required for MVP, 1 level of nesting is sufficient).
-   **Component Refactoring:**
    -   `TodoItem` component needs to render a list of its own `subTasks`.
    -   New `SubTaskList` or `SubTaskItem` component might be needed for cleaner code.
-   **State Management:** Update `App.jsx` (or the main state container) to handle adding, toggling, and deleting sub-tasks.
-   **Styling:** Update CSS/Tailwind to support the "Paper" aesthetic (scribble effects, indentation, soft shadows).

## User Experience Goals
-   **"Don't Panic":** The UI should remain clean. Sub-tasks should ideally be collapsible or unobtrusive until needed.
-   **Satisfaction:** The act of checking off a box should provide immediate visual reward.

## success Criteria
-   User can create a main task.
-   User can add multiple sub-tasks to a main task.
-   Checking a sub-task updates its state and visual appearance (scribble).
-   Checking all sub-tasks optionally completes the main task (or main task can be checked independently).
-   Drag and drop works for main tasks.
