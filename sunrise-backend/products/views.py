from django.db.models import Count, Q, Prefetch
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Category, SubCategory, Brand, Product, Inquiry
from .serializers import (
    CategorySerializer, BrandSerializer,
    ProductListSerializer, ProductDetailSerializer,
    InquirySerializer
)
from .filters import ProductFilter


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for product categories with nested sub-categories."""
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None

    def get_queryset(self):
        # Annotate product counts to eliminate N+1 queries during serialization
        subcategories_qs = SubCategory.objects.annotate(
            active_product_count=Count('products', filter=Q(products__is_active=True))
        )
        return Category.objects.annotate(
            active_product_count=Count('products', filter=Q(products__is_active=True))
        ).prefetch_related(
            Prefetch('subcategories', queryset=subcategories_qs)
        )


class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for product brands."""
    serializer_class = BrandSerializer
    permission_classes = [AllowAny]
    pagination_class = None

    def get_queryset(self):
        # Annotate active product count to eliminate N+1 queries during serialization
        return Brand.objects.annotate(
            active_product_count=Count('products', filter=Q(products__is_active=True))
        )


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


class InquiryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for customer inquiries, site audits, and quote requests.
    Supports POST for public form submission and GET for administrative review.
    """
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    http_method_names = ['get', 'post', 'head', 'options']

    def get_permissions(self):
        """Public creation allowed; reading/listing inquiries requires admin authorization."""
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]
