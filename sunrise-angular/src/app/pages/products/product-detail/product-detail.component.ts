import { Component, OnInit, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { SeoService } from '../../../core/services/seo.service';
import { Product } from '../../../core/models/product.model';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private productService = inject(ProductService);
  private seoService = inject(SeoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  product = signal<Product | undefined>(undefined);
  loading = signal<boolean>(true);
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

    const message = `Hi Sunrise Communication, I'm interested in the ${prod.name}. Can I get more details? Link: ${currentUrl}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  });

  ngOnInit(): void {
    this.productService.loadProducts();

    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        // Find product
        const found = this.productService.getProductBySlug(slug)();
        this.product.set(found);
        this.loading.set(false);

        if (found) {
          let pageUrl = `${this.siteData.contact.website}/products/${found.category_slug}/${found.slug}`;
          if (isPlatformBrowser(this.platformId) && this.document.location?.href) {
            pageUrl = this.document.location.href;
          }
          this.seoService.updateForProduct(found, pageUrl);
        }
      }
    });
  }

  getCategoryIcon(categorySlug?: string): string {
    switch (categorySlug) {
      case 'cctv':
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
