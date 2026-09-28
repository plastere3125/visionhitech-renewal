# VISION HITECH — CONTENT INVENTORY

Audit date: 2026-09-28
Primary source: https://visionhitechsecurity.com/ (WordPress + WooCommerce; public REST API and rendered pages)
Secondary official source: https://www.visionhitech.co.kr/ (Korean corporate site, linked from the English site header)
Provided by client: `Website Structure Map_Visionhitech_260928.pdf`, `vision-logo_W-03.svg`, `vision-logo_B-02.svg`, `vision-logo_P-01.svg`

Reproducible extraction: `scripts/extract-products.py` → `src/data/products.generated.json`

Status legend
- **VERIFIED** — found verbatim on an official VISION HITECH site
- **MISSING** — needed by the new IA, not found in any official source
- **PLACEHOLDER REQUIRED** — design slot exists; shown on the prototype with a visible "Awaiting official content" label
- **NEEDS CLIENT CONFIRMATION** — found, but outdated / inconsistent / translated, must be confirmed before production

---

## 1. VERIFIED

### 1.1 Brand
| Item | Value | Source |
|---|---|---|
| Logo | 3 SVG files supplied (white / black / primary). Used unmodified. | Client files |
| Brand accent colour | `#F47B42` (fill of the arc + lens ring in `vision-logo_P-01.svg`) | Client files |
| Logo ink colour | `#231F20` (`vision-logo_B-02.svg`) | Client files |
| Company name | Visionhitech Co., Ltd. | /about-visionhitech/ |

### 1.2 Company facts
| Item | Value | Source |
|---|---|---|
| Established | Jan 1997 (as "Realtech"; renamed "Visionhitech Co., Ltd." Sep 2000) | /about-visionhitech/ history |
| Scope of business | Manufacture & supply of CCTV cameras and Recorders, System Integration (SI), Construction business for IT & communication systems, etc. | /about-visionhitech/ |
| Headquarters / Factory | Vision Bldg., 31 Bucheon-ro 36beon-gil, Wonmi-gu, Bucheon-si, Gyeonggi-do, 14640 Korea | /about-visionhitech/, /contact/ |
| Second Factory | 40beon-gil 42, Bucheon-ro, Bucheon-si, Gyeonggi-do, 14640, Korea | /about-visionhitech/location/ |
| Third Factory | 83 Anaji-ro, Gyeyang-gu, Incheon, 21104 Korea | /about-visionhitech/location/ |
| Fourth Factory | 133beon-gil 28, Samjak-ro, Bucheon-si, Gyeonggi-do, 14452, Korea | /about-visionhitech/location/ |
| Tel | +82-32-610-7800 | /about-visionhitech/, /contact/ |
| Fax | +82-32-668-3113 | all contact pages |
| Email (general) | vht@visionhitech.co.kr | /about-visionhitech/, /location/ |
| Email (sales) | sales1@visionhitech.co.kr | /contact/ |
| Websites | www.visionhitechsecurity.com, www.visionipvideo.com (not reachable on 2026-09-28), www.visionhitech.co.kr | /about-visionhitech/ |
| Overseas entities (historical) | India branch established May 2011; Visionhitech Americas Inc. established Jun 2009 in southern California | History |

### 1.3 Mission / Vision / Philosophy (English, verbatim on the English site)
- Management Philosophy: **"Make our Customers Happy"** — "Customer's happiness is our happiness"
- Mission: "Visionhitech, as a global leading company in the development of Video image technologies with its spirit of challenge that developed and popularized globally the world's first high-definition camera decades ago, is committed to keep its dedication in the development of leading security technologies and contribute to the technological advancement of the global security industry and ultimately improve the happiness of mankind."
- Vision: Reliable High quality product manufacturer · Global Security industry Leader · Win-Win Creator with partners · On-Demand Employer (source spells "Hight"; corrected)
- Strategy: Value-up Branding · Competitive Advantage · Market Segmentation Strategy
- Core Values: 3 statements (see `src/content/en/company.ts`)
- CEO's Message: full text on /about-visionhitech/ceos-message/ (mentions "continuing to make aggressive and seamless efforts to develop 4K UHD and deep learning-based AI camera series")

