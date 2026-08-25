import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Sunrise Communication | Security & Telecom Expert in Thane'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us | Sunrise Communication'
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.routes').then(m => m.PRODUCT_ROUTES)
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    title: 'Our Security & Telecommunication Services | Sunrise Communication'
  },
  {
    path: 'services/cctv-surveillance-systems',
    loadComponent: () => import('./pages/services/service-cluster/service-cluster.component').then(m => m.ServiceClusterComponent)
  },
  {
    path: 'services/epabx-intercom-solutions',
    loadComponent: () => import('./pages/services/service-cluster/service-cluster.component').then(m => m.ServiceClusterComponent)
  },
  {
    path: 'services/biometric-access-control',
    loadComponent: () => import('./pages/services/service-cluster/service-cluster.component').then(m => m.ServiceClusterComponent)
  },
  {
    path: 'services/structured-networking-cabling',
    loadComponent: () => import('./pages/services/service-cluster/service-cluster.component').then(m => m.ServiceClusterComponent)
  },
  {
    path: 'services/detail',
    loadComponent: () => import('./pages/services-detail/services-detail.component').then(m => m.ServicesDetailComponent),
    title: 'CCTV & Security System Installations | Sunrise Communication'
  },
  {
    path: 'services/:slug',
    loadComponent: () => import('./pages/services/service-cluster/service-cluster.component').then(m => m.ServiceClusterComponent)
  },
  {
    path: 'tools/cctv-storage-calculator',
    loadComponent: () => import('./pages/tools/cctv-calculator/cctv-calculator.component').then(m => m.CctvCalculatorComponent),
    title: 'CCTV Storage & Hard Drive (HDD) Calculator | Sunrise Communication'
  },
  {
    path: 'locations/cctv-installation-thane-west',
    loadComponent: () => import('./pages/locations/local-landing/local-landing.component').then(m => m.LocalLandingComponent)
  },
  {
    path: 'locations/society-intercom-wagle-estate',
    loadComponent: () => import('./pages/locations/local-landing/local-landing.component').then(m => m.LocalLandingComponent)
  },
  {
    path: 'locations/security-systems-navi-mumbai',
    loadComponent: () => import('./pages/locations/local-landing/local-landing.component').then(m => m.LocalLandingComponent)
  },
  {
    path: 'locations/:slug',
    loadComponent: () => import('./pages/locations/local-landing/local-landing.component').then(m => m.LocalLandingComponent)
  },
  {
    path: 'guides',
    loadComponent: () => import('./pages/guides/guide-list/guide-list.component').then(m => m.GuideListComponent),
    title: 'Technical Security & Society Guides | Sunrise Communication'
  },
  {
    path: 'guides/housing-society-cctv-installation-guide',
    loadComponent: () => import('./pages/guides/guide-detail/guide-detail.component').then(m => m.GuideDetailComponent)
  },
  {
    path: 'guides/society-intercom-copper-vs-ip-pbx-guide',
    loadComponent: () => import('./pages/guides/guide-detail/guide-detail.component').then(m => m.GuideDetailComponent)
  },
  {
    path: 'guides/cctv-amc-checklist-for-societies',
    loadComponent: () => import('./pages/guides/guide-detail/guide-detail.component').then(m => m.GuideDetailComponent)
  },
  {
    path: 'guides/:slug',
    loadComponent: () => import('./pages/guides/guide-detail/guide-detail.component').then(m => m.GuideDetailComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us for Security Solutions | Sunrise Communication'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page Not Found | Sunrise Communication'
  }
];
