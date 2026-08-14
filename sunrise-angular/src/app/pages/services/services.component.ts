import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageTitleComponent } from '../../shared/components/page-title.component';
import { RequirementEstimatorComponent } from '../../shared/components/requirement-estimator/requirement-estimator.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, PageTitleComponent, RequirementEstimatorComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServicesComponent {
  activeFaq = 1;

  toggleFaq(id: number) {
    this.activeFaq = this.activeFaq === id ? 0 : id;
  }
}