### 1.4 History (1997 – 2020) — full list used on Company page
All entries from /about-visionhitech/ "Times that made Visionhitech". The latest entry is **2020-06**. Selected milestones relevant to the new IA:
- 2001-02 Patented world first "C/CS mount Variable Apparatus"
- 2002-03 ISO 9001/2000 Quality Management System · 2006-12 ISO 14001
- 2003-02 Visionhitech technology R&D Center · 2003-05 "True Day & Night Camera"
- 2011-04 Listed an ONVIF member · 2011-06 Patented "Smart Focus" tech · 2012-08 ONVIF Core2.2 Profile-S compliant products
- 2018-04 Launched the world's first engine room Camera *(→ Vision Marine anchor)*
- 2018-07 Acquired official TTA certification
- 2018-09 Started supplying Cameras & Solution to Incheon International Airport *(→ Transportation anchor)*
- 2018-11 Launched 4K IP Cameras
- 2018-12 Developed its own Server-based Video Analysis solution *(→ AI Vision anchor)*
- 2019-03 Developed Ultra Low-light Cameras (2MP IP & HD) · 2019-05 Secured its own technology for AF zoom module · 2019-10 Launched Fisheye Cameras
- 2020-06 Launched 4K@30fps full frame IP Camera

### 1.5 Certifications / Awards / Quality
- Quality Management page: "Vision Hitech has obtained ISO9001 / ISO14001 certification … ※ CE, FCC, UL, E-Mark, KC, UL, TTA, etc."
- Environmental test procedure described: Stability Test, Frequency Variation, Voltage DIP/Short/Variation, Voltage Fluctuation, Harmonic/Interharmonics, IP69K Water Intrusion (80℃ water, 80–100 BAR), IP68 immersion, Transportation Vibration Test
- Certification / Awards board (16 items): Consortium SW Certificate; Company-affiliated research institute certificate; Good Design 2007 (×2), 2008 (VDS121), 2009 (Apache II); Venture Design Award 2007; Excellent quality product 2008; 20 Million Dollar Export Tower 2006; Taxpayer's Day award 2005; …
- Download board (Approval category): EMC TEST REPORT VNN10/VNN62/VNV13/VNV80 (FCC), Supplier's Declaration of Conformity VNV80 (FCC), Vehicle Approval Authority VDA50SMTi / VCI70131 (E-MARK), EC Declaration of Conformity Bullet Camera (CE), Environmental Test Report VNPXX (IP rating)
- NDAA: "The design and manufacture of the product are of Korean origin and fully comply with the NDAA protocol." (NDAA page; also on NVR/DVR pages)
- Korean site: 12 registered patents 2004–2013 (Korean titles)

### 1.6 Technology (from /news/vision-technology/*)
| Technology | Verified claim (short) |
|---|---|
| Ultra STARLUX | Full colour down to 0.1 lux; below 0.1 lux True DN B/W with IR. "Low light performance by 50% higher than the STARVIS camera" |
| STARLUX | Full colour down to 0.2 lux |
| Color-Night | "See through the near zero darkness in full color without IR" — 4× large F-stop lens + sensitive sensor + high-end ISP |
| Smart IR | IR amount controlled by object distance |
| Long-range, low heat Hi-power IR | IR capture up to 80 M (on specific models; 50M/80M per model) |
| Ultra-Smart Rate Control (USRC) | Data saving "around 80% lower" vs conventional SBC (home page states "above 70%" — **inconsistent**, see §4) |
| Advanced ROI | Higher quality in region of interest, background kept alive; demonstration 10Mbps vs 1Mbps |
| Triple-streaming | All codecs at real-time 30 fps |
| Low-latency video to any device | — |
| True Day & Night (ICR) | ICR with focus-shift compensation |
| Real WDR (120dB) | — |
| Corridor View | Hallway view (school hallway, passenger boat, hotel examples) |
| Enhanced Heat Dissipation · Quick & Precise AF & Zoom · Smart Network Indication · Waterproof SD-card slot (patented) · Anti-condensation sensor & heater · Anti-IR Reflection | Smart hardware technologies page |
| UHD 4K IP | VNNx1U4AR series; "reduces the size of transmission bandwidth to smaller than 20%" |

