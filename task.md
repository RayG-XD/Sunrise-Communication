# Products & Solutions Catalog — Task Checklist

> Tracks execution progress for the implementation plan.
> Tasks will be marked `[/]` (in progress) and `[x]` (completed) during coding.

---

## Phase 1: Foundation — Models, Service & Config

- [ ] Create `src/app/core/models/product.model.ts`
  - [ ] Define `ProductSpec` interface (key/value pair)
  - [ ] Define `ServiceType` union type (`'Sales' | 'Installation' | 'AMC' | 'Repair'`)
  - [ ] Define `Product` interface with all fields (`id`, `slug`, `name`, `brand`, `brand_logo_url`, `category`, `category_slug`, `sub_category`, `image_url`, `short_description`, `specs`, `services_offered`)
  - [ ] Define `ProductCatalogResponse` wrapper interface (`{ products: Product[] }`)
- [ ] Create `src/app/core/services/product.service.ts`
  - [ ] Implement with `@Service` decorator (verify availability in `@angular/core@^22.0.0`, fallback to `@Injectable({providedIn: 'root'})`)
  - [ ] Inject `HttpClient` via `inject()` function (per best-practices)
  - [ ] Add private writable signals (`_products`, `_loading`, `_error`)
  - [ ] Add public readonly signals (`products`, `loading`, `error`) via `.asReadonly()`
  - [ ] Add `categories()` computed signal (unique categories derived from `_products`)
  - [ ] Add `brands()` computed signal (unique brands derived from `_products`)
  - [ ] Implement `loadProducts(): void` method (HttpClient GET → `/assets/data/products.json`, updates signals)
  - [ ] Implement `getProductBySlug(slug: string)` method returning `computed()` signal of `Product | undefined`
- [ ] Modify `src/app/app.config.ts`
  - [ ] Import `provideHttpClient`, `withFetch` from `@angular/common/http`
  - [ ] Add `provideHttpClient(withFetch())` to providers array
  - [ ] Verify it works alongside existing `provideClientHydration()` (SSR transfer state — no double-fetch on hydration)

---

## Phase 2: Routing

- [ ] Create `src/app/pages/products/products.routes.ts`
  - [ ] Define child route `''` → `ProductCatalogComponent` (lazy via `loadComponent`)
  - [ ] Set `title: 'Products & Solutions Catalog | Sunrise Communication'` on catalog route
  - [ ] Define child route `:category/:slug` → `ProductDetailComponent` (lazy via `loadComponent`)
  - [ ] No `title` on detail route (set dynamically in component via SeoService)
- [ ] Modify `src/app/app.routes.ts`
  - [ ] Add `products` parent route with `loadChildren` (inserted BEFORE the `**` wildcard route)
- [ ] Modify `src/app/app.routes.server.ts`
  - [ ] Add `products/:category/:slug` explicit server route with `RenderMode.Server` (before `**` wildcard)

---

## Phase 3: SEO Updates

