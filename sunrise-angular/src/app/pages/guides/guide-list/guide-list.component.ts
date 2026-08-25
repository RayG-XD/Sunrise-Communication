import { Component, signal, inject, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.seoService.updateForRoute('/guides');
  }
}
