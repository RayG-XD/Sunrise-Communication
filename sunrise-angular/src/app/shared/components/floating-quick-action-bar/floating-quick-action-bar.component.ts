import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-floating-quick-action-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-quick-action-bar.component.html',
  styleUrl: './floating-quick-action-bar.component.scss'
})
export class FloatingQuickActionBarComponent {
  private router = inject(Router);
  siteData = SITE_DATA;
  isVisible = signal<boolean>(true);
  currentUrl = signal<string>('');

  constructor() {
    this.currentUrl.set(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl.set(event.urlAfterRedirects || event.url);
    });
  }

  get whatsappUrl(): string {
    const url = this.currentUrl() || this.router.url || '';
    const phone = this.siteData.social.whatsapp.replace('https://wa.me/', '');
    let message = 'Hi Sunrise Communication, I would like to speak with a field engineer regarding security systems in Thane/Mumbai.';

    if (url.includes('security-system-amc-contracts')) {
      message = 'Hi Sunrise Communication, our Housing Society is inquiring about an Annual Maintenance Contract (AMC) for CCTV/Intercom systems.';
    } else if (url.includes('security-system-estimator')) {
      message = 'Hi Sunrise Communication, I used your Requirement Estimator and would like to discuss our estimated BOQ.';
    } else if (url.includes('cctv-storage-calculator')) {
      message = 'Hi Sunrise Communication, I used your CCTV Storage Calculator and would like to discuss surveillance storage & HDD sizing.';
    } else if (url.includes('ghodbunder-road')) {
      message = 'Hi Sunrise Communication, I am reaching out from a residential society on Ghodbunder Road regarding security systems.';
    } else if (url.includes('mulund')) {
      message = 'Hi Sunrise Communication, I am reaching out from Mulund regarding housing society intercom / CCTV rewiring.';
    } else if (url.includes('wagle-estate')) {
      message = 'Hi Sunrise Communication, I am inquiring from Wagle Estate regarding corporate/society intercom & security systems.';
    } else if (url.includes('navi-mumbai')) {
      message = 'Hi Sunrise Communication, I am reaching out from Navi Mumbai regarding CCTV / intercom systems.';
    } else if (url.includes('cctv-surveillance-systems')) {
      message = 'Hi Sunrise Communication, I would like to inquire about CCTV surveillance system installation and site survey.';
    } else if (url.includes('epabx-intercom-solutions')) {
      message = 'Hi Sunrise Communication, I would like to inquire about Housing Society Intercom & EPABX solutions.';
    } else if (url.includes('biometric-access-control')) {
      message = 'Hi Sunrise Communication, I would like to inquire about Biometric Attendance & Access Control systems.';
    } else if (url.includes('structured-networking-cabling')) {
      message = 'Hi Sunrise Communication, I would like to inquire about Structured Network and Telecom Cabling.';
    } else if (url.includes('housing-society-agm-approval-toolkit')) {
      message = 'Hi Sunrise Communication, our Managing Committee is preparing an AGM/SGM tender and would like a formal technical quotation.';
    } else if (url.includes('review')) {
      message = 'Hi Sunrise Communication, I would like to share customer feedback and connect with your technical support team.';
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  callUrl = `tel:${SITE_DATA.contact.primaryPhone}`;
}
