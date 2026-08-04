from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Category, Brand, Product
from .serializers import (
    CategorySerializer, BrandSerializer,
    ProductListSerializer, ProductDetailSerializer
)
from .filters import ProductFilter


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for product categories with nested sub-categories."""
    queryset = Category.objects.all().prefetch_related('subcategories', 'subcategories__products')
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None


class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for product brands."""
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [AllowAny]
    pagination_class = None


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for products catalog.

    Supports:
    - Filtering: ?category=network-camera&sub_category=4-mp&brand=cp-plus
    - Search: ?search=dome camera
    - Ordering: ?ordering=name, ?ordering=-created_at
    """
    permission_classes = [AllowAny]
    filterset_class = ProductFilter
    search_fields = ['name', 'model_number', 'brand__name', 'category__name', 'sub_category__name', 'short_description']
    ordering_fields = ['name', 'display_order', 'created_at']
    ordering = ['display_order', '-created_at']
    lookup_field = 'slug'

    def get_queryset(self):
        return Product.objects.filter(
            is_active=True
        ).select_related(
            'brand', 'category', 'sub_category'
        ).prefetch_related(
            'specs'
        )

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer
