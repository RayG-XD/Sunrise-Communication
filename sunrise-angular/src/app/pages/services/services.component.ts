import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageTitleComponent } from '../../shared/components/page-title.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, PageTitleComponent],
  templateUrl: './services.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServicesComponent {
  // Accordion state
  activeFaq = 1;

  toggleFaq(id: number) {
    this.activeFaq = this.activeFaq === id ? 0 : id;
  }
}
