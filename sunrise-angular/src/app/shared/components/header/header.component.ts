import { Component, PLATFORM_ID, inject, signal, afterNextRender, NgZone, OnDestroy, effect } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { fromEvent, Subscription, filter } from 'rxjs';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private scrollSub?: Subscription;
  private routerSub?: Subscription;

  siteData = SITE_DATA;

  isSidebarOpen = signal<boolean>(false);
  isMobileMenuOpen = signal<boolean>(false);
  isServicesDropdownOpen = signal<boolean>(false);
  isSticky = signal<boolean>(false);

  constructor() {
    // Automatically close all drawers/dropdowns on route navigation
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeAllMenus();
      });

    // Add/remove mobile menu class on body when signal changes
    effect(() => {
      const isMobileMenuOpen = this.isMobileMenuOpen();
      if (isPlatformBrowser(this.platformId)) {
        if (isMobileMenuOpen) {
          this.document.body.classList.add('mobile-menu-visible');
        } else {
          this.document.body.classList.remove('mobile-menu-visible');
        }
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        // Handle Sticky Header on Scroll Outside Angular Zone
        this.ngZone.runOutsideAngular(() => {
          this.scrollSub = fromEvent(window, 'scroll').subscribe(() => {
            const shouldBeSticky = window.scrollY > 100; // Original script uses 100px threshold
            
            if (shouldBeSticky !== this.isSticky()) {
              this.ngZone.run(() => {
                this.isSticky.set(shouldBeSticky);
              });
            }
          });
        });
      });
    }
  }

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  toggleServicesDropdown(event: Event) {
    event.preventDefault();
    this.isServicesDropdownOpen.update(v => !v);
  }

  closeAllMenus() {
    this.isSidebarOpen.set(false);
    this.isMobileMenuOpen.set(false);
    this.isServicesDropdownOpen.set(false);
  }

  ngOnDestroy() {
    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    // Clean up body class if component is destroyed while menu is open
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.classList.remove('mobile-menu-visible');
    }
  }
}
