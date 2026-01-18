# Mobile Neural Hub Protocol PRD

## HR Eng

| Mobile Neural Hub PRD |  | Summary: Refactoring the mobile experience to use a tabbed architecture, a sticky utility header (Timer + Date), and an uncluttered 'Focus-First' layout. |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Morty **Intended audience**: Engineering | **Status**: Draft **Created**: 2026-01-18 | **Visibility**: Public |

## Introduction
The current 3-pane stack on mobile is a "Jerry-level" mess. It creates infinite scrolling and cognitive load. This protocol introduces a tab-based mobile navigation system with a persistent utility header to ensure focus and ease of use on small viewports.

## Problem Statement
**Current Process**: All segments (Sidebar, Workspace, Tools) stack vertically, requiring excessive scrolling.
**Primary Users**: Mobile power-users who need to manage tasks on the go.
**Pain Points**: Vertical clutter. Tools disappearing on scroll. Hard to reach 'New Task' input.
**Importance**: Visual clarity is essential for focus in a mobile environment.

## Objective & Scope
**Objective**: Implement a tabbed navigation system and a sticky utility header for mobile viewports.
**Ideal Outcome**: A clean, single-pane mobile experience where tools are always accessible at the top and navigation happens via a bottom tab bar.

### In-scope or Goals
- **Mobile Tab State**: Implement `activeTab` state in `App.jsx`.
- **Sticky Utility Header**: A top-fixed bar containing the Pomodoro Timer and current Date/Mini-Calendar.
- **Matrix Tab Bar**: A bottom-fixed bar to toggle between 'Archive' (Projects) and 'Workspace' (Steps).
- **Responsive Visibility**: Only show the relevant pane for the active tab on mobile (< 1024px).
- **Header Add-Bar**: Place the `AddTodo` input prominently at the top of the 'Archive' tab.

### Not-in-scope or Non-Goals
- Multi-pane display on mobile.
- Changing desktop grid behavior.

## Product Requirements

### Critical User Journeys (CUJs)
1. **The Instant Objective**: User opens the app on mobile. They immediately see today's date and the timer at the top. They type a new goal into the bar and hit '»'. 
2. **The Smooth Pivot**: User is working on steps in the 'Workspace'. They need to switch projects, so they tap the 'Archive' tab at the bottom, pick a new project, and are automatically taken back to the 'Workspace'.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Mobile Tab Navigation | As a user, I want to switch views without scrolling for miles. |
| P0 | Sticky Utility Header | As a user, I want to see my timer and the date at all times. |
| P1 | Date-only Mini Calendar | As a user, I want a compact date display to save space. |
| P1 | Responsive Stacking Refactor | As a developer, I want to hide inactive segments on mobile. |

## Assumptions
- Breakpoint remains 1024px or 1200px as per current CSS.
- The "Paper" aesthetic must persist in the new mobile-only elements.

## Risks & Mitigations
- **Risk**: Overlapping fixed elements. -> **Mitigation**: Use careful z-indexing and viewport-based padding.

## Tradeoff
- **Density vs. Context**: We trade seeing everything at once for seeing one thing perfectly.