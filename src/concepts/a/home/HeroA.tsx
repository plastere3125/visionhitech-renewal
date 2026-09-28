"use client";

import { useState } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { getItem } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { Arrow } from "../HeaderA";
import { btnGhost, btnPrimary } from "../ui";

/** Callout anchor points (percent of the studio panel) — product sits centred. */
const ANCHORS = [
  { x: 6, y: 16, align: "left" },
  { x: 94, y: 22, align: "right" },
  { x: 6, y: 78, align: "left" },
  { x: 94, y: 82, align: "right" },
] as const;

export function HeroA() {
  const { homeA, site } = getContent();
  const [idx, setIdx] = useState(0);
  const item = homeA.heroProducts[idx];
  const product = getItem(item.slug)!;

  return (
    <section aria-labelledby="hero-a-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-8 pb-10 md:px-10 lg:grid-cols-12 lg:gap-12 lg:pt-14 lg:pb-16">
        <div className="flex flex-col justify-between lg:col-span-5 lg:py-6">
          <div>
            <p className="a-label flex items-center gap-3 text-mute">
              <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
              {homeA.hero.eyebrow}
            </p>
            <h1 id="hero-a-title" className="a-display mt-7 text-[2.7rem] sm:text-[3.8rem] xl:text-[4.7rem]">
              {homeA.hero.title[0]}
              <br />
              <span className="text-fg/45">{homeA.hero.title[1]}</span>
            </h1>
            <p className="mt-7 max-w-md text-[1.08rem] leading-relaxed text-fg/75">{homeA.hero.body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CLink concept="a" href="/products/" className={btnPrimary}>
                {homeA.hero.primary} <Arrow />
              </CLink>
              <InquiryButton className={btnGhost}>{homeA.hero.secondary}</InquiryButton>
            </div>
          </div>

          <div className="mt-12 hidden lg:block" role="tablist" aria-label={homeA.hero.tabsLabel}>
            <p className="a-label mb-4 text-mute">{homeA.hero.tabsLabel}</p>
            <div className="grid grid-cols-2 gap-px bg-line">
              {homeA.heroProducts.map((hp, i) => {
                const p = getItem(hp.slug)!;
                return (
                  <button
                    key={hp.slug}
                    role="tab"
                    aria-selected={i === idx}
                    aria-controls="hero-a-panel"
                    onClick={() => setIdx(i)}
                    className={cn("group relative bg-white px-4 py-4 text-left transition-colors", i === idx ? "bg-panel" : "hover:bg-panel")}
                  >
                    <span className={cn("absolute inset-x-0 top-0 h-[2px] bg-accent transition-transform duration-500", i === idx ? "scale-x-100" : "scale-x-0")} />
                    <span className="block font-mono text-[0.7rem] text-mute">{hp.label}</span>
                    <span className="mt-1 block font-semibold">{p.model}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div id="hero-a-panel" role="tabpanel" aria-live="polite" className="relative aspect-[4/3.4] overflow-hidden bg-studio sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[640px]">
            <Img
              key={product.slug}
              src={product.image}
              alt={`${product.model} — ${product.subtitle ?? product.title}`}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="animate-[heroin_.7s_cubic-bezier(.2,.7,.2,1)] scale-[1.08] object-contain"
            />
            {/* Spec callouts — verified values from the product page */}
            <ul className="hidden md:block">
              {item.callouts.map((c, i) => {
                const a = ANCHORS[i];
                return (
                  <li
                    key={`${product.slug}-${c}`}
                    className="absolute animate-[heroin_.7s_ease_both] text-[0.82rem] font-medium"
                    style={{ left: `${a.x}%`, top: `${a.y}%`, translate: a.align === "right" ? "-100% 0" : undefined, animationDelay: `${150 + i * 90}ms` }}
                  >
                    <span className={cn("flex items-center gap-2", a.align === "right" && "flex-row-reverse")}>
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span aria-hidden className="h-px w-8 bg-fg/30" />
                      <span className="bg-white/80 px-2 py-1 backdrop-blur-sm">{c}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4 md:right-6 md:bottom-6 md:left-6">
              <div>
                <p className="font-mono text-[0.7rem] text-mute uppercase">{product.tier}</p>
                <p className="a-display mt-1 text-2xl md:text-3xl">{product.model}</p>
              </div>
              <CLink concept="a" href={`/products/${product.slug}/`} className="inline-flex shrink-0 items-center gap-2 bg-white px-4 py-2.5 text-[0.8rem] font-semibold hover:bg-fg hover:text-white">
                {site.ui.viewProduct} <Arrow />
              </CLink>
            </div>
          </div>
          {/* Mobile: callouts as list + tabs */}
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.82rem] md:hidden">
            {item.callouts.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {c}
              </li>
            ))}
          </ul>
          <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto lg:hidden" role="tablist" aria-label={homeA.hero.tabsLabel}>
            {homeA.heroProducts.map((hp, i) => (
              <button
                key={hp.slug}
                role="tab"
                aria-selected={i === idx}
                onClick={() => setIdx(i)}
                className={cn("shrink-0 border px-3.5 py-2 text-left text-xs", i === idx ? "border-fg bg-fg text-white" : "border-line")}
              >
                <span className="block opacity-70">{hp.label}</span>
                <span className="font-semibold">{getItem(hp.slug)!.model}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes heroin{from{opacity:0;transform:translateY(10px)}to{opacity:1}}`}</style>
    </section>
  );
}
