"use client";

import { useRef, useState } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { CompareSlider } from "@/components/shared/CompareSlider";
import { Img } from "@/components/shared/Img";
import { PendingTag } from "@/components/shared/Placeholder";
import { featured, CATALOG, type CategoryId, type CatalogItem } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { Arrow } from "../HeaderA";
import { ProductCardA } from "../ProductCardA";
import { Container, SectionHead } from "../ui";

const FEATURED_TABS: Array<{ id: "all" | CategoryId; label: string }> = [
  { id: "all", label: "Featured" },
  { id: "ip-camera", label: "IP Camera" },
  { id: "nvr", label: "NVR" },
  { id: "hd-analog-camera", label: "HD Analog" },
  { id: "dvr", label: "DVR" },
];

export function FeaturedA() {
  const { homeA } = getContent();
  const [tab, setTab] = useState<"all" | CategoryId>("all");
  const rail = useRef<HTMLDivElement>(null);
  const items: CatalogItem[] = tab === "all" ? featured() : CATALOG.filter((p) => p.category === tab).slice(0, 10);

  const scroll = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="featured-a" className="border-t border-line py-20 md:py-28">
      <Container>
        <SectionHead
          label={homeA.featured.label}
          title={<span id="featured-a">{homeA.featured.title}</span>}
          aside={
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => scroll(-1)} aria-label="Previous products" className="flex h-11 w-11 items-center justify-center border border-line hover:border-fg">
                <Arrow className="rotate-180" />
              </button>
              <button type="button" onClick={() => scroll(1)} aria-label="Next products" className="flex h-11 w-11 items-center justify-center border border-line hover:border-fg">
                <Arrow />
              </button>
            </div>
          }
        />
        <div role="tablist" aria-label="CatalogItem category" className="no-scrollbar mt-10 flex gap-1 overflow-x-auto border-b border-line">
          {FEATURED_TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => {
                setTab(t.id);
                rail.current?.scrollTo({ left: 0 });
              }}
              className={cn(
                "relative shrink-0 px-4 py-3 text-sm font-medium transition-colors",
                tab === t.id ? "text-fg" : "text-mute hover:text-fg",
              )}
            >
              {t.label}
              <span className={cn("absolute inset-x-4 -bottom-px h-[2px] bg-fg transition-transform", tab === t.id ? "scale-x-100" : "scale-x-0")} />
            </button>
          ))}
          <CLink concept="a" href={tab === "all" ? "/products/" : `/products/#${tab}`} className="ml-auto hidden shrink-0 items-center gap-2 px-2 py-3 text-sm font-semibold md:inline-flex">
            {homeA.featured.all} <Arrow />
          </CLink>
        </div>
      </Container>
      <div className="mx-auto max-w-[1440px] md:px-10">
        <div ref={rail} className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:scroll-px-0 md:px-0">
          {items.map((p) => (
            <ProductCardA key={p.slug} product={p} className="w-[72vw] shrink-0 snap-start sm:w-[300px]" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechnologyA() {
  const { homeA, technologies } = getContent();
  const list = homeA.technology.tabs.map((id) => technologies.find((t) => t.id === id)!);
  const [i, setI] = useState(0);
  const t = list[i];
  return (
    <section aria-labelledby="tech-a" className="bg-panel py-20 md:py-28">
      <Container>
        <SectionHead label={homeA.technology.label} title={<span id="tech-a">{homeA.technology.title}</span>} />
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm text-mute">{homeA.technology.body}</p>
            <div role="tablist" aria-orientation="vertical" aria-label="Technology" className="mt-8 border-t border-line">
              {list.map((x, n) => (
                <button
                  key={x.id}
                  role="tab"
                  aria-selected={n === i}
                  aria-controls="tech-a-panel"
                  onClick={() => setI(n)}
                  className={cn("group block w-full border-b border-line py-5 text-left transition-colors", n === i ? "" : "text-fg/55 hover:text-fg")}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.7rem] text-mute">{String(n + 1).padStart(2, "0")}</span>
                    <span className="text-[1.25rem] font-semibold tracking-[-0.02em]">{x.name}</span>
                  </span>
                  <span className={cn("grid transition-[grid-template-rows] duration-500", n === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <span className="min-h-0 overflow-hidden">
                      <span className="block pt-2 pl-9 text-[0.9rem] leading-relaxed text-mute">{x.line}</span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <CLink concept="a" href="/solutions/technology/" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold">
              {homeA.technology.more} <Arrow className="transition-transform group-hover:translate-x-1" />
            </CLink>
          </div>
          <div id="tech-a-panel" role="tabpanel" className="lg:col-span-8">
            <CompareSlider key={t.id} compare={t.compare!} aspect="aspect-[3/2]" />
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mute">{t.body}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function SolutionsA() {
  const { homeA, solutions, site } = getContent();
  const [i, setI] = useState(2);
  const s = solutions[i];
  return (
    <section aria-labelledby="solutions-a" className="py-20 md:py-28">
      <Container>
        <SectionHead label={homeA.solutions.label} title={<span id="solutions-a">{homeA.solutions.title}</span>} />
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div role="tablist" aria-label="Solutions" className="flex gap-2 overflow-x-auto no-scrollbar lg:col-span-4 lg:block lg:border-t lg:border-line">
            {solutions.map((x, n) => (
              <button
                key={x.slug}
                role="tab"
                aria-selected={n === i}
                aria-controls="solutions-a-panel"
                onClick={() => setI(n)}
                onMouseEnter={() => setI(n)}
                className={cn(
                  "flex shrink-0 items-center gap-4 border px-4 py-3 text-left transition-colors lg:w-full lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-6",
                  n === i ? "border-fg lg:text-fg" : "border-line text-fg/50 hover:text-fg",
                )}
              >
                <span className="hidden font-mono text-[0.7rem] text-mute lg:inline">{x.index}</span>
                <span className="text-base font-semibold tracking-[-0.02em] lg:a-display lg:text-[2rem]">{x.name}</span>
                <Arrow className={cn("ml-auto hidden transition-all lg:block", n === i ? "opacity-100" : "-translate-x-2 opacity-0")} />
              </button>
            ))}
          </div>
          <div id="solutions-a-panel" role="tabpanel" className="grid gap-8 md:grid-cols-2 lg:col-span-8">
            <div className="relative aspect-[4/3] overflow-hidden bg-studio md:aspect-auto md:min-h-[420px]">
              <Img key={s.slug} src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="animate-[fadein_.5s_ease] object-cover" />
              {s.image.credit && <span className="absolute right-2 bottom-2 bg-black/50 px-1.5 py-0.5 text-[0.6rem] text-white/85">Photo: {s.image.credit}</span>}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <p className="a-label text-accent-ink">{s.name}</p>
                {s.status !== "verified" && <PendingTag />}
              </div>
              <h3 className="mt-4 text-[1.7rem] leading-tight font-semibold tracking-[-0.025em]">{s.headline}</h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-fg/70">{s.summary}</p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {s.evidence.slice(0, 3).map((e) => (
                  <li key={e.text} className="flex gap-3 text-[0.88rem] leading-snug">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {e.text}
                  </li>
                ))}
              </ul>
              <CLink concept="a" href={`/solutions/${s.slug}/`} className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold">
                {site.ui.explore} {s.name} <Arrow className="transition-transform group-hover:translate-x-1" />
              </CLink>
            </div>
          </div>
        </div>
      </Container>
      <style>{`@keyframes fadein{from{opacity:0}to{opacity:1}}`}</style>
    </section>
  );
}
