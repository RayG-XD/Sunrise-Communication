import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  // Bolt Optimization: OnPush change detection avoids unnecessary component re-evaluations
  // when parent lists (e.g. product catalog filtering/search) trigger change detection.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();

  // Performance Optimization: Default priority to false so grid/catalog card images are lazy-loaded
  // instead of eagerly preloading off-screen assets and blocking network resources on initial render.
  priority = input<boolean>(false);

  /**
   * Helper to return flaticon / icofont class based on category
   */
  getCategoryIcon(categorySlug: string): string {
    const s = (categorySlug || '').toLowerCase();
    if (s.includes('camera') || s.includes('cctv') || s.includes('analog') || s.includes('ptz')) {
      return 'fa fa-video-camera';
    }
    if (s.includes('nvr') || s.includes('recorder') || s.includes('dvr')) {
      return 'fa fa-server';
    }
    if (
      s.includes('epabx') ||
      s.includes('intercom') ||
      s.includes('phone') ||
      s.includes('telecom')
    ) {
      return 'fa fa-phone';
    }
    if (
      s.includes('biometric') ||
      s.includes('access') ||
      s.includes('security') ||
      s.includes('lock')
    ) {
      return 'fa fa-id-card-o';
    }
    if (s.includes('cable') || s.includes('network') || s.includes('wire')) {
      return 'fa fa-sitemap';
    }
    return 'fa fa-cubes';
  }
}
