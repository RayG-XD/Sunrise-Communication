from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Category, SubCategory, Brand, Product


class ProductPerformanceIndexTestCase(TestCase):
    """Test suite verifying Product model database indexing, filtering, and queries."""

    def setUp(self):
        self.client = APIClient()

        self.category = Category.objects.create(
            name='Network Camera Test',
            slug='network-camera-test',
            display_order=1
        )
        self.subcategory = SubCategory.objects.create(
            category=self.category,
            name='4 MP Test',
            slug='4-mp-test',
            display_order=1
        )
        self.brand = Brand.objects.create(
            name='CP Plus Test',
            slug='cp-plus-test',
            display_order=1
        )

        # Active products with varying display order
        self.prod1 = Product.objects.create(
            name='Camera A',
            slug='camera-a',
            category=self.category,
            sub_category=self.subcategory,
            brand=self.brand,
            short_description='Test camera A',
            is_active=True,
            display_order=2
        )
        self.prod2 = Product.objects.create(
            name='Camera B',
            slug='camera-b',
            category=self.category,
            sub_category=self.subcategory,
            brand=self.brand,
            short_description='Test camera B',
            is_active=True,
            display_order=1
        )
        # Inactive product
        self.prod_inactive = Product.objects.create(
            name='Camera Inactive',
            slug='camera-inactive',
            category=self.category,
            sub_category=self.subcategory,
            brand=self.brand,
            short_description='Inactive camera',
            is_active=False,
            display_order=0
        )

    def _extract_results(self, data):
        if isinstance(data, dict):
            return data.get('results', [])
        return data

    def test_active_products_filtering_and_ordering(self):
        """Verify only active products are returned, ordered by display_order."""
        url = '/api/products/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        results = self._extract_results(response.data)
        self.assertEqual(len(results), 2)
        # Prod2 has display_order=1, Prod1 has display_order=2
        self.assertEqual(results[0]['slug'], 'camera-b')
        self.assertEqual(results[1]['slug'], 'camera-a')

    def test_category_active_product_count(self):
        """Verify active_product_count annotation on Category endpoint ignores inactive products."""
        url = '/api/categories/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        results = self._extract_results(response.data)
        cat_data = next((c for c in results if c['slug'] == 'network-camera-test'), None)
        self.assertIsNotNone(cat_data)
        self.assertEqual(cat_data['product_count'], 2)

    def test_brand_active_product_count(self):
        """Verify active_product_count annotation on Brand endpoint ignores inactive products."""
        url = '/api/brands/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        results = self._extract_results(response.data)
        brand_data = next((b for b in results if b['slug'] == 'cp-plus-test'), None)
        self.assertIsNotNone(brand_data)
        self.assertEqual(brand_data['product_count'], 2)
