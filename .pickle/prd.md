# Autosave & Persistence Indicator PRD

## HR Eng

| Autosave & Persistence |  | Robust data persistence with visual feedback for the user. |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: User **Intended audience**: Engineering | **Status**: Active **Created**: 2026-01-20 | **Self Link**: .pickle/prd.md **Visibility**: Internal |

## Introduction

The application currently saves data on state changes, but lacks visual feedback. This feature adds a "Saving..." / "Saved" indicator and verifies the robustness of the `AppLocalData` persistence layer.

## Problem Statement

**Current Process:** Users edit tasks, but have no confirmation that data is written to disk.
**Pain Points:** Anxiety about data loss. Uncertainty if the app is working.
**Importance:** Data integrity is the core value proposition of a todo app.

## Objective & Scope

**Objective:** Ensure 100% data persistence confidence.
**Ideal Outcome:** User sees a subtle indicator when data is saved.

### In-scope or Goals
- Verify `db.js` writes to `AppLocalData`.
- Implement a global `isSaving` state in `App.jsx`.
- Create a visual `SavingIndicator` component (e.g., bottom right or top header).
- Ensure `onBlur` and other events trigger the save and the indicator.

### Not-in-scope or Non-Goals
- User configuration for autosave (Always On).
- Cloud sync (Local only).

## Product Requirements

### Critical User Journeys (CUJs)
1. **Edit Task**: User modifies a task text -> "Saving..." appears -> "Saved" appears -> Indicator fades.
2. **Toggle Completion**: User checks a box -> Indicator flashes "Saved".

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Data writes to correct local path | As a user, my data survives a restart. |
| P1 | Visual Feedback | As a user, I see when the app is saving. |
| P2 | Debounced Saves | As a system, I don't write to disk on every keystroke (if we move to onChange). |

## Assumptions
- `AppLocalData` is accessible and writable.
- Write speeds are fast enough to not block UI.

## Risks & Mitigations
- **Risk**: Frequent writes slow down the app. -> **Mitigation**: Use `onBlur` for text, immediate for toggles. Add debounce if needed.

## Business Benefits/Impact/Metrics
- **Success Metrics**: Zero data loss reports.

## Stakeholders / Owners
- **Owner**: Pickle Rick
