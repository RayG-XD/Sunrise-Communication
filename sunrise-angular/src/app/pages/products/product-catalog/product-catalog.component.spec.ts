import '@angular/compiler';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductCatalogComponent } from './product-catalog.component';
import { Injector, runInInjectionContext } from '@angular/core';

describe('ProductCatalogComponent Search Debounce', () => {
  let component: ProductCatalogComponent;

  beforeEach(() => {
    vi.useFakeTimers();

    const mockProductService = {
      products: () => [],
      loadProducts: () => {},
    };

    const mockActivatedRoute = {
      queryParams: {
        subscribe: () => {},
      },
    };

    const mockRouter = {
      navigate: vi.fn(),
    };

    const injector = Injector.create({
      providers: [
        { provide: 'ProductService', useValue: mockProductService },
        { provide: 'ActivatedRoute', useValue: mockActivatedRoute },
        { provide: 'Router', useValue: mockRouter },
      ],
    });

    // Provide mock objects directly
    component = Object.create(ProductCatalogComponent.prototype);
    (component as any).productService = mockProductService;
    (component as any).route = mockActivatedRoute;
    (component as any).router = mockRouter;
    (component as any).searchQuery = (function () {
      let val = '';
      const fn = function () {
        return val;
      };
      fn.set = function (v: string) {
        val = v;
      };
      return fn;
    })();
    (component as any).isLandingPageMode = (function () {
      let val = true;
      const fn = function () {
        return val;
      };
      fn.set = function (v: boolean) {
        val = v;
      };
      return fn;
    })();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should update searchQuery signal immediately on search input', () => {
    const mockEvent = {
      target: { value: 'camera' },
    } as unknown as Event;

    component.onSearchInput(mockEvent);

    expect(component.searchQuery()).toBe('camera');
  });

  it('should debounce query parameters navigation by 300ms', () => {
    const syncSpy = vi.spyOn(component as any, 'syncQueryParams').mockImplementation(() => {});

    const mockEvent1 = { target: { value: 'c' } } as unknown as Event;
    const mockEvent2 = { target: { value: 'ca' } } as unknown as Event;

    component.onSearchInput(mockEvent1);
    component.onSearchInput(mockEvent2);

    // Immediately after typing, syncQueryParams should NOT have been called yet
    expect(syncSpy).not.toHaveBeenCalled();

    // Fast-forward time by 300ms
    vi.advanceTimersByTime(300);

    // After 300ms, syncQueryParams should have been called exactly once
    expect(syncSpy).toHaveBeenCalledTimes(1);
  });
});
