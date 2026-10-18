import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { InquiryService } from '../../../core/services/inquiry.service';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();
  private inquiryService = inject(InquiryService);
  siteData = SITE_DATA;

  getWhatsappUrl(): string {
    const prod = this.product();
    const phone = this.siteData.social.whatsapp.replace('https://wa.me/', '');
    const modelStr = prod.model_number ? ` [Model: ${prod.model_number}]` : '';
    const message = [
      `*Product Price & Installation Inquiry*`,
      ``,
      `Hello Sunrise Communication, I would like to inquire about pricing, stock availability, and installation for:`,
      `📦 *Product:* ${prod.brand} ${prod.name}${modelStr}`,
      `🏷️ *Category:* ${prod.category}${prod.sub_category ? ' > ' + prod.sub_category : ''}`,
      ``,
      `Please provide best quotation and site installation details.`
    ].join('\n');
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  onWhatsappClick(event: MouseEvent): void {
    event.stopPropagation();
    const prod = this.product();
    const modelStr = prod.model_number ? ` [Model: ${prod.model_number}]` : '';
    this.inquiryService.submitInquiry({
      inquiry_type: 'product',
      name: 'Website Visitor (Product Card WhatsApp Quote)',
      phone: this.siteData.contact.primaryPhone,
      locality: 'Thane / Mumbai MMR',
      project_type: `${prod.brand} ${prod.name}${modelStr}`,
      systems_required: [prod.category],
      message: `Direct WhatsApp inquiry for ${prod.brand} ${prod.name}${modelStr}`,
    });
  }

  /**
   * Returns top priority specification (e.g. Resolution, Channels, Capacity)
   */
  get primarySpec(): { key: string; value: string } | undefined {
    const specs = this.product().specs;
    if (!specs || specs.length === 0) return undefined;
    return specs.find(s => ['Resolution', 'Channels', 'Capacity', 'Lines / Capacity', 'User Capacity'].includes(s.key)) || specs[0];
  }

  /**
   * Helper to return icon class based on category
   */
  getCategoryIcon(categorySlug: string): string {
    const s = (categorySlug || '').toLowerCase();
    if (s.includes('camera') || s.includes('cctv') || s.includes('analog') || s.includes('ptz')) {
      return 'fa fa-video-camera';
    }
    if (s.includes('nvr') || s.includes('recorder') || s.includes('dvr')) {
      return 'fa fa-server';
    }
    if (s.includes('epabx') || s.includes('intercom') || s.includes('phone') || s.includes('telecom')) {
      return 'fa fa-phone';
    }
    if (s.includes('biometric') || s.includes('access') || s.includes('security') || s.includes('lock')) {
      return 'fa fa-id-card-o';
    }
    if (s.includes('cable') || s.includes('network') || s.includes('wire')) {
      return 'fa fa-sitemap';
    }
    return 'fa fa-cubes';
  }
}

