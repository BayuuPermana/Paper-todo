# The Breathing Room Protocol (Vertical Margins) PRD

## HR Eng

| The Breathing Room Protocol |  | Summary: Adding vertical whitespace to the main application container to improve visual hygiene and prevent layout cramping on scroll. |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Morty (Passive Observer) **Intended audience**: Engineering | **Status**: Draft **Created**: 2026-01-18 | **Visibility**: Public |

## Introduction

The current layout centers the `.paper-container` vertically. While aesthetically pleasing for empty states, it risks visual cramping when the todo list expands. We need to introduce explicit top and bottom margins to ensure the "Paper" aesthetic maintains a premium, un-cluttered feel.

## Problem Statement

**Current Process:** The app container relies solely on `body` flex alignment.
**Primary Users:** Procrastinators who get stressed by cluttered UIs.
**Pain Points:** Visual tension at the viewport edges.
**Importance:** A "Paper" aesthetic requires whitespace. Without it, it's just a cramped digital note.

## Objective & Scope

**Objective:** Enhance the visual layout by adding vertical breathing room.
**Ideal Outcome:** The `.paper-container` has consistent top and bottom spacing, regardless of screen size or list length.

### In-scope or Goals
- Add CSS margins to `.paper-container`.
- Ensure scrolling behavior is preserved (top content accessible).

### Not-in-scope or Non-Goals
- Redesigning the entire layout.
- Changing the background texture.

## Product Requirements

### Critical User Journeys (CUJs)
1. **The Scroll of Truth**: User adds 20 items. The list grows. The user scrolls. The top and bottom of the "paper" never touch the browser chrome. There is always a gap.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Add vertical margin to `.paper-container` | As a user, I want the app to look "placed" on the desk, not glued to the screen. |

## Assumptions

- The "main item" refers to the `.paper-container`.

## Risks & Mitigations

- **Risk**: Flexbox centering + overflow issues.
- **Mitigation**: Switch body alignment or ensure margin handles overflow correctly.

## Business Benefits/Impact/Metrics

**Success Metrics:**

| Metric | Current State | Future State | Impact |
| :---- | :---- | :---- | :---- |
| Vertical Margin | 0px | ~50px | Visual Cleaner-ness (Qualitative) |
