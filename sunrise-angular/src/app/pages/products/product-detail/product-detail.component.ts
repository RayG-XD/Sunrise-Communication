import { Component, OnInit, inject, signal, computed, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { ProductService } from '../../../core/services/product.service';
import { SeoService } from '../../../core/services/seo.service';
import { InquiryService } from '../../../core/services/inquiry.service';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  protected productService = inject(ProductService);
  private seoService = inject(SeoService);
  private inquiryService = inject(InquiryService);
  private route = inject(ActivatedRoute);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  slug = signal<string>('');

  product = computed(() => {
    const s = this.slug();
    if (!s) return undefined;
    return this.productService.products().find(p => p.slug === s);
  });

  relatedProducts = computed(() => {
    const current = this.product();
    if (!current) return [];
    return this.productService.products()
      .filter(p => p.slug !== current.slug && (p.category === current.category || p.brand === current.brand))
      .slice(0, 3);
  });

  loading = computed(() => this.productService.loading());
  siteData = SITE_DATA;

  // Compute SSR-safe dynamic WhatsApp Url
  whatsappUrl = computed(() => {
    const prod = this.product();
    if (!prod) return '';

    const phone = this.siteData.social.whatsapp.replace('https://wa.me/', '');
    
    // Page URL computation (SSR-safe)
    let currentUrl = `${this.siteData.contact.website}/products/${prod.category_slug}/${prod.slug}`;
    if (isPlatformBrowser(this.platformId) && this.document.location?.href) {
      currentUrl = this.document.location.href;
    }

    const message = `Hi Sunrise Communication, I'm interested in the ${prod.name} (${prod.model_number || ''}). Can I get more details? Link: ${currentUrl}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  });

  isCopied = signal<boolean>(false);

  isCameraOrNvr = computed(() => {
    const prod = this.product();
    if (!prod) return false;
    const cat = (prod.category_slug || prod.category || '').toLowerCase();
    return cat.includes('camera') || cat.includes('cctv') || cat.includes('nvr') || cat.includes('video');
  });

  committeeShareUrl = computed(() => {
    const prod = this.product();
    if (!prod) return '';
    let currentUrl = `${this.siteData.contact.website}/products/${prod.category_slug}/${prod.slug}`;
    if (isPlatformBrowser(this.platformId) && this.document.location?.href) {
      currentUrl = this.document.location.href;
    }
    const text = [
      `*PROPOSAL / HARDWARE SPECIFICATION FOR COMMITTEE REVIEW*`,
      `📦 *Model:* ${prod.name}`,
      `🏷️ *Brand:* ${prod.brand} | SKU: ${prod.model_number || 'N/A'}`,
      `📋 *Technical Specs:* ${currentUrl}`,
      `🏢 *Integrator:* Sunrise Communication (Thane & Mumbai MMR)`
    ].join('\n');
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  });

  copyProductLink(): void {
    const prod = this.product();
    if (!prod) return;
    let currentUrl = `${this.siteData.contact.website}/products/${prod.category_slug}/${prod.slug}`;
    if (isPlatformBrowser(this.platformId) && this.document.location?.href) {
      currentUrl = this.document.location.href;
    }
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        this.isCopied.set(true);
        setTimeout(() => this.isCopied.set(false), 2500);
      });
    } else {
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2500);
    }
  }

  onWhatsappClick(): void {
    const prod = this.product();
    if (!prod) return;
    this.inquiryService.submitInquiry({
      inquiry_type: 'product',
      name: 'Website Visitor (Product Detail WhatsApp Inquiry)',
      phone: this.siteData.contact.primaryPhone,
      locality: 'Thane / Mumbai MMR',
      project_type: `${prod.brand} ${prod.name} [${prod.model_number || 'N/A'}]`,
      systems_required: [prod.category],
      message: `Product detail inquiry for ${prod.brand} ${prod.name} (${prod.model_number || ''})`,
    });
  }

  constructor() {
    effect(() => {
      const prod = this.product();
      if (prod) {
        let pageUrl = `${this.siteData.contact.website}/products/${prod.category_slug}/${prod.slug}`;
        if (isPlatformBrowser(this.platformId) && this.document.location?.href) {
          pageUrl = this.document.location.href;
        }
        this.seoService.updateForProduct(prod, pageUrl);
      }
    });
  }

  ngOnInit(): void {
    this.productService.loadProducts();

    this.route.params.subscribe((params) => {
      const slugParam = params['slug'];
      if (slugParam) {
        this.slug.set(slugParam);
      }
    });
  }

  getCategoryIcon(categorySlug?: string): string {
    const s = (categorySlug || '').toLowerCase();
    if (s.includes('camera') || s.includes('cctv') || s.includes('analog') || s.includes('ptz')) {
      return 'fa fa-video-camera';
    }
    if (s.includes('nvr') || s.includes('recorder') || s.includes('dvr')) {
      return 'fa fa-server';
    }
    if (s.includes('epabx') || s.includes('intercom') || s.includes('phone') || s.includes('telecom')) {
      return 'fa fa-phone';
    }
    if (s.includes('biometric') || s.includes('access') || s.includes('security') || s.includes('lock')) {
      return 'fa fa-id-card-o';
    }
    if (s.includes('cable') || s.includes('network') || s.includes('wire')) {
      return 'fa fa-sitemap';
    }
    return 'fa fa-cubes';
  }
}
