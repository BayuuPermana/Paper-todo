# Integrated Input Matrix PRD

## HR Eng

| Integrated Input PRD |  | Summary: Refactoring task and subtask input areas into a unified, high-performance 'Matrix' bar where action buttons are integrated directly into the input container. |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Morty **Intended audience**: Engineering | **Status**: Draft **Created**: 2026-01-18 | **Visibility**: Public |

## Introduction
The current input areas have disparate buttons that create visual friction. This protocol introduces a 'Unified Bar' architecture where image attachment and submission actions are visually merged into the input field itself, creating a single, tactile 'Matrix'.

## Problem Statement
**Current Process**: Input fields and buttons are adjacent but separate elements.
**Primary Users**: People who appreciate geometric precision and visual hygiene.
**Pain Points**: Visual clutter from multiple borders and spacing gaps. Non-optimal submission symbol.
**Importance**: A professional workspace requires a high signal-to-noise ratio.

## Objective & Scope
**Objective**: Implement a unified input bar for tasks and subtasks.
**Ideal Outcome**: A single border-encased container housing the [+] button, the text input, and the [»] submission button.

### In-scope or Goals
- **Unified Container**: Flexbox-based wrapper with 'Paper' border.
- **Integrated Buttons**: Internal buttons with no external borders, appearing as part of the bar.
- **Symbolic Submission**: Replace '->' with '»' (Double Chevron).
- **Responsive Integrity**: Ensure the bar remains horizontal on all viewports.

### Not-in-scope or Non-Goals
- Changing the underlying submission logic.
- Adding multi-line support.

## Product Requirements

### Critical User Journeys (CUJs)
1. **The Rapid Entry**: User clicks into the integrated bar. They see the [+] on the left and [»] on the right. They type their genius and hit [»]. It feels like one smooth operation.
2. **The Mobile Specialist**: User on a phone sees the same unified bar, perfectly horizontal, no awkward stacking.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Unified Border Container | As a user, I want the input and buttons to look like one piece of paper. |
| P0 | Symbolic Submit (») | As a user, I want a precise, professional symbol for submission. |
| P1 | Horizontal Stability | As a mobile user, I want the bar to stay wide and organized. |

## Assumptions
- The 'Paper' aesthetic (border-radius, black borders) must be consistent.
- Modern flexbox support.

## Risks & Mitigations
- **Risk**: Input field being too narrow on mobile. -> **Mitigation**: Use `flex-grow: 1` and minimal button padding.

## Tradeoff
- **Separation vs. Unity**: We trade distinct hit-areas for a cleaner, more modern 'Stationery' feel.