### 1.7 Products — 85 items
Extracted to `src/data/products.generated.json` with: model, title, tier label, category, series, form factor, headline bullets, overview, key/general/special features, document types, image, source URL.

| New IA category | Count | Existing site series |
|---|---|---|
| IP Camera | 52 | 2MP (23), 4MP (8), 6MP (6), 4K (10), Specialty (5: panoramic ×2, covert, 3MP mini-dome ×2) |
| NVR | 3 | VR04S / VR08S / VR16S (Middle) |
| HD Analog Camera | 13 | 2MP (9), 5MP (2), Specialty (2) |
| DVR | 3 | VD04T / VD08T / VD16T Hybrid DVR |
| Software | 1 | NVR C/S Video Management Software (from /products-solutions/solutions/) |
| Accessory | 14 | 13 mounts / junction boxes / adaptors + WTX-1200A PTZ controller |

Excluded: `VNN31E54AR` — listed as "TTA Certification camera – Coming soon !!!!" with no content.

### 1.8 Software — NVR C/S VMS (verified package table)
Packages 16 / 32 / 64 / Unlimited; cameras per recording 16/36/64/64; multi-server No/No/No/Yes; servers 1/1/1/Unlimited; Client Live 16/36/64/128; Client Playback 16 each; users 1/5/5/32; Alarm Manager, Map, Watchdog all Yes. Components: Server, Client Live, Client Playback, E-map, Setup, Event Server. Public PDFs: `VMS_Catalogue.pdf`, `VMS_Manual.pdf`.

### 1.9 Support
- Warranty policy (full text, last update June 10th, 2020) incl. DOA process, RMA process, TAT (4 weeks; PTZ 3 weeks), RMA form (xlsx, public)
- Download board categories: IP CAMERA (2MP/4MP/6MP/4K/Specialty), HD ANALOG, NVR, DVR, VMS, Accessories, General, Approval (CE, E-MARK, FCC, IP RATING, ISO, KC, TTA, UL). Public item: IPScan Utility 1.1.5.1
- Technical Guide board (2 items: "CE" documents)
- Brochures: VISIONHITECH PRODUCT GUIDE 2019, PRODUCT GUIDE 2021
- Per product: document *types* listed (Datasheet, Manual, Drawing, F/W, Product Image; accessories: Product Image, Drawing, Catalog). **The individual files are not publicly linked** on the rendered pages.

### 1.10 News (3 items, all dated 2020-06-03)
Non-Hisilicon Recorder Launched · New Ambarella Smart H.265 IPC · Ultra Lowlight 4K Coming

