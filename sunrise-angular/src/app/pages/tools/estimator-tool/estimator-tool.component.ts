import { Component, OnInit, inject, signal, PLATFORM_ID, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';
import { RequirementEstimatorComponent } from '../../../shared/components/requirement-estimator/requirement-estimator.component';
import { PageTitleComponent } from '../../../shared/components/page-title.component';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-estimator-tool',
  standalone: true,
  imports: [CommonModule, RouterLink, RequirementEstimatorComponent, PageTitleComponent],
  templateUrl: './estimator-tool.component.html',
  styleUrl: './estimator-tool.component.scss'
})
export class EstimatorToolComponent implements OnInit {
  private seoService = inject(SeoService);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  siteData = SITE_DATA;
  activeFaqIndex = signal<number | null>(0);

  faqs = [
    {
      question: 'How accurate is this requirement and BOQ estimator?',
      answer: 'This estimator uses real-world engineering standards based on 25+ years of installations in Thane and Mumbai MMR. It calculates exact camera counts, NVR channels, surveillance-grade hard drive storage, EPABX intercom lines, and network drops. Final quotations are finalized following our physical on-site audit to measure exact cable run lengths and structure paths.'
    },
    {
      question: 'Can this estimate be used for Housing Society AGM / Committee approvals?',
      answer: 'Yes! You can generate and download a structured Technical Bill of Quantities (BOQ) PDF directly from this tool. Housing society secretaries and facility managers frequently use our itemized estimates for managing committee review and society tender discussions.'
    },
    {
      question: 'Do you provide on-site survey verification after using the estimator?',
      answer: 'Yes. Once you calculate your requirements, our senior field engineers in Charai, Thane West can conduct a physical on-site survey to inspect existing conduit pathways, riser shafts, and power distribution.'
    },
    {
      question: 'Are AMC options included in the estimated package?',
      answer: 'Yes. You can toggle Annual Maintenance Contract (AMC) coverage in the estimator to include quarterly preventive checkups, on-call breakdown support, and routine maintenance for both CCTV and intercom networks.'
    }
  ];

  constructor() {
    effect(() => {
      let pageUrl = `${this.siteData.contact.website}/tools/security-system-estimator`;
      if (isPlatformBrowser(this.platformId) && this.document.location?.href) {
        pageUrl = this.document.location.href;
      }
      this.seoService.updateForRequirementEstimator(pageUrl);
    });
  }

  ngOnInit(): void {}

  toggleFaq(index: number): void {
    if (this.activeFaqIndex() === index) {
      this.activeFaqIndex.set(null);
    } else {
      this.activeFaqIndex.set(index);
    }
  }
}
