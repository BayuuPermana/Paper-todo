# Archive Rack Protocol PRD

## HR Eng

| Archive Rack Protocol PRD |  | Summary: Refactoring the application layout to separate high-level task management into a sidebar and detailed subtask execution into the main 'Paper' workspace. |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Morty **Intended audience**: Engineering | **Status**: Draft **Created**: 2026-01-18 | **Visibility**: Public |

## Introduction
The current UI conflates task selection and subtask execution. This is "Jerry-level" clutter. By moving task management to a sidebar, we create a clear separation between 'Planning' (Sidebar) and 'Execution' (Main Workspace).

## Problem Statement
**Current Process**: All tasks and their subtasks are displayed in a single list within the 2/3 segment.
**Primary Users**: People with many complex projects who feel overwhelmed by a single long list.
**Pain Points**: Visual noise from too many expanded tasks. Hard to focus on one project at a time.
**Importance**: A "God-tier" workflow requires focus. One project at a time.

## Objective & Scope
**Objective**: Implement a task sidebar for project selection and an execution workspace for subtask management.
**Ideal Outcome**: User selects a task from the sidebar; the main paper updates to show only that task's subtasks and the productivity tools.

### In-scope or Goals
- New `TaskSidebar` component (outside the main paper container).
- `selectedTodoId` state management in `App.jsx`.
- Reposition `AddTodo` to the sidebar.
- Refactor `paper-container` to show only subtasks of the selected todo.
- Maintain responsive stacking (Sidebar -> Paper -> Tools).

### Not-in-scope or Non-Goals
- Multi-select tasks.
- Drag-and-drop between tasks (only internal reordering).

## Product Requirements

### Critical User Journeys (CUJs)
1. **The Project Switch**: User has 5 tasks. They click "Build Death Star" in the sidebar. The main paper clears and shows "Step 1: Get Kyber Crystals."
2. **The New Objective**: User types "Buy Milk" in the sidebar input. A new task appears in the sidebar. They click it to start adding steps in the main workspace.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Task Sidebar | As a user, I want a dedicated area to see my projects. |
| P0 | Task Selection | As a user, I want to click a task to focus on its subtasks. |
| P1 | Sidebar Progress | As a user, I want to see (completed/total) steps in the sidebar. |
| P1 | Integrated Add | As a user, I want to add new tasks directly from the sidebar. |

## Assumptions
- There is always a "selected" task (or a placeholder if none selected).
- The "Paper" aesthetic applies to the sidebar as well (maybe as a "rack" of papers).

## Risks & Mitigations
- **Risk**: Losing the "Add Subtask" functionality. -> **Mitigation**: The main workspace remains the home for subtask CRUD.

## Tradeoff
- **Screen Space**: We're adding a 3rd column (or a persistent sidebar), which reduces the width of the individual segments.
