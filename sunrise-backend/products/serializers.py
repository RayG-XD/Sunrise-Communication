from rest_framework import serializers
from .models import Category, SubCategory, Brand, Product, ProductSpec


class SubCategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'slug', 'display_order', 'product_count']

    def get_product_count(self, obj):
        # Uses pre-annotated active_product_count when available to prevent N+1 queries
        if hasattr(obj, 'active_product_count'):
            return obj.active_product_count
        return obj.products.filter(is_active=True).count()


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon_class', 'gradient_colors', 'product_count', 'subcategories']

    def get_product_count(self, obj):
        # Uses pre-annotated active_product_count when available to prevent N+1 queries
        if hasattr(obj, 'active_product_count'):
            return obj.active_product_count
        return obj.products.filter(is_active=True).count()


class BrandSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'logo_url', 'product_count']

    def get_logo_url(self, obj):
        if obj.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return ''

    def get_product_count(self, obj):
        # Uses pre-annotated active_product_count when available to prevent N+1 queries
        if hasattr(obj, 'active_product_count'):
            return obj.active_product_count
        return obj.products.filter(is_active=True).count()


class ProductSpecSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpec
        fields = ['key', 'value']


class ProductListSerializer(serializers.ModelSerializer):
    """Serializer for catalog listing — matches Angular Product interface."""
    brand = serializers.CharField(source='brand.name')
    brand_logo_url = serializers.SerializerMethodField()
    category = serializers.CharField(source='category.name')
    category_slug = serializers.CharField(source='category.slug')
    category_description = serializers.CharField(source='category.description', read_only=True)
    sub_category = serializers.SerializerMethodField()
    sub_category_slug = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    specs = ProductSpecSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'model_number', 'slug', 'name', 'brand', 'brand_logo_url',
            'category', 'category_slug', 'category_description',
            'sub_category', 'sub_category_slug',
            'image_url', 'short_description', 'specs', 'services_offered'
        ]

    def get_sub_category(self, obj):
        if obj.sub_category:
            return obj.sub_category.name
        return obj.sub_category_name or ''

    def get_sub_category_slug(self, obj):
        if obj.sub_category:
            return obj.sub_category.slug
        return ''

    def get_brand_logo_url(self, obj):
        if obj.brand.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.brand.logo.url)
            return obj.brand.logo.url
        return ''

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return ''


class ProductDetailSerializer(ProductListSerializer):
    """Extended serializer for detail page."""
    pass
