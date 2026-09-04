# Bolt's Journal - Critical Learnings

This file tracks critical learnings and performance insights specific to this codebase.

## 2026-09-04 - Leading Column Indexing for Django DRF Querysets
**Learning:** In Django DRF catalog endpoints (`ProductViewSet`, `CategoryViewSet`, `BrandViewSet`), queries heavily filter by `is_active=True` and sort by `display_order, -created_at`. Adding a composite index `(is_active, display_order, -created_at)` fulfills both multi-column sort queries and single-field `is_active` queries without needing a redundant single-column `db_index=True` on `is_active`.
**Action:** Always structure composite indexes with high-cardinality/frequent filter fields as leading columns, avoiding redundant single-field indexes on the same leading column.
