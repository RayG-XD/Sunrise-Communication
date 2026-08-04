import django_filters
from .models import Product


class ProductFilter(django_filters.FilterSet):
    """FilterSet for Product API — supports category, sub_category, and brand query params."""
    category = django_filters.CharFilter(field_name='category__slug', lookup_expr='exact')
    sub_category = django_filters.CharFilter(field_name='sub_category__slug', lookup_expr='exact')
    brand = django_filters.CharFilter(field_name='brand__slug', lookup_expr='exact')

    class Meta:
        model = Product
        fields = ['category', 'sub_category', 'brand']
