# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2025-05-18 - [Debounce Angular Router Sync on Signal Search Inputs]
**Learning:** In Angular Signal-driven search components, calling `this.router.navigate()` on every keystroke causes Angular Router navigation lifecycle thrashing and history stack churn. Separating the immediate signal state update (0ms UI filtering response) from a 300ms debounced URL query parameter sync eliminates redundant router navigations without degrading search responsiveness.
**Action:** Always set local filter signals immediately upon input events and debounce `router.navigate` calls when syncing filter states to query parameters.
