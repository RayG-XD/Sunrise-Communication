import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DEFAULT_SEO_DATA, PAGE_SEO_DATA } from '../constants/seo-data';
import { SITE_DATA } from '../constants/site-data';
import { Product } from '../models/product.model';
import { ServiceClusterData } from '../constants/services-data';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private jsonLdScript?: HTMLScriptElement;
  private canonicalLink?: HTMLLinkElement;

  initGlobalSeo() {
    this.updateMeta(
      DEFAULT_SEO_DATA.title,
      DEFAULT_SEO_DATA.description,
      DEFAULT_SEO_DATA.keywords,
      SITE_DATA.contact.website
    );
    this.injectGlobalKnowledgeGraph();
  }

  updateForRoute(route: string) {
    const pageData = PAGE_SEO_DATA[route];
    const canonicalUrl = `${SITE_DATA.contact.website}${route === '/' ? '' : route}`;
    
    if (pageData) {
      this.updateMeta(
        pageData.title || DEFAULT_SEO_DATA.title,
        pageData.description || DEFAULT_SEO_DATA.description,
        pageData.keywords || DEFAULT_SEO_DATA.keywords,
        canonicalUrl
      );
      this.injectGlobalKnowledgeGraph();
    } else if (!route.startsWith('/products/') && !route.startsWith('/services/')) {
      this.updateMeta(
        DEFAULT_SEO_DATA.title,
        DEFAULT_SEO_DATA.description,
        DEFAULT_SEO_DATA.keywords,
        canonicalUrl
      );
      this.injectGlobalKnowledgeGraph();
    }
  }

  /**
   * Generates integrated @graph Schema for High-Intent Service Cluster Pages
   * (Combines LocalBusiness + Service + FAQPage + BreadcrumbList)
   */
  updateForServiceCluster(cluster: ServiceClusterData, pageUrl: string): void {
    this.updateMeta(
      cluster.seo.title,
      cluster.seo.description,
      cluster.seo.keywords,
      pageUrl
    );

    const localBusinessNode = this.getBaseLocalBusinessNode();

    // Service Schema Node
    const serviceNode = {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: cluster.name,
      description: cluster.shortDescription,
      provider: {
        '@id': `${SITE_DATA.contact.website}/#localbusiness`
      },
      serviceType: cluster.name,
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Thane' },
        { '@type': 'AdministrativeArea', name: 'Mumbai' },
        { '@type': 'AdministrativeArea', name: 'Navi Mumbai' }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${cluster.name} Deliverables`,
        itemListElement: cluster.offerings.map((offering) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: offering.title,
            description: offering.description
          }
        }))
      }
    };

    // FAQPage Schema Node (AEO)
    const faqNode = {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: cluster.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };

    // HowTo Schema Node (AEO Step-by-Step Installation Lifecycle)
    const howToNode = {
      '@type': 'HowTo',
      '@id': `${pageUrl}#howto`,
      name: `How ${cluster.name} Installation & Commissioning Works`,
      description: `Complete 4-step professional turnkey deployment process for ${cluster.name} by Sunrise Communication.`,
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Technical Site Audit & BOQ Design',
          text: 'Our senior field engineers survey cable pathways, camera angles, power backup points, and design a customized Bill of Quantities.'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Concealed Cable Laying & Backbone Splicing',
          text: 'We lay heavy-duty certified Cat6 or multi-pair armoured copper cables using PVC conduits to prevent weathering and rodent damage.'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Hardware Mounting, Termination & Configuration',
          text: 'All IP cameras, NVRs, PBX server cards, and biometric terminals are mounted, patched into rack panels, and configured.'
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Testing, Mobile App Sync & Committee Handover',
          text: 'We conduct live streaming tests, sync mobile apps for society committee members, provide admin training, and issue warranty certificates.'
        }
      ]
    };

    // BreadcrumbList Node
    const breadcrumbNode = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_DATA.contact.website
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${SITE_DATA.contact.website}/services`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: cluster.name,
          item: pageUrl
        }
      ]
    };

    this.injectGraph([localBusinessNode, serviceNode, faqNode, howToNode, breadcrumbNode]);
  }

  /**
   * Generates integrated @graph Schema for Product Detail Pages
   */
  updateForProduct(product: Product, pageUrl: string): void {
    const title = `${product.name} | ${product.brand} - Sunrise Communication`;
    const description = product.short_description;
    const keywords = `${product.name}, ${product.brand}, ${product.category}, ${product.sub_category}, Sunrise Communication, Thane`;

    this.updateMeta(title, description, keywords, pageUrl, 'product', product.image_url);

    const localBusinessNode = this.getBaseLocalBusinessNode();

    // Product Schema Node
    const productNode = {
      '@type': 'Product',
      '@id': `${pageUrl}#product`,
      name: product.name,
      model: product.model_number || undefined,
      image: product.image_url || undefined,
      description: product.short_description,
      brand: { '@type': 'Brand', name: product.brand },
      category: product.category,
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        seller: {
          '@id': `${SITE_DATA.contact.website}/#localbusiness`
        }
      }
    };

    // BreadcrumbList Node
    const breadcrumbNode = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_DATA.contact.website
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: `${SITE_DATA.contact.website}/products`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product.category,
          item: `${SITE_DATA.contact.website}/products?category=${encodeURIComponent(product.category)}`
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: product.model_number || product.name,
          item: pageUrl
        }
      ]
    };

    this.injectGraph([localBusinessNode, productNode, breadcrumbNode]);
  }

  private getBaseLocalBusinessNode(): any {
    return {
      '@type': 'LocalBusiness',
      '@id': `${SITE_DATA.contact.website}/#localbusiness`,
      name: SITE_DATA.companyName,
      legalName: SITE_DATA.legalName,
      image: `${SITE_DATA.contact.website}/assets/images/logo.png`,
      telephone: SITE_DATA.contact.primaryPhone,
      email: SITE_DATA.contact.email,
      url: SITE_DATA.contact.website,
      hasMap: SITE_DATA.gbp.mapsUrl,
      foundingDate: '1999',
      priceRange: '₹₹',
      paymentAccepted: 'Cash, UPI, Cheque, Bank Transfer, NEFT/RTGS',
      currenciesAccepted: 'INR',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: SITE_DATA.contact.primaryPhone,
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi', 'Marathi'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59'
          }
        },
        {
          '@type': 'ContactPoint',
          telephone: SITE_DATA.contact.secondaryPhone,
          contactType: 'technical support',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi', 'Marathi']
        }
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '93',
        bestRating: '5',
        worstRating: '1'
      },
      knowsAbout: [
        'CCTV Surveillance Systems',
        'High-Definition IP Cameras',
        'ColorVu & Night Vision Cameras',
        'Network Video Recorders (NVR)',
        'EPABX & PBX Systems',
        'Housing Society Intercom Cabling',
        'Biometric Attendance Terminals',
        'AI Facial Recognition Access Control',
        'Electromagnetic (EM) Door Locks',
        'Structured Cat6/Cat6A LAN Cabling',
        'Server Rack Dressing & Keystone Termination',
        'Optical Fiber Splicing',
        'Surveillance & Intercom Annual Maintenance Contracts (AMC)'
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Room No.10, Amar Building, Near Jyoti Book Center, Charai',
        addressLocality: 'Thane (West)',
        addressRegion: 'Maharashtra',
        postalCode: '400601',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 19.1966,
        longitude: 72.9781
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        }
      ],
      areaServed: [
        { '@type': 'City', name: 'Thane' },
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'City', name: 'Navi Mumbai' },
        { '@type': 'Place', name: 'Charai, Thane West' },
        { '@type': 'Place', name: 'Naupada, Thane' },
        { '@type': 'Place', name: 'Ghodbunder Road, Thane' },
        { '@type': 'Place', name: 'Wagle Industrial Estate' },
        { '@type': 'Place', name: 'Mahape, Navi Mumbai' },
        { '@type': 'Place', name: 'Vashi, Navi Mumbai' },
        { '@type': 'Place', name: 'Bandra Kurla Complex (BKC), Mumbai' }
      ],
      sameAs: [
        SITE_DATA.gbp.mapsUrl,
        SITE_DATA.social.facebook,
        SITE_DATA.social.linkedin,
        SITE_DATA.social.instagram,
        SITE_DATA.social.twitter
      ]
    };
  }

  private injectGlobalKnowledgeGraph(): void {
    const localBusinessNode = this.getBaseLocalBusinessNode();
    const websiteNode = {
      '@type': 'WebSite',
      '@id': `${SITE_DATA.contact.website}/#website`,
      url: SITE_DATA.contact.website,
      name: SITE_DATA.companyName,
      publisher: {
        '@id': `${SITE_DATA.contact.website}/#localbusiness`
      }
    };
    this.injectGraph([localBusinessNode, websiteNode]);
  }

  private updateMeta(
    title: string,
    description: string,
    keywords: string,
    canonicalUrl?: string,
    ogType: string = 'website',
    ogImage?: string
  ) {
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });

    // Open Graph Tags
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: ogType });
    if (canonicalUrl) {
      this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
      this.setCanonicalUrl(canonicalUrl);
    }
    if (ogImage) {
      this.metaService.updateTag({ property: 'og:image', content: ogImage });
      this.metaService.updateTag({ name: 'twitter:image', content: ogImage });
    }

    // Twitter Tags
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
  }

  private setCanonicalUrl(url: string) {
    if (!this.canonicalLink) {
      const existing = this.document.querySelector('link[rel="canonical"]');
      if (existing) {
        this.canonicalLink = existing as HTMLLinkElement;
      } else {
        this.canonicalLink = this.document.createElement('link');
        this.canonicalLink.setAttribute('rel', 'canonical');
        this.document.head.appendChild(this.canonicalLink);
      }
    }
    this.canonicalLink.setAttribute('href', url);
  }

  private injectGraph(nodes: any[]) {
    const payload = {
      '@context': 'https://schema.org',
      '@graph': nodes
    };

    if (!this.jsonLdScript) {
      const existing = this.document.querySelector('script[type="application/ld+json"]');
      if (existing) {
        this.jsonLdScript = existing as HTMLScriptElement;
      } else {
        this.jsonLdScript = this.document.createElement('script');
        this.jsonLdScript.type = 'application/ld+json';
        this.document.head.appendChild(this.jsonLdScript);
      }
    }
    this.jsonLdScript.textContent = JSON.stringify(payload);
  }
}
