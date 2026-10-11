import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RequirementEstimatorComponent } from '../../shared/components/requirement-estimator/requirement-estimator.component';
import { QuickCallbackComponent } from '../../shared/components/quick-callback/quick-callback.component';
import { SITE_DATA } from '../../core/constants/site-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RequirementEstimatorComponent, QuickCallbackComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  siteData = SITE_DATA;
}
