/**
 * Locale registry.
 * Phase 1 (current): English only.
 * Phase 7+: add "jp" with its own src/content/jp/* files; UI components read copy
 * exclusively through getContent(locale), so no component changes are required.
 */
export const LOCALES = [
  { code: "en", label: "EN", name: "English", status: "live" },
  { code: "jp", label: "JP", name: "日本語", status: "coming-soon" },
] as const;

export type Locale = "en";
export const DEFAULT_LOCALE: Locale = "en";
