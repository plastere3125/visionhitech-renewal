#!/usr/bin/env python3
"""Interaction checks against a built/deployed site. Usage: python3 scripts/e2e-check.py <base-url-with-basepath>"""
import sys
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1].rstrip("/")
results = []

def check(name, fn):
    try:
        fn(); results.append(("PASS", name))
    except Exception as e:
        results.append(("FAIL", f"{name}: {str(e).splitlines()[0][:160]}"))

with sync_playwright() as p:
    b = p.chromium.launch()
    d = b.new_page(viewport={"width": 1440, "height": 900})
    m = b.new_page(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)

    def root():
        d.goto(BASE + "/", wait_until="networkidle")
        expect(d.get_by_role("link", name="View Concept").first).to_be_visible()
        d.get_by_role("link").filter(has_text="Global Vision Technology").click()
        d.wait_for_url("**/concept-a/")
    check("Root → Concept A link", root)

    for c in ["a", "b"]:
        def mega(c=c):
            d.goto(f"{BASE}/concept-{c}/", wait_until="networkidle")
            d.locator("header nav[aria-label=Main] button", has_text="Products").hover()
            panel = d.locator(f"#{c}-mega")
            expect(panel.get_by_role("link", name="NVR", exact=False).first).to_be_visible()
            panel.get_by_role("link").filter(has_text="NVR").first.click()
            d.wait_for_url("**/products/#nvr")
            d.wait_for_timeout(400)
            n = d.locator("main ul li article").count()
            assert n == 3, f"expected 3 NVR cards after menu navigation, got {n}"
        check(f"[{c.upper()}] Mega menu → Products#nvr", mega)

        def filter_count(c=c):
            d.goto(f"{BASE}/concept-{c}/products/#dvr", wait_until="networkidle")
            d.wait_for_timeout(300)
            n = d.locator("main ul li article").count()
            assert n == 3, f"expected 3 DVR cards, got {n}"
        check(f"[{c.upper()}] Category filter via hash (DVR=3)", filter_count)

        def inquiry(c=c):
            d.goto(f"{BASE}/concept-{c}/products/vr16s/", wait_until="networkidle")
            d.locator("main").get_by_role("button", name="Product Inquiry").first.click()
            dlg = d.locator("dialog[open]")
            expect(dlg).to_be_visible()
            val = dlg.locator("select[name=product]").input_value()
            assert val == "VR16S", f"product preselected = {val!r}"
            dlg.locator("input[name=name]").fill("QA Tester")
            dlg.locator("input[name=company]").fill("QA Co")
            dlg.locator("select[name=country]").select_option("Japan")
            dlg.locator("input[name=email]").fill("qa@example.com")
            dlg.locator("textarea[name=message]").fill("Test")
            dlg.get_by_role("button", name="Send Inquiry").click()
            expect(dlg.get_by_role("status")).to_contain_text("Prototype only.")
            expect(dlg.get_by_role("status")).to_contain_text("Backend connection will be implemented during production")
            d.keyboard.press("Escape")
            expect(d.locator("dialog[open]")).to_have_count(0)
        check(f"[{c.upper()}] Product Inquiry prefill + prototype submit + Esc", inquiry)

        def required(c=c):
            d.goto(f"{BASE}/concept-{c}/contact/", wait_until="networkidle")
            d.get_by_role("button", name="Send Inquiry").click()
            assert d.get_by_role("status").count() == 0, "notice shown without required fields"
        check(f"[{c.upper()}] Contact form blocks empty submit", required)

        def lang(c=c):
            d.goto(f"{BASE}/concept-{c}/", wait_until="networkidle")
            jp = d.locator("header [aria-disabled=true]").first
            expect(jp).to_contain_text("JP")
        check(f"[{c.upper()}] JP shown as disabled / coming soon", lang)

        def mobile(c=c):
            m.goto(f"{BASE}/concept-{c}/", wait_until="networkidle")
            m.locator(f"header button[aria-controls={c}-mobile-nav], header button[aria-controls={c}-mobile]").first.click()
            nav = m.locator(f"#{c}-mobile-nav, #{c}-mobile").first
            expect(nav).to_be_visible()
            if c == "a":
                nav.get_by_role("button", name="Support").click()
                expect(nav.get_by_role("link", name="Warranty")).to_be_visible()
            else:
                nav.get_by_role("tab", name="Support").click()
                expect(nav.get_by_role("link", name="Warranty")).to_be_visible()
        check(f"[{c.upper()}] Mobile navigation", mobile)

    def mobile_scrolled():
        m.goto(f"{BASE}/concept-a/", wait_until="networkidle")
        m.evaluate("window.scrollTo(0, 1500)"); m.wait_for_timeout(300)
        m.locator("header button[aria-controls=a-mobile-nav]").click()
        expect(m.locator("#a-mobile-nav").get_by_role("button", name="Company")).to_be_visible()
        box = m.locator("#a-mobile-nav").bounding_box()
        assert box and box["height"] > 600, f"mobile panel height {box}"
    check("[A] Mobile navigation after scroll (panel full height)", mobile_scrolled)

    def slider():
        d.goto(f"{BASE}/concept-a/", wait_until="networkidle")
        r = d.locator("#tech-a-panel input[type=range]")
        r.focus(); v0 = r.input_value(); d.keyboard.press("ArrowRight"); d.keyboard.press("ArrowRight")
        assert r.input_value() != v0, "range did not change with keyboard"
    check("[A] Compare slider keyboard", slider)

    def eco():
        d.goto(f"{BASE}/concept-b/", wait_until="networkidle")
        d.get_by_role("button", name="NVR").filter(has_text="MODELS").first.click()
        expect(d.locator("section[aria-labelledby=eco-b] h3")).to_have_text("NVR")
    check("[B] Ecosystem node selection", eco)

    def listview():
        d.goto(f"{BASE}/concept-b/products/", wait_until="networkidle")
        d.get_by_role("button", name="list").click()
        assert d.locator("main ul li a[href*='/products/']").count() >= 86
    check("[B] Products list view", listview)

    b.close()

for s, n in results:
    print(s, n)
print("SUMMARY", sum(1 for s, _ in results if s == "PASS"), "/", len(results))
