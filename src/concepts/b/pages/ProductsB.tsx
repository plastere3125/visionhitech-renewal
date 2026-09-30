"use client";

import { useMemo, useState } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { CATEGORY_ORDER, CATALOG, inCategory, productLine, type CategoryId } from "@/data/catalog";
import { useHash } from "@/lib/useHash";
import { cn } from "@/lib/cn";
import { ProductCardB } from "../ProductCardB";
import { ArrowB, Wrap } from "../ui";

export function ProductsExplorerB() {
  const { site } = getContent();
  const [hash, setHash] = useHash();
  const category = (CATEGORY_ORDER as string[]).includes(hash) ? (hash as CategoryId) : null;
  const [series, setSeries] = useState<string | null>(null);
  const [env, setEnv] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const [lastCat, setLastCat] = useState(category);
  if (lastCat !== category) {
    setLastCat(category);
    setSeries(null);
    setEnv(null);
  }

  const inCat = useMemo(() => (category ? CATALOG.filter((p) => inCategory(p, category)) : CATALOG), [category]);
  const seriesList = Array.from(new Set(inCat.map((p) => p.series)));
  const envList = Array.from(new Set(inCat.map((p) => p.environment).filter(Boolean))) as string[];
  const list = inCat.filter(
    (p) =>
      (!series || p.series === series) &&
      (!env || p.environment === env) &&
      (!q.trim() ||
        q
          .toLowerCase()
          .split(/\s+/)
          .every((t) => `${p.model} ${p.title} ${p.form ?? ""}`.toLowerCase().includes(t))),
  );

  const opt = (on: boolean) =>
    cn("flex w-full items-center justify-between border-b border-line py-2.5 text-left text-sm transition-colors", on ? "text-accent" : "text-fg/75 hover:text-fg");

  return (
    <Wrap className="grid gap-10 pb-24 lg:grid-cols-12">
      <aside className="lg:col-span-3" aria-label="Filters">
        <div className="lg:sticky lg:top-24">
          <label className="block">
            <span className="b-code text-mute">Search</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Model, type, feature…"
              className="mt-2 w-full border border-line bg-panel px-3 py-2.5 text-sm outline-none placeholder:text-mute/60 focus:border-accent"
            />
          </label>
          <fieldset className="mt-8">
            <legend className="b-code text-mute">Category</legend>
            <div className="mt-2 grid grid-cols-2 gap-x-4 lg:block">
              <button type="button" aria-pressed={!category} onClick={() => setHash("")} className={opt(!category)}>
                All <span className="font-mono text-[0.7rem] text-mute">{CATALOG.length}</span>
              </button>
              {CATEGORY_ORDER.map((c) => (
                <button key={c} type="button" aria-pressed={category === c} onClick={() => setHash(c)} className={opt(category === c)}>
                  {site.categories[c].label}
                  <span className="font-mono text-[0.7rem] text-mute">{CATALOG.filter((p) => inCategory(p, c)).length}</span>
                </button>
              ))}
            </div>
          </fieldset>
          {seriesList.length > 1 && (
            <fieldset className="mt-8">
              <legend className="b-code text-mute">Series</legend>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {seriesList.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={series === s}
                    onClick={() => setSeries(series === s ? null : s)}
                    className={cn("border px-2.5 py-1 font-mono text-[0.7rem]", series === s ? "border-accent text-accent" : "border-line text-mute hover:text-fg")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          {envList.length > 1 && (
            <fieldset className="mt-8">
              <legend className="b-code text-mute">Environment</legend>
              <div className="mt-3 flex gap-1.5">
                {envList.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={env === s}
                    onClick={() => setEnv(env === s ? null : s)}
                    className={cn("border px-2.5 py-1 font-mono text-[0.7rem]", env === s ? "border-accent text-accent" : "border-line text-mute hover:text-fg")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <p className="font-mono text-xs text-mute" aria-live="polite">
            {String(list.length).padStart(2, "0")} / {CATALOG.length} MODELS {category && `· ${site.categories[category].label.toUpperCase()}`}
          </p>
          <div role="group" aria-label="View" className="flex gap-1">
            {(["grid", "list"] as const).map((v) => (
              <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className={cn("border px-2.5 py-1 font-mono text-[0.68rem] uppercase", view === v ? "border-fg text-fg" : "border-line text-mute")}>
                {v}
              </button>
            ))}
          </div>
        </div>
        {category && <p className="mt-6 max-w-2xl text-sm text-mute">{site.categories[category].blurb}</p>}
        {view === "grid" ? (
          <ul className="mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-3">
            {list.map((p) => (
              <li key={p.slug}>
                <ProductCardB product={p} className="h-full" />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-6 border-t border-line">
            {list.map((p) => (
              <li key={p.slug} className="group relative grid grid-cols-[4rem_1fr_auto] items-center gap-4 border-b border-line py-3 md:grid-cols-[4rem_11rem_1fr_auto]">
                <div className="relative aspect-square overflow-hidden bg-studio">
                  <Img src={p.category === "software" ? p.image : p.image.replace(".webp", "-sm.webp")} alt="" fill sizes="64px" className="scale-110 object-contain" />
                </div>
                <CLink concept="b" href={`/products/${p.slug}/`} className="font-mono text-sm group-hover:text-accent">
                  {p.model}
                </CLink>
                <p className="col-span-2 row-start-2 text-sm text-mute md:col-span-1 md:row-start-auto">{productLine(p)}</p>
                <div className="flex items-center gap-4">
                  <InquiryButton model={p.model} className="hidden text-xs text-mute hover:text-accent md:inline">
                    {site.ui.productInquiry}
                  </InquiryButton>
                  <ArrowB className="text-mute group-hover:text-accent" />
                </div>
              </li>
            ))}
          </ul>
        )}
        {list.length === 0 && <p className="py-20 text-center text-mute">No products match your filters.</p>}
      </div>
    </Wrap>
  );
}
