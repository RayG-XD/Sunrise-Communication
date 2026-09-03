from django.test import TestCase
from rest_framework.test import APIClient

class SecurityHeadersTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_security_headers_present(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get('X-Content-Type-Options'), 'nosniff')
        self.assertEqual(response.headers.get('X-Frame-Options'), 'DENY')
