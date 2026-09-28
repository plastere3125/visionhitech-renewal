#!/usr/bin/env python3
"""
Optimise source images into public/images as WebP.

Inputs (.cache/raw, not committed):
  products/  product photos downloaded from visionhitechsecurity.com (WooCommerce main image)
  site/      images used on visionhitechsecurity.com pages
  ext/       Wikimedia Commons images (see ASSET_SOURCES.md)

Product photos are NEVER altered in shape or content. The only processing is:
  resize, WebP encode, and (for a short list of dark-housing products) removal of the
  flat #F1F2F3 studio background by a border flood-fill, so the unchanged product pixels
  can sit on the dark Concept B background. White housings are excluded because their
  highlights are too close to the studio background colour.
"""
import json, os
from collections import deque
import numpy as np
from PIL import Image, ImageFile, ImageFilter

ImageFile.LOAD_TRUNCATED_IMAGES = True
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, ".cache", "raw")
PUB = os.path.join(ROOT, "public", "images")

CUTOUTS = ["vnn64lu4ar", "vnv15lu4ar", "vnv23lu4ar", "vnv13lu4ar", "vr16s", "vd16t", "vnn64c57ar", "vnv23194ar", "vnn63lu4ar"]

# site images: output name -> (source file, max width)
SITE = {
    "hq-building": ("head-office-ver5-1.jpg", 1600),
    "factory-3": ("third-factory-ver4.jpg", 900),
    "factory-4": ("fourth-factory-ver4.jpg", 900),
    "production-line": ("thum04.png", 1000),
    "test-chamber": ("quility_img01.jpg", 600),
    "test-water-spray": ("quility_img05.png", 900),
    "wdr-normal": ("WDR_right.jpg", 1000),
    "wdr-on": ("WDR_left.jpg", 1000),
    "lux-normal-01": ("normal-cam-at-0.1-lux-1.png", 600),
    "lux-ustarlux-01": ("u-starlux-cam-at-0.1-lux.png", 600),
    "lux-ustarlux-10": ("u-starlux-cam-at-1.0-lux.png", 600),
    "roi-normal": ("ROI01.png", 1000),
    "roi-basic": ("ROI02.png", 1000),
    "roi-advanced": ("ROI03.png", 1000),
    "colornight-normal": ("color-night01-1.png", 700),
    "colornight-ir": ("color-night02-1.png", 700),
    "colornight-on": ("color-night03.png", 700),
    "smartir-normal": ("smartIR_02.png", 925),
    "smartir-on": ("smartIR_01.png", 925),
    "ir-longrange-normal": ("50M사람-1.jpg", 907),
    "ir-longrange-on": ("50M사람_2.jpg", 907),
    "truedn-day": ("true03.png", 1000),
    "truedn-night": ("true03_2.png", 1000),
    "uhd-street": ("4K-UHD.png", 400),
    "triple-stream": ("triple_sample.png", 1226),
    "vms-screen": ("vms_img01.png", 600),
    "vms-architecture": ("vms_img02-2.png", 600),
    "sd-slot": ("tech10-water.png", 500),
    "heat-dissipation": ("tech11_img1.png", 500),
    "network-indicator": ("tech12_img01.png", 500),
    "zoom-10x": ("VTV23A57ER-0550-10x-VF-Zoom_Tech_10X_zoom.png", 600),
    "news-recorder": ("news01_re-1.png", 500),
    "news-ambarella": ("news02_re.png", 500),
    "news-4k": ("news03.png", 500),
    "render-dome-dark": ("main-slide-new-01.png", 390),
    "render-dome-white": ("main-slide-new-04.png", 390),
    "composite-night": ("img_section01_2_re2.png", 540),
    "ndaa": ("ndaa_logo.png", 500),
    "corridor-hotel": ("corrido_3.png", 500),
    "corridor-school": ("corrido_1.png", 500),
    "vms-e-map": ("vms_img03-2.png", 600),
}
EXT = {
    "env-marine-day": "container-ship-in-koper-2013.jpg",
    "env-marine-night": "colombo-express-in-altenwerder-at-night-799096.jpg",
    "env-crossroads": "crossroads-flickr-mtnoxx.jpg",
    "env-city-night": "kazan-city-night-aerial-view-southboubd-1686294804.jpg",
}


def save(im, path, width, q=78):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(path, "WEBP", quality=q, method=6)
    return im.size


def cutout(src):
    im = Image.open(src).convert("RGB")
    a = np.asarray(im).astype(int)
    h, w, _ = a.shape
    bg = np.median(np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]]), axis=0)
    cand = np.abs(a - bg).max(axis=2) <= 7
    mask = np.zeros((h, w), bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if cand[y, x] and not mask[y, x]:
                mask[y, x] = True; q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if cand[y, x] and not mask[y, x]:
                mask[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and cand[ny, nx] and not mask[ny, nx]:
                mask[ny, nx] = True; q.append((ny, nx))
    alpha = Image.fromarray(((~mask) * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(1.1))
    out = im.convert("RGBA"); out.putalpha(alpha)
    bbox = alpha.point(lambda v: 255 if v > 8 else 0).getbbox()
    pad = 24
    return out.crop((max(bbox[0] - pad, 0), max(bbox[1] - pad, 0), min(bbox[2] + pad, w), min(bbox[3] + pad, h)))


def main():
    products = json.load(open(os.path.join(ROOT, "src", "data", "products.generated.json")))
    raw_products = {os.path.splitext(f)[0]: f for f in os.listdir(os.path.join(RAW, "products"))}
    manifest = {}
    for p in products:
        src = os.path.join(RAW, "products", raw_products[p["slug"]])
        im = Image.open(src).convert("RGB")
        save(im, os.path.join(PUB, "products", f"{p['slug']}.webp"), 800)
        save(im, os.path.join(PUB, "products", f"{p['slug']}-sm.webp"), 420)
    for slug in CUTOUTS:
        c = cutout(os.path.join(RAW, "products", raw_products[slug]))
        manifest[f"cutouts/{slug}"] = save(c, os.path.join(PUB, "cutouts", f"{slug}.webp"), 900, q=86)
    for name, (src, w) in SITE.items():
        im = Image.open(os.path.join(RAW, "site", src))
        im = im.convert("RGBA") if im.mode in ("RGBA", "LA", "P") else im.convert("RGB")
        manifest[f"site/{name}"] = save(im, os.path.join(PUB, "site", f"{name}.webp"), w)
    for name, src in EXT.items():
        im = Image.open(os.path.join(RAW, "ext", src)).convert("RGB")
        manifest[f"env/{name}"] = save(im, os.path.join(PUB, "env", f"{name}.webp"), 1920, q=70)
    json.dump({k: list(v) for k, v in manifest.items()}, open(os.path.join(ROOT, "src", "data", "image-sizes.generated.json"), "w"), indent=1)
    print(f"products: {len(products)}, cutouts: {len(CUTOUTS)}, site: {len(SITE)}, env: {len(EXT)}")


if __name__ == "__main__":
    main()
