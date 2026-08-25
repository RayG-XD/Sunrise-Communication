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
    path: 'tools/cctv-storage-calculator',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'locations/cctv-installation-thane-west',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'locations/society-intercom-wagle-estate',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'locations/security-systems-navi-mumbai',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'guides',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'guides/housing-society-cctv-installation-guide',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'guides/society-intercom-copper-vs-ip-pbx-guide',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'guides/cctv-amc-checklist-for-societies',
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
    path: 'locations/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'guides/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
