import json
import django
import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'
django.setup()

from products.models import Product, Category, Brand, ProductSpec

test_data = [
    {
        "name": "Test Enterprise Security Camera",
        "brand": "CP Plus",
        "category": "CCTV Camera Systems",
        "category_slug": "cctv",
        "sub_category": "Test Camera",
        "short_description": "Verification test product payload for JSON bulk import feature.",
        "services_offered": ["Sales", "Installation", "AMC"],
        "specs": [
            { "key": "Test Spec 1", "value": "Value 1" },
            { "key": "Test Spec 2", "value": "Value 2" }
        ]
    }
]

# Simulate JSON import processing logic
cat_name = test_data[0]['category']
category, _ = Category.objects.get_or_create(slug='cctv', defaults={'name': cat_name})
brand, _ = Brand.objects.get_or_create(name='CP Plus', defaults={'slug': 'cp-plus'})

product, created = Product.objects.update_or_create(
    slug='test-enterprise-security-camera',
    defaults={
        'name': test_data[0]['name'],
        'brand': brand,
        'category': category,
        'sub_category': test_data[0]['sub_category'],
        'short_description': test_data[0]['short_description'],
        'services_offered': test_data[0]['services_offered'],
    }
)

product.specs.all().delete()
for spec in test_data[0]['specs']:
    ProductSpec.objects.create(product=product, key=spec['key'], value=spec['value'])

# Verify lookup in DB
fetched = Product.objects.get(slug='test-enterprise-security-camera')
print(f"VERIFICATION SUCCESS: Product '{fetched.name}' has {fetched.specs.count()} specs and brand '{fetched.brand.name}'")

# Clean up test product
fetched.delete()
print("Cleaned up test product cleanly.")
