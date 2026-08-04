import { Injectable, inject, signal, computed, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductCatalogResponse } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  // Private writable signals
  private _products = signal<Product[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Public readonly signals
  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed signals derived from products list
  readonly categories = computed(() => {
    const list = this._products();
    const unique = new Set(list.map(p => p.category));
    return Array.from(unique);
  });

  readonly brands = computed(() => {
    const list = this._products();
    const unique = new Set(list.map(p => p.brand));
    return Array.from(unique);
  });

  /**
   * Loads product data from Django REST API endpoint with local JSON fallback.
   */
  loadProducts(): void {
    if (this._products().length > 0) {
      return; // Already loaded
    }

    this._loading.set(true);
    this._error.set(null);

    const apiUrl = `${environment.apiUrl}/products/`;

    this.http.get<ProductCatalogResponse>(apiUrl).subscribe({
      next: (response) => {
        const items = response.results || response.products || [];
        this._products.set(items);
        this._loading.set(false);
      },
      error: (err) => {
        console.warn('Django REST API fetch failed, falling back to local products.json asset:', err);
        // Fallback to static JSON asset
        this.http.get<ProductCatalogResponse>('assets/data/products.json').subscribe({
          next: (fallbackResponse) => {
            this._products.set(fallbackResponse.products || []);
            this._loading.set(false);
          },
          error: (fallbackErr) => {
            console.error('Failed to load products:', fallbackErr);
            this._error.set('Failed to load products catalog. Please try again later.');
            this._loading.set(false);
          }
        });
      }
    });
  }

  /**
   * Returns a computed signal finding a product by its URL slug.
   */
  getProductBySlug(slug: string): Signal<Product | undefined> {
    return computed(() => {
      const list = this._products();
      return list.find(p => p.slug === slug);
    });
  }
}
