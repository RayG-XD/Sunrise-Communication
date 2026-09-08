from django.test import TestCase
from products.models import Category, SubCategory, Brand, Product, ProductSpec


class ProductIndexTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name='Test Category', slug='test-category')
        self.subcategory = SubCategory.objects.create(category=self.category, name='Test SubCategory', slug='test-subcategory')
        self.brand = Brand.objects.create(name='Test Brand', slug='test-brand')

    def test_product_query_performance(self):
        # Populate 10 products
        for i in range(10):
            Product.objects.create(
                name=f'Product {i}',
                slug=f'product-{i}',
                category=self.category,
                sub_category=self.subcategory,
                brand=self.brand,
                display_order=i,
                is_active=True
            )

        active_products = Product.objects.filter(
            is_active=True
        ).order_by('display_order', '-created_at')

        self.assertEqual(active_products.count(), 10)
