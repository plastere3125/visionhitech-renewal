"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";
import { Logo } from "@/components/shared/Logo";
import { productsIn, type CategoryId } from "@/data/catalog";
import { CUTOUT } from "@/data/visuals";
import { cn } from "@/lib/cn";
import { ArrowB } from "./ui";

/** Where each menu sits in the capture → response chain (Concept B narrative). */
const CHAIN_POS: Record<string, { step: string; visual: string; alt: string }> = {
  products: { step: "01 CAPTURE · 03 RECORD", visual: CUTOUT("vnv15lu4ar"), alt: "VNV15LU4AR 4K dome camera" },
  solutions: { step: "02 VIDEO DATA · 03 ANALYSIS", visual: CUTOUT("vnn64lu4ar"), alt: "VNN64LU4AR 4K bullet camera" },
  support: { step: "SERVICE", visual: CUTOUT("vr16s"), alt: "VR16S NVR" },
  media: { step: "UPDATES", visual: CUTOUT("vnv23lu4ar"), alt: "VNV23LU4AR 4K dome camera" },
  company: { step: "SINCE 1997", visual: CUTOUT("vd16t"), alt: "VD16T hybrid DVR" },
};

export function HeaderB({ overlay }: { overlay?: boolean }) {
  const { site } = getContent();
  const pathname = usePathname();
  const isHome = pathname?.replace(/\/$/, "").endsWith("/concept-b") ?? false;
  const [scrolled, setScrolled] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(site.nav[0].id);
  const [lastPath, setLastPath] = useState(pathname);
  const t = useRef<number | undefined>(undefined);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenId(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || !!openId || mobileOpen || !(overlay ?? isHome);
  const active = site.nav.find((g) => g.id === openId);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "border-b border-line bg-bg/92 backdrop-blur-md" : "border-b border-transparent bg-transparent",
      )}
      onMouseLeave={() => {
        t.current = window.setTimeout(() => setOpenId(null), 150);
      }}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-[#10141c]">
        {site.ui.skipToContent}
      </a>
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-5 md:px-10">
        <CLink concept="b" href="/" aria-label="VISION HITECH home" className="shrink-0">
          <Logo variant="white" height={21} />
        </CLink>
        <nav aria-label="Main" className="mx-auto hidden h-full lg:block">
          <ul className="flex h-full items-center gap-1">
            {site.nav.map((g, i) => (
              <li key={g.id} className="h-full">
                <button
                  type="button"
                  aria-expanded={openId === g.id}
                  aria-controls="b-mega"
                  onMouseEnter={() => {
                    window.clearTimeout(t.current);
                    setOpenId(g.id);
                  }}
                  onFocus={() => setOpenId(g.id)}
                  onClick={() => setOpenId(openId === g.id ? null : g.id)}
                  className={cn("flex h-full items-center gap-2 px-4 text-[0.88rem] transition-colors", openId === g.id ? "text-fg" : "text-fg/70 hover:text-fg")}
                >
                  <span className={cn("font-mono text-[0.62rem] transition-colors", openId === g.id ? "text-accent" : "text-mute")}>0{i + 1}</span>
                  {g.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-4 lg:ml-0">
          <LanguageSwitch className="hidden sm:flex" />
          <InquiryButton className="hidden items-center gap-2 border border-accent/70 px-3.5 py-2 font-mono text-[0.7rem] tracking-[0.1em] text-accent uppercase transition-colors hover:bg-accent hover:text-[#10141c] md:inline-flex">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
            Inquiry
          </InquiryButton>
          <button
            type="button"
            className="flex h-10 items-center gap-2 font-mono text-[0.7rem] tracking-[0.1em] uppercase lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="b-mobile"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? site.ui.close : site.ui.menu}
            <span className="relative block h-2.5 w-5" aria-hidden>
              <span className={cn("absolute left-0 h-px w-5 bg-fg transition-transform", mobileOpen ? "top-1 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-px w-5 bg-fg transition-transform", mobileOpen ? "top-1 -rotate-45" : "top-2.5")} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="b-mega"
        onMouseEnter={() => window.clearTimeout(t.current)}
        className={cn(
          "absolute inset-x-0 top-full hidden border-b border-line bg-bg/97 backdrop-blur-md transition-[opacity,clip-path] duration-300 lg:block",
          active ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]",
        )}
      >
        {active && (
          <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-10 py-10">
            <div className="col-span-3">
              <p className="b-code text-accent">{CHAIN_POS[active.id].step}</p>
              <p className="b-display mt-4 text-[1.9rem]">{active.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-mute">{active.intro}</p>
              <CLink concept="b" href={active.href} className="mt-6 inline-flex items-center gap-3 text-sm text-fg hover:text-accent">
                Overview <ArrowB />
              </CLink>
            </div>
            <ol className="col-span-6 grid grid-cols-2 content-start gap-x-6 border-l border-line pl-8">
              {active.links.map((l, i) => {
                const cat = active.id === "products" ? (l.href.split("#")[1] as CategoryId) : null;
                return (
                  <li key={l.href}>
                    <CLink
                      concept="b"
                      href={l.href}
                      onClick={() => setOpenId(null)}
                      className="group flex items-center gap-3 border-b border-line py-3 text-[0.95rem] text-fg/80 transition-colors hover:text-fg"
                    >
                      <span className="font-mono text-[0.65rem] text-mute group-hover:text-accent">{active.id.slice(0, 2).toUpperCase()}-{String(i + 1).padStart(2, "0")}</span>
                      {l.label}
                      {cat && <span className="ml-auto font-mono text-[0.65rem] text-mute">{String(productsIn(cat).length).padStart(2, "0")}</span>}
                    </CLink>
                  </li>
                );
              })}
            </ol>
            <div className="relative col-span-3 flex items-center justify-center">
              <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
              <Img key={active.id} src={CHAIN_POS[active.id].visual} alt={CHAIN_POS[active.id].alt} width={320} height={260} className="relative h-auto max-h-[200px] w-auto animate-[bfade_.5s_ease]" />
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes bfade{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:none}}`}</style>
    </header>
      {/* Mobile: group tabs on top, links below (different pattern from Concept A accordion) */}
    <div
      id="b-mobile"
      className={cn("fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-bg transition-[opacity,visibility] duration-300 lg:hidden", mobileOpen ? "visible opacity-100" : "invisible opacity-0")}
    >
      <div role="tablist" aria-label="Sections" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-5">
        {site.nav.map((g) => (
          <button
            key={g.id}
            role="tab"
            aria-selected={mobileGroup === g.id}
            onClick={() => setMobileGroup(g.id)}
            className={cn("shrink-0 border-b-2 px-3 py-4 text-sm", mobileGroup === g.id ? "border-accent text-fg" : "border-transparent text-mute")}
          >
            {g.label}
          </button>
        ))}
      </div>
      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
        {site.nav
          .filter((g) => g.id === mobileGroup)
          .map((g) => (
            <ol key={g.id}>
              <li>
                <CLink concept="b" href={g.href} className="b-display flex items-center justify-between border-b border-line py-4 text-[1.6rem]">
                  {g.label} <ArrowB />
                </CLink>
              </li>
              {g.links.map((l, i) => (
                <li key={l.href}>
                  <CLink concept="b" href={l.href} className="flex items-center gap-4 border-b border-line py-4 text-lg text-fg/85">
                    <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                  </CLink>
                </li>
              ))}
            </ol>
          ))}
      </nav>
      <div className="flex items-center justify-between border-t border-line px-5 py-4">
        <LanguageSwitch />
        <InquiryButton className="bg-accent px-4 py-2.5 text-sm font-semibold text-[#10141c]">{site.ui.productInquiry}</InquiryButton>
      </div>
    </div>
    </>
  );
}
