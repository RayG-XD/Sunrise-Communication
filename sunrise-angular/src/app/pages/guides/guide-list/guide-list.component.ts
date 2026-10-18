import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TECHNICAL_GUIDES_DATA, TechnicalGuideItem } from '../../../core/constants/guides-data';
import { PageTitleComponent } from '../../../shared/components/page-title.component';
import { SeoService } from '../../../core/services/seo.service';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-guide-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PageTitleComponent],
  templateUrl: './guide-list.component.html',
  styleUrl: './guide-list.component.scss'
})
export class GuideListComponent implements OnInit {
  private seoService = inject(SeoService);
  siteData = SITE_DATA;

  guides = signal<TechnicalGuideItem[]>(Object.values(TECHNICAL_GUIDES_DATA));
  selectedCategory = signal<string>('All');

  categories = computed(() => {
    const all = this.guides();
    const uniqueCats = Array.from(new Set(all.map(g => g.category)));
    return ['All', ...uniqueCats];
  });

  filteredGuides = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.guides();
    return this.guides().filter(g => g.category === cat);
  });

  getCategoryCount(cat: string): number {
    if (cat === 'All') return this.guides().length;
    return this.guides().filter(g => g.category === cat).length;
  }

  getCategoryIcon(cat: string): string {
    switch (cat) {
      case 'CCTV Surveillance':
        return 'fa fa-video-camera';
      case 'Society Intercom':
        return 'fa fa-phone';
      case 'Maintenance & AMC':
        return 'fa fa-wrench';
      case 'Access Control':
        return 'fa fa-id-card-o';
      default:
        return 'fa fa-book';
    }
  }

  selectCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  ngOnInit(): void {
    this.seoService.updateForRoute('/guides');
  }
}
