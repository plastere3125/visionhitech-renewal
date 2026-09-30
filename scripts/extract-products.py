#!/usr/bin/env python3
"""
Extract VISION HITECH product data from the CURRENT official website
(https://visionhitechsecurity.com) into src/data/products.generated.json.

Source of truth:
  1. WooCommerce Store API  /wp-json/wc/store/v1/products   (name, category, image)
  2. Each rendered product page                             (headline, overview, features)

No text is invented. The only transformations are:
  - whitespace normalisation
  - a small, documented list of obvious typo corrections (TYPO_FIXES)
  - discrepancies between the store name and the page headline are recorded in `notes`

Usage:
  python3 scripts/extract-products.py            # uses .cache/ if present, else fetches
  python3 scripts/extract-products.py --refresh  # re-fetch everything
"""
import html, json, os, re, subprocess, sys
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, ".cache")
OUT = os.path.join(ROOT, "src", "data", "products.generated.json")
REFRESH = "--refresh" in sys.argv
UA = "Mozilla/5.0 (VisionHitech renewal prototype content audit)"

# Obvious spelling errors on the current site. Corrected for display, logged in the inventory.
TYPO_FIXES = [
    (r"\bComplaint\b", "Compliant"),
    (r"\bSTALUX\b", "STARLUX"),
    (r"\bSTAVIS\b", "STARVIS"),
    (r"\bStavis\b", "Starvis"),
    (r"Wide-Angel", "Wide-Angle"),
    (r"\b3-Aix\b", "3-Axis"),
    (r"\b3-Asix\b", "3-Axis"),
    (r"\bAmor\b", "Armor"),
    (r"Visionohitech", "Visionhitech"),
    (r"Phyiscal", "Physical"),
]
DOC_LABELS = {"Datasheet", "Datasheet(pdf)", "Manual", "Drawing", "Drawing(pdf)", "F/W", "Product Image", "Catalog"}
EXCLUDE = {"vnn31e54ar"}  # listed on the site as "TTA Certification camera – Coming soon", no content


