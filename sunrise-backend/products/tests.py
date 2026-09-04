from django.test import TestCase
from django.conf import settings
from rest_framework.test import APIClient
from rest_framework import status


class SecuritySettingsTest(TestCase):
    """Test suite to verify security configurations in Django settings."""

    def test_security_headers_enabled(self):
        """Verify essential security response headers are configured."""
        self.assertTrue(getattr(settings, 'SECURE_BROWSER_XSS_FILTER', False))
        self.assertTrue(getattr(settings, 'SECURE_CONTENT_TYPE_NOSNIFF', False))
        self.assertEqual(getattr(settings, 'X_FRAME_OPTIONS', None), 'DENY')

    def test_rest_framework_throttling_configured(self):
        """Verify DRF throttling classes and rates are configured for rate limiting."""
        drf_settings = getattr(settings, 'REST_FRAMEWORK', {})
        throttle_classes = drf_settings.get('DEFAULT_THROTTLE_CLASSES', [])
        throttle_rates = drf_settings.get('DEFAULT_THROTTLE_RATES', {})

        self.assertIn('rest_framework.throttling.AnonRateThrottle', throttle_classes)
        self.assertIn('rest_framework.throttling.UserRateThrottle', throttle_classes)
        self.assertEqual(throttle_rates.get('anon'), '100/minute')
        self.assertEqual(throttle_rates.get('user'), '1000/minute')

    def test_api_response_security_headers(self):
        """Verify API response contains security headers like X-Frame-Options and X-Content-Type-Options."""
        client = APIClient()
        response = client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.headers.get('X-Frame-Options'), 'DENY')
        self.assertEqual(response.headers.get('X-Content-Type-Options'), 'nosniff')
