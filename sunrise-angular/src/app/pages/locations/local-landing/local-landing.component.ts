import { Component, OnInit, signal, computed, inject, PLATFORM_ID, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { LOCAL_LANDING_DATA, LocalLandingData } from '../../../core/constants/locations-data';
import { SITE_DATA } from '../../../core/constants/site-data';
import { SocietyAuditFormComponent } from '../../../shared/components/society-audit-form/society-audit-form.component';

@Component({
  selector: 'app-local-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, SocietyAuditFormComponent],
  templateUrl: './local-landing.component.html',
  styleUrl: './local-landing.component.scss'
})
export class LocalLandingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seoService = inject(SeoService);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  slug = signal<string>('cctv-installation-thane-west');
  activeFaqIndex = signal<number | null>(0);
  siteData = SITE_DATA;

  locationData = computed<LocalLandingData | undefined>(() => {
    return LOCAL_LANDING_DATA[this.slug()];
  });

  whatsappDirectUrl = computed(() => {
    const loc = this.locationData();
    if (!loc) return '';
    const phone = this.siteData.social.whatsapp.replace('https://wa.me/', '');
    const msg = `Hi Sunrise Communication, I would like to schedule a free on-site survey and quote for CCTV / Intercom / Security systems in ${loc.regionName}.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  });

  constructor() {
    effect(() => {
      const data = this.locationData();
      if (data) {
        let pageUrl = `${this.siteData.contact.website}/locations/${data.slug}`;
        if (isPlatformBrowser(this.platformId) && this.document.location?.href) {
          pageUrl = this.document.location.href;
        }
        this.seoService.updateForLocalLanding(data, pageUrl);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slugParam = params['slug'];
      if (slugParam && LOCAL_LANDING_DATA[slugParam]) {
        this.slug.set(slugParam);
      } else {
        const urlSegments = this.router.url.split('/');
        const lastSegment = urlSegments[urlSegments.length - 1].split('?')[0];
        if (LOCAL_LANDING_DATA[lastSegment]) {
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
