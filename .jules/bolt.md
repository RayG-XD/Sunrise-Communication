# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2025-05-18 - Angular Signal Map Lookup Optimization
**Learning:** Querying items by unique key (like `slug`) via array `.find()` inside reactive `computed` signals causes $O(N)$ iteration on every lookup. Creating a pre-computed `productsBySlugMap = computed(() => new Map(...))` in `ProductService` reduces slug lookups across detail views and route handlers from $O(N)$ to $O(1)$.
**Action:** Use Map-backed computed signals in Angular services whenever repeated key lookups are required.
