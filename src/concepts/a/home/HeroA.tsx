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

/** Callout anchor points (percent of the product canvas). */
const ANCHORS = [
  { x: 4, y: 7, align: "left" },
  { x: 96, y: 7, align: "right" },
  { x: 4, y: 88, align: "left" },
  { x: 96, y: 88, align: "right" },
] as const;

/**
 * Concept A hero — the product canvas bleeds to the right edge of the viewport and the
 * actual VISION HITECH product is the largest element on the page.
 */
export function HeroA() {
  const { homeA, site } = getContent();
  const [idx, setIdx] = useState(0);
  const item = homeA.heroProducts[idx];
  const product = getItem(item.slug)!;

  return (
    <section aria-labelledby="hero-a-title" className="relative overflow-hidden border-b border-line">
      <div className="grid xl:min-h-[calc(100svh-76px)] xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* copy — aligned to the 1440 container on the left */}
        <div className="flex min-w-0 flex-col justify-center px-5 pt-12 pb-10 md:px-10 md:pt-16 xl:py-20 xl:pr-12 xl:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]">
          <p className="a-label flex items-center gap-3 text-mute">
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
            {homeA.hero.eyebrow}
          </p>
          <h1 id="hero-a-title" className="a-display mt-8 text-[2.7rem] sm:text-[4rem] xl:text-[4.6rem] 2xl:text-[5.2rem]">
            {homeA.hero.title[0]}
            <br />
            <span className="text-fg/40">{homeA.hero.title[1]}</span>
          </h1>
          <p className="mt-8 max-w-sm text-[1.05rem] leading-relaxed text-mute">{homeA.hero.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <CLink concept="a" href="/products/" className={btnPrimary}>
              {homeA.hero.primary} <Arrow />
            </CLink>
            <InquiryButton className={btnGhost}>{homeA.hero.secondary}</InquiryButton>
          </div>
        </div>

        {/* product canvas */}
        <div id="hero-a-panel" role="tabpanel" aria-live="polite" className="relative min-h-[440px] bg-studio sm:min-h-[600px] xl:min-h-0">
          <div className="absolute inset-x-0 top-0 bottom-[168px] sm:bottom-[120px]">
            <Img
              key={product.slug}
              src={product.image}
              alt={`${product.model} — ${product.subtitle ?? product.title}`}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="animate-[heroin_.8s_cubic-bezier(.2,.7,.2,1)] scale-[1.12] object-contain"
            />
            <ul className="hidden md:block">
              {item.callouts.map((c, i) => {
                const a = ANCHORS[i];
                return (
                  <li
                    key={`${product.slug}-${c}`}
                    className="absolute animate-[heroin_.7s_ease_both] text-[0.8rem] font-medium whitespace-nowrap"
                    style={{ left: `${a.x}%`, top: `${a.y}%`, translate: a.align === "right" ? "-100% 0" : undefined, animationDelay: `${200 + i * 90}ms` }}
                  >
                    <span className={cn("flex items-center gap-2", a.align === "right" && "flex-row-reverse")}>
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span aria-hidden className="h-px w-10 bg-fg/25" />
                      <span className="bg-white/85 px-2 py-1 text-fg/85">{c}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* model + switcher */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 border-t border-fg/10 bg-studio px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4 md:px-8">
            <div className="min-w-0">
              <p className="font-mono text-[0.68rem] text-mute uppercase">{item.label}</p>
              <p className="a-display mt-1 text-[1.6rem] md:text-[2.2rem]">{product.model}</p>
              <CLink concept="a" href={`/products/${product.slug}/`} className="mt-1 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold hover:text-accent-ink">
                {site.ui.viewProduct} <Arrow />
              </CLink>
            </div>
            <div role="tablist" aria-label={homeA.hero.tabsLabel} className="flex shrink-0 gap-1.5">
              {homeA.heroProducts.map((hp, i) => {
                const p = getItem(hp.slug)!;
                return (
                  <button
                    key={hp.slug}
                    role="tab"
                    aria-selected={i === idx}
                    aria-controls="hero-a-panel"
                    aria-label={`${hp.label} ${p.model}`}
                    onClick={() => setIdx(i)}
                    className={cn(
                      "relative h-14 w-14 overflow-hidden border bg-studio transition-colors sm:h-[72px] sm:w-[72px]",
                      i === idx ? "border-fg" : "border-fg/10 hover:border-fg/40",
                    )}
                  >
                    <Img src={p.image.replace(".webp", "-sm.webp")} alt="" fill sizes="72px" className="scale-125 object-contain" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes heroin{from{opacity:0;transform:translateY(10px)}to{opacity:1}}`}</style>
    </section>
  );
}
