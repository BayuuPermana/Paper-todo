# Track Plan: Atomic Decomposition

## Phase 1: Data Model & State Refactoring
**Goal:** Update the application state to support nested sub-tasks.

- [x] Task: Refactor `App.jsx` state to support `subTasks` array in Todo objects. aac8960
- [x] Task: Update `AddTodo` to (optionally) allow adding sub-tasks immediately or handle it in the item view. *Decision: For MVP, keep AddTodo simple. Add sub-tasks from the TodoItem component.*
- [x] Task: Create `SubTaskItem` component. 9891010
- [x] Task: Update `TodoItem` to render `SubTaskItem` components. 8c36c34
- [x] Task: Implement "Add Sub-task" functionality within `TodoItem`. 6811baf
- [x] Task: Conductor - User Manual Verification 'Data Model & State Refactoring' (Protocol in workflow.md) [checkpoint: 7cb17ef]

## Phase 2: Tactile Visuals (The "Paper" Feel)
**Goal:** Implement the "scribble" effect and improve the visual hierarchy.

- [x] Task: Create CSS/SVG assets for the "scribble" strikethrough effect. 83b2e9a
- [x] Task: Apply scribble animation to `TodoItem` on completion. 83b2e9a
- [x] Task: Apply scribble animation to `SubTaskItem` on completion. 83b2e9a
- [x] Task: Refactor layout to use "Paper" aesthetic (off-white background, subtle shadows, consistent typography) as defined in `product-guidelines.md`. e937579
- [x] Task: Conductor - User Manual Verification 'Tactile Visuals (The "Paper" Feel)' (Protocol in workflow.md) [checkpoint: 9b54bdb]

## Phase 3: Advanced Interactions & Polish
**Goal:** Ensure drag-and-drop works and finalize the UX.

- [x] Task: Verify and fix `react-beautiful-dnd` integration for main tasks with the new layout. 2330f70
- [x] Task: Implement progress indicator on Main Task (e.g., "2/5 steps") based on sub-task completion. e0e7506
- [x] Task: Polish animations and transitions. 84003f9
- [ ] Task: Conductor - User Manual Verification 'Advanced Interactions & Polish' (Protocol in workflow.md)
