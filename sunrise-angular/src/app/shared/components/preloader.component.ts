import { Component, PLATFORM_ID, inject, signal, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  template: `
    @if (showPreloader()) {
      <div class="preloader" [class.fade-out]="isFadingOut()">
        <span></span>
      </div>
    }
  `,
  styles: [`
    .preloader.fade-out {
      opacity: 0;
      transition: opacity 0.5s ease;
      visibility: hidden;
    }
  `]
})
export class PreloaderComponent {
  private platformId = inject(PLATFORM_ID);
  
  showPreloader = signal<boolean>(true);
  isFadingOut = signal<boolean>(false);

  constructor() {
    // Only run fade-out logic in the browser, not during SSR
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        // Delay slightly (200ms) to ensure smooth transition after initial render
        setTimeout(() => {
          this.isFadingOut.set(true);
          // Remove from DOM entirely after 500ms fade transition
          setTimeout(() => {
            this.showPreloader.set(false);
          }, 500);
        }, 200);
      });
    }
  }
}
