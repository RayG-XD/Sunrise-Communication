# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2025-05-18 - Short-Circuiting Array Filtering with Set Checks

**Learning:** Evaluating expensive multi-field string operations (`toLowerCase().includes()`) prior to O(1) Set membership tests (`cats.has()`, `subCats.has()`, `brands.has()`) inside computed signal filters forces string lowercasing and substring matching across all catalog items regardless of active category selection.

**Action:** Always structure filter predicates to execute O(1) collection lookup checks (`cats.has()`, `brands.has()`) first before invoking string operations or complex field matching.
