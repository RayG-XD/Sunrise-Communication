import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-title" [style.background-image]="'url(' + bgImage() + ')'">
      <div class="auto-container">
        <h1>{{ title() }}</h1>
        <ul class="bread-crumb clearfix">
          <li><a routerLink="/">Home</a></li>
          <li>{{ breadcrumb() }}</li>
        </ul>
      </div>
    </section>
  `
})
export class PageTitleComponent {
  title = input.required<string>();
  breadcrumb = input.required<string>();
  bgImage = input<string>('assets/images/background/7.jpg');
}
