## 2025-05-19 - Restrict Read Permissions on User-Submitted Form Inquiries ViewSet
**Vulnerability:** `InquiryViewSet` used `permission_classes = [AllowAny]`, allowing unauthenticated public users to list and retrieve all submitted customer inquiries (which contain sensitive customer PII like name, phone, email, locality, and project details).
**Learning:** Defaulting REST framework viewsets with sensitive user-submitted data to `AllowAny` for public creation (e.g. form submissions) exposes read endpoints unless action-specific permission checks (`get_permissions`) are explicitly implemented.
**Prevention:** Override `get_permissions()` in DRF ModelViewSets when `create` actions need public access, ensuring list/retrieve/update/destroy actions require `IsAdminUser` or `IsAuthenticated`.

## 2025-05-18 - Avoid Hardcoding Plaintext Superuser Credentials in Administrative Utility Scripts
**Vulnerability:** Superuser credentials (including administrative password) were hardcoded in plain text inside `sunrise-backend/create_admin.py` database initialization script.
**Learning:** Utility/seeding scripts created for local environment setup often inadvertently contain default superuser credentials that get checked into version control, creating a critical vulnerability if executed in staging or production.
**Prevention:** Always source superuser credentials (especially passwords) from environment variables (e.g. `DJANGO_SUPERUSER_PASSWORD`), and abort execution cleanly if required secret environment variables are missing.
