/** Represents a key-value technical specification */
export interface ProductSpec {
  key: string;    // e.g., "Resolution", "IR Range", "Channels"
  value: string;  // e.g., "4MP", "30m", "32"
}

/** Service types offered with the product */
export type ServiceType = 'Sales' | 'Installation' | 'AMC' | 'Repair';

/** Core product data interface — mirrors Django REST API enterprise taxonomy response */
export interface Product {
  id: string;
  model_number?: string;        // Official model SKU e.g. "CP-UNC-EE61L2C-VMD-Q"
  slug: string;
  name: string;
  brand: string;
  brand_logo_url: string;       // Path to brand logo — empty string until provided
  category: string;              // Display name: "Network Camera", "NVR", "EPABX"
  category_slug: string;         // URL-safe: "network-camera", "nvr"
  category_description?: string; // Category overview text for hero banner
  sub_category: string;          // e.g., "4 MP", "8 Ch.", "Dome Camera"
  sub_category_slug?: string;    // URL-safe: "4-mp", "8-ch"
  image_url: string;             // Path to product image — empty string until provided
  short_description: string;
  specs: ProductSpec[];
  services_offered: ServiceType[];
}

/** Shape of the Django REST API paginated response / asset fallback */
export interface ProductCatalogResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Product[];
  products?: Product[]; // Fallback for local JSON asset
}
