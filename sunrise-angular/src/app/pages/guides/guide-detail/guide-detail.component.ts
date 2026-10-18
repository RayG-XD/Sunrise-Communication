import { Component, OnInit, signal, computed, inject, PLATFORM_ID, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TECHNICAL_GUIDES_DATA, TechnicalGuideItem } from '../../../core/constants/guides-data';
import { SeoService } from '../../../core/services/seo.service';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-guide-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './guide-detail.component.html',
  styleUrl: './guide-detail.component.scss'
})
export class GuideDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seoService = inject(SeoService);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  slug = signal<string>('housing-society-cctv-installation-guide');
  activeFaqIndex = signal<number | null>(0);
  siteData = SITE_DATA;

  guide = computed<TechnicalGuideItem | undefined>(() => {
    return TECHNICAL_GUIDES_DATA[this.slug()];
  });

  whatsappShareUrl = computed(() => {
    const g = this.guide();
    if (!g) return '';
    const phone = this.siteData.social.whatsapp.replace('https://wa.me/', '');
    const msg = `Hi Sunrise Communication, I read your guide on "${g.title}" and would like to consult with your technical engineer regarding our premise requirement.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  });

  isCopied = signal<boolean>(false);

  otherGuides = computed(() => {
    const currentSlug = this.slug();
    return Object.values(TECHNICAL_GUIDES_DATA).filter((item) => item.slug !== currentSlug);
  });

  committeeShareUrl = computed(() => {
    const g = this.guide();
    if (!g) return '';
    const pageUrl = `${this.siteData.contact.website}/guides/${g.slug}`;
    const text = `Important Technical Guide for Society Committee: "${g.title}" - Read here: ${pageUrl}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  });

  cleanHeading(heading: string): string {
    return heading.replace(/^\d+\.\s*/, '');
  }

  copyGuideLink(): void {
    if (isPlatformBrowser(this.platformId) && navigator.clipboard) {
      const g = this.guide();
      const url = g ? `${this.siteData.contact.website}/guides/${g.slug}` : window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        this.isCopied.set(true);
        setTimeout(() => this.isCopied.set(false), 2500);
      });
    }
  }

  constructor() {
    effect(() => {
      const g = this.guide();
      if (g) {
        let pageUrl = `${this.siteData.contact.website}/guides/${g.slug}`;
        if (isPlatformBrowser(this.platformId) && this.document.location?.href) {
          pageUrl = this.document.location.href;
        }
        this.seoService.updateForTechnicalGuide(g, pageUrl);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slugParam = params['slug'];
      if (slugParam && TECHNICAL_GUIDES_DATA[slugParam]) {
        this.slug.set(slugParam);
      } else {
        const urlSegments = this.router.url.split('/');
        const lastSegment = urlSegments[urlSegments.length - 1].split('?')[0];
        if (TECHNICAL_GUIDES_DATA[lastSegment]) {
          this.slug.set(lastSegment);
        }
      }
    });
  }

  toggleFaq(index: number): void {
    if (this.activeFaqIndex() === index) {
      this.activeFaqIndex.set(null);
    } else {
      this.activeFaqIndex.set(index);
    }
  }
}
