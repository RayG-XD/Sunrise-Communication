# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2026-08-04 - Enable Default Lazy Loading for Product Card Grid Images
**Learning:** Using `priority` on list/item components with Angular's `NgOptimizedImage` creates `<link rel="preload">` tags for every grid card and disables lazy loading, causing network resource contention on catalog page load.
**Action:** Reserved `priority` attribute exclusively for single above-the-fold hero/banner elements and allowed catalog grid images to use default lazy loading.
