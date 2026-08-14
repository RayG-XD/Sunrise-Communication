import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'products',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services/cctv-surveillance-systems',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services/epabx-intercom-solutions',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services/biometric-access-control',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'services/structured-networking-cabling',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'products/:category/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'services/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
