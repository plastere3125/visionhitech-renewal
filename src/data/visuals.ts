import type { CategoryId } from "./catalog";

/** Representative image per product category (all VISION HITECH studio photos). */
export const CATEGORY_IMAGE: Record<CategoryId, string> = {
  "ip-camera": "/images/products/vnn64lu4ar.webp",
  nvr: "/images/products/vr16s.webp",
  "hd-analog-camera": "/images/products/vtv23184er.webp",
  dvr: "/images/products/vd16t.webp",
  software: "/images/site/vms-screen.webp",
  accessory: "/images/products/vba130.webp",
};

/** Dark-housing products with the studio background removed (see scripts/build-assets.py). */
export const CUTOUT = (slug: string) => `/images/cutouts/${slug}.webp`;
