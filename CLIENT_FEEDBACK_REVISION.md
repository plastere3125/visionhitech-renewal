# CLIENT FEEDBACK REVISION — Homepage (Revision 03)

Source: `In Data/1103/Webpage_Layout_대강.xlsx` (dated 2026-11-03), sheets **Layout 구성** and **벤토그리드**.
Scope: **Concept A** (`/concept-a/`). The embedded image in the Layout sheet (Foot row) is a screenshot of the Concept A
"Talk to the VISION HITECH sales team." band, which identifies Concept A as the reviewed design. Concept B is unchanged.

Rule: SITE STRUCTURE STAYS — sitemap, mega menu, mobile menu, product / solution / support / media / company routes unchanged.
Only the Concept A **homepage layout, visual tone and content priority** and the **shared footer** change.

## 1. Layout sketches in the Excel file (column "구성")

The 벤토그리드 sheet contains box sketches for each band. They are treated as the layout rule:

| Band | Sketch | Implementation |
|---|---|---|
| 1 Head | Full background, `1 2 3 4` boxes + a wide box bottom-left (button 3종) | Full-bleed image hero; bottom bar = 01–04 slide indicators + 3 CTA |
| 2 Solution | 4 tall boxes in one row | 4 tall cards in one row (desktop) |
| 3 Why | Background image, 4 boxes along the bottom | Image canvas, 4 boxes on the lower edge |
| 4 Network Products | Row 1: 3 boxes · Row 2: wide box (4) + small box (5) | 3-column bento: 1·2·3 / 4 (span 2) · 5 |
| 5 HD Analog Products | 2 × 2 wide boxes | 2 × 2 horizontal cards |
| 6 Special Camera | 2 wide boxes side by side | 2 wide environment cards |
| 7 Application | Background image, 5 boxes along the bottom | Image canvas, 5 boxes on the lower edge |
| 8 Support | Background image, 8 boxes (2 rows × 4) | Canvas, 2 × 4 boxes |
| 9 What's new? | Background image, 5 boxes along the bottom | Image canvas, 5 boxes on the lower edge |

Note: the written brief asked Section 2 not to use four equal cards; the client sketch shows four equal tall boxes in a row.
The client sketch takes precedence. Hierarchy inside the row comes from each card's visual (product / comparison / diagram), not from card size.

## 2. Feedback mapping

