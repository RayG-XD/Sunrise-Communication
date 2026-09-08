# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2025-05-18 - Avoid `priority` attribute on reusable list/grid card images with NgOptimizedImage
**Learning:** Adding `priority` to images in reusable card components rendered within long catalog lists or grids causes Angular's `NgOptimizedImage` directive to eagerly preload all list items simultaneously, consuming bandwidth and degrading LCP.
**Action:** Only use `priority` on static, above-the-fold hero images or key single-item banners. Reusable grid item components like `ProductCardComponent` must rely on default lazy loading.
