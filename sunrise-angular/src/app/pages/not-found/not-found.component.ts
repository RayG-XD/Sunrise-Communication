import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageTitleComponent } from '../../shared/components/page-title.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, PageTitleComponent],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {}
