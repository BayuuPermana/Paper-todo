---
id: autosave-001
title: "Feature: Configure Autosave & Persistence"
status: Done
priority: High
project: project
created: 2026-01-20
updated: 2026-01-20
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
labels: [feature, persistence, db]
assignee: Pickle Rick
---

# Description

## Problem to solve
The user wants to "configure autosave". Currently, the app saves on every explicit state change (add, toggle, delete, blur-edit). We need to ensure this is robust, performant, and visible to the user.

## Solution
1.  **Verify Persistence:** Ensure `db.js` correctly writes to `AppLocalData` (seems implemented but needs verification).
2.  **Visual Feedback:** Add a subtle "Saving..." / "Saved" indicator in the UI so the user *knows* their data is safe.
3.  **Debounce/Throttle:** (Optional) If we move to `onChange` saving, we need debounce. For now, stick to `onBlur` but ensure it never misses.
4.  **Config:** Determine if a user-facing toggle is needed (unlikely for a modern app, "always on" is standard).

# Implementation Plan
- Check `db.js` path resolution.
- Create a `useAutosave` or modify `App.jsx` to track save status.
- Add a saving indicator component.

# Discussion
- 2026-01-20 Pickle Rick: Verified persistence layer (it works). Implemented "Saving..." indicator. Done.