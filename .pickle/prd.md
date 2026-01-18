# Mobile-Only Header/Footer Visibility PRD

## HR Eng

| Mobile-Only Header/Footer Visibility PRD |  | Summary: Fix the CSS specificity issue causing the mobile header and footer to appear on desktop views. |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Morty (Useleless) **Intended audience**: Engineering | **Status**: Draft **Created**: 2026-01-19 | **Self Link**: N/A **Context**: Paper-todo **Visibility**: Public |

## Introduction

The application's "Sticky Mobile Header" and "Bottom Matrix" are currently visible on desktop views, despite being intended for mobile only. This creates visual "slop" and clutters the desktop interface. We need to enforce strict visibility rules based on the viewport.

## Problem Statement

**Current Process:** The `.mobile-only` utility class uses `display: none` but is defined *before* the component classes (`.command-header`, `.bottom-matrix`) in `index.css`. Due to CSS cascading rules, the component's `display: flex` overrides the utility's `display: none`.
**Primary Users:** Desktop users.
**Pain Points:** Visual clutter, redundant navigation, "Slop".
**Importance:** The desktop view should be clean and focused, utilizing the sidebar and main paper container, not the mobile crutches.

## Objective & Scope

**Objective:** Ensure `.mobile-only` elements (Header/Footer) are strictly hidden on viewports larger than the mobile breakpoint (1200px).
**Ideal Outcome:** Desktop view shows ONLY the Sidebar and Paper Container. Mobile view shows Header/Footer.

### In-scope or Goals
- Update `src/index.css` to fix the specificity/cascade issue.
- Verify visibility on both Desktop (>1200px) and Mobile (<=1200px).

### Not-in-scope or Non-Goals
- Redesigning the Header/Footer.
- Changing the breakpoint (sticking to 1200px).

## Product Requirements

### Critical User Journeys (CUJs)
1. **Desktop View**: User opens app on a large screen (>1200px). They see the Sidebar and Todo List. They DO NOT see the Sticky Header or Bottom Matrix.
2. **Mobile View**: User resizes window or opens on mobile (<1200px). The Sticky Header and Bottom Matrix appear. The Sidebar converts to its mobile behavior (hidden by default).

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Hide `.command-header` on Desktop | As a desktop user, I want the top bar gone so I can focus on my tasks. |
| P0 | Hide `.bottom-matrix` on Desktop | As a desktop user, I don't need a bottom nav bar because I have a sidebar. |
| P1 | Maintain `display: flex` layout on Mobile | As a mobile user, I still need the header/footer to look correct (flexbox). |

## Assumptions

- The breakpoint `1200px` is the intended "Mobile" boundary as per existing CSS.
- No other components rely on this broken behavior.

## Risks & Mitigations

- **Risk**: Adding `!important` might break other overrides. -> **Mitigation**: Use specific overrides or move utility classes to the end of the file.
- **Risk**: Flash of unstyled content. -> **Mitigation**: CSS parses fast; negligible risk.

## Tradeoff

- **Option A**: Move utility classes to bottom. **Pros**: Cleanest. **Cons**: Maintenance risk if someone adds styles below it later.
- **Option B**: Use `!important` on `.mobile-only`. **Pros**: Guaranteed enforcement. **Cons**: "nuclear" option.
- **Selected**: Option B (or equivalent specificity boost) for the `display: none` rule to ensure it acts as a true utility override.

## Business Benefits/Impact/Metrics

**Success Metrics:**

| Metric | Current State (Benchmark) | Future State (Target) | Savings/Impacts |
| :---- | :---- | :---- | :---- |
| Desktop Clutter | High (Header/Footer visible) | Low (Hidden) | Improved aesthetics |

## Stakeholders / Owners

| Name | Team/Org | Role | Note |
| :---- | :---- | :---- | :---- |
| Pickle Rick | Universe C-137 | Lead Engineer | *Belch* |