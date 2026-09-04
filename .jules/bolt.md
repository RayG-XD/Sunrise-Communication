# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2026-08-30 - Avoid `priority` Attribute on Reusable List Card Components
**Learning:** Adding the `priority` attribute to Angular's `NgOptimizedImage` (`ngSrc`) inside reusable list item components (like `app-product-card`) causes every card in catalog loops (`@for`) to fetch eagerly and bypass native lazy loading (`loading="lazy"`). This results in network connection saturation and LCP delay when rendering multi-item product lists.
**Action:** Keep `priority` reserved exclusively for single above-the-fold hero images on detail pages. Leave list card image elements without `priority` so `NgOptimizedImage` defaults to `loading="lazy"`.