| Feedback | Current implementation (before) | Required change | Affected component | Status |
|---|---|---|---|---|
| Overall white tone | Light base, but dark CTA band (`bg-fg`) and grey footer; very large section padding | White / #F8F8F8 / #F2F3F5 section tones; brand orange as accent only; dark CTA band removed | `globals.css` (.theme-a), all home sections | Done |
| Compact Bento | 12-col bento, 300px rows, 20px gaps, 144px section padding | Tighter gaps (12px), lower section padding, boxes grouped as one system per band | `home/SectionsA.tsx` | Done |
| Full image Hero | 5:7 split — copy on white + product canvas on the right | Full-bleed image canvas under the header, no side margin | `home/HeroA.tsx`, `app/concept-a/page.tsx` | Done |
| White Header / Logo / Language | White header, primary (colour) logo | Transparent header on the hero: white logo (W-03), white menu, language, icons; white header after scroll / menu open | `HeaderA.tsx` | Done |
| 5 second Hero rotation | Manual 4-product tab switcher | Autoplay every 5 s; background + title + description + visual change together; pause on hover / focus; pause button; indicators; reduced-motion = no autoplay | `home/HeroA.tsx` | Done |
| 4 Hero contents | 4 products (bullet, dome, PTZ, NVR) | ① End-to-end Video Surveillance Solution ② Ultra Low Light 24/7 Color Solution ③ Zoom Modules ④ End-to-end Video Surveillance Solution | `content/en/home.ts` | Done — ④ **NEEDS CLIENT CONFIRMATION** |
| 3 CTA buttons | Explore Products + Product Inquiry | Explore Products (primary) · Inquiry (secondary) · Download (tertiary) | `home/HeroA.tsx` | Done |
| Youtube / LinkedIn in Product Inquiry | Not present | Icons next to the header "Product Inquiry" button and in the footer inquiry row | `HeaderA.tsx`, `FooterA.tsx`, `shared/Social.tsx` | Done — links go to Media Center › Youtube / LinkedIn (no official channel URL found) |
| Solution-first content | Product line → bento → featured products → technology → solutions | Order 1 Hero → 2 Solution → 3 Why → 4 Network → 5 HD Analog → 6 Special → 7 Application → 8 Support → 9 What's new | `app/concept-a/page.tsx` | Done |
| Short 1–2 line feature description | Longer bodies, callouts | Graphic → title → 1–2 line description → Learn More | `home/SectionsA.tsx` | Done |
| Section 2 Solution | (Solutions list lower on the page) | 4 cards: End-to-end / Ultra Low Light 24/7 Color / Zoom Modules / Edge AI Video Solution | `SolutionBandA` | Done |
| Section 3 Why Visionhitech | Photo + facts + pillars | Image canvas + 4 client titles; hover colour + lift + subtle expansion; Learn More | `WhyBandA` | Done — two titles are **CLIENT-PROVIDED CLAIM** (FACT_CHECK.md) |
| Section 4 Network Products | Product line section | IP Camera / NVR / Software / Zoom Module / Accessory, real product images | `NetworkBandA` | Done |
| Section 5 HD Analog Products | — | AHD/TVI Cameras / DVR / Software / Accessory | `AnalogBandA` | Done |
| Section 6 Special Camera | — | Transportation Camera / Marine Camera, environment image + real product | `SpecialBandA` | Done |
| Section 7 Application | — | 5 boxes A–E on an image canvas, hover colour + lift + expansion | `ApplicationBandA` | Done — names **NEEDS CLIENT CONFIRMATION** |
| Section 8 Support | 4 open columns | 8 boxes (all Support menu items), hover colour change | `SupportBandA` | Done |
| Section 9 What's new | News section with 3 posts | 5 boxes Notice / Event / News Letter / Youtube / LinkedIn, hover colour + lift + expansion | `NewsBandA` | Done |
| Compact White Footer | Dark CTA band + tall grey footer | One white, compact footer: inquiry row + social, logo, key navigation, contact, copyright. Built as a single component for the detailed structure the client will send later | `FooterA.tsx` | Done (structure provisional) |

## 3. NEEDS CLIENT CONFIRMATION

| Item | Client source | Handling |
|---|---|---|
| A. Hero slide ④ | ④ "End-to-end Video Surveillance Solution" — identical to ① | Text kept as written. Different background image so the slides remain distinguishable. Hero 04 title is duplicated with Hero 01 in the client source file. |
| B. Application ①–⑤ | "A", "B", "C", "D", "E" | Shown as Application A–E boxes. No application names created. Learn More goes to the Solutions overview until names and pages are defined. |

## 4. Other points to confirm

- YouTube / LinkedIn official channel URLs — none found on visionhitechsecurity.com or visionhitech.co.kr (checked 2026-11-04).
- Footer detailed structure — client will send later.
- New environment photographs (Wikimedia Commons, CC0 / CC BY) used as backgrounds — see ASSET_SOURCES.md; replace with client photography when available.
- Section 3 uses the official head-office photo (1400 px source); a higher-resolution company photo would improve this band.

## 5. Also fixed during QA

- Product detail (VNP36D5VAR) at 1024 px: model-name heading overflowed its column by 5 px (existed before this revision) — heading size reduced between 1024 and 1279 px.
- `scripts/e2e-check.py`: compare-slider check moved to Solutions › Technology (homepage technology band removed by the client order); two Revision 03 checks added (hero tabs / 3 CTA / header overlay, band order 2–9 + social icons).
