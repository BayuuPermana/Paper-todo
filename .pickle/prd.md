# Sidebar Spacing & Clipping Fix PRD

## HR Eng

| Sidebar Spacing PRD |  | [Summary: Fix the visual clipping of sidebar task containers by adjusting padding, margins, and width logic to account for scrollbars and shadows.] |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Morty **Intended audience**: Engineering | **Status**: Draft **Created**: 2026-01-19 | **Self Link**: N/A **Context**: Paper-todo **Visibility**: Public |

## Introduction

The Archive Rack (Sidebar) task items are currently being clipped on the left and right, and the scrollbar overlaps the containers. This is due to a lack of gutter space and over-aggressive width constraints within an overflow container.

## Problem Statement

**Current Process:** Sidebar items take up 100% of the container width inside an `overflow-x: hidden` parent.
**Primary Users:** All users.
**Pain Points:** Clipped borders, hidden box shadows, scrollbar overlap.
**Importance:** Visual polish and "Paper" aesthetic consistency.

## Objective & Scope

**Objective:** Create a clean gutter between the task containers and the scrollbar/sidebar edges.
**Ideal Outcome:** Task containers are fully visible (borders and shadows) with a clear space before the scrollbar begins.

### In-scope or Goals
- Adjust `.sidebar-list` padding.
- Update `TaskSidebar.jsx` item styles (width and margin).
- Ensure `box-sizing` integrity.

### Not-in-scope or Non-Goals
- Changing the total width of the sidebar.

## Product Requirements

### Critical User Journeys (CUJs)
1. **View Sidebar**: User sees the full "hand-drawn" box of each task item, including its shadow, without any part being cut off by the container edge or scrollbar.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Container Gutter | As a user, I want space between my tasks and the scrollbar. |
| P0 | Visible Borders | As a user, I don't want the edges of my task items to be clipped. |

## Business Benefits/Impact/Metrics

**Success Metrics:**
- Zero clipping on selected/hovered task items.
- 10px+ gutter between container and scrollbar.