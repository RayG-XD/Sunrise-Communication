## 2025-05-18 - Avoid Hardcoding Plaintext Superuser Credentials in Administrative Utility Scripts
**Vulnerability:** Superuser credentials (including administrative password) were hardcoded in plain text inside `sunrise-backend/create_admin.py` database initialization script.
**Learning:** Utility/seeding scripts created for local environment setup often inadvertently contain default superuser credentials that get checked into version control, creating a critical vulnerability if executed in staging or production.
**Prevention:** Always source superuser credentials (especially passwords) from environment variables (e.g. `DJANGO_SUPERUSER_PASSWORD`), and abort execution cleanly if required secret environment variables are missing.

## 2025-05-19 - Restrict Public Access to Endpoints Processing Customer PII
**Vulnerability:** `InquiryViewSet` used `permission_classes = [AllowAny]` without overriding permissions per HTTP action, exposing customer PII (email, phone, locality, message details) via public `GET /api/inquiries/` list and detail endpoints.
**Learning:** Standard REST viewsets with default `AllowAny` permissions expose read (GET) actions publicly unless explicitly scoped by action or model-level authorization checks.
**Prevention:** Dynamically override `get_permissions()` in DRF viewsets to isolate public creation (`AllowAny`) from administrative/staff read operations (`IsAdminUser`).
