import uuid
from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    """Main product category (Network Camera, NVR, DVR, EPABX, etc.)"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True, help_text='Display name e.g. "Network Camera"')
    slug = models.SlugField(max_length=100, unique=True, help_text='URL-safe slug e.g. "network-camera"')
    description = models.TextField(blank=True, default='', help_text='Category description header banner text')
    icon_class = models.CharField(
        max_length=50, default='flaticon-camera',
        help_text='CSS icon class for placeholder e.g. "flaticon-camera"'
    )
    gradient_colors = models.CharField(
        max_length=100, default='#010c3a, #002d5b',
        help_text='CSS gradient colors for placeholder e.g. "#010c3a, #002d5b"'
    )
    display_order = models.IntegerField(default=0, help_text='Sort order in filter panel')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class SubCategory(models.Model):
    """Sub-category / variant group (2 MP, 4 MP, 8 MP, 4 Ch., 8 Ch., etc.)"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories')
    name = models.CharField(max_length=100, help_text='Sub-category name e.g. "4 MP" or "8 Ch."')
    slug = models.SlugField(max_length=100, help_text='URL-safe slug e.g. "4-mp"')
    display_order = models.IntegerField(default=0, help_text='Sort order within category')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Sub Categories'
        ordering = ['display_order', 'name']
        unique_together = ['category', 'slug']

    def __str__(self):
        return f'{self.category.name} › {self.name}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Brand(models.Model):
    """Product brands (CP Plus, Hikvision, Matrix, Essl, etc.)"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True, help_text='Brand name e.g. "CP Plus"')
    slug = models.SlugField(max_length=100, unique=True, help_text='URL slug e.g. "cp-plus"')
    logo = models.ImageField(
        upload_to='brands/', blank=True, null=True,
        help_text='Brand logo image (optional — text badge used when empty)'
    )
    display_order = models.IntegerField(default=0, help_text='Sort order in filter panel')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(models.Model):
    """Core product model for Sunrise Communication enterprise hardware catalog."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    model_number = models.CharField(
        max_length=100, blank=True, default='',
        help_text='Official model number e.g. "CP-UNC-DA41L3C-D-LQ2"'
    )
    name = models.CharField(max_length=200, help_text='Full product title')
    slug = models.SlugField(max_length=250, unique=True, help_text='URL slug (auto-generated from name)')
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='products')
    sub_category = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    sub_category_name = models.CharField(max_length=100, blank=True, default='', help_text='Fallback string sub-category name')
    image = models.ImageField(
        upload_to='products/', blank=True, null=True,
        help_text='Product image (optional — CSS gradient placeholder used when empty)'
    )
    short_description = models.TextField(help_text='Brief description shown on cards and in meta tags')
    services_offered = models.JSONField(
        default=list,
        help_text='List of service types: ["Sales", "Installation", "AMC", "Repair"]'
    )
    is_active = models.BooleanField(default=True, help_text='Uncheck to hide product without deleting')
    display_order = models.IntegerField(default=0, help_text='Sort order in catalog grid')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order', '-created_at']
        # Performance Optimization: Composite index on (is_active, display_order, -created_at)
        # eliminates full table scans and explicit sorting on product catalog queries.
        # Note: Since is_active is the leading column, it also serves single-field is_active queries.
        indexes = [
            models.Index(fields=['is_active', 'display_order', '-created_at'], name='prod_active_order_idx'),
        ]

    def __str__(self):
        code = f' [{self.model_number}]' if self.model_number else ''
        return f'{self.name}{code} ({self.brand.name})'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class ProductSpec(models.Model):
    """Technical specification key-value pair for a product."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='specs')
    key = models.CharField(max_length=100, help_text='Spec name e.g. "Resolution"')
    value = models.CharField(max_length=200, help_text='Spec value e.g. "4MP (2560 x 1440)"')
    display_order = models.IntegerField(default=0, help_text='Sort order for display')

    class Meta:
        ordering = ['display_order']
        verbose_name = 'Technical Specification'
        verbose_name_plural = 'Technical Specifications'

    def __str__(self):
        return f'{self.key}: {self.value}'


class Inquiry(models.Model):
    """Customer inquiries, society audit requests, and quote estimates."""
    INQUIRY_TYPES = [
        ('society_audit', 'Society Site Audit Request'),
        ('cctv_calculator', 'CCTV Calculator BOQ Spec'),
        ('contact', 'General Contact Inquiry'),
        ('product', 'Product Inquiry'),
    ]

    STATUS_CHOICES = [
        ('new', 'New Lead'),
        ('contacted', 'Contacted / Follow-Up'),
        ('audit_scheduled', 'Site Audit Scheduled'),
        ('quote_sent', 'Quotation / BOQ Sent'),
        ('won', 'Order Won / Contract Signed'),
        ('closed', 'Closed / Lost'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    inquiry_type = models.CharField(max_length=30, choices=INQUIRY_TYPES, default='society_audit')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')

    # Contact details
    name = models.CharField(max_length=150, help_text='Contact person name')
    phone = models.CharField(max_length=25, help_text='Direct phone or mobile number')
    email = models.EmailField(blank=True, default='', help_text='Email address (optional)')
    designation = models.CharField(max_length=100, blank=True, default='', help_text='e.g. Society Secretary')

    # Organization / Society
    organization = models.CharField(max_length=200, blank=True, default='', help_text='Society or Company name')
    locality = models.CharField(max_length=150, blank=True, default='', help_text='Locality in Thane / Mumbai MMR')

    # Details / Scope
    project_type = models.CharField(max_length=100, blank=True, default='', help_text='e.g. New Turnkey Installation')
    flat_count = models.IntegerField(null=True, blank=True, help_text='Total flats or units')
    wing_count = models.IntegerField(null=True, blank=True, help_text='Total wings')
    preferred_time = models.CharField(max_length=100, blank=True, default='')

    # Selected systems / requirements
    systems_required = models.JSONField(default=list, blank=True, help_text='List of systems e.g. ["CCTV", "Intercom", "AMC"]')

    # Message or calculated summary
    message = models.TextField(blank=True, default='', help_text='Message text or BOQ summary spec')
    notes = models.TextField(blank=True, default='', help_text='Internal notes by Sunrise team')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Customer Inquiry / Lead'
        verbose_name_plural = 'Customer Inquiries / Leads'
        ordering = ['-created_at']

    def __str__(self):
        org = f" - {self.organization}" if self.organization else ""
        return f"[{self.get_inquiry_type_display()}] {self.name}{org} ({self.created_at.strftime('%d %b %Y')})"

