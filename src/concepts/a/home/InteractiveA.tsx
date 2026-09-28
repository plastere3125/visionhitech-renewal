"use client";

import { useRef, useState } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { CompareSlider } from "@/components/shared/CompareSlider";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { CATALOG, type CategoryId, type CatalogItem } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { Arrow } from "../HeaderA";
import { ProductCardA } from "../ProductCardA";
import { Container, SectionHead } from "../ui";

const FEATURED_SLUGS_A = ["vnn32f7vyr", "vnv201tfar", "vtn64184er", "vd16t"];

const MORE_TABS: Array<{ id: CategoryId; label: string }> = [
  { id: "ip-camera", label: "IP Camera" },
  { id: "nvr", label: "NVR" },
  { id: "hd-analog-camera", label: "HD Analog" },
  { id: "dvr", label: "DVR" },
  { id: "accessory", label: "Accessory" },
];

/** Four hero products at large scale, then a quieter secondary rail by category. */
export function FeaturedA() {
  const { homeA, site } = getContent();
  const [tab, setTab] = useState<CategoryId>("ip-camera");
  const rail = useRef<HTMLDivElement>(null);
  const top = FEATURED_SLUGS_A.map((s) => CATALOG.find((p) => p.slug === s)).filter((p): p is CatalogItem => Boolean(p));
  const more = CATALOG.filter((p) => p.category === tab && !FEATURED_SLUGS_A.includes(p.slug)).slice(0, 10);
  const scroll = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section aria-labelledby="featured-a" className="border-t border-line py-24 md:py-36">
      <Container>
        <SectionHead
          label={homeA.featured.label}
          title={<span id="featured-a">{homeA.featured.title}</span>}
          aside={
            <CLink concept="a" href="/products/" className="group inline-flex items-center gap-2 text-sm font-semibold">
              {homeA.featured.all} <Arrow className="transition-transform group-hover:translate-x-1" />
            </CLink>
          }
        />
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {top.map((p) => (
            <li key={p.slug}>
              <article className="group relative flex h-full flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-studio">
                  <Img src={p.image} alt={`${p.model} — ${p.subtitle ?? p.title}`} fill sizes="(min-width:1024px) 24vw, (min-width:640px) 48vw, 92vw" className="scale-[1.14] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.2]" />
                  <span className="absolute top-4 left-4 font-mono text-[0.66rem] tracking-[0.08em] text-fg/60 uppercase">
                    {site.categories[p.category].short} · {p.series}
                  </span>
                </div>
                <div className="pt-5">
                  <h3 className="a-display text-[1.8rem]">
                    <CLink concept="a" href={`/products/${p.slug}/`} className="after:absolute after:inset-0 after:content-['']">
                      {p.model}
                    </CLink>
                  </h3>
                  <p className="mt-1.5 text-[0.88rem] text-mute">{p.subtitle ?? p.title}</p>
                  <div className="relative z-10 mt-4 flex gap-5 text-[0.8rem] font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      {site.ui.viewProduct} <Arrow className="transition-transform group-hover:translate-x-1" />
                    </span>
                    <InquiryButton model={p.model} className="text-mute hover:text-fg">
                      {site.ui.productInquiry}
                    </InquiryButton>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* secondary rail */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 [&>*]:min-w-0">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="a-label text-mute">{homeA.featured.more}</p>
            <div role="tablist" aria-label="Product category" className="no-scrollbar flex max-w-full min-w-0 gap-1 overflow-x-auto">
              {MORE_TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => {
                    setTab(t.id);
                    rail.current?.scrollTo({ left: 0 });
                  }}
                  className={cn("shrink-0 px-3 py-1.5 text-[0.82rem] transition-colors", tab === t.id ? "bg-fg text-white" : "text-mute hover:text-fg")}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous products" className="flex h-10 w-10 items-center justify-center border border-line hover:border-fg">
              <Arrow className="rotate-180" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next products" className="flex h-10 w-10 items-center justify-center border border-line hover:border-fg">
              <Arrow />
            </button>
          </div>
        </div>
      </Container>
      <div className="mx-auto max-w-[1440px] md:px-10">
        <div ref={rail} className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 md:scroll-px-0 md:px-0">
          {more.map((p) => (
            <ProductCardA key={p.slug} product={p} className="w-[64vw] shrink-0 snap-start sm:w-[270px]" />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Full-bleed technology visual: the comparison image spans the viewport. */
export function TechnologyA() {
  const { homeA, technologies } = getContent();
  const list = homeA.technology.tabs.map((id) => technologies.find((t) => t.id === id)!);
  const [i, setI] = useState(0);
  const t = list[i];
  return (
    <section aria-labelledby="tech-a" className="bg-fg pt-24 text-white md:pt-36">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="a-label flex items-center gap-3 text-white/50">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {homeA.technology.label}
          </p>
          <h2 id="tech-a" className="a-display mt-6 text-[2.5rem] md:text-[3.9rem] xl:text-[4.4rem]">
            {homeA.technology.title}
          </h2>
          <p className="mt-5 text-[0.95rem] text-white/55">{homeA.technology.body}</p>
        </div>
        <div role="tablist" aria-label="Technology" className="no-scrollbar flex gap-1 overflow-x-auto">
          {list.map((x, n) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={n === i}
              aria-controls="tech-a-panel"
              onClick={() => setI(n)}
              className={cn("shrink-0 border px-4 py-2.5 text-sm font-medium transition-colors", n === i ? "border-white bg-white text-fg" : "border-white/20 text-white/65 hover:text-white")}
            >
              {x.name}
            </button>
          ))}
        </div>
      </Container>
      <div id="tech-a-panel" role="tabpanel" className="mt-12">
        <CompareSlider key={t.id} compare={t.compare!} aspect="aspect-[4/3] md:aspect-[21/9]" sizes="100vw" />
      </div>
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-[0.95rem] text-white/60">
          <span className="font-semibold text-white">{t.name}.</span> {t.line}
        </p>
        <CLink concept="a" href="/solutions/technology/" className="group inline-flex items-center gap-2 text-sm font-semibold">
          {homeA.technology.more} <Arrow className="transition-transform group-hover:translate-x-1" />
        </CLink>
      </Container>
    </section>
  );
}

export function SolutionsA() {
  const { homeA, solutions, site } = getContent();
  const [i, setI] = useState(2);
  const s = solutions[i];
  return (
    <section aria-labelledby="solutions-a" className="py-24 md:py-36">
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
              </div>
              <h3 className="mt-4 text-[1.7rem] leading-tight font-semibold tracking-[-0.025em]">{s.headline}</h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-fg/70">{s.summary}</p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {s.evidence.slice(0, 2).map((e) => (
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
