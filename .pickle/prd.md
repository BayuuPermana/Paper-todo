# Visual Evidence Protocol PRD

## HR Eng

| Visual Evidence Protocol PRD |  | Summary: Enhancing 'Paper-todo' with image attachment capabilities for tasks. Includes God Mode canvas compression, base64 storage, and tactile 'tape' aesthetic for the UI. |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Morty **Intended audience**: Engineering | **Status**: Draft **Created**: 2026-01-18 | **Visibility**: Public |

## Introduction
A purely text-based workspace is for people with no imagination. This protocol introduces visual data ingestion, allowing users to attach a single image to any task. The image will be processed for efficiency and displayed with physical presence (tape textures).

## Problem Statement
**Current Process**: Tasks are text-only.
**Primary Users**: Visual thinkers and people who need to remember what things look like.
**Pain Points**: Lack of visual context. Need to leave the app to view related imagery.
**Importance**: Visual cues significantly increase memory recall and "flow" efficiency.

## Objective & Scope
**Objective**: Implement image upload, compression, and display for tasks.
**Ideal Outcome**: User attaches an image while creating a task. A small preview appears in the sidebar (expand on hover), and a large "taped" version appears in the main workspace.

### In-scope or Goals
- **Image Ingestor**: File input in `AddTodo` component.
- **God Mode Compression**: Use `HTMLCanvasElement` to resize images to < 400px before storage.
- **Base64 Storage**: Store image data directly in the `todos` array.
- **Tape Aesthetic**: CSS-styled 'tape' overlays for attached images.
- **Sidebar Hover Preview**: CSS-driven thumbnail expansion.

### Not-in-scope or Non-Goals
- Multiple images per task.
- Image editing (cropping, filters).
- Drag-and-drop file upload (kept to standard file input for MVP).

## Product Requirements

### Critical User Journeys (CUJs)
1. **The Visual Capture**: User clicks the 'image' icon in the sidebar, picks a photo of a schematics diagram. They add the task. A tiny thumbnail appears. They hover, it pops up. They click the task, and the schematic is 'taped' to the main paper.
2. **The Space Saver**: User uploads a 5MB raw photo. The system silently crushes it into a 20KB base64 string using my superior math.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Canvas Compression | As a system, I want to downscale images to save localStorage space. |
| P0 | Base64 Storage | As a system, I want to store images as strings in the existing data model. |
| P1 | Tape Aesthetic | As a user, I want images to look like they are taped to the paper. |
| P1 | Sidebar Hover | As a user, I want to see a larger preview by hovering over the sidebar icon. |

## Assumptions
- `localStorage` limit is ~5MB. Compression must be aggressive (e.g., JPEG 0.7 quality).
- Modern browser support for Canvas and FileReader.

## Risks & Mitigations
- **Risk**: LocalStorage overflow. -> **Mitigation**: Strict dimension capping (max 400px) and quality reduction.

## Tradeoff
- **Quality vs. Space**: We sacrifice high-res detail for the convenience of text-based persistence.