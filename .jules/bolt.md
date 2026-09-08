# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2026-09-05 - Angular Signal Computed Optimizations in Product Catalog
**Learning:** In Angular `computed()` signals operating on catalog lists, performing `Map.has()` before `Map.get()`, allocating arrays with `Array.from(Set)[0]`, or running string operations before Set membership filtering creates unnecessary memory allocations and redundant iterations on every filter update.
**Action:** Always store the `Map.get()` result in a local variable, use `Set.values().next().value` for single-item lookups, and perform Set membership checks early before string lowercasing or search string matching.