def fetch(url, path):
    if REFRESH or not os.path.exists(path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        subprocess.run(["curl", "-sL", "-A", UA, "-o", path, url], check=True)
    return open(path, encoding="utf-8", errors="ignore").read()


def clean(s):
    s = html.unescape(s).replace(" ", " ")
    s = re.sub(r"\(\s+", "(", s)
    s = re.sub(r"\s+\)", ")", s)
    s = re.sub(r"\s+,", ",", s)
    s = re.sub(r"\s{2,}", " ", s).strip()
    for a, b in TYPO_FIXES:
        s = re.sub(a, b, s)
    return s


def lines_of(node):
    return [clean(l) for l in node.get_text("\n", strip=True).split("\n") if clean(l)]


def category_of(cats):
    if "hd-analogue" in cats:
        return "hd-analog-camera"
    if "nvr" in cats:
        return "nvr"
    if "hybrid-dvr" in cats:
        return "dvr"
    if "accessories" in cats:
        return "accessory"
    return "ip-camera"


def series_of(cat, cats):
    if cat == "ip-camera":
        for key, label in [("4k", "4K"), ("6mp", "6MP"), ("4mp", "4MP"), ("2mp-ip", "2MP")]:
            if key in cats:
                return label
        return "Specialty"
    if cat == "hd-analog-camera":
        for key, label in [("5mp", "5MP"), ("2mp-hd", "2MP")]:
            if key in cats:
                return label
        return "Specialty"
    if cat == "nvr":
        return "Middle"  # existing site places VR04S/VR08S/VR16S under NVR > Middle
    if cat == "dvr":
        return "Hybrid DVR"
    if "controller" in cats:
        return "Controller"
    return "Mount"


def form_of(cats):
    order = [
        ("ptz-ip", "PTZ"), ("fisheye", "Panoramic"), ("pinhole", "Covert"), ("miniature", "Miniature"),
        ("mini-bullet", "Mini Bullet"), ("junction-box", "Junction Box"), ("wall-mount-bracket", "Wall Mount"),
        ("ceiling-mount-bracket", "Ceiling Mount"), ("pole-mount-bracket", "Pole Mount"), ("adaptor", "Adaptor"),
        ("bracket", "Bracket"), ("controller", "PTZ Controller"), ("hybrid-dvr", "Hybrid DVR"), ("nvr", "PoE NVR"),
    ]
    for key, label in order:
        if key in cats:
            return label
    if any(c.startswith("bullet") for c in cats):
        return "Bullet"
    if any(c.startswith("dome") for c in cats):
        return "Dome"
    return None


def env_of(cats):
    if any(c.startswith("outdoor") for c in cats):
        return "Outdoor"
    if any(c.startswith("indoor") for c in cats):
        return "Indoor"
    return None


def parse_page(raw):
    s = BeautifulSoup(raw, "html.parser")
    main = s.find(id="main-content")
    blocks = [b for b in main.select(".et_pb_text") if b.get_text(strip=True)]
    head, overview, general, special, key = [], [], [], [], []
    tech = []
    in_key = False
    seen_sections = set()
    for b in blocks:
        ls = lines_of(b)
        h = ls[0].lower()
        if not head:
            head = ls
            continue
        if h in ("download", "dimension", "(unit : mm)"):
            in_key = False
            continue
        if "overview" in h:
            if "overview" not in seen_sections:
                overview = ls[1:]
                seen_sections.add("overview")
            in_key = False
        elif h == "general features":
            if "general" not in seen_sections:
                general = ls[1:]
                seen_sections.add("general")
            in_key = False
        elif h == "special features":
            if "special" not in seen_sections:
                special = ls[1:]
                seen_sections.add("special")
            in_key = False
        elif h == "key features":
            if "key" not in seen_sections:
                key = ls[1:]
                seen_sections.add("key")
                in_key = True
            else:
                in_key = False
        elif h == "technology":
            tech.append(" ".join(ls[1:]))
            in_key = False
        elif in_key:
            key += ls
    docs = []
    for bl in main.select(".et_pb_blurb .et_pb_module_header"):
        t = clean(bl.get_text(strip=True)).replace("product Image", "Product Image")
        if t in DOC_LABELS:
            t = t.replace("(pdf)", "")
            if t not in docs:
                docs.append(t)
    return head, overview, general, special, key, tech, docs


def join_fragments(items):
    """Feature lists are split on <br>; re-attach continuation lines (lowercase start / open bracket)."""
    out = []
    for l in items:
        if out and (l[:1].islower() or out[-1].count("(") > out[-1].count(")") or re.search(r"(\s(of|to)|:)$", out[-1])):
            out[-1] = f"{out[-1]} {l}"
        else:
            out.append(l)
    return [re.sub(r"!+$", "", x).strip() for x in out]


def merge_paragraphs(lines):
    """Divi splits paragraphs on inline <strong>; re-join fragments.
    Returns blocks: {"h": heading} for short title lines, {"p": text} for paragraphs."""
    out = []
    for i, l in enumerate(lines):
        nxt = lines[i + 1] if i + 1 < len(lines) else ""
        is_heading = (len(l) < 70 and not re.search(r"[.!?,:;]$", l) and not l[:1].islower()
                      and not l.startswith("(") and nxt[:1].isupper() and len(nxt) > 90)
        if is_heading:
            out.append({"h": l})
        elif out and "p" in out[-1] and (not re.search(r"[.!?:)]$", out[-1]["p"]) or l[:1].islower() or l.startswith("(")):
            out[-1]["p"] = f"{out[-1]['p']} {l}".replace(" ,", ",")
        else:
            out.append({"p": l})
    return out


def main():
    store = json.loads(fetch("https://visionhitechsecurity.com/wp-json/wc/store/v1/products?per_page=100",
                             os.path.join(CACHE, "store-products.json")))
    products = []
    for x in store:
        slug = x["slug"]
        if slug in EXCLUDE:
            continue
        cats = [c["slug"] for c in x["categories"]]
        raw = fetch(x["permalink"], os.path.join(CACHE, "pages", f"{x['id']}.html"))
        head, overview, general, special, key, tech, docs = parse_page(raw)
        model = clean(x["name"])
        model_base = re.sub(r"\s*\(.*$", "", model).strip()
        title = clean(BeautifulSoup(x["short_description"], "html.parser").get_text(" ", strip=True))
        notes = []
        # locate the model line in the headline block
        idx = next((i for i, l in enumerate(head) if re.match(r"^[A-Z]{2,4}[- ]?[0-9A-Z]{2,}", l) and l.upper()[:3] == model_base.upper()[:3]), None)
        tier = head[0] if idx and idx > 0 else None
        if idx is not None:
            shown = re.sub(r"\s*\(.*$", "", head[idx]).replace(" ", "")
            if shown.upper() != model_base.replace(" ", "").upper():
                notes.append(f"Model code differs on product page: store name '{model_base}' vs page headline '{shown}'.")
        rest = head[(idx + 1) if idx is not None else 1:]
        NAMEWORD = re.compile(r"camera|recorder|nvr|dvr|bracket|box|adaptor|controller|mount", re.I)
        sub = next((l for l in rest if not l.startswith("(") and NAMEWORD.search(l) and l.lower() in title.lower()), None) or next(
            (l for l in rest[:2] if not l.startswith("(") and NAMEWORD.search(l)), None)
        highlights = [l for l in rest if not l.startswith("(") and l.lower() not in title.lower() and l != sub]
        cat = category_of(cats)
        products.append({
            "slug": slug,
            "model": model_base,
            "modelVariant": model[len(model_base):].strip() or None,
            "title": title,
            "subtitle": sub,
            "tier": tier,
            "category": cat,
            "series": series_of(cat, cats),
            "form": form_of(cats),
            "environment": env_of(cats),
            "highlights": join_fragments(highlights)[:12],
            "overview": merge_paragraphs(overview),
            "features": {"key": join_fragments(key), "general": join_fragments(general), "special": join_fragments(special)},
            "technologyNotes": tech,
            "documents": docs,
            "image": f"/images/products/{slug}.webp",
            "sourceImage": x["images"][0]["src"] if x["images"] else None,
            "sourceUrl": x["permalink"],
            "notes": notes,
        })
        # Existing site lists the product in an additional top-level family (IP CAMERA > VHT ZOOM MODULE).
        if "vht-ip" in cats:
            products[-1]["alsoIn"] = ["zoom-module"]
    order = ["ip-camera", "nvr", "hd-analog-camera", "dvr", "accessory"]
    products.sort(key=lambda p: (order.index(p["category"]), p["series"], p["model"]))
    json.dump(products, open(OUT, "w"), ensure_ascii=False, indent=1)
    # Lightweight index for client components (filters, inquiry select, cards) — keeps long copy out of JS bundles.
    lite_keys = ["slug", "model", "title", "subtitle", "tier", "category", "series", "form", "environment", "image"]
    json.dump([{k: p[k] for k in lite_keys + ["alsoIn"] if k in p} for p in products], open(OUT.replace("products.generated", "catalog.generated"), "w"), ensure_ascii=False)
    print(f"{len(products)} products -> {os.path.relpath(OUT, ROOT)}")
    for p in products:
        if p["notes"]:
            print(" NOTE", p["model"], p["notes"])


if __name__ == "__main__":
    main()
