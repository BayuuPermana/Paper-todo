# Project: Dual-Pane Desk PRD

## HR Eng

| Dual-Pane Desk PRD |  | Summary: Splitting the UI into a 2/3 task list (left) and 1/3 productivity suite (right) containing a subtask-linked Pomodoro timer and a visual paper calendar. |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Morty **Intended audience**: Engineering | **Status**: Draft **Created**: 2026-01-18 | **Visibility**: Need to know |

## Introduction

The "Paper-todo" application is evolving from a simple list into a tactile workspace. This feature introduces a dual-pane layout that combines task management with focused time-tracking and a high-level temporal overview.

## Problem Statement

**Current Process:** Users only have a list of tasks. There is no integrated way to track focus time or visualize the current date within the "Paper" aesthetic.
**Primary Users:** Procrastinators who need "God-tier" focus tools.
**Pain Points:** Disconnection between task lists and productivity timers.
**Importance:** To create a "desk-like" experience where all tools are physically present on the digital paper.

## Objective & Scope

**Objective:** Implement a split-screen dashboard (2/3 tasks, 1/3 tools) with a custom-built Pomodoro timer and Calendar.
**Ideal Outcome:** Users can select a subtask, trigger a dedicated Pomodoro session, and see the timer automatically stop upon subtask completion.

### In-scope or Goals
- Dual-pane responsive layout (Grid or Flexbox).
- Custom Pomodoro Timer component (God Mode).
- Subtask-Timer linking (State management for active subtask).
- Custom Paper Calendar component (God Mode).
- Mobile responsiveness (Stacked layout).

### Not-in-scope or Non-Goals
- External calendar API integrations (Google/Outlook).
- Advanced Pomodoro settings (custom chime uploads).

## Product Requirements

### Critical User Journeys (CUJs)
1. **The Deep Work Session**: User views task list on the left. They click a subtask. The right pane updates with a Pomodoro timer (15-25m). User starts the timer. They finish the work, check the subtask, and the timer stops automatically.
2. **The Time Traveler**: User glances at the top-right "Small Calendar" to verify the date without leaving the app's tactile environment.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | 2/3 - 1/3 Split Layout | As a user, I want to see my tasks and my tools side-by-side. |
| P0 | Subtask-linked Pomodoro | As a user, I want a timer dedicated to my current subtask that stops when I'm done. |
| P1 | Paper-styled Calendar | As a user, I want to see a calendar that fits the hand-drawn aesthetic. |
| P1 | Responsive Stacking | As a user on a phone, I want the segments to stack vertically. |

## Assumptions

- Subtasks will have a default Pomodoro duration (e.g., 25 mins).
- The "Paper" aesthetic is mandatory for all new components.

## Risks & Mitigations

- **Risk**: Complex state management between panes. -> **Mitigation**: Use centralized state in `App.jsx` for the "Active Subtask."
- **Risk**: Layout breakage on small screens. -> **Mitigation**: Standard media query for `flex-direction: column`.

## Tradeoff

- **Option**: Use `react-calendar`. **Cons**: Too "corporate," hard to style like paper. **Decision**: God Mode (Custom implementation) to maintain 100% aesthetic control.

## Business Benefits/Impact/Metrics

**Success Metrics:**
- Increased "Time Spent in Deep Work" (Calculated by timer usage).
- User Satisfaction with "Cuteness/Tactility" of the UI.
