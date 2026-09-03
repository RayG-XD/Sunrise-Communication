import { Component, OnInit, inject, signal, computed, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser, DOCUMENT, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { SERVICE_CLUSTERS_DATA, ServiceClusterData } from '../../../core/constants/services-data';
import { RequirementEstimatorComponent } from '../../../shared/components/requirement-estimator/requirement-estimator.component';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-service-cluster',
  standalone: true,
  imports: [CommonModule, RouterLink, RequirementEstimatorComponent],
  templateUrl: './service-cluster.component.html',
  styleUrl: './service-cluster.component.scss'
})
export class ServiceClusterComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seoService = inject(SeoService);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  slug = signal<string>('cctv-surveillance-systems');
  activeFaqIndex = signal<number | null>(0);
  siteData = SITE_DATA;

  clusterData = computed<ServiceClusterData | undefined>(() => {
    return SERVICE_CLUSTERS_DATA[this.slug()];
  });

  // Dynamic WhatsApp consultation URL
  whatsappConsultUrl = computed(() => {
    const data = this.clusterData();
    if (!data) return '';
    const phone = this.siteData.social.whatsapp.replace('https://wa.me/', '');
    const msg = `Hi Sunrise Communication, I would like to schedule a technical site survey & get a quote for ${data.name} in Thane / Mumbai MMR.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  });

  constructor() {
    effect(() => {
      const data = this.clusterData();
      if (data) {
        let pageUrl = `${this.siteData.contact.website}/services/${data.slug}`;
        if (isPlatformBrowser(this.platformId) && this.document.location?.href) {
          pageUrl = this.document.location.href;
        }
        this.seoService.updateForServiceCluster(data, pageUrl);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slugParam = params['slug'];
      if (slugParam && SERVICE_CLUSTERS_DATA[slugParam]) {
        this.slug.set(slugParam);
      } else {
        // Check url path directly if routed via direct static routes
        const urlSegments = this.router.url.split('/');
        const lastSegment = urlSegments[urlSegments.length - 1].split('?')[0];
        if (SERVICE_CLUSTERS_DATA[lastSegment]) {
          this.slug.set(lastSegment);
        }
      }
    });
  }

  toggleFaq(index: number) {
    if (this.activeFaqIndex() === index) {
      this.activeFaqIndex.set(null);
    } else {
      this.activeFaqIndex.set(index);
    }
  }
}
