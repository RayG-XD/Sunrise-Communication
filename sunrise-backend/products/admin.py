import json
from django.contrib import admin, messages
from django.shortcuts import render, redirect
from django.urls import path
from django.utils.html import format_html
from django.utils.text import slugify
from .models import Category, SubCategory, Brand, Product, ProductSpec
from .forms import JsonUploadForm

# Category metadata for default CSS placeholders
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


class SubCategoryInline(admin.TabularInline):
    model = SubCategory
    extra = 1
    fields = ['name', 'slug', 'display_order']
    prepopulated_fields = {'slug': ('name',)}


class ProductSpecInline(admin.TabularInline):
    model = ProductSpec
    extra = 1
    fields = ['key', 'value', 'display_order']
    ordering = ['display_order']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'icon_class', 'display_order', 'subcategory_count', 'product_count']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'description']
    ordering = ['display_order', 'name']
    inlines = [SubCategoryInline]

    def subcategory_count(self, obj):
        return obj.subcategories.count()
    subcategory_count.short_description = 'Sub-Categories'

    def product_count(self, obj):
        return obj.products.count()
    product_count.short_description = 'Products'


@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'slug', 'display_order', 'product_count']
    list_filter = ['category']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'category__name']
    ordering = ['category', 'display_order', 'name']

    def product_count(self, obj):
        return obj.products.count()
    product_count.short_description = 'Products'


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'logo_preview', 'display_order', 'product_count']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']
    ordering = ['display_order', 'name']

    def logo_preview(self, obj):
        if obj.logo:
            return format_html(
                '<img src="{}" style="max-height: 30px; max-width: 80px;" />',
                obj.logo.url
            )
        return '—'
    logo_preview.short_description = 'Logo'

    def product_count(self, obj):
        return obj.products.count()
    product_count.short_description = 'Products'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'model_number', 'name', 'brand', 'category', 'sub_category',
        'is_active', 'image_preview', 'spec_count', 'display_order'
    ]
    list_filter = ['is_active', 'category', 'sub_category', 'brand']
    search_fields = ['name', 'model_number', 'brand__name', 'category__name', 'short_description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_active', 'display_order']
    readonly_fields = ['created_at', 'updated_at', 'image_preview_large']
    fieldsets = [
        ('Product Identification', {
            'fields': ['model_number', 'name', 'slug', 'brand', 'category', 'sub_category']
        }),
        ('Content', {
            'fields': ['short_description', 'image', 'image_preview_large']
        }),
        ('Services & Visibility', {
            'fields': ['services_offered', 'is_active', 'display_order']
        }),
        ('Timestamps', {
            'fields': ['created_at', 'updated_at'],
            'classes': ['collapse']
        }),
    ]
    inlines = [ProductSpecInline]
    ordering = ['display_order', '-created_at']

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('upload-json/', self.admin_site.admin_view(self.upload_json_view), name='products_product_upload_json'),
        ]
        return custom_urls + urls

    def upload_json_view(self, request):
        """Admin view to handle JSON file upload and bulk product import."""
        if request.method == 'POST':
            form = JsonUploadForm(request.POST, request.FILES)
            if form.is_valid():
                json_file = request.FILES['json_file']
                clear_existing = form.cleaned_data['clear_existing']

                try:
                    raw_data = json_file.read().decode('utf-8')
                    parsed_json = json.loads(raw_data)

                    if isinstance(parsed_json, dict) and 'products' in parsed_json:
                        products_list = parsed_json['products']
                    elif isinstance(parsed_json, list):
                        products_list = parsed_json
                    else:
                        messages.error(request, 'Invalid JSON structure. Must be a list of products or an object with a "products" list.')
                        return redirect('admin:products_product_upload_json')

                    if clear_existing:
                        ProductSpec.objects.all().delete()
                        Product.objects.all().delete()
                        SubCategory.objects.all().delete()
                        messages.warning(request, 'Cleared all existing products and subcategories.')

                    created_count = 0
                    updated_count = 0

                    for idx, item in enumerate(products_list):
                        cat_name = item.get('category', 'General')
                        cat_meta = CATEGORY_META.get(cat_name, {})
                        cat_slug = item.get('category_slug', cat_meta.get('slug', slugify(cat_name)))
                        cat_desc = item.get('category_description', '')

                        category, cat_created = Category.objects.get_or_create(
                            slug=cat_slug,
                            defaults={
                                'name': cat_name,
                                'description': cat_desc,
                                'icon_class': cat_meta.get('icon_class', 'flaticon-technology'),
                                'gradient_colors': cat_meta.get('gradient_colors', '#010c3a, #002d5b')
                            }
                        )
                        if cat_desc and not category.description:
                            category.description = cat_desc
                            category.save()

                        # Sub-Category processing
                        sub_name = item.get('sub_category', '')
                        sub_slug = item.get('sub_category_slug', slugify(sub_name) if sub_name else '')
                        sub_category = None

                        if sub_name:
                            sub_category, _ = SubCategory.objects.get_or_create(
                                category=category,
                                slug=sub_slug or slugify(sub_name),
                                defaults={'name': sub_name}
                            )

                        # Brand processing
                        brand_name = item.get('brand', 'Generic')
                        brand, _ = Brand.objects.get_or_create(
                            name=brand_name,
                            defaults={'slug': slugify(brand_name)}
                        )

                        # Product creation
                        prod_name = item.get('name', 'Unnamed Product')
                        prod_slug = item.get('slug', slugify(prod_name))
                        model_num = item.get('model_number', '')

                        product, created = Product.objects.update_or_create(
                            slug=prod_slug,
                            defaults={
                                'model_number': model_num,
                                'name': prod_name,
                                'brand': brand,
                                'category': category,
                                'sub_category': sub_category,
                                'sub_category_name': sub_name,
                                'short_description': item.get('short_description', ''),
                                'services_offered': item.get('services_offered', ['Sales', 'Installation']),
                                'display_order': idx,
                                'is_active': True,
                            }
                        )

                        if 'specs' in item and isinstance(item['specs'], list):
                            product.specs.all().delete()
                            for spec_idx, spec_item in enumerate(item['specs']):
                                ProductSpec.objects.create(
                                    product=product,
                                    key=spec_item.get('key', ''),
                                    value=spec_item.get('value', ''),
                                    display_order=spec_idx
                                )

                        if created:
                            created_count += 1
                        else:
                            updated_count += 1

                    messages.success(
                        request,
                        f'Successfully processed JSON file! Created {created_count} new product(s), updated {updated_count} existing product(s).'
                    )
                    return redirect('admin:products_product_changelist')

                except Exception as e:
                    messages.error(request, f'Failed to process JSON file: {str(e)}')
                    return redirect('admin:products_product_upload_json')

        else:
            form = JsonUploadForm()

        context = {
            **self.admin_site.each_context(request),
            'opts': self.model._meta,
            'form': form,
            'title': 'Upload Products JSON',
        }
        return render(request, 'admin/products/product/upload_json.html', context)

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 40px; max-width: 60px; border-radius: 4px;" />',
                obj.image.url
            )
        return '—'
    image_preview.short_description = 'Image'

    def image_preview_large(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 200px; border-radius: 6px; border: 1px solid #ddd;" />',
                obj.image.url
            )
        return 'No image uploaded'
    image_preview_large.short_description = 'Image Preview'

    def spec_count(self, obj):
        return obj.specs.count()
    spec_count.short_description = 'Specs'


admin.site.site_header = 'Sunrise Communication — Admin Panel'
admin.site.site_title = 'Sunrise Communication Admin'
admin.site.index_title = 'Products & Solutions Management'