### 1.11 Images (owned/used by VISION HITECH on its site)
85 product studio photos (800×800, #F1F2F3 background), HQ building, 3rd/4th factory, production line, test chamber, water-spray test, technology comparison sets (WDR, Ultra STARLUX, ROI, Color-Night, Smart IR, long-range IR, True D/N), VMS screenshots, news images, 2 transparent product renders. See `ASSET_SOURCES.md`.

---

## 2. MISSING (needed by the new IA, no official source found)

| IA item | Status |
|---|---|
| Solutions › AI Vision | No page. Only evidence: 2018-12 "Server-based Video Analysis solution", CEO message "deep learning-based AI camera series" (in development), PTZ spec "Intelligent Object based Motion Detection", news "VA is available by Edge based" (incomplete sentence). **No AI function list, accuracy, or model support exists.** |
| Solutions › Transportation | No page. Evidence: Incheon International Airport supply (2018), E-Mark vehicle approvals (VDA50SMTi, VCI70131), 10× zoom camera use examples ("highway intersection, crossroad, airport"). |
| Solutions › Vision Marine | No page. Evidence: "world's first engine room Camera" (2018), Corridor View example "Passenger boat". No marine product line on the English site. |
| Solutions › Video Security | No dedicated page; content can be assembled from verified technology pages. |
| Support › Security Policy | No page (product cyber-security policy). |
| Support › FAQ | No English FAQ. Korean site has a FAQ board. |
| Support › Tech Support | No process/contact page beyond general contact. |
| Support › Marketing Materials | Only 2 brochures (2019, 2021). |
| Media Center › Event, News Letter | No content. |
| Media Center › YouTube, LinkedIn | No channel URLs found. |
| Company › Organization | Org chart image only (`company_orger_img_re2-2.png`), no text. |
| Recent news (2021–2026) | None. |
| Product datasheet PDFs | Not publicly linked. |
| Product line after 2020 (beyond 2026 WooCommerce items VNN32F7VYR, VNV14F7VYR) | Unknown. |
| Japanese content | Out of scope (Phase 7+). |

## 3. PLACEHOLDER REQUIRED (visible on the prototype, clearly labelled)

- AI Vision capability list and imagery → "Awaiting official content" slots
- Transportation & Vision Marine application copy, reference projects, product mapping
- Support: Security Policy, FAQ entries, Tech Support process, Newsletter
- Media Center: Event, YouTube, LinkedIn links
- Organization chart (text)
- Current company figures (employees, turnover, export countries) — **not displayed** on the prototype
- Product datasheet downloads → "Request document" via inquiry drawer
- Newsletter sign-up backend, inquiry/contact backend

## 4. NEEDS CLIENT CONFIRMATION

| # | Item | Detail |
|---|---|---|
| 1 | Company figures | Employees 150, Capital $10,711,783, Turnover $50,000,000 shown on /about-visionhitech/ — year unknown; history ends 2020. **Not used on prototype.** |
| 2 | "Years" statements | Site uses "over 30 years", "past 23 years", "more than 20 years" in different places. Prototype uses only "Since 1997". |
| 3 | Main phone number | +82-32-610-7800 (About, Contact) vs +82-32-610-7811 (Location). Prototype uses 7800. |
| 4 | Inquiry email | vht@ (general) vs sales1@ (contact page). Prototype: sales1@ for product inquiry, vht@ general. |
| 5 | Warranty period | Intro text: 24 months (12 for PTZ). Policy table: 27 months cameras/NVR/DVR, 15 PTZ, 9 zoom module (incl. 3 months delivery/stock). Prototype shows the table with the note. |
| 6 | USRC saving | "around 80% lower" (technology page) vs "performance above 70%" (home page). Prototype uses the technology-page wording only inside the tech description. |
| 7 | Model codes | Store name vs product-page headline differ: VNN631U4AR / VNN631LU4AR; VNN32F7VYR / VNN32FVYR; VNN63184AR / VNV63184AR; VNV15LU4AR overview text says "VNV151U4AR"; VNV80C51AR title "3.6mm" vs page "2.8mm"; VNV13C54AR store title "Outdoor Vandal Dome" vs page "Indoor Dome". Prototype uses the WooCommerce store name. |
| 8 | NVR tier | Site menu has NVR "Middle" and "Premium"; only Middle has products. |
| 9 | Solutions naming | New IA: Technology / AI Vision / Video Security / Transportation / Vision Marine — content owner and scope per page. |
| 10 | Mission text | English mission contains "world's first high-definition camera decades ago" — claim to be re-confirmed for global use. |
| 11 | "world's first" claims in history | "world first C/CS mount Variable Apparatus" (2001), "world's first engine room Camera" (2018), "first company in Korea" S/W certificate (2018). Displayed in History as company-stated milestones. |
| 12 | Image ownership | Lifestyle images on the current site (airport travellers, cyclists, city night, crowd) may be stock — licence to be confirmed for production. |
| 13 | Typos corrected on display | Complaint→Compliant, STALUX→STARLUX, STAVIS→STARVIS, Wide-Angel→Wide-Angle, 3-Aix/3-Asix→3-Axis, Amor→Armor, Visionohitech→Visionhitech, Hight→High. |
| 14 | Korean-site Vision translation | Not used; English site has its own Vision text. |
