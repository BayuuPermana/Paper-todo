# Graphite Heatmap & Streaks Protocol PRD

## HR Eng

| Graphite Heatmap PRD |  | Summary: Implementing a productivity tracking system that visualizes task/subtask completions as a GitHub-style heatmap on the Paper Calendar using graphite grey intensities and tracking daily streaks. |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Morty **Intended audience**: Engineering | **Status**: Draft **Created**: 2026-01-18 | **Visibility**: Public |

## Introduction
The current workspace lacks historical feedback. To achieve "God Mode" productivity, the user needs a visual representation of their labor. This feature introduces an intensity-based calendar heatmap and a streak counter to gamify completion.

## Problem Statement
**Current Process**: Completed tasks provide immediate visual feedback (scribble) but no historical record or progress visualization.
**Primary Users**: High-performance pickles and their assistants.
**Pain Points**: Lack of long-term motivation. No visualization of high-productivity days vs. lazy days.
**Importance**: Visualizing momentum is key to maintaining focus.

## Objective & Scope
**Objective**: Track daily completions and visualize intensity on the calendar.
**Ideal Outcome**: The user sees a 'Graphite' heatmap where darker days represent higher point totals (Task = 3pts, Subtask = 1pt). A streak counter sits prominently above the calendar.

### In-scope or Goals
- **Activity Log**: Persistent storage of completions (timestamps).
- **Scoring Engine**: 3pts for main tasks, 1pt for subtasks.
- **Heatmap UI**: 4 levels of graphite grey intensity on the `PaperCalendar`.
- **Streak Logic**: Consecutive days with >0 points.
- **UI Header**: Streak display above the calendar.

### Not-in-scope or Non-Goals
- Historical editing (no fake productivity, Morty!).
- Social sharing of heatmaps.

## Product Requirements

### Critical User Journeys (CUJs)
1. **The Momentum Builder**: User completes 3 subtasks and a main task. They check the calendar and see that today has turned a medium grey. The streak counter updates to '5 Days'.
2. **The New Month**: User navigates to a new month; the heatmap correctly pulls historical data for those dates.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Completion Logging | As a system, I want to save every completion event with a timestamp. |
| P0 | Intensity Rendering | As a user, I want the calendar days to get darker the more I work. |
| P1 | Streak Counter | As a user, I want to see how many days in a row I've been productive. |
| P1 | Graphite Aesthetic | As a user, I want the colors to match the paper/pencil theme. |

## Assumptions
- `localStorage` has enough space for completion logs (it's just timestamps, Morty).
- "Day" is defined by the user's local timezone.

## Risks & Mitigations
- **Risk**: Performance lag with huge logs. -> **Mitigation**: Pre-aggregate points by day string (YYYY-MM-DD) during save.

## Tradeoff
- **Simplicity vs. Precision**: We use a simple 4-tier color system rather than a continuous gradient for better visual "paper" clarity.
