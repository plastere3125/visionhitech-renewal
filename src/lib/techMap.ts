import type { Product } from "@/data/products";
import { allFeatures } from "@/data/products";

/** Map verified product feature strings to VISION HITECH technology entries (Product → Technology link). */
const RULES: Array<[RegExp, string]> = [
  [/ultra\s*starlux|ultra-starlux/i, "ultra-starlux"],
  [/color-night|full-color night|24\/7 color/i, "color-night"],
  [/wdr/i, "wdr"],
  [/region of interest|\broi\b/i, "advanced-roi"],
  [/smart ir/i, "smart-ir"],
  [/ultra-smart rate|ultra src|smart rate control/i, "usrc"],
  [/triple[- ]stream/i, "triple-streaming"],
  [/true day\/night|true dn|true day & night/i, "true-dn"],
  [/heat dissipation/i, "heat"],
  [/auto-?focus|af zoom|smart-focus/i, "af-zoom"],
  [/sd-card/i, "sd-slot"],
  [/network status/i, "network-indicator"],
  [/anti-ir reflection|ir glare|anti-reflection/i, "anti-ir-reflection"],
  [/ndaa/i, "ndaa"],
];

export function techIdsFor(p: Product): string[] {
  const text = [...allFeatures(p), ...p.highlights, p.title].join(" | ");
  const ids: string[] = [];
  for (const [re, id] of RULES) if (re.test(text) && !ids.includes(id)) ids.push(id);
  return ids;
}
