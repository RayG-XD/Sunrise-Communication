## 2025-05-18 - Avoid Hardcoding Plaintext Superuser Credentials in Administrative Utility Scripts
**Vulnerability:** Superuser credentials (including administrative password) were hardcoded in plain text inside `sunrise-backend/create_admin.py` database initialization script.
**Learning:** Utility/seeding scripts created for local environment setup often inadvertently contain default superuser credentials that get checked into version control, creating a critical vulnerability if executed in staging or production.
**Prevention:** Always source superuser credentials (especially passwords) from environment variables (e.g. `DJANGO_SUPERUSER_PASSWORD`), and abort execution cleanly if required secret environment variables are missing.

## 2025-05-19 - DRF ModelViewSet `AllowAny` Exposes Sensitive Customer Inquiries
**Vulnerability:** Unauthenticated `GET` requests to `/api/inquiries/` leaked all sensitive customer leads (names, phone numbers, emails, locations, scope, and notes) due to `permission_classes = [AllowAny]` on `InquiryViewSet`.
**Learning:** Applying top-level `AllowAny` to a Django REST Framework `ModelViewSet` intended for public form creation (`POST`) also makes read/list operations (`GET`) public unless overridden per action.
**Prevention:** Override `get_permissions()` on `ModelViewSet` to return `AllowAny()` strictly for the `create` action while requiring `IsAdminUser()` or `IsAuthenticated()` for read/list/update operations.