- [ ] Modify `src/app/core/services/seo.service.ts`
  - [ ] Migrate from `@Injectable({providedIn: 'root'})` to `@Service` decorator
  - [ ] Add `updateForProduct(product: Product, pageUrl: string): void` public method
  - [ ] Set dynamic `<title>`: `"[Product Name] | [Brand] - Sunrise Communication"`
  - [ ] Set meta `description` from `product.short_description`
  - [ ] Set meta `keywords` from product name, brand, category, sub_category
  - [ ] Set OG tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type` (= `'product'`)
  - [ ] Set Twitter tags: `twitter:title`, `twitter:description`, `twitter:image`
  - [ ] Inject Product JSON-LD structured data (`@type: Product`, brand, offers with seller)
  - [ ] Ensure `injectJsonLd()` remains private but is called internally by `updateForProduct()`
- [ ] Modify `src/app/core/constants/seo-data.ts`
  - [ ] Add `/products` entry with title, description, and keywords for catalog page

---

## Phase 4: Mock Data

- [ ] Create `src/assets/data/products.json`
  - [ ] Product 1: CP Plus 4MP Dual Light Dome Camera (CCTV / Dome Camera) — 5-7 specs
  - [ ] Product 2: Hikvision 2MP ColorVu Bullet Camera (CCTV / Bullet Camera) — 5-7 specs
  - [ ] Product 3: CP Plus 8 Channel 4K DVR (CCTV / DVR/NVR) — 5-7 specs
  - [ ] Product 4: Hikvision 4MP IP PTZ Camera (CCTV / PTZ Camera) — 5-7 specs
  - [ ] Product 5: Matrix ETERNITY GENX12S EPABX System (EPABX / Analog PBX) — 5-7 specs
  - [ ] Product 6: Matrix SPARSH VP510E IP Phone (EPABX / IP Phone) — 5-7 specs
  - [ ] Product 7: Essl X990 Fingerprint Attendance System (Biometrics / Fingerprint) — 5-7 specs
  - [ ] Product 8: Essl MultiBio 700 Face + Fingerprint Terminal (Biometrics / Multi-Biometric) — 5-7 specs
  - [ ] Set `image_url` and `brand_logo_url` to empty strings on all products
  - [ ] Ensure each product has proper `slug` (kebab-case) and `category_slug` (lowercase)
  - [ ] Ensure each product has appropriate `services_offered` array
  - [ ] Verify all specs are realistic (Resolution, IR Range, Compression, Storage, Channels, Ports, Sensor Type, etc.)

---

## Phase 5: Shared Components

- [ ] Create `src/app/shared/components/product-card/product-card.component.ts`
  - [ ] Define `product` input signal via `input.required<Product>()`
  - [ ] Implement CSS placeholder logic: `@if (product().image_url)` → `NgOptimizedImage` / `@else` → gradient placeholder with category icon
  - [ ] Implement brand logo/text badge logic: `@if (product().brand_logo_url)` → logo image / `@else` → styled text badge
  - [ ] Render product name as `<h3>`
  - [ ] Display first 3 specs from `specs[]` as key-value pairs
  - [ ] Display "Sales & Installation" service badge (derived from `services_offered`)
  - [ ] Add `routerLink` to `/products/{{ product().category_slug }}/{{ product().slug }}`
- [ ] Create `src/app/shared/components/product-card/product-card.component.scss`
  - [ ] Card layout with hover effects and elevation transitions
  - [ ] CSS gradient placeholders with category-specific colors:
    - CCTV → dark blue/teal gradient
    - EPABX → dark purple/indigo gradient
    - Biometrics → dark green/emerald gradient
  - [ ] Category icon (from existing flaticon/icofont set) centered on placeholder
  - [ ] Brand badge pill/text styling
  - [ ] Responsive card sizing
  - [ ] `data-aos` entrance animation attributes

---

## Phase 6: Product Catalog Page

- [ ] Create `src/app/pages/products/product-catalog/product-catalog.component.ts`
  - [ ] Inject `ProductService`, `ActivatedRoute`, `Router`
  - [ ] Define filter signals: `searchQuery = signal('')`, `selectedCategories = signal(new Set())`, `selectedBrands = signal(new Set())`
  - [ ] Define `filteredProducts` computed signal combining search + category + brand filters (AND logic)
  - [ ] Read URL query params on init (`ActivatedRoute.queryParams`) → populate filter signals
  - [ ] On filter change → update URL via `Router.navigate([], { queryParams, queryParamsHandling: 'merge', replaceUrl: true })` (no history pollution)
  - [ ] Call `productService.loadProducts()` on init
  - [ ] Import `ProductCardComponent`, `PageTitleComponent`
- [ ] Create `src/app/pages/products/product-catalog/product-catalog.component.html`
  - [ ] `PageTitleComponent` banner with breadcrumb `Home → Products`
  - [ ] Search bar text input (bound to `searchQuery` signal)
  - [ ] Category filter checkboxes (dynamically from `productService.categories()`)
  - [ ] Brand filter checkboxes (dynamically from `productService.brands()`)
  - [ ] Active filter chips with "×" clear button for each
  - [ ] "Clear All" button to reset all filters
  - [ ] Results count: "Showing X of Y products"
  - [ ] Product grid using `@for (product of filteredProducts(); track product.id)` rendering `<app-product-card>`
  - [ ] Empty state: `@if (filteredProducts().length === 0)` → "No products found" message
  - [ ] Loading state: `@if (productService.loading())` → loading skeleton/indicator
- [ ] Create `src/app/pages/products/product-catalog/product-catalog.component.scss`
  - [ ] Sidebar filter panel layout (desktop left sidebar)
  - [ ] Collapsible filter panel (mobile — toggle button to show/hide)
  - [ ] Product grid responsive: 3-col desktop, 2-col tablet, 1-col mobile
  - [ ] Search bar styling
  - [ ] Filter checkbox styling
  - [ ] Filter chips styling
  - [ ] Responsive breakpoints matching existing `responsive.css`

---

## Phase 7: Product Detail Page

- [ ] Create `src/app/pages/products/product-detail/product-detail.component.ts`
  - [ ] Inject `ProductService`, `SeoService`, `ActivatedRoute`, `Router`, `DOCUMENT`, `PLATFORM_ID`
  - [ ] Read `:slug` AND `:category` params from `ActivatedRoute.params`
  - [ ] Load product via `productService.getProductBySlug(slug)`
  - [ ] Call `seoService.updateForProduct(product, pageUrl)` — construct URL SSR-safely:
    - Browser: use `document.location.href`
    - Server: construct from `SITE_DATA.contact.website + Router.url`
  - [ ] Implement `whatsappUrl` computed signal (recalculates when product changes, SSR-safe)
  - [ ] Handle "Product not found" state (show message + link back to catalog)
- [ ] Create `src/app/pages/products/product-detail/product-detail.component.html`
  - [ ] Full-depth breadcrumb: Home → Products → [Category] → [Product Name]
    - **Note**: Existing `PageTitleComponent` only supports 2 levels — either extend it or build a custom inline breadcrumb for this page
  - [ ] Two-column layout:
    - Left column (55%): large product image (`NgOptimizedImage`) or CSS gradient placeholder
    - Right column (45%):
      - Product name as `<h1>`
      - Brand badge (`@if brand_logo_url` → logo image / `@else` → styled text badge)
      - Category & Sub-category context display (e.g., "CCTV > Dome Camera")
      - "Services Available" badges row (`@for` over `services_offered`)
      - Specifications table: key-value rows (`@for` over `specs[]`)
      - **"Inquire on WhatsApp"** CTA button: `<a [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer">`
  - [ ] "Product not found" fallback template
- [ ] Create `src/app/pages/products/product-detail/product-detail.component.scss`
  - [ ] Two-column layout (55/45 desktop, stacked mobile)
  - [ ] Large image container / CSS gradient placeholder styling
  - [ ] Specs table styling (alternating rows, clean typography)
  - [ ] WhatsApp CTA button (green branded, prominent, with WhatsApp icon)
  - [ ] Service badges row styling (pill/tag badges)
  - [ ] Category & sub-category breadcrumb context styling
  - [ ] "Product not found" state styling
  - [ ] Responsive breakpoints (stacked layout on mobile)

---

## Phase 8: Navigation & Sitemap

- [ ] Modify `src/app/shared/components/header/header.component.html`
  - [ ] Add "Products" link in desktop main nav (between About and Services dropdown) — `routerLinkActive="current"`
  - [ ] Add "Products" link in sticky header nav (same position)
  - [ ] Add "Products" link in mobile menu nav (same position, with `(click)="toggleMobileMenu()"`)
- [ ] Modify `public/sitemap.xml`
  - [ ] Add `/products` catalog page URL (`changefreq: weekly`, `priority: 0.9`)

---

## Phase 9: Verification

- [ ] Run `ng build` — verify clean compilation
  - [ ] No TypeScript errors
  - [ ] No template errors
  - [ ] SSR bundle generates correctly
- [ ] Run `npm run start` — dev server manual testing
  - [ ] `/products` — catalog page renders with CSS placeholders (gradient + icon + brand text)
  - [ ] Search filter filters products by name, brand, and description
  - [ ] Category filter checkboxes work (AND logic with other filters)
  - [ ] Brand filter checkboxes work (AND logic with other filters)
  - [ ] Active filter chips appear with "×" clear buttons
  - [ ] "Clear All" resets all filters
  - [ ] Results count updates correctly
  - [ ] URL updates to `/products?category=cctv&brand=cp-plus&q=dome` on filter change
  - [ ] Reloading a filtered URL restores filters from query params
  - [ ] Browser back/forward navigates filter states
  - [ ] Product card click navigates to `/products/cctv/cp-plus-4mp-dual-light-dome-camera`
  - [ ] Detail page breadcrumb: `Home → Products → CCTV → CP Plus 4MP Dual Light Dome Camera`
  - [ ] Detail page shows category & sub-category context (e.g., "CCTV > Dome Camera")
  - [ ] Detail page specs table renders all key-value pairs
  - [ ] Detail page service badges render correctly
  - [ ] WhatsApp CTA opens `wa.me` with correct pre-filled message including product name and current page URL
  - [ ] "Products" link works in desktop nav, sticky nav, and mobile menu
  - [ ] Responsive layout: desktop (3-col grid + sidebar), tablet (2-col grid), mobile (1-col grid + collapsible filters)
  - [ ] "Product not found" state shows for invalid slugs
  - [ ] No console errors
- [ ] Run SSR verification (`npm run serve:ssr:sunrise-angular`)
  - [ ] `curl` a product detail page — HTML contains product content (not empty shell)
  - [ ] `<title>` tag contains `"[Product Name] | [Brand] - Sunrise Communication"`
  - [ ] `<meta name="description">` contains product's `short_description`
  - [ ] OG tags present (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
  - [ ] JSON-LD `<script type="application/ld+json">` present with `@type: Product` schema
  - [ ] No double-fetch on client hydration (`provideHttpClient(withFetch())` + `provideClientHydration()` transfer state works)
- [ ] Create `walkthrough.md` summarizing all completed work
