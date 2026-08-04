import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
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
