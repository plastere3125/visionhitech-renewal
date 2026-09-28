"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { Logo } from "@/components/shared/Logo";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { InquiryButton } from "@/components/shared/Inquiry";
import { CATEGORY_IMAGE } from "@/data/visuals";
import type { CategoryId } from "@/data/catalog";
import { productsIn } from "@/data/catalog";
import { cn } from "@/lib/cn";

const MENU_VISUAL: Record<string, { src: string; alt: string; caption: string }> = {
  solutions: { src: "/images/site/lux-ustarlux-10.webp", alt: "Ultra STARLUX demonstration image", caption: "Ultra STARLUX — VISION HITECH demonstration footage" },
  support: { src: "/images/site/test-water-spray.webp", alt: "Water intrusion test diagram", caption: "IP69K water intrusion test procedure" },
  media: { src: "/images/site/news-4k.webp", alt: "4K dome camera over a night city", caption: "Ultra Lowlight 4K — news, 2020" },
  company: { src: "/images/site/hq-building.webp", alt: "VISION HITECH head office, Bucheon", caption: "Head office & factory — Bucheon, Korea" },
};

export function HeaderA() {
  const { site } = getContent();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoverCat, setHoverCat] = useState<CategoryId>("ip-camera");
  const [lastPath, setLastPath] = useState(pathname);
  const closeTimer = useRef<number | undefined>(undefined);

  // Close menus when the route changes (state reset during render, no effect needed).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenId(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const enter = (id: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenId(id);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpenId(null), 140);
  };

  const active = site.nav.find((g) => g.id === openId);

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || openId ? "border-line bg-white/95 backdrop-blur-md" : "border-transparent bg-white",
      )}
      onMouseLeave={leave}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-fg focus:px-3 focus:py-2 focus:text-bg">
        {site.ui.skipToContent}
      </a>
      <div className={cn("mx-auto flex max-w-[1440px] items-center gap-8 px-5 transition-[height] duration-300 md:px-10", scrolled ? "h-16" : "h-16 lg:h-[76px]")}>
        <CLink concept="a" href="/" className="shrink-0" aria-label="VISION HITECH home">
          <Logo variant="primary" height={scrolled ? 22 : 25} className="transition-all duration-300" />
        </CLink>

        <nav aria-label="Main" className="hidden h-full lg:block">
          <ul className="flex h-full items-center">
            {site.nav.map((g) => (
              <li key={g.id} className="h-full" onMouseEnter={() => enter(g.id)}>
                <button
                  type="button"
                  aria-expanded={openId === g.id}
                  aria-controls="a-mega"
                  onClick={() => setOpenId(openId === g.id ? null : g.id)}
                  onFocus={() => enter(g.id)}
                  className={cn(
                    "relative flex h-full items-center px-4 text-[0.92rem] font-medium tracking-[-0.01em] transition-colors",
                    openId === g.id ? "text-fg" : "text-fg/80 hover:text-fg",
                  )}
                >
                  {g.label}
                  <span
                    aria-hidden
                    className={cn("absolute inset-x-4 bottom-0 h-[2px] origin-left bg-accent transition-transform duration-300", openId === g.id ? "scale-x-100" : "scale-x-0")}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 md:gap-5">
          <LanguageSwitch className="hidden sm:flex" />
          <InquiryButton className="hidden bg-fg px-4 py-2.5 text-[0.82rem] font-semibold text-white transition-colors hover:bg-accent hover:text-fg md:inline-flex">
            {site.ui.productInquiry}
          </InquiryButton>
          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="a-mobile-nav"
            aria-label={site.ui.menu}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6">
              <span className={cn("absolute left-0 h-[1.5px] w-6 bg-fg transition-transform", mobileOpen ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-[1.5px] w-6 bg-fg transition-transform", mobileOpen ? "top-1.5 -rotate-45" : "top-3")} />
            </span>
          </button>
        </div>
      </div>

      {/* Desktop mega menu */}
      <div
        id="a-mega"
        onMouseEnter={() => window.clearTimeout(closeTimer.current)}
        className={cn(
          "absolute inset-x-0 top-full hidden origin-top border-b border-line bg-white transition-[opacity,transform] duration-300 lg:block",
          active ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        {active && (
          <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 px-10 pt-10 pb-12">
            <div className="col-span-3 border-r border-line pr-10">
              <p className="a-label text-accent-ink">{active.label}</p>
              <p className="mt-4 text-[1.35rem] leading-snug font-medium tracking-[-0.02em]">{active.intro}</p>
              <CLink concept="a" href={active.href} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                {site.ui.viewAll} {active.label}
                <Arrow className="transition-transform group-hover:translate-x-1" />
              </CLink>
            </div>
            <ul className="col-span-5 grid grid-cols-2 content-start gap-x-8">
              {active.links.map((l, i) => {
                const cat = active.id === "products" ? (l.href.split("#")[1] as CategoryId) : null;
                return (
                  <li key={l.href} onMouseEnter={() => cat && setHoverCat(cat)} onFocus={() => cat && setHoverCat(cat)}>
                    <CLink
                      concept="a"
                      href={l.href}
                      className="group flex items-baseline gap-3 border-b border-line py-3.5 text-[0.98rem] transition-colors hover:text-accent-ink"
                      onClick={() => setOpenId(null)}
                    >
                      <span className="w-5 font-mono text-[0.68rem] text-mute">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-medium">{l.label}</span>
                      {cat && <span className="ml-auto text-xs text-mute">{productsIn(cat).length}</span>}
                    </CLink>
                  </li>
                );
              })}
            </ul>
            <div className="col-span-4">
              {active.id === "products" ? (
                <figure className="relative aspect-[4/3] overflow-hidden bg-studio">
                  <Img key={hoverCat} src={CATEGORY_IMAGE[hoverCat]} alt="" fill sizes="30vw" className="animate-[fadein_.4s_ease] object-contain p-6" />
                  <figcaption className="absolute bottom-4 left-5 text-sm">
                    <span className="a-label text-mute">{site.categories[hoverCat].short}</span>
                    <span className="mt-1 block max-w-[18rem] text-[0.85rem] text-fg/80">{site.categories[hoverCat].blurb}</span>
                  </figcaption>
                </figure>
              ) : (
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden bg-studio">
                    <Img src={MENU_VISUAL[active.id].src} alt={MENU_VISUAL[active.id].alt} fill sizes="30vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-3 text-xs text-mute">{MENU_VISUAL[active.id].caption}</figcaption>
                </figure>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes fadein{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:none}}`}</style>
    </header>
      {/* Mobile navigation */}
    <div
      id="a-mobile-nav"
      className={cn(
        "fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white transition-[opacity,visibility] duration-300 lg:hidden",
        mobileOpen ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <nav aria-label="Mobile" className="px-5 pt-4 pb-16">
        {site.nav.map((g) => (
          <MobileGroup key={g.id} group={g} />
        ))}
        <div className="mt-8 flex items-center justify-between">
          <LanguageSwitch />
          <InquiryButton className="bg-fg px-5 py-3 text-sm font-semibold text-white">{site.ui.productInquiry}</InquiryButton>
        </div>
        <p className="mt-8 text-sm text-mute">
          {site.contact.tel}
          <br />
          {site.contact.salesEmail}
        </p>
      </nav>
    </div>
    </>
  );
}

function MobileGroup({ group }: { group: ReturnType<typeof getContent>["site"]["nav"][number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="a-display flex w-full items-center justify-between py-5 text-left text-[1.6rem]"
      >
        {group.label}
        <span aria-hidden className={cn("text-xl transition-transform", open && "rotate-45")}>
          +
        </span>
      </button>
      <ul className={cn("grid overflow-hidden transition-[grid-template-rows] duration-300", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <li className="min-h-0">
          <ul className="pb-5">
            <li>
              <CLink concept="a" href={group.href} className="block py-2 text-sm font-semibold">
                Overview
              </CLink>
            </li>
            {group.links.map((l) => (
              <li key={l.href}>
                <CLink concept="a" href={l.href} className="block py-2 text-[0.95rem] text-fg/75">
                  {l.label}
                </CLink>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className={className}>
      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
