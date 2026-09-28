#!/usr/bin/env python3
"""
Visual QA: renders pages at 1440 / 1024 / 768 / 390 px, saves full-page screenshots and reports
horizontal overflow, broken images and console errors.

  python3 scripts/visual-qa.py http://localhost:3310 out_dir /concept-a/ /concept-b/ ...
  (requires `pip install playwright && playwright install chromium`)
"""
import json, sys, os
from playwright.sync_api import sync_playwright

base, out = sys.argv[1].rstrip("/"), sys.argv[2]
paths = sys.argv[3:] or ["/"]
widths = [int(w) for w in os.environ.get("QA_WIDTHS", "1440,1024,768,390").split(",")]
full = os.environ.get("QA_FULL", "1") == "1"
os.makedirs(out, exist_ok=True)
report = []
with sync_playwright() as p:
    b = p.chromium.launch()
    for path in paths:
        for w in widths:
            ctx = b.new_context(viewport={"width": w, "height": 900}, device_scale_factor=1)
            pg = ctx.new_page()
            errors = []
            pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
            pg.on("pageerror", lambda e: errors.append(str(e)))
            pg.goto(base + path, wait_until="networkidle")
            # scroll through to trigger reveals / lazy images
            h = pg.evaluate("document.documentElement.scrollHeight")
            for y in range(0, h, 600):
                pg.evaluate(f"window.scrollTo({{top:{y},behavior:\"instant\"}})")
                pg.wait_for_timeout(60)
            pg.evaluate("window.scrollTo({top:0,behavior:\"instant\"})")
            pg.wait_for_timeout(700)
            info = pg.evaluate("""() => {
              const vw = document.documentElement.clientWidth;
              const over = [];
              document.querySelectorAll('body *').forEach(el => {
                const r = el.getBoundingClientRect();
                if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
                  const cs = getComputedStyle(el);
                  let p = el.parentElement, clipped = false;
                  while (p) { const s = getComputedStyle(p); if (/(hidden|auto|scroll|clip)/.test(s.overflowX)) { clipped = true; break; } p = p.parentElement; }
                  if (!clipped && cs.position !== 'fixed') over.push((el.tagName + '.' + (el.className?.baseVal ?? el.className)).slice(0, 90));
                }
              });
              const broken = [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.currentSrc || i.src);
              return { docWidth: document.documentElement.scrollWidth, vw, over: over.slice(0, 8), broken };
            }""")
            name = path.strip("/").replace("/", "_") or "root"
            shot = f"{out}/{name}@{w}.png"
            pg.screenshot(path=shot, full_page=full)
            info.update(path=path, width=w, errors=errors[:5], shot=shot)
            report.append(info)
            flag = "OK " if info["docWidth"] <= info["vw"] and not info["broken"] and not errors else "!! "
            print(flag, path, w, "docW", info["docWidth"], "over", info["over"][:3], "broken", info["broken"][:3], "err", errors[:2])
            ctx.close()
    b.close()
json.dump(report, open(f"{out}/report.json", "w"), indent=1)
