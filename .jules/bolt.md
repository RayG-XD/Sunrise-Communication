# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2025-05-18 - Early Return Set Lookups Before Multi-Field String Search
**Learning:** In product catalog filtering components, evaluating multi-field string lowercasing and `.includes()` substring checks across all catalog items creates unnecessary string allocations and CPU overhead for items that do not even match selected categories or brands.
**Action:** Always short-circuit filtering logic using fast $O(1)$ `Set.has()` checks for category, subcategory, and brand filters before running multi-field string searching and lowercasing.
