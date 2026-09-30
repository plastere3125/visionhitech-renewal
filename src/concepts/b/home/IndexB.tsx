"use client";

import { useRef, useState } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { featured, CATALOG, inCategory, productLine, type CategoryId, type CatalogItem } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { ArrowB, HeadB, Wrap } from "../ui";

const FILTERS: Array<{ id: "featured" | CategoryId; label: string }> = [
  { id: "featured", label: "Featured" },
  { id: "ip-camera", label: "IP" },
  { id: "nvr", label: "NVR" },
  { id: "hd-analog-camera", label: "HD" },
  { id: "dvr", label: "DVR" },
  { id: "zoom-module", label: "Zoom" },
  { id: "software", label: "SW" },
];

/** Model index: a spec-sheet style list with a floating product preview (desktop). */
export function IndexB() {
  const { homeB, site } = getContent();
  const [f, setF] = useState<(typeof FILTERS)[number]["id"]>("featured");
  const [hover, setHover] = useState<CatalogItem | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const box = useRef<HTMLDivElement>(null);
  const rows = f === "featured" ? featured() : CATALOG.filter((p) => inCategory(p, f)).slice(0, 8);

  return (
    <section aria-labelledby="idx-b" className="border-t border-line py-28 md:py-40">
      <Wrap>
        <HeadB
          n="07"
          label={homeB.featured.label}
          title={<span id="idx-b">{homeB.featured.title}</span>}
          aside={
            <div role="group" aria-label="Filter" className="flex flex-wrap gap-1">
              {FILTERS.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  aria-pressed={f === x.id}
                  onClick={() => setF(x.id)}
                  className={cn("border px-3 py-1.5 font-mono text-[0.7rem] tracking-wider uppercase", f === x.id ? "border-accent text-accent" : "border-line text-mute hover:text-fg")}
                >
                  {x.label}
                </button>
              ))}
            </div>
          }
        />
        <div
          ref={box}
          className="relative mt-12"
          onMouseMove={(e) => {
            const r = box.current!.getBoundingClientRect();
            setPos({ x: Math.min(e.clientX - r.left + 24, r.width - 260), y: e.clientY - r.top - 120 });
          }}
          onMouseLeave={() => setHover(null)}
        >
          <div className="hidden grid-cols-[12rem_7rem_1fr_9rem_2rem] gap-6 border-b border-line pb-3 font-mono text-[0.62rem] tracking-wider text-mute uppercase md:grid">
            <span>Model</span>
            <span>Type</span>
            <span>Description</span>
            <span>Series</span>
            <span />
          </div>
          <ul>
            {rows.map((p) => (
              <li key={p.slug} onMouseEnter={() => setHover(p)} className="group relative border-b border-line">
                <div className="grid grid-cols-[4.5rem_1fr] items-center gap-4 py-4 md:grid-cols-[12rem_7rem_1fr_9rem_2rem] md:gap-6 md:py-5">
                  <div className="relative aspect-square bg-studio md:hidden">
                    <Img src={p.image.replace(".webp", "-sm.webp").replace("vms-screen-sm", "vms-screen")} alt="" fill sizes="72px" className="scale-110 object-contain" />
                  </div>
                  <div className="md:contents">
                    <h3 className="font-mono text-[0.98rem] font-medium transition-colors group-hover:text-accent">
                      <CLink concept="b" href={`/products/${p.slug}/`} className="after:absolute after:inset-0 after:content-['']">
                        {p.model}
                      </CLink>
                    </h3>
                    <p className="hidden text-sm text-mute md:block">{p.form ?? site.categories[p.category].short}</p>
                    <p className="text-sm text-fg/80 md:text-[0.95rem]">{productLine(p)}</p>
                    <p className="hidden font-mono text-xs text-mute md:block">
                      {site.categories[p.category].short} · {p.series}
                    </p>
                    <ArrowB className="hidden text-mute transition-all group-hover:translate-x-1 group-hover:text-accent md:block" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* floating preview */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute z-20 hidden w-60 border border-line bg-panel p-1.5 shadow-2xl transition-opacity duration-200 lg:block",
              hover ? "opacity-100" : "opacity-0",
            )}
            style={{ left: pos.x, top: pos.y }}
          >
            {hover && (
              <div className="relative aspect-square bg-studio">
                <Img
                  src={hover.category === "software" ? hover.image : hover.image.replace(".webp", "-sm.webp")}
                  alt=""
                  fill
                  sizes="240px"
                  className={hover.category === "software" ? "object-contain p-3" : "scale-110 object-contain"}
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <CLink concept="b" href="/products/" className="group inline-flex items-center gap-3 text-sm hover:text-accent">
            {homeB.featured.all} ({CATALOG.length}) <ArrowB className="transition-transform group-hover:translate-x-1" />
          </CLink>
          <InquiryButton className="font-mono text-xs tracking-wider text-accent uppercase hover:underline">Request a quotation</InquiryButton>
        </div>
      </Wrap>
    </section>
  );
}
