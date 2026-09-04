from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Category, SubCategory, Brand, Product


class ProductFilterSecurityTests(TestCase):
    """Security unit tests ensuring API filters sanitize inputs and handle invalid/malicious queries gracefully."""

    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name='CCTV Surveillance', slug='cctv-surveillance')
        self.sub_category = SubCategory.objects.create(category=self.category, name='4 MP Cameras', slug='4-mp-cameras')
        self.brand = Brand.objects.create(name='CP Plus', slug='cp-plus')
        self.product = Product.objects.create(
            category=self.category,
            sub_category=self.sub_category,
            brand=self.brand,
            name='CP Plus 4MP IP Dome Camera',
            slug='cp-plus-4mp-ip-dome-camera',
            model_number='CP-UNC-DA41L2C',
            is_active=True
        )

    def test_filter_valid_parameters(self):
        response = self.client.get('/api/products/', {'category': 'cctv-surveillance', 'brand': 'cp-plus'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_filter_special_characters_sql_injection_attempt(self):
        response = self.client.get('/api/products/', {'category': "' OR '1'='1", 'brand': "<script>alert(1)</script>"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)
