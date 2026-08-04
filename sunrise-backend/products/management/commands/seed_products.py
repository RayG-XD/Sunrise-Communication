import json
from pathlib import Path
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from products.models import Category, SubCategory, Brand, Product, ProductSpec

CATEGORY_META = {
    'Network Camera': {'slug': 'network-camera', 'icon_class': 'flaticon-camera', 'gradient_colors': '#010c3a, #002d5b'},
    'Network Video Recorder (NVR)': {'slug': 'nvr', 'icon_class': 'flaticon-technology', 'gradient_colors': '#002d5b, #0f172a'},
    'Analog HD Camera': {'slug': 'analog-hd', 'icon_class': 'flaticon-camera', 'gradient_colors': '#010c3a, #1e1b4b'},
    'Digital Video Recorder (DVR)': {'slug': 'dvr', 'icon_class': 'flaticon-technology', 'gradient_colors': '#0f172a, #010c3a'},
    'Speed Dome (PTZ)': {'slug': 'ptz', 'icon_class': 'flaticon-camera', 'gradient_colors': '#002d5b, #022c22'},
    'EzyHome': {'slug': 'ezyhome', 'icon_class': 'flaticon-technology', 'gradient_colors': '#022c22, #002d5b'},
    'EPABX & Intercom': {'slug': 'epabx', 'icon_class': 'flaticon-call', 'gradient_colors': '#0f172a, #1e1b4b'},
    'Biometrics & Access Control': {'slug': 'biometrics', 'icon_class': 'flaticon-security', 'gradient_colors': '#022c22, #010c3a'},
}


class Command(BaseCommand):
    help = 'Seed the database with enterprise products taxonomy from products.json'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear all existing products before seeding',
        )

    def handle(self, *args, **options):
        json_path = Path(__file__).resolve().parents[4] / (
            'sunrise-angular/src/assets/data/products.json'
        )

        if not json_path.exists():
            self.stderr.write(self.style.ERROR(f'products.json not found at: {json_path}'))
            return

        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        products_data = data.get('products', [])
        self.stdout.write(f'Found {len(products_data)} products in JSON file')

        if options['clear']:
            ProductSpec.objects.all().delete()
            Product.objects.all().delete()
            SubCategory.objects.all().delete()
            Brand.objects.all().delete()
            Category.objects.all().delete()
            self.stdout.write(self.style.WARNING('Cleared all existing database records'))

        created_count = 0
        skipped_count = 0

        for item in products_data:
            cat_name = item['category']
            cat_meta = CATEGORY_META.get(cat_name, {})
            cat_slug = item.get('category_slug', cat_meta.get('slug', slugify(cat_name)))
            cat_desc = item.get('category_description', '')

            category, _ = Category.objects.get_or_create(
                slug=cat_slug,
                defaults={
                    'name': cat_name,
                    'description': cat_desc,
                    'icon_class': cat_meta.get('icon_class', 'flaticon-technology'),
                    'gradient_colors': cat_meta.get('gradient_colors', '#010c3a, #002d5b'),
                }
            )
            if cat_desc and not category.description:
                category.description = cat_desc
                category.save()

            sub_name = item.get('sub_category', '')
            sub_slug = item.get('sub_category_slug', slugify(sub_name) if sub_name else '')
            sub_category = None

            if sub_name:
                sub_category, _ = SubCategory.objects.get_or_create(
                    category=category,
                    slug=sub_slug or slugify(sub_name),
                    defaults={'name': sub_name}
                )

            brand_name = item['brand']
            brand, _ = Brand.objects.get_or_create(
                name=brand_name,
                defaults={'slug': slugify(brand_name)}
            )

            if Product.objects.filter(slug=item['slug']).exists():
                skipped_count += 1
                self.stdout.write(f'  Skipped (exists): {item["name"]}')
                continue

            product = Product.objects.create(
                model_number=item.get('model_number', ''),
                name=item['name'],
                slug=item['slug'],
                brand=brand,
                category=category,
                sub_category=sub_category,
                sub_category_name=sub_name,
                short_description=item['short_description'],
                services_offered=item['services_offered'],
                display_order=created_count,
            )

            for idx, spec in enumerate(item.get('specs', [])):
                ProductSpec.objects.create(
                    product=product,
                    key=spec['key'],
                    value=spec['value'],
                    display_order=idx,
                )

            created_count += 1
            self.stdout.write(self.style.SUCCESS(f'  Created [{product.model_number}]: {item["name"]}'))

        self.stdout.write(self.style.SUCCESS(
            f'\nDone! Created {created_count} products, skipped {skipped_count}.'
        ))
