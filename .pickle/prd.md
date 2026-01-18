# Drag & Drop and Image Polish PRD

## HR Eng

| Drag & Drop and Image Polish PRD |  | [Summary: Implementation of subtask drag-and-drop, image quality preservation, tape visibility enhancement, and standardized image resizing.] |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Morty **Intended audience**: Engineering | **Status**: Draft **Created**: 2026-01-19 | **Self Link**: N/A **Context**: Paper-todo **Visibility**: Public |

## Introduction

The application currently lacks reordering capabilities for subtasks. Additionally, the image processing pipeline degrades quality, the "tape" aesthetic is insufficiently visible, and images are not standardized in size, leading to layout inconsistencies.

## Problem Statement

**Current Process:** 
- Subtasks are static and cannot be reordered.
- Images are compressed to 70% quality JPEG.
- Tape decorations are faint and easily missed.
- Images take variable/excessive space in the detail view.

**Primary Users:** Users who need to organize complex tasks with visual evidence.
**Pain Points:** 
- Frustrating subtask organization.
- Poor visual clarity of attached images.
- Weak theme immersion (tape visibility).
- Layout "slop" due to unstandardized image sizes.

**Importance:** Organizing subtasks is a core workflow. High-quality visuals and consistent UI are critical for the "Paper" aesthetic.

## Objective & Scope

**Objective:** 
- Implement functional drag-and-drop for subtasks.
- Ensure high-quality image storage.
- Standardize image display sizes.
- Maximize "tape" visibility for theme consistency.

**Ideal Outcome:** Users can fluidly reorder steps, images look crisp and are taped firmly to the page in a standard size.

### In-scope or Goals
- Subtask Drag-and-drop implementation using `react-beautiful-dnd`.
- `ImageProcessor.js` update for quality.
- `index.css` update for tape visibility and standard image sizing.
- `TodoItem.jsx` refactor to support subtask DnD.

### Not-in-scope or Non-Goals
- Multi-list DnD (moving subtasks between todos).
- Advanced image editing (cropping, etc.).

## Product Requirements

### Critical User Journeys (CUJs)
1. **Reorder Steps**: User attaches multiple steps to a task, realizes the order is wrong, and drags Step 3 to the position of Step 1.
2. **Visual Evidence**: User attaches a high-res screenshot; it remains sharp and fits perfectly in the "taped" frame.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Subtask DnD | As a user, I want to reorder my subtasks by dragging them. |
| P0 | High Quality Images | As a user, I want my attached images to not look blurry. |
| P1 | Standardized Sizing | As a user, I want images to have a consistent size in the detail view. |
| P1 | Visible Tape | As a user, I want the "taped" aesthetic to be distinct and immersive. |

## Assumptions

- `react-beautiful-dnd` is compatible with the current React version.
- `localStorage` can handle slightly larger (higher quality) images within reasonable limits.

## Risks & Mitigations

- **Risk**: `localStorage` quota exceeded. -> **Mitigation**: Use reasonable resizing (e.g., 800px instead of 400px) and PNG/High-Quality JPEG.
- **Risk**: DnD complexity in nested components. -> **Mitigation**: Use `StrictModeDroppable` and ensure unique `draggableId`s.

## Tradeoff

- **Quality vs Storage**: Higher quality images take more space. We will favor quality for the "Evidence" feel but cap at a reasonable dimension.

## Business Benefits/Impact/Metrics

**Success Metrics:**
- Functional DnD for subtasks.
- Subjective improvement in image clarity.
- Standardized image dimensions in detail view.

## Stakeholders / Owners

| Name | Team/Org | Role | Note |
| :---- | :---- | :---- | :---- |
| Pickle Rick | C-137 | God-Tier Engineer | *Belch* |