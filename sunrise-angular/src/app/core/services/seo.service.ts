import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DEFAULT_SEO_DATA, PAGE_SEO_DATA } from '../constants/seo-data';
import { SITE_DATA } from '../constants/site-data';
import { Product } from '../models/product.model';
import { ServiceClusterData } from '../constants/services-data';
import { LocalLandingData } from '../constants/locations-data';
import { TechnicalGuideItem } from '../constants/guides-data';

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
      this.injectGlobalKnowledgeGraph(route);
    } else if (!route.startsWith('/products/') && !route.startsWith('/services/')) {
      this.updateMeta(
        DEFAULT_SEO_DATA.title,
        DEFAULT_SEO_DATA.description,
        DEFAULT_SEO_DATA.keywords,
        canonicalUrl
      );
      this.injectGlobalKnowledgeGraph(route);
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

  /**
   * Generates integrated @graph Schema for CCTV Storage & HDD Calculator Tool
   * (Combines LocalBusiness + WebApplication + FAQPage + HowTo + BreadcrumbList)
   */
  updateForCctvCalculator(pageUrl: string): void {
    const title = 'CCTV Storage & Hard Drive (HDD) Calculator | Sunrise Communication';
    const description = 'Calculate exact CCTV storage requirements in TB for CP Plus, Hikvision, and Dahua systems with H.265+ compression. Sizing tool for housing societies & commercial offices in Thane and Mumbai.';
    const keywords = 'CCTV Storage Calculator, CCTV HDD Calculator, CCTV Hard Disk Sizing, 16 Camera CCTV Storage, H.265+ Storage Calculation, WD Purple Sizing Thane';

    this.updateMeta(title, description, keywords, pageUrl, 'website');

    const localBusinessNode = this.getBaseLocalBusinessNode();

    // WebApplication Schema Node
    const webAppNode = {
      '@type': 'WebApplication',
      '@id': `${pageUrl}#app`,
      name: 'CCTV Storage & Hard Drive Sizing Calculator',
      url: pageUrl,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All Web Browsers',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR'
      },
      creator: {
        '@id': `${SITE_DATA.contact.website}/#localbusiness`
      },
      description: 'Free technical calculator for sizing surveillance hard drives (HDD) in Terabytes (TB) and NVR channels based on camera count, resolution, compression codecs (H.265+), and retention days.'
    };

    // FAQPage Schema Node for Calculator
    const faqNode = {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much HDD storage is needed for 8 CCTV cameras for 30 days?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For 8 IP cameras running at 4MP (2K resolution) with smart H.265+ compression at 15fps recording 24/7, you need approximately 4 TB of surveillance-grade storage (e.g. WD Purple or Seagate SkyHawk). On older H.264 codecs, the same setup would require 8 TB to 10 TB.'
          }
        },
        {
          '@type': 'Question',
          name: 'Why should I use surveillance hard drives (WD Purple / Seagate SkyHawk) instead of regular desktop drives?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Surveillance HDDs are engineered for 24/7 continuous write cycles with AllFrame / ImagePerfect firmware that prevents frame dropping and withstands extreme heat and vibration inside NVR/DVR enclosures. Desktop drives are built for 8 hours/day read-heavy usage and fail prematurely in CCTV systems.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does H.265+ compression reduce CCTV storage requirements?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'H.265+ (Ultra H.265 / Smart Codec) uses predictive frame encoding, background modeling, and intelligent noise reduction to transmit only changing pixels (like moving people or vehicles). This reduces bitrate and storage by 50% to 75% compared to standard H.264 without loss of evidentiary video clarity.'
          }
        },
        {
          '@type': 'Question',
          name: 'How many days of CCTV recording does a Housing Society require by law in Maharashtra?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Housing societies in Mumbai, Thane, and Maharashtra are strongly advised by local police authorities to maintain a minimum of 15 to 30 days of continuous recording backup across main entry gates, lobbies, lifts, and perimeter compounds.'
          }
        }
      ]
    };

    // HowTo Schema Node
    const howToNode = {
      '@type': 'HowTo',
      '@id': `${pageUrl}#howto`,
      name: 'How to Calculate CCTV Storage and Hard Drive Requirements',
      description: 'Step-by-step method to compute the required hard disk storage for residential and commercial CCTV surveillance networks.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select Total Camera Count',
          text: 'Count all perimeter, lobby, lift, and parking cameras planned for your premise.'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose Resolution and Video Codec',
          text: 'Select your camera resolution (1080p, 4MP 2K, or 8MP 4K) and ensure H.265+ compression is enabled on your NVR.'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Set Desired Retention Days',
          text: 'Specify how many days of recorded history you need to preserve (standard is 30 days for societies).'
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Select Surveillance HDD Configuration',
          text: 'Match the computed Terabytes to standard surveillance drives (WD Purple 2TB, 4TB, 6TB, 8TB, or multi-drive combinations).'
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
          name: 'Tools & Utilities',
          item: `${SITE_DATA.contact.website}/tools`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'CCTV Storage Calculator',
          item: pageUrl
        }
      ]
    };

    this.injectGraph([localBusinessNode, webAppNode, faqNode, howToNode, breadcrumbNode]);
  }

  /**
   * Generates integrated @graph Schema for Local Landing / Geo Silo Pages
   * (Combines LocalBusiness + Service + FAQPage + BreadcrumbList)
   */
  updateForLocalLanding(location: LocalLandingData, pageUrl: string): void {
    this.updateMeta(
      location.metaTitle,
      location.metaDescription,
      location.metaKeywords,
      pageUrl
    );

    const localBusinessNode = this.getBaseLocalBusinessNode();

    // Localized Service Node
    const serviceNode = {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: location.heroTitle,
      description: location.overviewText,
      provider: {
        '@id': `${SITE_DATA.contact.website}/#localbusiness`
      },
      serviceType: 'Security & Telecommunication Systems Installation',
      areaServed: location.localMicroMarkets.map(m => ({
        '@type': 'Place',
        name: `${m}, ${location.regionName}`
      })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${location.regionName} Security Services`,
        itemListElement: location.featuredServices.map(s => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.description
          }
        }))
      }
    };

    // FAQPage Node
    const faqNode = {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: location.localFaqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
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
          name: 'Service Areas',
          item: `${SITE_DATA.contact.website}/services`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: location.regionName,
          item: pageUrl
        }
      ]
    };

    this.injectGraph([localBusinessNode, serviceNode, faqNode, breadcrumbNode]);
  }

  /**
   * Generates integrated @graph Schema for Technical Knowledge Base / Guide Articles
   * (Combines LocalBusiness + Article + FAQPage + BreadcrumbList)
   */
  updateForTechnicalGuide(guide: TechnicalGuideItem, pageUrl: string): void {
    this.updateMeta(
      guide.metaTitle,
      guide.metaDescription,
      guide.metaKeywords,
      pageUrl,
      'article',
      `${SITE_DATA.contact.website}/assets/images/background/10.jpg`
    );

    const localBusinessNode = this.getBaseLocalBusinessNode();

    // Article Node
    const articleNode = {
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: guide.title,
      description: guide.summary,
      datePublished: guide.publishedDate,
      dateModified: '2026-08-25',
      author: {
        '@type': 'Person',
        name: 'Tanaji Dada Pol',
        jobTitle: 'Founder & Senior Security Engineer',
        worksFor: {
          '@id': `${SITE_DATA.contact.website}/#localbusiness`
        }
      },
      publisher: {
        '@id': `${SITE_DATA.contact.website}/#localbusiness`
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl
      }
    };

    // FAQPage Node
    const faqNode = {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: guide.faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
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
          name: 'Technical Guides',
          item: `${SITE_DATA.contact.website}/guides`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: guide.title,
          item: pageUrl
        }
      ]
    };

    this.injectGraph([localBusinessNode, articleNode, faqNode, breadcrumbNode]);
  }

  private getBaseLocalBusinessNode(): any {
    return {
      '@type': ['LocalBusiness', 'SecuritySystemInstallationService'],
      '@id': `${SITE_DATA.contact.website}/#localbusiness`,
      name: SITE_DATA.companyName,
      legalName: SITE_DATA.legalName,
      founder: {
        '@type': 'Person',
        name: 'Tanaji Dada Pol'
      },
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
        streetAddress: 'Room No. 10, Amar Building, Near Jyoti Book Center, Charai',
        addressLocality: 'Thane (West)',
        addressRegion: 'Maharashtra',
        postalCode: '400601',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 19.1868,
        longitude: 72.9757
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

  private injectGlobalKnowledgeGraph(route?: string): void {
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

    const nodes: any[] = [localBusinessNode, websiteNode];

    if (route && route !== '/') {
      const routeLabels: Record<string, string> = {
        '/about': 'About Us',
        '/products': 'Products',
        '/services': 'Services',
        '/contact': 'Contact Us'
      };
      const label = routeLabels[route] || route.replace('/', '');
      nodes.push({
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
            name: label,
            item: `${SITE_DATA.contact.website}${route}`
          }
        ]
      });
    }

    this.injectGraph(nodes);
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

    const effectiveOgImage = ogImage || `${SITE_DATA.contact.website}/assets/images/logo.png`;

    // Open Graph Tags
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: ogType });
    this.metaService.updateTag({ property: 'og:image', content: effectiveOgImage });
    if (canonicalUrl) {
      this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
      this.setCanonicalUrl(canonicalUrl);
    }

    // Twitter Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: effectiveOgImage });
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
