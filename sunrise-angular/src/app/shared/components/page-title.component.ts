import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-title">
      <div class="tech-pattern-grid" aria-hidden="true"></div>
      <div class="tech-glow-accent" aria-hidden="true"></div>
      <div class="auto-container">
        <div class="page-title-inner">
          <div class="title-meta-badge">
            <span class="badge-dot"></span>
            <span>Enterprise Security & Telecom Solutions</span>
          </div>
          <h1>{{ title() }}</h1>
          <nav aria-label="breadcrumb">
            <ul class="bread-crumb clearfix">
              <li><a routerLink="/"><i class="fa fa-home"></i> Home</a></li>
              <li class="active">{{ breadcrumb() }}</li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-title {
      position: relative;
      background: linear-gradient(135deg, #010c3a 0%, #06154d 60%, #0a1f68 100%);
      padding: 64px 0 48px;
      overflow: hidden;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);

      .tech-pattern-grid {
        position: absolute;
        inset: 0;
        background-image: 
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        background-size: 32px 32px;
        opacity: 0.7;
        pointer-events: none;
      }

      .tech-glow-accent {
        position: absolute;
        left: -100px;
        top: -100px;
        width: 380px;
        height: 380px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(223, 3, 3, 0.28) 0%, rgba(223, 3, 3, 0) 70%);
        filter: blur(40px);
        pointer-events: none;
      }

      .auto-container {
        position: relative;
        z-index: 2;
      }

      .page-title-inner {
        max-width: 900px;
      }

      .title-meta-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.16);
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 11.5px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-bottom: 12px;
        backdrop-filter: blur(8px);

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff4757;
          box-shadow: 0 0 8px #ff4757;
        }
      }

      h1 {
        color: #ffffff;
        font-size: clamp(1.6rem, 3.2vw, 2.35rem);
        font-weight: 700;
        margin-bottom: 12px;
        line-height: 1.25;
        letter-spacing: -0.3px;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
      }

      .bread-crumb {
        display: inline-flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        margin: 0;
        padding: 6px 14px;
        list-style: none;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        backdrop-filter: blur(6px);

        li {
          color: rgba(255, 255, 255, 0.75);
          font-size: 13px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;

          a {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            transition: color 0.2s ease;

            &:hover {
              color: #ff4757;
            }
          }

          &.active {
            color: #ff6b81;
            font-weight: 600;
          }

          &:not(:last-child)::after {
            content: '›';
            color: rgba(255, 255, 255, 0.4);
            font-size: 14px;
            margin-left: 2px;
          }
        }
      }
    }
  `]
})
export class PageTitleComponent {
  title = input.required<string>();
  breadcrumb = input.required<string>();
  bgImage = input<string>('');
}
