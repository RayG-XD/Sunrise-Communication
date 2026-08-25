import {
  Component,
  PLATFORM_ID,
  inject,
  signal,
  afterNextRender,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  template: `
    <button
      type="button"
      class="scroll-to-top scroll-to-target"
      [style.display]="isVisible() ? 'block' : 'none'"
      (click)="scrollToTop()"
      aria-label="Scroll to top of page"
      title="Scroll to top of page"
    >
      <span class="fa fa-arrow-up" aria-hidden="true"></span>
    </button>
  `,
})
export class ScrollToTopComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private scrollSub?: Subscription;

  isVisible = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        // Run outside Angular to avoid triggering change detection on every scroll event
        this.ngZone.runOutsideAngular(() => {
          this.scrollSub = fromEvent(window, 'scroll').subscribe(() => {
            const shouldShow = window.scrollY > 300; // Original script.js usually uses 300 or 500

            // Only trigger change detection if the visibility state actually changes
            if (shouldShow !== this.isVisible()) {
              this.ngZone.run(() => {
                this.isVisible.set(shouldShow);
              });
            }
          });
        });
      });
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  ngOnDestroy() {
    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }
  }
}
