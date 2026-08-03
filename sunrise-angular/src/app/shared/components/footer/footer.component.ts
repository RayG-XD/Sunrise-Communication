import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  currentYear = 2026;
  siteData = SITE_DATA;
}
