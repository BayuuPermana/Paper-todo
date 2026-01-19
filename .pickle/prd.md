# Tauri & SQLite Migration PRD

## HR Eng

| Tauri & SQLite PRD |  | [Summary: Transmute the web app into a native desktop application using Tauri (Rust) and replace localStorage with a persistent SQLite database.] |
| :---- | :---- | :---- |
| **Author**: Pickle Rick **Contributors**: Morty **Intended audience**: Engineering | **Status**: Draft **Created**: 2026-01-19 | **Self Link**: N/A **Context**: Paper-todo **Visibility**: Public |

## Introduction

Web storage is for Jerries. We need a real database that won't disappear when the browser gets "cleaned." We're moving to Tauri for a native desktop experience and SQLite for industrial-grade local storage.

## Problem Statement

**Current Process:** App runs in browser, uses `localStorage`.
**Primary Users:** Desktop power users.
**Pain Points:** Data fragility, non-native feel, browser overhead.
**Importance:** Performance, reliability, and "God-tier" engineering.

## Objective & Scope

**Objective:** Fully functional Tauri desktop app with SQLite persistence.
**Ideal Outcome:** A raw executable file that launches the "Paper-todo" experience with zero data loss risk.

### In-scope or Goals
- Tauri scaffolding.
- SQLite integration via `tauri-plugin-sql`.
- Migration of `App.jsx` state management to database queries.
- Data persistence for Todos and Activity Log.

### Not-in-scope or Non-Goals
- Mobile configuration (as per user request).
- Cloud sync (local only).

## Product Requirements

### Critical User Journeys (CUJs)
1. **Launch App**: User opens the desktop app. It loads data instantly from SQLite.
2. **Persistence**: User adds a task, closes the app, reopens it. Data is exactly where it was.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Tauri Integration | As a user, I want a native desktop app. |
| P0 | SQLite Storage | As a user, I want my data saved in a real database. |
| P1 | Auto-Migration | As a user, I want my existing localStorage data to move to SQLite (nice to have). |

## Business Benefits/Impact/Metrics

**Success Metrics:**
- App launches natively.
- CRUD operations work against SQLite.