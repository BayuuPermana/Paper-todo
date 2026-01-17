# Fixes & Enhancements Implementation Plan

## Overview
Address technical debt and constraints identified in the research: functionality persistence, React Strict Mode compatibility, and accessibility compliance.

## Current State Analysis
- **Persistence**: `App.jsx` initializes `todos` as empty array (Line 7). No side effects to save data.
- **Strict Mode**: `react-beautiful-dnd` has known issues with React 18 Strict Mode (double mount), causing drag glitches.
- **Accessibility**: `TodoItem.jsx` uses `<span>` with `onClick` (Lines 6-9), inaccessible to keyboard users.

## Out of Scope
- Backend integration (API/Database).
- Adding a Unit Test Runner (Jest/Vitest) - relying on build integrity and manual verification.

## Implementation Approach
1.  **Infrastructure**: Add a `StrictModeDroppable` utility component to solve the DnD issue without disabling Strict Mode.
2.  **Persistence**: Modify `App.jsx` to read/write `localStorage`.
3.  **UX/A11y**: Refactor `TodoItem.jsx` to use semantic buttons.

## Phase 1: Strict Mode Compatibility
### Overview
Fix `react-beautiful-dnd` issues in React 18 Strict Mode.

### Changes Required:
#### 1. Create `src/StrictModeDroppable.jsx` [x]
#### 2. `src/TodoList.jsx` [x]

### Success Criteria:
#### Automated:
- [x] `npm run build` (Ensures imports/syntax are valid)

#### Manual:
- [ ] Drag and drop works smoothly in `npm run dev` environment (which runs in Strict Mode).
- [ ] No console errors regarding "Unable to find draggable".

## Phase 2: Persistence
### Overview
Persist todos to `localStorage`.

### Changes Required:
#### 1. `src/App.jsx` [x]

### Success Criteria:
#### Automated:
- [x] `npm run build`

#### Manual:
- [ ] Add a todo, refresh the page. The todo remains.
- [ ] Delete a todo, refresh the page. The todo remains deleted.

## Phase 3: Accessibility

### Overview

Make the UI accessible to keyboard and screen readers.



### Changes Required:

#### 1. `src/TodoItem.jsx` [x]

#### 2. `src/index.css` [x]



### Success Criteria:

#### Automated:

- [x] `npm run build`



#### Manual:

- [ ] Can tab to a task and press Enter/Space to toggle completion.

- [ ] Can tab to delete button and press Enter/Space to delete.
