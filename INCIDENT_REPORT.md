# Incident Report: Persistence & Build Stability
**Date:** 2026-01-20
**Version:** 1.0.0 Release Candidate

## Overview
This session focused on fixing critical data persistence issues in the production build of Paper Todo.

## Critical Issues Resolved

### 1. Missing Database Driver
- **Symptom**: "No database driver enabled" error at runtime.
- **Cause**: `src-tauri/Cargo.toml` imported `tauri-plugin-sql` without the `sqlite` feature flag.
- **Fix**: Updated `Cargo.toml`:
  ```toml
  tauri-plugin-sql = { version = "2", features = ["sqlite"] }
  ```

### 2. Strict Access Control (ACL) Blocks
- **Symptom**: "Command plugin:sql|execute not allowed by ACL".
- **Cause**: Tauri v2 capability system requires explicit permission grants for dangerous operations like SQL execution and filesystem writes.
- **Fix**: Updated `src-tauri/capabilities/default.json` to include:
  - `sql:allow-execute`
  - `sql:allow-select`
  - `sql:allow-load`
  - `fs:allow-applocaldata-write-recursive`

### 3. Icon Corruption
- **Symptom**: Build failure `RC2175` (Invalid icon format).
- **Cause**: The source `icon.ico` was corrupted or invalid.
- **Fix**: Restored a valid `icon.ico` from the build cache (`target/release/resources`).

### 4. Silent Failures
- **Symptom**: Data not saving with no user feedback.
- **Fix**: 
  - Implemented `SavingIndicator` UI.
  - Added `window.alert` for critical save errors in `App.jsx`.

## Future Recommendations
- **Always** check `Cargo.toml` feature flags when adding Tauri plugins.
- **Always** verify `capabilities` for `fs` and `sql` scope in Tauri v2.
- Use `window.alert` or a toast notification system for error handling in Production builds where `console.log` is stripped.
