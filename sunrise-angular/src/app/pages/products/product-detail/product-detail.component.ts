import { Component, OnInit, inject, signal, computed, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { SeoService } from '../../../core/services/seo.service';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  protected productService = inject(ProductService);
  private seoService = inject(SeoService);
  private route = inject(ActivatedRoute);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  slug = signal<string>('');

  product = computed(() => {
    const s = this.slug();
    if (!s) return undefined;
    return this.productService.products().find(p => p.slug === s);
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
    switch (categorySlug) {
      case 'network-camera':
      case 'cctv':
      case 'analog-hd':
      case 'ptz':
        return 'flaticon-camera';
      case 'epabx':
        return 'flaticon-call';
      case 'biometrics':
        return 'flaticon-security';
      default:
        return 'flaticon-technology';
    }
  }
}
