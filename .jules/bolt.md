# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2026-09-01 - Short-Circuiting Set Filtering Before String Operations
**Learning:** In Angular computed signals filtering large collections, performing string lowercasing / string `.includes()` before Set `has()` checks executes unnecessary allocations and string iterations across non-matching items. Checking O(1) Set memberships first short-circuits filtering and skips string operations completely for ~90% of items.
**Action:** Always structure filter conditions with O(1) Set/equality checks first and string search operations last.
