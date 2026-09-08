# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2025-05-18 - Signal-based Hash Map Lookups for Angular Catalog
**Learning:** Performing array `.find()` scans inside computed signals for entity lookups (e.g., getting product by slug or category description) executes $O(N)$ operations on every signal evaluation.
**Action:** Expose a `computed()` `Map<string, Entity>` signal in shared data services (`ProductService`) to allow $O(1)$ constant-time key lookups across detail pages and filter components.
