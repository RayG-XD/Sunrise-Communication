import logging
from django.conf import settings
from django.core.mail import send_mail
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

logger = logging.getLogger(__name__)


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

    def perform_create(self, serializer):
        inquiry = serializer.save()
        self._notify_admin(inquiry)

    def _notify_admin(self, inquiry):
        try:
            inquiry_type_label = inquiry.get_inquiry_type_display() if hasattr(inquiry, 'get_inquiry_type_display') else inquiry.inquiry_type
            subject = f"[New Lead - {inquiry_type_label}] {inquiry.name} ({inquiry.phone})"
            lines = [
                "A new lead has been received via the Sunrise Communication web portal.",
                "",
                f"Type: {inquiry_type_label}",
                f"Name: {inquiry.name}",
                f"Phone: {inquiry.phone}",
                f"Email: {inquiry.email or 'N/A'}",
                f"Organization / Society: {inquiry.organization or 'N/A'}",
                f"Designation: {inquiry.designation or 'N/A'}",
                f"Locality: {inquiry.locality or 'N/A'}",
                f"Project Type: {inquiry.project_type or 'N/A'}",
                f"Scale: {inquiry.flat_count} Flats / {inquiry.wing_count} Wings" if inquiry.flat_count else "",
                f"Preferred Time: {inquiry.preferred_time or 'N/A'}",
                f"Systems Required: {', '.join(inquiry.systems_required) if inquiry.systems_required else 'N/A'}",
                "",
                "Message / Specifications:",
                f"{inquiry.message}",
                "",
                f"Timestamp: {inquiry.created_at.strftime('%Y-%m-%d %H:%M:%S') if inquiry.created_at else 'N/A'}",
            ]
            message_body = "\n".join([line for line in lines if line is not None])
            from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@sunrisecommunication.in')
            recipient_list = ['sunrisecommunication1555@gmail.com']

            send_mail(
                subject=subject,
                message=message_body,
                from_email=from_email,
                recipient_list=recipient_list,
                fail_silently=True,
            )
        except Exception as e:
            logger.warning("Lead notification email dispatch failed silently: %s", e)


