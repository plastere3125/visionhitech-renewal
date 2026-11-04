import type { CategoryId } from "./catalog";

/** Representative image per product category (all VISION HITECH studio photos). */
export const CATEGORY_IMAGE: Record<CategoryId, string> = {
  "ip-camera": "/images/products/vnn64lu4ar.webp",
  nvr: "/images/products/vr16s.webp",
  "hd-analog-camera": "/images/products/vtv23184er.webp",
  dvr: "/images/products/vd16t.webp",
  "zoom-module": "/images/products/vnp36d5var.webp",
  software: "/images/site/vms-screen.webp",
  accessory: "/images/products/vba130.webp",
};

/** Dark-housing products with the studio background removed (see scripts/build-assets.py). */
export const CUTOUT = (slug: string) => `/images/cutouts/${slug}.webp`;

/**
 * Environment backgrounds (Wikimedia Commons — see ASSET_SOURCES.md §3). Each has 1920 / 1280 / 768 px WebP files.
 * CC BY images must show their credit line.
 */
export const ENV: Record<string, { alt: string; credit: string | null; ratio: number }> = {
  "env-logistics-dusk": { alt: "Logistics site and car park at dusk", credit: "Photo: RhôneA7, CC BY 4.0", ratio: 1.5 },
  "env-crossroads": { alt: "Night-time long exposure of a road interchange", credit: "Photo: Adam Meek, CC BY 2.0", ratio: 1.5 },
  "env-marine-day": { alt: "Container ship at anchor off the coast", credit: null, ratio: 1.5 },
  "env-city-night": { alt: "Aerial view of a city at night", credit: "Photo: Artem Svetlov, CC BY 2.0", ratio: 16 / 9 },
  "env-marine-night": { alt: "Container vessel at a port at night", credit: null, ratio: 1.52 },
  "env-train": { alt: "Passenger train interior", credit: "Photo: Trougnouf, CC BY 4.0", ratio: 1.5 },
  "env-engine-room": { alt: "Ship engine room", credit: "Photo: LEE 003, CC BY 4.0", ratio: 1.5 },
  "env-glass": { alt: "Curved glass facade of an office building", credit: "Photo: Andreas Levers, CC BY 2.0 (monochrome)", ratio: 1.5 },
};

/** srcset for an environment background. */
export function envSrcSet(name: string, base: (p: string) => string): string {
  return `${base(`/images/env/${name}-768.webp`)} 768w, ${base(`/images/env/${name}-1280.webp`)} 1280w, ${base(`/images/env/${name}.webp`)} 1920w`;
}
