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
