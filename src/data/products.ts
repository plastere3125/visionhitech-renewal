/**
 * Locale-neutral product data.
 * Source: visionhitechsecurity.com, extracted by scripts/extract-products.py.
 * Product facts (model codes, specifications, features) are NOT translated per locale —
 * only UI labels and marketing copy live in src/content/<locale>/.
 */
import generated from "./products.generated.json";
import { CATEGORY_ORDER, featured, FEATURED_SLUGS, productLine, type CatalogItem, type CategoryId } from "./catalog";

export { CATEGORY_ORDER, featured, FEATURED_SLUGS, productLine };
export type { CategoryId };

export type OverviewBlock = { h: string } | { p: string };

export interface Product extends CatalogItem {
  modelVariant: string | null;
  highlights: string[];
  overview: OverviewBlock[];
  features: { key: string[]; general: string[]; special: string[] };
  technologyNotes: string[];
  documents: string[];
  sourceImage: string | null;
  sourceUrl: string;
  notes: string[];
  /** Only for Software: package comparison table from the existing site. */
  packages?: { headers: string[]; rows: Array<{ label: string; values: string[] }> };
  /** Publicly available files on the existing site. */
  publicFiles?: Array<{ label: string; url: string }>;
}

/** NVR C/S VMS — transcribed from https://visionhitechsecurity.com/products-solutions/solutions/ */
const SOFTWARE: Product = {
  slug: "nvr-cs-vms",
  model: "NVR C/S",
  modelVariant: null,
  title: "Video Management Software",
  subtitle: "Video Management Software",
  tier: "Software",
  category: "software",
  series: "VMS",
  form: "VMS",
  environment: null,
  highlights: [
    "Client and Server management in one platform",
    "Unlimited record server systems (Unlimited package)",
    "Alarm Manager · Map function · Watchdog",
  ],
  overview: [
    { p: "Visionhitech NVR C/S is a powerful Video Management Software (VMS) that is widely being applied for small and midsize installation." },
    { p: "The system provides the Client and Server managements all together into one platform so that customers can run the monitoring and recording so simple. It also enables the Client to build up unlimited record server systems." },
  ],
  features: {
    key: ["NVR CS Server", "NVR CS Client Live", "NVR CS Client Playback", "NVR CS E-map", "NVR CS Setup", "NVR CS Event Server"],
    general: ["One server solution — all components installed onto one computer", "Multi-server solution — multi servers can be installed"],
    special: [],
  },
  technologyNotes: [],
  documents: ["Catalogue", "Manual"],
  image: "/images/site/vms-screen.webp",
  sourceImage: "https://visionhitechsecurity.com/wp-content/uploads/2021/05/vms_img01.png",
  sourceUrl: "https://visionhitechsecurity.com/products-solutions/solutions/",
  notes: [],
  packages: {
    headers: ["16", "32", "64", "Unlimited"],
    rows: [
      { label: "Number of cameras per recording", values: ["16", "36", "64", "64"] },
      { label: "Multi server solution", values: ["No", "No", "No", "Yes"] },
      { label: "Number of servers", values: ["1", "1", "1", "Unlimited"] },
      { label: "Cameras per NVR Client Live", values: ["16", "36", "64", "128"] },
      { label: "Cameras per NVR Client Playback", values: ["16", "16", "16", "16"] },
      { label: "Maximum numbers of users", values: ["1", "5", "5", "32"] },
      { label: "Alarm Manager", values: ["Yes", "Yes", "Yes", "Yes"] },
      { label: "Map function", values: ["Yes", "Yes", "Yes", "Yes"] },
      { label: "Watchdog", values: ["Yes", "Yes", "Yes", "Yes"] },
    ],
  },
  publicFiles: [
    { label: "Catalogue (PDF)", url: "https://visionhitechsecurity.com/wp-content/uploads/2021/05/VMS_Catalogue.pdf" },
    { label: "Manual (PDF)", url: "https://visionhitechsecurity.com/wp-content/uploads/2021/05/VMS_Manual.pdf" },
  ],
};

export const PRODUCTS: Product[] = [...(generated as Product[]), SOFTWARE];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsIn(category: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function seriesOf(category: CategoryId): string[] {
  return Array.from(new Set(productsIn(category).map((p) => p.series)));
}

/** All features in display order (deduplicated). */
export function allFeatures(p: Product): string[] {
  return Array.from(new Set([...p.features.key, ...p.features.special, ...p.features.general]));
}

export function relatedProducts(p: Product, n = 4): Product[] {
  const same = PRODUCTS.filter((x) => x.slug !== p.slug && x.category === p.category);
  const sameSeries = same.filter((x) => x.series === p.series);
  return [...sameSeries, ...same.filter((x) => x.series !== p.series)].slice(0, n);
}

