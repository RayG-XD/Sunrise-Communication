import { Component, signal, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { register as registerSwiper } from 'swiper/element/bundle';
import * as AOS from 'aos';
import { PreloaderComponent } from './shared/components/preloader.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PreloaderComponent, ScrollToTopComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Sunrise Communication');
  
  private router = inject(Router);
  private seoService = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // Register Swiper custom elements
    if (isPlatformBrowser(this.platformId)) {
      registerSwiper();
    }
  }

  ngOnInit() {
    // Initialize structured data and default tags
    this.seoService.initGlobalSeo();

    // Listen to route changes and update SEO meta tags
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.seoService.updateForRoute(event.urlAfterRedirects);
      
      // Re-trigger AOS animations on route change
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => AOS.refresh(), 100);
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 50
      });
    }
  }
}
