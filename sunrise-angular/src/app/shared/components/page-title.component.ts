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
          <li><a routerLink="/"><i class="fa fa-home"></i> Home</a></li>
          <li>{{ breadcrumb() }}</li>
        </ul>
      </div>
    </section>
  `,
  styles: [`
    .page-title {
      position: relative;
      background-size: cover;
      background-position: center;
      padding: 60px 0 45px;
      overflow: hidden;

      &::before {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(1, 12, 58, 0.94) 0%, rgba(13, 27, 84, 0.88) 100%) !important;
        z-index: 1;
      }

      .auto-container {
        position: relative;
        z-index: 2;
      }

      h1 {
        color: #ffffff;
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 8px;
        line-height: 1.25;

        @media (max-width: 767px) {
          font-size: 22px;
        }
      }

      .bread-crumb {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        margin: 0;
        padding: 0;
        list-style: none;

        li {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13.5px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 8px;

          a {
            color: #ffffff;
            text-decoration: none;
            transition: color 0.2s ease;

            &:hover {
              color: #df0303;
            }
          }

          &:not(:last-child)::after {
            content: '/';
            color: rgba(255, 255, 255, 0.4);
            font-size: 12px;
          }
        }
      }
    }
  `]
})
export class PageTitleComponent {
  title = input.required<string>();
  breadcrumb = input.required<string>();
  bgImage = input<string>('assets/images/background/7.jpg');
}
