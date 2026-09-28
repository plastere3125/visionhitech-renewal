# VISION HITECH — Global Website Renewal · English Design Prototype

Two English homepage + sub-page design concepts for the renewal of https://visionhitechsecurity.com/, built as real, responsive, interactive websites and published as a public link for client review.

**Public URL:** https://plastere3125.github.io/visionhitech-renewal/
- Concept A — Global Vision Technology: https://plastere3125.github.io/visionhitech-renewal/concept-a/
- Concept B — Intelligent Vision System: https://plastere3125.github.io/visionhitech-renewal/concept-b/

> Design prototype for review. Not the official VISION HITECH website. Search indexing is disabled (`robots: noindex`).

---

## 1. Project Overview

- Client: Visionhitech Co., Ltd. (Bucheon, Korea — CCTV cameras, recorders, VMS; established 1997)
- Goal: redesign the English site to the level of a global B2B video-security technology brand, without overstating company scale or capabilities.
- Deliverable of this phase: **2 design concepts** that differ in visual strategy, composition, grid, motion, product presentation and interaction — sharing one verified content layer.

## 2. Current Project Scope — English First, Japanese Later

| Phase | Status |
|---|---|
| 1 English website research | Done — see `VISIONHITECH_CONTENT_INVENTORY.md`, `REFERENCE_ANALYSIS.md` |
| 2 English design concepts A / B | Done (this repository) |
| 3 Public open link | GitHub Pages |
| 4 Client / owner design review | **Next** |
| 5 Full English website on approved concept | Pending |
| 6 English QA & approval | Pending |
| 7 Japanese localization | Pending — not started |
| 8 Japanese website | Pending — not started |

No Japanese page exists. The header shows **EN** (active) and **JP** as a disabled "coming soon" state.

## 3. VISION HITECH Website Structure

Source: `Website Structure Map_Visionhitech_260928.pdf` (client). Implemented as the global navigation of both concepts.

| Products | Solutions | Support | Media Center | Company |
|---|---|---|---|---|
| IP Camera | Technology | Technical Documents | Notice | Our Mission |
| NVR | AI Vision | Marketing Materials | Event | History |
| HD Analog Camera | Video Security | Download | News Letter | Vision |
| DVR | Transportation | Security Policy | Youtube | Organization |
| Software | Vision Marine | Certificate & Compliance | LinkedIn | Location |
| Accessory | | Warranty | | Contact |
| | | Tech Support | | |
| | | FAQ | | |

Prototype pages per concept: Home · Products (overview + filter) · Product detail (all 86 models) · Solutions overview · Solution detail (5) · Support · Company · Contact · Media Center.

## 4. Concept A — Global Vision Technology

