# Visual Bifurcation Protocol PRD

## HR Eng

| Visual Bifurcation PRD |  | Summary: Decoupling the Desktop and Mobile UI architectures into distinct rendering paths while maintaining a unified state layer. Includes hot-swapping logic for real-time viewport adaptation. |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Morty **Intended audience**: Engineering | **Status**: Draft **Created**: 2026-01-18 | **Visibility**: Public |

## Introduction
The current application uses 'Responsive CSS' to force a desktop layout into a mobile viewport. This is 'Jerry-level' engineering. This protocol mandates a strict bifurcation: Desktop and Mobile will have dedicated component trees optimized for their respective form factors, hot-swapping dynamically based on window dimensions.

## Problem Statement
**Current Process**: Single component tree using media queries to hide/show elements.
**Primary Users**: Power users who switch devices or resize windows.
**Pain Points**: Cluttered mobile view due to shared component bloat. Inefficient rendering of hidden desktop elements on mobile.
**Importance**: Form factor optimization is critical for cognitive load reduction.

## Objective & Scope
**Objective**: Architect a dynamic UI switcher that renders specialized layouts for Desktop and Mobile.
**Ideal Outcome**: Zero visual 'leakage' between platforms. Mobile-specific tools and Desktop-specific dashboards living in separate code paths.

### In-scope or Goals
- **Viewport Observer**: Custom hook to track `isMobile` state via window resize listeners.
- **Dedicated Layouts**: Create `DesktopLayout` and `MobileLayout` components.
- **Component Specialization**: Build mobile-optimized versions of the Timer and Calendar.
- **Hot-Swapping**: Instant UI transition without state loss on resize.

### Not-in-scope or Non-Goals
- Separating the logic/state (they remain unified in `App.jsx`).
- Supporting tablet-specific layouts (grouped with mobile).

## Product Requirements

### Critical User Journeys (CUJs)
1. **The Desktop Power-User**: Opens the app on a 4K monitor. Sees the Archive Rack, Workspace, and full Tools suite in a glorious 3-pane grid.
2. **The Mobile Specialist**: Opens on a phone. Sees the Sticky Command Header and Bottom Matrix Tab Bar.
3. **The Window Warper**: User shrinks their browser window from 1300px to 1100px. The UI instantly transforms from Desktop grid to Mobile Neural Hub.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Dynamic Viewport State | As a system, I want to know exactly when the screen crosses the 1200px line. |
| P0 | Layout Decoupling | As a developer, I want separate files for Mobile and Desktop layouts. |
| P1 | Mobile-First Components | As a mobile user, I want tools that don't look like shrunken desktop widgets. |
| P1 | Hot-Swap Integrity | As a user, I want the UI to change without my current task selection or timer resetting. |

## Assumptions
- Breakpoint is fixed at 1200px.
- The 'Paper' aesthetic remains the unified design language.

## Risks & Mitigations
- **Risk**: Performance lag on rapid resize. -> **Mitigation**: Debounce the resize listener.
- **Risk**: Event listener leaks. -> **Mitigation**: Clean up listeners in `useEffect`.

## Tradeoff
- **Maintainability vs. UX**: We trade having one UI to maintain for having two, in exchange for a vastly superior user experience.
