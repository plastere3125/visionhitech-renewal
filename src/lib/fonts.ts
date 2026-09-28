import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

/**
 * Concept A — Archivo (grotesque with a width axis: condensed-to-expanded editorial range).
 *   Japanese pairing for Phase 7: Noto Sans JP (declared in the CSS fallback stack).
 * Concept B — IBM Plex Sans + IBM Plex Mono (industrial / technical).
 *   Japanese pairing for Phase 7: IBM Plex Sans JP — same family, same metrics philosophy.
 */
export const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
export const plexSans = IBM_Plex_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-plex", display: "swap" });
export const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });
