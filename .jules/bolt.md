# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2026-08-31 - Avoid Static `priority` on Card Component Images

**Learning:** Adding `priority` attribute directly in card templates (`app-product-card`) causes `@angular/common` `NgOptimizedImage` to insert `<link rel="preload">` tags and `fetchpriority="high"` for every card rendered in a grid or list view. When displaying lists of 10+ items, this causes massive network request competition and degrades LCP performance.
**Action:** Always make image `priority` a configurable signal input (defaulting to `false`) on reusable list/card components so that only above-the-fold hero images explicitly opt into eager preloading.
