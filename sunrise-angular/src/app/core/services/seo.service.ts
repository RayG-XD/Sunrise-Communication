import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DEFAULT_SEO_DATA, PAGE_SEO_DATA, STRUCTURED_DATA_BASE } from '../constants/seo-data';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private jsonLdScript?: HTMLScriptElement;

  initGlobalSeo() {
    this.updateMeta(DEFAULT_SEO_DATA.title, DEFAULT_SEO_DATA.description, DEFAULT_SEO_DATA.keywords);
    this.injectJsonLd(STRUCTURED_DATA_BASE);
  }

  updateForRoute(route: string) {
    const pageData = PAGE_SEO_DATA[route];
    if (pageData) {
      this.updateMeta(
        pageData.title || DEFAULT_SEO_DATA.title,
        pageData.description || DEFAULT_SEO_DATA.description,
        pageData.keywords || DEFAULT_SEO_DATA.keywords
      );
    } else if (!route.startsWith('/products/')) {
      this.updateMeta(DEFAULT_SEO_DATA.title, DEFAULT_SEO_DATA.description, DEFAULT_SEO_DATA.keywords);
    }
  }

  updateForProduct(product: Product, pageUrl: string): void {
    const title = `${product.name} | ${product.brand} - Sunrise Communication`;
    const description = product.short_description;
    const keywords = `${product.name}, ${product.brand}, ${product.category}, ${product.sub_category}, Sunrise Communication, Thane`;

    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });

    // Open Graph Tags
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: pageUrl });
    this.metaService.updateTag({ property: 'og:type', content: 'product' });
    if (product.image_url) {
      this.metaService.updateTag({ property: 'og:image', content: product.image_url });
    }

    // Twitter Tags
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    if (product.image_url) {
      this.metaService.updateTag({ name: 'twitter:image', content: product.image_url });
    }

    // Product structured data (JSON-LD)
    this.injectJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.image_url || undefined,
      description: product.short_description,
      brand: { '@type': 'Brand', name: product.brand },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Sunrise Communication' }
      }
    });
  }

  private updateMeta(title: string, description: string, keywords: string) {
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });

    // Open Graph Tags
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });

    // Twitter Tags
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
  }

  private injectJsonLd(data: any) {
    if (!this.jsonLdScript) {
      this.jsonLdScript = this.document.createElement('script');
      this.jsonLdScript.type = 'application/ld+json';
      this.document.head.appendChild(this.jsonLdScript);
    }
    this.jsonLdScript.textContent = JSON.stringify(data);
  }
}
