# Research: Sidebar Container Clipping & Scrollbar Overlap

**Date**: 2026-01-19

## 1. Executive Summary
The sidebar task containers are being clipped by the parent container's `overflow-x: hidden` and overlapped by the vertical scrollbar. This is caused by items taking up 100% of the width without accounting for padding and shadows.

## 2. Technical Context
- **index.css (line 33)**: `.sidebar-list` has `padding-right: 15px`.
- **TaskSidebar.jsx (line 42)**: Task item container has `width: 100%` (via `display: block` and `width: 100%` logic).
- **TaskSidebar.jsx (line 53)**: Task item has `box-shadow: 2px 2px 0px black`.

## 3. Findings & Analysis
- `width: 100%` on the task item causes it to fill the entire width of `.sidebar-list`, leaving no room for the shadow on the right.
- The 15px padding on `.sidebar-list` is intended for the scrollbar, but the items are still bumping into it.
- "Cutting left and right" indicates the left border and right shadow are being clipped.

## 4. Technical Constraints
- Must maintain the "Paper" aesthetic (borders, shadows).
- Truncation must still work.

## 5. Architecture Documentation
- Container: `.sidebar-list` (overflow-y: auto, overflow-x: hidden).
- Items: `Draggable` -> `div` (item).
- Spacing fix: Use horizontal margins on items or increased container padding with `width: auto`.
