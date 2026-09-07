import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_DATA } from '../../../core/constants/site-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  // Bolt Optimization: OnPush change detection avoids unnecessary component re-evaluations for static presentation.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  currentYear = 2026;
  siteData = SITE_DATA;
}
