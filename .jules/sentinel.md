## 2025-05-18 - Avoid Hardcoding Plaintext Superuser Credentials in Administrative Utility Scripts
**Vulnerability:** Superuser credentials (including administrative password) were hardcoded in plain text inside `sunrise-backend/create_admin.py` database initialization script.
**Learning:** Utility/seeding scripts created for local environment setup often inadvertently contain default superuser credentials that get checked into version control, creating a critical vulnerability if executed in staging or production.
**Prevention:** Always source superuser credentials (especially passwords) from environment variables (e.g. `DJANGO_SUPERUSER_PASSWORD`), and abort execution cleanly if required secret environment variables are missing.

## 2025-05-19 - Restrict Read Permissions on ViewSets Handling Sensitive User Data
**Vulnerability:** `InquiryViewSet` used `permission_classes = [AllowAny]`, allowing unauthenticated public users to execute `GET` requests and retrieve sensitive customer PII (names, phone numbers, emails, addresses, messages).
**Learning:** ModelViewSets that accept public form submissions (`POST`) can unintentionally expose `GET`/list/retrieve endpoints if `permission_classes` is globally set to `AllowAny` instead of using action-level permission checks.
**Prevention:** Override `get_permissions()` in Django REST Framework ViewSets to grant `AllowAny` strictly for public actions (like `create`) while protecting read operations with `IsAdminUser` or `IsAuthenticated`.
