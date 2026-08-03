import { Component, signal, OnInit, OnDestroy, inject, PLATFORM_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageTitleComponent } from '../../shared/components/page-title.component';
import { SITE_DATA } from '../../core/constants/site-data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, PageTitleComponent],
  templateUrl: './about.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutComponent implements OnInit, OnDestroy {
  siteData = SITE_DATA;

  // Signal for active slide index (0, 1, 2)
  activeIndex = signal<number>(0);

  // Slides data
  slides = [
    {
      image: 'assets/images/resource/network-4.jpg',
      title: 'Biometric Access & Security Solutions',
      description: 'Advanced fingerprint & RFID access control systems for corporate premises.'
    },
    {
      image: 'assets/images/resource/network-5.jpg',
      title: 'EPABX & Intercom Communication Systems',
      description: 'Enterprise IP desk phones and multi-line PBX office intercom networks.'
    },
    {
      image: 'assets/images/resource/network-3.png',
      title: 'Advanced CCTV & NVR Surveillance',
      description: 'High-definition dome CCTV cameras with 24/7 night-vision monitoring.'
    }
  ];

  private intervalId: any;
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoplay();
    }
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.stopAutoplay();
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3500);
  }

  stopAutoplay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  setActiveSlide(index: number) {
    this.activeIndex.set(index);
    this.startAutoplay();
  }

  nextSlide() {
    this.activeIndex.update(current => (current + 1) % this.slides.length);
  }

  prevSlide() {
    this.activeIndex.update(current => (current - 1 + this.slides.length) % this.slides.length);
  }
}
