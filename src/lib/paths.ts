/** Base path injected at build time for GitHub Pages ("/visionhitech-renewal"), empty locally. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a /public asset path. next/link handles basePath itself; <img>/<Image unoptimized> does not. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

export type ConceptId = "a" | "b";

/** Route inside a concept, e.g. route("a", "/products/") -> "/concept-a/products/". */
export function route(concept: ConceptId, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/concept-${concept}${clean}`;
}

export const SITE_URL = "https://plastere3125.github.io/visionhitech-renewal";
