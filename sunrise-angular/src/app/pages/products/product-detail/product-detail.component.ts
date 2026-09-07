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
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  protected productService = inject(ProductService);
  private seoService = inject(SeoService);
  private route = inject(ActivatedRoute);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  slug = signal<string>('');

  // Performance Optimization: Use O(1) productsBySlugMap lookup instead of scanning array with find()
  product = computed(() => {
    const s = this.slug();
    if (!s) return undefined;
    return this.productService.productsBySlugMap().get(s);
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
    const s = (categorySlug || '').toLowerCase();
    if (s.includes('camera') || s.includes('cctv') || s.includes('analog') || s.includes('ptz')) {
      return 'fa fa-video-camera';
    }
    if (s.includes('nvr') || s.includes('recorder') || s.includes('dvr')) {
      return 'fa fa-server';
    }
    if (
      s.includes('epabx') ||
      s.includes('intercom') ||
      s.includes('phone') ||
      s.includes('telecom')
    ) {
      return 'fa fa-phone';
    }
    if (
      s.includes('biometric') ||
      s.includes('access') ||
      s.includes('security') ||
      s.includes('lock')
    ) {
      return 'fa fa-id-card-o';
    }
    if (s.includes('cable') || s.includes('network') || s.includes('wire')) {
      return 'fa fa-sitemap';
    }
    return 'fa fa-cubes';
  }
}
