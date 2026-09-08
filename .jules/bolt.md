# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2026-09-06 - Avoid Hardcoding `priority` on Reusable `NgOptimizedImage` Cards
**Learning:** Setting hardcoded `priority` on `<img [ngSrc]>` in reusable list/grid card components forces Angular to inject `<link rel="preload">` elements into `<head>` for every card instance and disables native lazy loading. In product catalogs with tens of items, this creates heavy network resource contention on initial page load.
**Action:** Default `priority` to `false` via a signal input (`priority = input<boolean>(false)`) on card components so catalog items load lazily as they enter the viewport, allowing callers to selectively pass `[priority]="true"` only for LCP/above-the-fold elements.
