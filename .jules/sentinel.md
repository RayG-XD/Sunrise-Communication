## 2025-05-18 - Avoid Hardcoding Plaintext Superuser Credentials in Administrative Utility Scripts
**Vulnerability:** Superuser credentials (including administrative password) were hardcoded in plain text inside `sunrise-backend/create_admin.py` database initialization script.
**Learning:** Utility/seeding scripts created for local environment setup often inadvertently contain default superuser credentials that get checked into version control, creating a critical vulnerability if executed in staging or production.
**Prevention:** Always source superuser credentials (especially passwords) from environment variables (e.g. `DJANGO_SUPERUSER_PASSWORD`), and abort execution cleanly if required secret environment variables are missing.

## 2025-05-19 - Restrict Read Access on DRF ViewSets Storing Customer PII
**Vulnerability:** `InquiryViewSet` used `permission_classes = [AllowAny]`, allowing unauthenticated public API access to list and retrieve all customer leads, phone numbers, and quote requests.
**Learning:** REST endpoints that accept public form submissions (like contact forms or audit requests) must isolate `create` permissions from `list`/`retrieve` read actions rather than applying broad `AllowAny` permissions across the entire ModelViewSet.
**Prevention:** Always override `get_permissions()` on DRF ViewSets handling user submission data so that `create` actions allow `AllowAny` while read/manage actions require `IsAdminUser` or `IsAuthenticated`.
