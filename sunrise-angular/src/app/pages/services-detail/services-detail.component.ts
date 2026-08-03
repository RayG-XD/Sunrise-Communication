import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageTitleComponent } from '../../shared/components/page-title.component';
import { SITE_DATA } from '../../core/constants/site-data';

@Component({
  selector: 'app-services-detail',
  standalone: true,
  imports: [RouterLink, PageTitleComponent],
  templateUrl: './services-detail.component.html'
})
export class ServicesDetailComponent {
  siteData = SITE_DATA;
  activeFaq = 1;

  toggleFaq(id: number) {
    this.activeFaq = this.activeFaq === id ? 0 : id;
  }
}
