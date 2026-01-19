# Mobile Scroll Fix Implementation Plan

## Overview
Enable vertical scrolling for tasks and subtasks in mobile view by removing restrictive overflow properties.

## Current State Analysis
- `index.css:62`: `.app-layout` has `height: 100vh` and `overflow: hidden` on mobile.
- `index.css:70`: `body` has `overflow: hidden` on mobile.
- This prevents the inner scrollable lists from being accessible or having a valid scroll context on some mobile browsers.

## Implementation Approach
1. Change `overflow: hidden` to `overflow-y: auto` (or remove it) on mobile containers.
2. Set `height: auto` or ensure `min-height: 100vh` to allow natural scrolling.
3. Maintain fixed headers and footers while letting the content between them scroll.

## Phase 1: CSS Mobile Unlock
### Overview
Update the mobile media query in `index.css`.

### Changes Required:
#### 1. `src/index.css`
**Changes**: Update `.app-layout` and `body` styles within the `(max-width: 1200px)` block.

```css
    @media (max-width: 1200px) {
      .app-layout {
        grid-template-columns: 1fr;
        height: auto; /* Allow height to expand */
        min-height: 100vh;
        padding: 60px 0 70px 0;
        overflow: visible; /* Don't clip content */
        gap: 0;
      }
      
      body {
        overflow-y: auto; /* Let the body scroll if needed */
      }
```

### Success Criteria:
#### Manual:
- [ ] On mobile view (<1200px), user can scroll vertically to see all tasks in the sidebar.
- [ ] On mobile view, user can scroll vertically to see all subtasks in the main container.
- [ ] Sticky header and footer remain in position while content scrolls.
