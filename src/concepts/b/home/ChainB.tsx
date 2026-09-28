"use client";

import { useEffect, useRef, useState } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { CUTOUT } from "@/data/visuals";
import { cn } from "@/lib/cn";
import { ArrowB, Brackets, Code, Wrap } from "../ui";

/** One visual per stage — a single idea each, no dashboards. */
function Visual({ id }: { id: string }) {
  if (id === "capture")
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-0 overflow-hidden border border-line">
          <Img src="/images/site/lux-normal-01.webp" alt="Normal camera at 0.1 lux" fill sizes="45vw" className="object-cover" />
          <div className="absolute inset-0" style={{ clipPath: "inset(0 0 0 50%)" }}>
            <Img src="/images/site/lux-ustarlux-01.webp" alt="Ultra STARLUX camera at 0.1 lux" fill sizes="45vw" className="object-cover" />
          </div>
          <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-white/70" />
          <span className="absolute bottom-3 left-3 font-mono text-[0.6rem] text-white/75">NORMAL · 0.1 LUX</span>
          <span className="absolute right-3 bottom-3 font-mono text-[0.6rem] text-accent">ULTRA STARLUX · 0.1 LUX</span>
        </div>
      </div>
    );
  if (id === "data")
    return (
      <div className="relative flex h-full w-full flex-col justify-center">
        <div className="relative aspect-[3/2] overflow-hidden border border-line">
          <Img src="/images/site/roi-advanced.webp" alt="Advanced ROI demonstration frame" fill sizes="45vw" className="object-cover" />
          <Brackets className="m-3" color="rgba(255,255,255,.7)" />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 font-mono text-xs">
          {[
            ["Normal image", 10],
            ["Advanced ROI", 1],
          ].map(([k, v]) => (
            <div key={String(k)}>
              <div className="flex justify-between text-mute">
                <span>{k}</span>
                <span className={v === 1 ? "text-accent" : "text-fg"}>{v} Mbps</span>
              </div>
              <div className="mt-2 h-1 bg-fg/10">
                <div className="h-full bg-accent" style={{ width: `${Number(v) * 10}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  if (id === "analysis")
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        {/* abstract channel matrix: 16 inputs converging into one recorder */}
        <svg aria-hidden viewBox="0 0 400 220" className="w-full max-w-[520px]">
          {Array.from({ length: 16 }).map((_, i) => {
            const x = 20 + (i % 8) * 46;
            const y = i < 8 ? 24 : 64;
            return (
              <g key={i}>
                <rect x={x} y={y} width="30" height="20" fill="none" stroke="rgba(233,237,243,.25)" />
                <line x1={x + 15} y1={y + 20} x2="200" y2="170" stroke="rgba(233,237,243,.08)" />
              </g>
            );
          })}
          <line x1="20" y1="120" x2="380" y2="120" stroke="rgba(244,123,66,.6)" className="b-signal-path" />
        </svg>
        <Img src={CUTOUT("vr16s")} alt="VR16S 16 channel NVR" width={652} height={274} sizes="30vw" className="-mt-6 w-[64%] max-w-[380px]" />
        <p className="mt-4 font-mono text-[0.62rem] text-mute">16CH · 480fps@4K2K · VR16S</p>
      </div>
    );
  return (
    <div className="relative flex h-full w-full flex-col justify-center">
      <figure className="relative border border-line bg-panel p-2">
        <div className="relative aspect-[4/3] bg-[#e9ecef]">
          <Img src="/images/site/vms-screen.webp" alt="NVR C/S video management software screen" fill sizes="40vw" className="object-contain" />
        </div>
        <Brackets className="-m-1" color="rgba(244,123,66,.7)" />
      </figure>
      <div className="mt-5 flex gap-2 font-mono text-[0.62rem] text-mute">
        {["Web", "PC", "iOS", "Android"].map((x) => (
          <span key={x} className="border border-line px-2 py-1">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Camera → Video Data → Analysis → Security Response.
 * Each stage = one screen, one message. Supporting facts are secondary (small, muted).
 */
export function ChainB() {
  const { homeB } = getContent();
  const steps = homeB.chain.steps;
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="chain" aria-labelledby="chain-h" className="relative scroll-mt-16 border-t border-line">
      <Wrap className="pt-28 md:pt-40">
        <Code n="01">{homeB.chain.label}</Code>
        <h2 id="chain-h" className="b-display mt-6 max-w-[16ch] text-[2.4rem] md:text-[4rem]">
          {homeB.chain.title}
        </h2>
      </Wrap>
      <Wrap className="grid gap-10 pb-20 lg:grid-cols-12 lg:gap-16">
        <div className="hidden lg:col-span-7 lg:block">
          <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center">
            <div className="relative h-[64%] w-full">
              {steps.map((s, i) => (
                <div
                  key={s.id}
                  aria-hidden={i !== active}
                  className={cn("absolute inset-0 transition-[opacity,transform] duration-700", i === active ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0")}
                >
                  <Visual id={s.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <ol className="lg:col-span-5">
          {steps.map((s, i) => (
            <li
              key={s.id}
              id={`chain-${s.id}`}
              data-idx={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="flex scroll-mt-20 flex-col justify-center py-16 lg:min-h-[90svh] lg:py-0"
            >
              <div className="flex items-center gap-4">
                <span className="b-display text-[3.2rem] text-accent md:text-[4.2rem]">{s.code}</span>
                <span aria-hidden className={cn("h-px flex-1 transition-colors duration-500", i <= active ? "bg-accent/60" : "bg-line")} />
              </div>
              <p className="b-code mt-4 text-fg">{s.name}</p>
              <h3 className="b-display mt-4 text-[2rem] md:text-[2.8rem]">{s.title}</h3>
              <p className="mt-6 font-mono text-[0.72rem] leading-relaxed text-mute">{s.points.join("  ·  ")}</p>
              <CLink concept="b" href={`/products/${s.product}/`} className="group mt-8 inline-flex items-center gap-3 text-sm text-fg/70 hover:text-accent">
                {s.product.toUpperCase().replace("NVR-CS-VMS", "NVR C/S")} <ArrowB className="transition-transform group-hover:translate-x-1" />
              </CLink>
              <div className="mt-10 h-[300px] lg:hidden">
                <Visual id={s.id} />
              </div>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}
