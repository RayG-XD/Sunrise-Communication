import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-catalog/product-catalog.component').then(
        (m) => m.ProductCatalogComponent
      ),
    title: 'Products & Solutions Catalog | Sunrise Communication'
  },
  {
    path: ':category/:slug',
    loadComponent: () =>
      import('./product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      )
  }
];