Hardware-first, white/editorial, Hanwha Vision + Milesight balance.
- Archivo (expanded display width), black type, white/off-white/studio grey (#F1F2F3 — the exact background of VISION HITECH product photos, so products sit seamlessly), logo orange #F47B42 as a sparing accent.
- Hero: real product on a studio panel with **verified spec callouts** and a 4-product switcher (4K bullet, 4K dome, 36× PTZ, 16CH NVR).
- Bento grid with 7 cards in 5 ratios (large, tall, small, wide, medium) and different visual languages (product + type, demo footage, product cut, split low-light proof, photography).
- Carousel with category tabs, drag-to-compare technology section (VISION HITECH's own WDR / Ultra STARLUX / ROI / Smart IR demo images), tabbed solutions explorer, manufacturer pillars, support grid, dark inquiry CTA.
- Mega menu with category preview images; mobile accordion navigation.

## 5. Concept B — Intelligent Vision System

System-first, deep navy/charcoal, DEEPX + EdgeDX + Milesight balance.
- IBM Plex Sans + Plex Mono, single controlled light source, orange signal line (echo of the arc over the lens in the logo), camera-viewfinder bracket motif used sparingly.
- Hero: background-removed 4K dome + VISION HITECH Advanced ROI demo frame + 4-stage chain ticker.
- **Capture → Video Data → Analysis → Security Response** sticky scroll story; every point is a verified product/technology statement; "Analysis" is labelled *To be confirmed*.
- Technology bento (auto-wipe low-light proof, bit-rate readout, 3-frame Color-Night strip), interactive product-ecosystem diagram, honest AI Vision status section with reserved slots, application tiles, Transportation / Vision Marine split, spec-sheet model index with floating preview.
- Products page with sidebar filters (category / series / environment), grid ↔ list view; spec-sheet product detail with sticky section index.

## 6. References

Analysis in `REFERENCE_ANALYSIS.md`. Milesight (hierarchy, bento), EdgeDX (content depth), Hanwha Vision (global B2B presentation), DEEPX (technology visual language), Bettini Video (product → inquiry UX). **No reference content, claims, figures or assets are used.**

## 7. Current VISION HITECH Content Sources

- `https://visionhitechsecurity.com/` — WooCommerce Store API (85 products) + rendered product pages, About, CEO message, Certification, Location, Contact, Quality Management, Vision Technology pages, Download, Warranty, News.
- `https://www.visionhitech.co.kr/` — Korean corporate pages (checked for Transportation / Marine / AI evidence; patents list).
- Extraction script: `scripts/extract-products.py` → `src/data/products.generated.json` (full) and `src/data/catalog.generated.json` (light client index).
- Status of every item (VERIFIED / MISSING / PLACEHOLDER REQUIRED / NEEDS CLIENT CONFIRMATION): `VISIONHITECH_CONTENT_INVENTORY.md`.

## 8. Asset Sources

`ASSET_SOURCES.md` — logos (client), 85 product photos and site images (VISION HITECH website), 4 Wikimedia Commons photos (CC0 / CC BY 2.0, credited on-image), fonts (OFL). No AI-generated or AI-altered product imagery.

## 9. Tech Stack

- Next.js 16.3 (App Router, `output: "export"` static export), React 19, TypeScript
- Tailwind CSS 4 (CSS-first tokens; `.theme-a` / `.theme-b` token sets)
- No animation library: CSS transitions + IntersectionObserver (reveal, sticky story) — small JS footprint
- `next/font` (self-hosted Google fonts), `next/image` (unoptimized, pre-optimised WebP)
- Native `<dialog>` inquiry drawer (focus management, Esc), native `<input type=range>` compare slider

```
src/
  app/                    routes: /, /concept-a/*, /concept-b/*
  content/en/             ALL English copy (site, home, technology, solutions, support, company, media)
  content/index.ts        getContent(locale) — single entry point for copy
  data/                   locale-neutral product data (generated), catalog index, countries, visuals
  components/shared/      Inquiry drawer/form, CompareSlider, Img, Logo, Reveal, Placeholder, LanguageSwitch
  concepts/a/             Concept A design layer (header, footer, sections, pages)
  concepts/b/             Concept B design layer
  lib/                    i18n registry, base-path helpers, SEO (JSON-LD), tech mapping
scripts/                  extract-products.py, build-assets.py, visual-qa.py, e2e-check.py
```

## 10. Local Development

```bash
npm ci
npm run dev            # http://localhost:3000  (routes: /, /concept-a/, /concept-b/)
```

Content/asset regeneration (optional, needs Python 3 + Pillow + BeautifulSoup):
```bash
python3 scripts/extract-products.py --refresh   # re-read products from visionhitechsecurity.com
python3 scripts/build-assets.py                 # rebuild WebP assets (needs .cache/raw)
```

## 11. Build

```bash
npm run typecheck
npm run lint                                      # eslint, zero warnings allowed
NEXT_PUBLIC_BASE_PATH=/visionhitech-renewal npm run build   # static export → out/
```

QA scripts (Playwright for Python):
```bash
python3 scripts/visual-qa.py http://localhost:PORT/visionhitech-renewal out_dir /concept-a/ /concept-b/ ...
python3 scripts/e2e-check.py http://localhost:PORT/visionhitech-renewal
```

## 12. GitHub Pages Deployment

`.github/workflows/deploy.yml` — on push to `main`: `npm ci` → typecheck → lint → build with `NEXT_PUBLIC_BASE_PATH=/<repo>` → upload `out/` → `actions/deploy-pages`. Pages source is set to **GitHub Actions**. `trailingSlash: true` produces `/path/index.html`; `public/.nojekyll` keeps `_next/` assets.

## 13. Current Prototype Limitations

- Inquiry / contact forms are UI only. Submitting shows *"Prototype only. Backend connection will be implemented during production."* — nothing is sent.
- Product datasheets/manuals are not publicly linked on the current site → "Request document" opens the inquiry drawer.
- AI Vision, Transportation, Vision Marine, Security Policy, FAQ, Tech Support, Event, Newsletter, YouTube, LinkedIn, Organization: **placeholders** clearly labelled *Awaiting official content / To be confirmed*.
- Company history ends in 2020 and news posts date from 2020 (as on the current site).
- Product copy is shown as published on the current site (obvious typos corrected; list in the inventory).
- Search is client-side over the prototype catalogue; no site-wide search.
- No map embed; no cookie/consent layer; no analytics.

## 14. Future Production Development

1. Client selects a concept (or a merge) and confirms open items in the inventory (§4 NEEDS CLIENT CONFIRMATION).
2. Official content for AI Vision / Transportation / Vision Marine / Support sub-pages, current company figures, image rights.
3. Headless CMS or structured content source for products & news (the data shape in `src/data` is CMS-ready).
4. Form backend (email API / CRM), spam protection, privacy notice, consent.
5. Document delivery (datasheet / manual / firmware) with access control if required.
6. Production domain, canonical URLs to `https://visionhitechsecurity.com/en/...`, remove `noindex`, sitemap.xml, hreflang, analytics, redirects from current WordPress URLs.
7. Accessibility audit (WCAG 2.2 AA) and performance budget in CI.

## 15. Future Japanese Localization

- Add `src/content/jp/*` with the same shape as `src/content/en/*`, register in `src/content/index.ts`, set `jp` to `live` in `src/lib/i18n.ts`. Components do not change.
- URL plan: `/en/...` and `/jp/...` with `hreflang` pairs; product facts stay locale-neutral in `src/data`.
- Fonts: Concept A → Noto Sans JP; Concept B → IBM Plex Sans JP (already in the CSS fallback stacks).
- Review after translation: font weight, line breaks (kinsoku), character width, navigation / button widths, bento card heights, paragraph length, responsive overflow, Japanese metadata & SEO, contact form fields (furigana, prefecture), search presentation.
- Japanese is **not** a mechanical translation: copy is localized and reviewed per the checklist above.
