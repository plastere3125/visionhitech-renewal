# FACT CHECK — Revision 02

Checked on 2026-09-28 against the official sources below. Scope: every factual / claim-type phrase shown on the client-facing prototype.

Sources
- [S1] https://visionhitechsecurity.com/about-visionhitech/ (company table, history "Times that made Visionhitech", Mission / Vision)
- [S2] https://visionhitechsecurity.com/about-visionhitech/location/
- [S3] https://visionhitechsecurity.com/quality-management/
- [S4] https://visionhitechsecurity.com/news/vision-technology/* (technology pages)
- [S5] Product pages, e.g. https://visionhitechsecurity.com/product/vr16s/
- [S6] https://visionhitechsecurity.com/about-visionhitech/ceos-message/
- [S7] https://visionhitechsecurity.com/download/ (approval documents)
- [S8] https://visionhitechsecurity.com/ (home page)

Status: **VERIFIED** (found on an official source, used as stated) · **SOFTENED** (official source exists but wording changed to a safer factual form) · **NOT USED**

| Phrase on prototype | Status | Source / note |
|---|---|---|
| Established 1997 / "Since 1997" | VERIFIED | S1 "Est. Jan, 1997"; history 1997-01 "Established Realtech", 2000-09 renamed |
| Made in Korea / Korean-origin design and manufacture | VERIFIED | S8 "Made in Korea IP Cameras"; NDAA page & NVR/DVR pages "design and manufacture of the product are of Korean origin" |
| NDAA compliant | VERIFIED — **scoped to "NDAA compliant models"** | S5 (listed per model: 4K/6MP IP, NVR, DVR…). Not claimed for every product |
| HQ + 3 factories (Bucheon, Incheon) | VERIFIED | S2 Head Office, Second, Third, Fourth Factory addresses |
| R&D Center 2003 | VERIFIED | S1 2003-02 |
| ISO 9001 · ISO 14001 | VERIFIED | S3 "obtained ISO9001 / ISO14001 certification" |
| CE, FCC, UL, E-Mark, KC, TTA | VERIFIED | S3 "※ CE, FCC, UL, E-Mark, KC, UL, TTA, etc." + S7 documents |
| ONVIF Profile S | VERIFIED | S1 2012-08 "ONVIF Core2.2 Profile-S compliant Products"; product pages |
| IP69K water intrusion / IP68 immersion / transport vibration tests | VERIFIED — **described as test procedures, not product ratings** | S3 environmental test procedure |
| Started supplying Incheon International Airport (2018) | VERIFIED | S1 2018-09 |
| Public local government supply agreements (2014) | VERIFIED | S1 2014-03, 2014-11 |
| E-Mark vehicle approvals VDA50SMTi, VCI70131 | VERIFIED | S7 |
| Engine room camera (2018) | **SOFTENED** | S1 says "Launched the world's first engine room Camera". "World's first" is a company claim not independently verifiable → shown as "Launched an engine room Camera" |
| C/CS mount Variable Apparatus patent (2001) | **SOFTENED** | S1 "Patented world first …" → "world first" removed |
| S/W official certificate (2018) | **SOFTENED** | S1 "…as first company in Korea" → qualifier removed |
| Mission statement | **SOFTENED (condensed)** | S1 original: "Visionhitech, as a global leading company in the development of Video image technologies with its spirit of challenge that developed and popularized globally the world's first high-definition camera decades ago, is committed to …". Displayed: "Visionhitech is committed to developing security technologies that contribute to the advancement of the global security industry and, ultimately, the happiness of mankind." Client to approve final wording |
| Vision: "Global Security industry Leader" | VERIFIED as **stated vision (aspiration)** | S1 Vision list; shown only under the "Vision" heading, never as a factual ranking |
| Server-based video analysis solution (2018) | VERIFIED | S1 2018-12 |
| Deep learning-based AI camera series in development | VERIFIED | S6 "…continuing to make aggressive and seamless efforts to develop 4K UHD and deep learning-based AI camera series" |
| Intelligent object based motion detection | VERIFIED — **scoped to VNP36D5VAR** | S5 VNP36D5VAR |
| Ultra STARLUX full colour at 0.1 lux | VERIFIED | S4 low-light technologies |
| Advanced ROI 10Mbps → 1Mbps | VERIFIED — **demonstration labels** | S4 streaming page image captions |
| 480fps@4K2K, 4K/30 HDMI, 16CH (VR16S) | VERIFIED | S5 VR16S |
| Up to 128 cameras per Client Live (NVR C/S Unlimited) | VERIFIED | Solutions page package table |
| Warranty 27 / 15 / 9 months | VERIFIED — **conflict open** | Download › Warranty table; intro text on same page states 24 / 12 months → client confirmation (inventory §4 #5) |
| 52 IP camera / 86 total models | VERIFIED (derived) | WooCommerce catalogue count, one "coming soon" item excluded |
| "No.1", "Leading", "Global Leader", "Top tier" as factual claims | NOT USED | — |
| Company figures (150 employees, capital, USD 50M turnover) | NOT USED | S1 values have no reference year |
| Any AI function (object / face / vehicle / plate recognition, accuracy) | NOT USED | No official source |

## Internal review wording removed from client view (Revision 02)

"To be confirmed", "Awaiting official content", "Reserved for official AI Vision content", "Content slots for production", "Verified / Partially verified / PENDING" status labels, "Content note: model code differs…", source/SRC lines, "Latest posts … date from June 2020", "details awaiting", "scope / models to be confirmed", "PHOTO · TO BE CONFIRMED", "Map embed … to be confirmed", warranty confirmation note, "no dedicated … page" sentences, "(as stated by VISION HITECH)", "Illustrative 16CH …".

These items remain tracked in `VISIONHITECH_CONTENT_INVENTORY.md` (§2–§4) and in the `pending` fields of `src/content/en/solutions.ts` (not rendered). Where official content is missing the page shows a generic heading with a quiet "Coming soon" or a "Contact our team" action.
