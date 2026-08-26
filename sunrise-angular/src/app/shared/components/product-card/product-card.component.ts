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

  /**
   * Helper to return flaticon / icofont class based on category
   */
  getCategoryIcon(categorySlug: string): string {
    switch (categorySlug) {
      case 'cctv':
        return 'flaticon-camera';
      case 'epabx':
        return 'flaticon-call';
      case 'biometrics':
        return 'flaticon-security';
      default:
        return 'flaticon-technology';
    }
  }
}
