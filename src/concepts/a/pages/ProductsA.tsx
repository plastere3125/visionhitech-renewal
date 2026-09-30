"use client";

import { useMemo, useState } from "react";
import { getContent } from "@/content";
import { Img } from "@/components/shared/Img";
import { CATEGORY_ORDER, CATALOG, inCategory, productLine, type CategoryId } from "@/data/catalog";
import { CATEGORY_IMAGE } from "@/data/visuals";
import { useHash } from "@/lib/useHash";
import { cn } from "@/lib/cn";
import { ProductCardA } from "../ProductCardA";
import { Container } from "../ui";

export function ProductsExplorerA() {
  const { site } = getContent();
  const [hash, setHash] = useHash();
  const category = (CATEGORY_ORDER as string[]).includes(hash) ? (hash as CategoryId) : null;
  const [series, setSeries] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [lastCat, setLastCat] = useState(category);
  if (lastCat !== category) {
    setLastCat(category);
    setSeries(null);
  }

  const inCat = useMemo(() => (category ? CATALOG.filter((p) => inCategory(p, category)) : CATALOG), [category]);
  const seriesList = useMemo(() => Array.from(new Set(inCat.map((p) => p.series))), [inCat]);
  const list = inCat.filter((p) => {
    if (series && p.series !== series) return false;
    if (!q.trim()) return true;
    const s = `${p.model} ${productLine(p)} ${p.title} ${p.form ?? ""}`.toLowerCase();
    return q
      .toLowerCase()
      .split(/\s+/)
      .every((t) => s.includes(t));
  });

  return (
    <>
      {/* Category navigation — tiles with the real product per category */}
      <Container>
        <nav aria-label="CatalogItem categories" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {CATEGORY_ORDER.map((c) => {
            const on = category === c;
            const n = CATALOG.filter((p) => inCategory(p, c)).length;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setHash(on ? "" : c)}
                className={cn("group relative flex flex-col overflow-hidden border text-left transition-colors", on ? "border-fg" : "border-transparent hover:border-line")}
              >
                <span className="relative block aspect-[5/4] overflow-hidden bg-studio">
                  <Img src={CATEGORY_IMAGE[c]} alt="" fill sizes="14vw" className={cn("object-contain transition-transform duration-500 group-hover:scale-105", c === "software" ? "p-5" : "scale-110")} />
                </span>
                <span className="flex items-baseline justify-between gap-2 px-3 py-3">
                  <span className="text-[0.92rem] font-semibold">{site.categories[c].label}</span>
                  <span className="font-mono text-[0.7rem] text-mute">{n}</span>
                </span>
                <span aria-hidden className={cn("absolute inset-x-0 bottom-0 h-[2px] bg-accent transition-transform", on ? "scale-x-100" : "scale-x-0")} />
              </button>
            );
          })}
        </nav>
      </Container>

      <Container className="mt-10">
        <div className="sticky top-16 z-20 -mx-5 flex flex-col gap-3 border-y border-line bg-white/95 px-5 py-3 backdrop-blur md:-mx-10 md:flex-row md:items-center md:px-10">
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto" role="group" aria-label="Series">
            <button type="button" aria-pressed={!series} onClick={() => setSeries(null)} className={cn("shrink-0 border px-3 py-1.5 text-xs font-medium", !series ? "border-fg bg-fg text-white" : "border-line hover:border-fg")}>
              All {category ? site.categories[category].label : "products"}
            </button>
            {seriesList.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={series === s}
                onClick={() => setSeries(series === s ? null : s)}
                className={cn("shrink-0 border px-3 py-1.5 text-xs font-medium", series === s ? "border-fg bg-fg text-white" : "border-line hover:border-fg")}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 md:ml-auto">
            <label className="relative flex-1 md:w-64 md:flex-none">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search model or feature"
                className="w-full border border-line bg-white px-3 py-2 pl-9 text-sm outline-none focus:border-fg"
              />
              <svg className="absolute top-1/2 left-3 -translate-y-1/2 text-mute" width="14" height="14" viewBox="0 0 16 16" aria-hidden>
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="m11 11 4 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </label>
            <p className="shrink-0 font-mono text-xs text-mute" aria-live="polite">
              {list.length} {site.ui.models}
            </p>
          </div>
        </div>

        {category && <p className="mt-8 max-w-2xl text-[0.95rem] text-mute">{site.categories[category].blurb}</p>}

        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
          {list.map((p, i) => (
            <li key={p.slug}>
              <ProductCardA product={p} priority={i < 4} className="h-full" />
            </li>
          ))}
        </ul>
        {list.length === 0 && <p className="py-20 text-center text-mute">No products match your filters.</p>}
      </Container>
    </>
  );
}
