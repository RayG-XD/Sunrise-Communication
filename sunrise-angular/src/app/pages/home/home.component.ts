import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RequirementEstimatorComponent } from '../../shared/components/requirement-estimator/requirement-estimator.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RequirementEstimatorComponent],
  templateUrl: './home.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {}
