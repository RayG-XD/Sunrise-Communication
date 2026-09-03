from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Category, Brand, Product


class SecurityConfigTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name='Test Category', slug='test-category')
        self.brand = Brand.objects.create(name='Test Brand', slug='test-brand')
        self.product = Product.objects.create(
            name='Test Product',
            slug='test-product',
            brand=self.brand,
            category=self.category,
            short_description='Test description'
        )

    def test_anonymous_user_can_read_products(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_anonymous_user_cannot_create_product(self):
        data = {
            'name': 'Unauthorized Product',
            'slug': 'unauthorized-product',
            'brand': str(self.brand.id),
            'category': str(self.category.id),
            'short_description': 'Attempting unauthorized creation'
        }
        response = self.client.post('/api/products/', data=data, format='json')
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN, status.HTTP_405_METHOD_NOT_ALLOWED])

    def test_security_headers_present(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.headers.get('X-Frame-Options'), 'DENY')
        self.assertEqual(response.headers.get('X-Content-Type-Options'), 'nosniff')
