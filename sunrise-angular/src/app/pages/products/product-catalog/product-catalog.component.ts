import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { PageTitleComponent } from '../../../shared/components/page-title.component';
import { Product } from '../../../core/models/product.model';

export interface CategoryCardItem {
  name: string;
  slug: string;
  description: string;
  iconClass: string;
  productCount: number;
  subCategoryCount: number;
}

export interface CategoryTreeItem {
  category: string;
  slug: string;
  subcategories: string[];
}

export interface ProductSubGroup {
  subCategory: string;
  subCategorySlug: string;
  count: number;
  products: Product[];
}

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [ProductCardComponent, PageTitleComponent],
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss',
  // Performance Optimization: Use OnPush change detection strategy to eliminate unnecessary
  // dirty checking runs across the entire catalog and filter trees on unrelated DOM events.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCatalogComponent implements OnInit, OnDestroy {
  protected productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private searchDebounceTimer?: ReturnType<typeof setTimeout>;

  // Filter signals
  searchQuery = signal<string>('');
  selectedCategories = signal<Set<string>>(new Set());
  selectedSubCategories = signal<Set<string>>(new Set());
  selectedBrands = signal<Set<string>>(new Set());
  isMobileFilterOpen = signal<boolean>(false);

  // Explicit landing mode signal — true only on fresh load with no query params or explicit back button
  isLandingPageMode = signal<boolean>(true);

  // Track expanded groups ("SHOW ALL" state per sub-category heading)
  expandedSubCategoryGroups = signal<Set<string>>(new Set());

  // View Mode derived from landing signal
  viewMode = computed<'categories-landing' | 'products-detail'>(() => {
    return this.isLandingPageMode() ? 'categories-landing' : 'products-detail';
  });

  // Hierarchical Category Tree for Sidebar Filter (Categories -> Nested SubCategories)
  categoriesWithSubCategories = computed<CategoryTreeItem[]>(() => {
    const products = this.productService.products();
    const map = new Map<string, { slug: string; subcats: Set<string> }>();

    for (const p of products) {
      if (!map.has(p.category)) {
        map.set(p.category, { slug: p.category_slug, subcats: new Set() });
      }
      if (p.sub_category) {
        map.get(p.category)!.subcats.add(p.sub_category);
      }
    }

    const list: CategoryTreeItem[] = [];
    map.forEach((val, key) => {
      list.push({
        category: key,
        slug: val.slug,
        subcategories: Array.from(val.subcats),
      });
    });

    return list;
  });

  // Dynamic Brands list available for currently selected categories
  availableBrandsForSelectedCategories = computed<string[]>(() => {
    const products = this.productService.products();
    const activeCats = this.selectedCategories();

    if (activeCats.size === 0) {
      return [];
    }

    const brandSet = new Set<string>();
    for (const p of products) {
      if (activeCats.has(p.category)) {
        brandSet.add(p.brand);
      }
    }

    return Array.from(brandSet);
  });

  // Category Overview Cards list for Stage 1 Landing View
  categoryList = computed<CategoryCardItem[]>(() => {
    const products = this.productService.products();
    const map = new Map<
      string,
      { slug: string; desc: string; prods: Set<string>; subcats: Set<string> }
    >();

    for (const p of products) {
      const catName = p.category;
      if (!map.has(catName)) {
        map.set(catName, {
          slug: p.category_slug,
          desc: p.category_description || '',
          prods: new Set(),
          subcats: new Set(),
        });
      }
      const item = map.get(catName)!;
      item.prods.add(p.id);
      if (p.sub_category) {
        item.subcats.add(p.sub_category);
      }
    }

    const result: CategoryCardItem[] = [];
    map.forEach((val, key) => {
      result.push({
        name: key,
        slug: val.slug,
        description: val.desc,
        iconClass: this.getCategoryIcon(val.slug),
        productCount: val.prods.size,
        subCategoryCount: val.subcats.size,
      });
    });

    return result;
  });

  // Active Category Name computed signal
  activeCategoryName = computed(() => {
    const activeCats = this.selectedCategories();
    if (activeCats.size === 1) {
      return Array.from(activeCats)[0];
    }
    return '';
  });

  // Active Category Description computed signal
  activeCategoryDescription = computed(() => {
    const catName = this.activeCategoryName();
    if (catName) {
      const match = this.productService.products().find((p) => p.category === catName);
      return match?.category_description || '';
    }
    return '';
  });

  // Filtered products computed signal:
  // If selectedCategories() is empty, show 0 products as requested!
  filteredProducts = computed(() => {
    const products = this.productService.products();
    const query = this.searchQuery().trim().toLowerCase();
    const cats = this.selectedCategories();
    const subCats = this.selectedSubCategories();
    const brands = this.selectedBrands();

    if (cats.size === 0) {
      return [];
    }

    return products.filter((p) => {
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        (p.model_number && p.model_number.toLowerCase().includes(query)) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.short_description.toLowerCase().includes(query);

      const matchesCat = cats.has(p.category);
      const matchesSubCat = subCats.size === 0 || subCats.has(p.sub_category);
      const matchesBrand = brands.size === 0 || brands.has(p.brand);

      return matchesSearch && matchesCat && matchesSubCat && matchesBrand;
    });
  });

  // Group filtered products by sub-category heading (e.g. 6 MP, 5 MP, 4 MP, 2 MP, 8 MP)
  groupedProductsBySubCategory = computed<ProductSubGroup[]>(() => {
    const filtered = this.filteredProducts();
    const groupMap = new Map<string, { slug: string; list: Product[] }>();

    for (const p of filtered) {
      const subName = p.sub_category || 'General';
      const subSlug = p.sub_category_slug || 'general';

      if (!groupMap.has(subName)) {
        groupMap.set(subName, { slug: subSlug, list: [] });
      }
      groupMap.get(subName)!.list.push(p);
    }

    const groups: ProductSubGroup[] = [];
    groupMap.forEach((val, key) => {
      groups.push({
        subCategory: key,
        subCategorySlug: val.slug,
        count: val.list.length,
        products: val.list,
      });
    });

    return groups;
  });

  ngOnInit(): void {
    this.productService.loadProducts();

    this.route.queryParams.subscribe((params) => {
      const hasParams =
        params['q'] || params['category'] || params['sub_category'] || params['brand'];

      if (hasParams) {
        this.isLandingPageMode.set(false);
      }

      if (params['q']) {
        this.searchQuery.set(params['q']);
      }

      if (params['category']) {
        const catArray = Array.isArray(params['category'])
          ? params['category']
          : params['category'].split(',');
        this.selectedCategories.set(new Set(catArray));
      }

      if (params['sub_category']) {
        const subCatArray = Array.isArray(params['sub_category'])
          ? params['sub_category']
          : params['sub_category'].split(',');
        this.selectedSubCategories.set(new Set(subCatArray));
      }

      if (params['brand']) {
        const brandArray = Array.isArray(params['brand'])
          ? params['brand']
          : params['brand'].split(',');
        this.selectedBrands.set(new Set(brandArray));
      }
    });
  }

  getCategoryIcon(slug: string): string {
    const s = (slug || '').toLowerCase();
    if (s.includes('camera') || s.includes('cctv') || s.includes('analog') || s.includes('ptz')) {
      return 'fa fa-video-camera';
    }
    if (s.includes('nvr') || s.includes('recorder') || s.includes('dvr')) {
      return 'fa fa-server';
    }
    if (
      s.includes('epabx') ||
      s.includes('intercom') ||
      s.includes('phone') ||
      s.includes('telecom')
    ) {
      return 'fa fa-phone';
    }
    if (
      s.includes('biometric') ||
      s.includes('access') ||
      s.includes('security') ||
      s.includes('lock')
    ) {
      return 'fa fa-id-card-o';
    }
    if (s.includes('cable') || s.includes('network') || s.includes('wire')) {
      return 'fa fa-sitemap';
    }
    return 'fa fa-cubes';
  }

  selectCategoryFromLanding(categoryName: string): void {
    this.isLandingPageMode.set(false);
    this.selectedCategories.set(new Set([categoryName]));
    this.syncQueryParams();
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    // Bolt Optimization: searchQuery signal is set immediately for instantaneous 0ms UI filtering
    this.searchQuery.set(val);
    if (this.isLandingPageMode()) {
      this.isLandingPageMode.set(false);
    }
    // Debounce Router URL query param updates during search typing to prevent Angular Router thrashing
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }
    this.searchDebounceTimer = setTimeout(() => {
      this.syncQueryParams();
    }, 300);
  }

  toggleCategory(category: string): void {
    if (this.isLandingPageMode()) {
      this.isLandingPageMode.set(false);
    }
    const currentCats = new Set(this.selectedCategories());
    const currentSubCats = new Set(this.selectedSubCategories());
    const currentBrands = new Set(this.selectedBrands());

    if (currentCats.has(category)) {
      currentCats.delete(category);
      // Clean up subcategories belonging to this category
      const catTreeItem = this.categoriesWithSubCategories().find((c) => c.category === category);
      if (catTreeItem) {
        catTreeItem.subcategories.forEach((sub) => currentSubCats.delete(sub));
      }
    } else {
      currentCats.add(category);
    }

    // If zero categories remain selected, clear all brands & subcategories!
    if (currentCats.size === 0) {
      currentSubCats.clear();
      currentBrands.clear();
    }

    this.selectedCategories.set(currentCats);
    this.selectedSubCategories.set(currentSubCats);
    this.selectedBrands.set(currentBrands);
    this.syncQueryParams();
  }

  toggleSubCategoryWithCategory(subCategory: string, categoryName: string): void {
    if (this.isLandingPageMode()) {
      this.isLandingPageMode.set(false);
    }
    const currentSubCats = new Set(this.selectedSubCategories());
    const currentCats = new Set(this.selectedCategories());

    if (currentSubCats.has(subCategory)) {
      currentSubCats.delete(subCategory);
    } else {
      currentSubCats.add(subCategory);
      if (!currentCats.has(categoryName)) {
        currentCats.add(categoryName);
        this.selectedCategories.set(currentCats);
      }
    }

    this.selectedSubCategories.set(currentSubCats);
    this.syncQueryParams();
  }

  toggleBrand(brand: string): void {
    if (this.isLandingPageMode()) {
      this.isLandingPageMode.set(false);
    }
    const current = new Set(this.selectedBrands());
    if (current.has(brand)) {
      current.delete(brand);
    } else {
      current.add(brand);
    }
    this.selectedBrands.set(current);
    this.syncQueryParams();
  }

  toggleShowAllGroup(subCategoryGroup: string): void {
    const current = new Set(this.expandedSubCategoryGroups());
    if (current.has(subCategoryGroup)) {
      current.delete(subCategoryGroup);
    } else {
      current.add(subCategoryGroup);
    }
    this.expandedSubCategoryGroups.set(current);
  }

  isGroupExpanded(subCategoryGroup: string): boolean {
    return this.expandedSubCategoryGroups().has(subCategoryGroup);
  }

  removeCategoryFilter(category: string): void {
    this.toggleCategory(category);
  }

  removeSubCategoryFilter(subCategory: string): void {
    const current = new Set(this.selectedSubCategories());
    current.delete(subCategory);
    this.selectedSubCategories.set(current);
    this.syncQueryParams();
  }

  removeBrandFilter(brand: string): void {
    this.toggleBrand(brand);
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.syncQueryParams();
  }

  clearAllFiltersInDetailMode(): void {
    this.searchQuery.set('');
    this.selectedCategories.set(new Set());
    this.selectedSubCategories.set(new Set());
    this.selectedBrands.set(new Set());
    this.expandedSubCategoryGroups.set(new Set());
    this.syncQueryParams();
  }

  returnToCategoryLanding(): void {
    this.clearAllFiltersInDetailMode();
    this.isLandingPageMode.set(true);
  }

  toggleMobileFilter(): void {
    this.isMobileFilterOpen.update((v) => !v);
  }

  ngOnDestroy(): void {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }
  }

  private syncQueryParams(): void {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = undefined;
    }
    const queryParams: Record<string, string | null> = {};

    if (this.searchQuery().trim()) {
      queryParams['q'] = this.searchQuery().trim();
    } else {
      queryParams['q'] = null;
    }

    if (this.selectedCategories().size > 0) {
      queryParams['category'] = Array.from(this.selectedCategories()).join(',');
    } else {
      queryParams['category'] = null;
    }

    if (this.selectedSubCategories().size > 0) {
      queryParams['sub_category'] = Array.from(this.selectedSubCategories()).join(',');
    } else {
      queryParams['sub_category'] = null;
    }

    if (this.selectedBrands().size > 0) {
      queryParams['brand'] = Array.from(this.selectedBrands()).join(',');
    } else {
      queryParams['brand'] = null;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
