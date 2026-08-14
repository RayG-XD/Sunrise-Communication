import { Component, signal, inject, HostListener, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-floating-quick-action-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-quick-action-bar.component.html',
  styleUrl: './floating-quick-action-bar.component.scss'
})
export class FloatingQuickActionBarComponent {
  private platformId = inject(PLATFORM_ID);
  siteData = SITE_DATA;
  isVisible = signal<boolean>(true);

  whatsappGeneralUrl = `https://wa.me/919323848622?text=${encodeURIComponent('Hi Sunrise Communication, I would like to get a quote and schedule a site survey for CCTV / Intercom / Security systems.')}`;
  callUrl = `tel:${SITE_DATA.contact.primaryPhone}`;
}
