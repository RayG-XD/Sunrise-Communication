import json
import django
import os

os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'
django.setup()

from products.models import Product, Category, SubCategory, Brand, ProductSpec

test_data = [
    {
        "model_number": "TEST-CAM-01",
        "name": "Test Enterprise Security Camera",
        "brand": "CP Plus",
        "category": "Network Camera",
        "category_slug": "network-camera",
        "sub_category": "4 MP",
        "sub_category_slug": "4-mp",
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
category, _ = Category.objects.get_or_create(slug='network-camera', defaults={'name': cat_name})
sub_category, _ = SubCategory.objects.get_or_create(category=category, slug='4-mp', defaults={'name': '4 MP'})
brand, _ = Brand.objects.get_or_create(name='CP Plus', defaults={'slug': 'cp-plus'})

product, created = Product.objects.update_or_create(
    slug='test-enterprise-security-camera',
    defaults={
        'model_number': test_data[0]['model_number'],
        'name': test_data[0]['name'],
        'brand': brand,
        'category': category,
        'sub_category': sub_category,
        'sub_category_name': '4 MP',
        'short_description': test_data[0]['short_description'],
        'services_offered': test_data[0]['services_offered'],
    }
)

product.specs.all().delete()
for spec in test_data[0]['specs']:
    ProductSpec.objects.create(product=product, key=spec['key'], value=spec['value'])

# Verify lookup in DB
fetched = Product.objects.get(slug='test-enterprise-security-camera')
print(f"VERIFICATION SUCCESS: Product '{fetched.name}' [{fetched.model_number}] has {fetched.specs.count()} specs, subcategory '{fetched.sub_category.name}', and brand '{fetched.brand.name}'")

# Clean up test product
fetched.delete()
print("Cleaned up test product cleanly.")
