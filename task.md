# Sunrise Communication — AI Search & Discovery Transformation Roadmap

> Complete technical implementation tracker covering SEO, AEO, GEO, AIO/KGO, AAO/B2A, MEO, and SXO.

---

## Pillar 1: Agentic & Machine-to-Machine Discovery Layer (AAO / B2A)
- [x] Create `public/llms.txt` following official `/llms.txt` standard
- [x] Create `public/llms-full.txt` with in-depth technical specifications, SLAs, and inquiry parameters
- [x] Create `public/llms.json` structured machine-readable JSON OpenAPI manifest
- [x] Update `public/robots.txt` with permissions for AI user-agents (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, etc.) and pointer to `/llms.txt`

---

## Pillar 2: Knowledge Graph & Semantic Entity Architecture (AIO / KGO)
- [x] Refactor `src/app/core/services/seo.service.ts` to output a unified JSON-LD `@graph`
- [x] Add `GeoCoordinates` (`19.1966° N, 72.9781° E` for Charai, Thane West), Place ID, and CID `sameAs` link
- [x] Add structured `AggregateRating` schema (`5.0` stars, `93` reviews) and 24/7 operating hours
- [x] Link `hasOfferCatalog` directly to granular `Service` and `Product` entity nodes
- [x] Implement dynamic `FAQPage`, `HowTo`, and `BreadcrumbList` schema graph injection

---

## Pillar 3: Dedicated High-Intent Service Clusters (SEO, AEO, MEO, GEO)
- [x] Create `src/app/core/constants/services-data.ts` containing:
  - [x] 40-word Inverted Pyramid definitions (AEO / Answer Boxes)
  - [x] Generative Comparison Matrices (GEO: IP vs Analog, 4K vs 1080p, On-Prem vs Cloud PBX, AMC SLAs)
  - [x] Structured FAQ datasets per vertical
  - [x] Localized geographic service coverage data (Thane, Mumbai, Navi Mumbai)
- [x] Create `src/app/pages/services/service-cluster/service-cluster.component.ts` (HTML, SCSS, TS)
- [x] Add Voice-Ready Quick Facts Spec Ribbon and 4-Step Deployment Lifecycle ("How It Works")
- [x] Add Google Reviews Social Proof Showcase card with direct "Write a Review" link
- [x] Update `src/app/app.routes.ts` with canonical service routes:
  - [x] `/services/cctv-surveillance-systems`
  - [x] `/services/epabx-intercom-solutions`
  - [x] `/services/biometric-access-control`
  - [x] `/services/structured-networking-cabling`
  - [x] `/services` (Directory Overview Hub with balanced 4-column cards)
- [x] Update `public/sitemap.xml` with priority `0.95` for all new service cluster endpoints

---

## Pillar 4: Interactive Conversion Engine & Mobile SXO (SXO & MEO)
- [x] Create `src/app/shared/components/requirement-estimator/requirement-estimator.component.ts` (HTML, SCSS, TS)
  - [x] Premise selector (Housing Society, Office, Warehouse, Retail, Villa)
  - [x] Needs selector (CCTV, EPABX/Intercom, Biometrics, Networking)
  - [x] Hardware estimation logic (Channels, Storage, Resolution, Cabling)
  - [x] Dynamic WhatsApp quote generator pre-filling all technical requirements
  - [x] 1-Click "Copy BOQ Spec to Clipboard" with toast alert for Society WhatsApp groups
- [x] Create `src/app/shared/components/floating-quick-action-bar/` for mobile screens (`max-width: 991px`)
  - [x] `📞 Call 24/7` (`+91-9323848622`)
  - [x] `💬 WhatsApp Quote`
  - [x] `⭐ 5.0 (93 Reviews)` Google Review badge
- [x] Embed the Interactive Estimator on Home and Service cluster pages
- [x] Add hardcoded ICBM and Geo Positioning meta tags to `index.html`

---

## Pillar 5: Verification & Quality Assurance
- [x] Run `ng build` — verified zero TypeScript/SCSS compilation errors (~9.9s)
- [x] Run SSR inspection with `curl` / `test_ssr.js` — verified JSON-LD `@graph`, AEO answer boxes, and HowTo schemas pre-render in initial HTML
- [x] Validate Schema markup against Schema.org validator
- [x] Verify `/llms.txt`, `/llms-full.txt`, and `/llms.json` accessibility
- [x] Document final walkthrough in `walkthrough.md`
