/**
 * Content entry point. UI components must read copy only through getContent(locale).
 * To add Japanese: create src/content/jp/* with the same shape, register it below,
 * then flip the "jp" entry in src/lib/i18n.ts to "live".
 */
import type { Locale } from "@/lib/i18n";
import { site } from "./en/site";
import { homeA, homeB } from "./en/home";
import { technologies } from "./en/technology";
import { solutions } from "./en/solutions";
import { company } from "./en/company";
import { support } from "./en/support";
import { media } from "./en/media";

const en = { site, homeA, homeB, technologies, solutions, company, support, media };

export type Content = typeof en;

const registry: Record<Locale, Content> = { en };

export function getContent(locale: Locale = "en"): Content {
  return registry[locale];
}
