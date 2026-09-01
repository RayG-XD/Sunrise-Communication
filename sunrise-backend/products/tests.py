from django.test import TestCase, Client

class SecurityHeaderTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_x_content_type_options_header_present(self):
        """Verify that X-Content-Type-Options: nosniff header is sent on API responses."""
        response = self.client.get('/api/products/')
        self.assertEqual(response.headers.get('X-Content-Type-Options'), 'nosniff')
