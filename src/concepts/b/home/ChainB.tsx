"use client";

import { useEffect, useRef, useState } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { PendingTag } from "@/components/shared/Placeholder";
import { CUTOUT } from "@/data/visuals";
import { cn } from "@/lib/cn";
import { ArrowB, Brackets, Code, Wrap } from "../ui";

const FEED = ["/images/site/roi-normal.webp", "/images/site/wdr-on.webp", "/images/site/lux-ustarlux-10.webp", "/images/site/colornight-on.webp"];

function Visual({ id }: { id: string }) {
  if (id === "capture")
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-x-0 top-[8%] grid grid-cols-2 gap-1.5">
          {[
            ["/images/site/lux-normal-01.webp", "Normal cam at 0.1 lux"],
            ["/images/site/lux-ustarlux-01.webp", "U-Starlux cam at 0.1 lux"],
          ].map(([src, label]) => (
            <figure key={src} className="relative aspect-[5/3] overflow-hidden border border-line">
              <Img src={src} alt={label} fill sizes="20vw" className="object-cover" />
              <figcaption className="absolute bottom-1.5 left-2 font-mono text-[0.58rem] text-white/85">{label}</figcaption>
            </figure>
          ))}
        </div>
        <p className="b-display absolute top-[46%] left-0 text-[4.5rem] text-accent">0.1 lux</p>
        <Img src={CUTOUT("vnv15lu4ar")} alt="VNV15LU4AR 4K dome camera" width={531} height={494} sizes="20vw" className="absolute right-0 bottom-0 w-[46%]" />
      </div>
    );
  if (id === "data")
    return (
      <div className="flex h-full w-full flex-col justify-center gap-5">
        {[
          ["/images/site/roi-normal.webp", "Normal Image", 10],
          ["/images/site/roi-basic.webp", "Normal ROI", 1],
          ["/images/site/roi-advanced.webp", "Advanced ROI", 1],
        ].map(([src, label, mbps]) => (
          <div key={String(label)} className="grid grid-cols-[42%_1fr] items-center gap-4">
            <div className="relative aspect-[3/2] overflow-hidden border border-line">
              <Img src={String(src)} alt={`${label} demonstration frame`} fill sizes="18vw" className="object-cover" />
            </div>
            <div>
              <p className="font-mono text-[0.68rem] text-mute uppercase">{label}</p>
              <div className="mt-2 h-1.5 w-full bg-fg/10">
                <div className="h-full bg-accent" style={{ width: `${Number(mbps) * 10}%` }} />
              </div>
              <p className="mt-1.5 font-mono text-sm">{mbps}Mbps</p>
            </div>
          </div>
        ))}
        <p className="font-mono text-[0.6rem] text-mute">Bit rates as labelled on VISION HITECH&apos;s Advanced ROI demonstration.</p>
      </div>
    );
  if (id === "analysis")
    return (
      <div className="relative flex h-full w-full flex-col justify-center">
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="relative aspect-[16/10] overflow-hidden border border-line bg-panel-2">
              <Img src={FEED[i % 4]} alt="" fill sizes="8vw" className="object-cover opacity-70" style={{ objectPosition: `${(i * 23) % 100}% 50%` }} />
              <span className="absolute top-1 left-1 font-mono text-[0.5rem] text-white/80">CH{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[0.6rem] text-mute">Illustrative 16CH multi-view · VISION HITECH demonstration images · VR16S supports 1–16 CH views</p>
        <Img src={CUTOUT("vr16s")} alt="VR16S 16 channel NVR" width={652} height={274} sizes="25vw" className="mt-6 w-[62%] self-end" />
      </div>
    );
  return (
    <div className="relative flex h-full w-full flex-col justify-center">
      <figure className="relative border border-line bg-panel p-2">
        <div className="relative aspect-[4/3] bg-[#e9ecef]">
          <Img src="/images/site/vms-screen.webp" alt="NVR C/S video management software screen" fill sizes="30vw" className="object-contain" />
        </div>
        <Brackets className="-m-1" color="rgba(244,123,66,.7)" />
        <figcaption className="flex justify-between px-1 pt-2 font-mono text-[0.6rem] text-mute">
          <span>NVR C/S · VMS</span>
          <span>Alarm Manager · E-map · Watchdog</span>
        </figcaption>
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
      <Wrap className="pt-24 md:pt-32">
        <Code n="01">{homeB.chain.label}</Code>
        <h2 id="chain-h" className="b-display mt-5 max-w-[18ch] text-[2.2rem] md:text-[3.4rem]">
          {homeB.chain.title}
        </h2>
      </Wrap>
      <Wrap className="grid gap-10 pb-16 lg:grid-cols-12 lg:gap-16">
        {/* sticky visual (desktop) */}
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center">
            <div className="relative h-[70%] w-full">
              <div className="absolute -top-8 left-0 flex gap-1.5">
                {steps.map((s, i) => (
                  <span key={s.id} className={cn("h-[3px] w-10 transition-colors duration-500", i <= active ? "bg-accent" : "bg-fg/15")} />
                ))}
              </div>
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
        <ol className="lg:col-span-5 lg:col-start-8">
          {steps.map((s, i) => (
            <li
              key={s.id}
              id={`chain-${s.id}`}
              data-idx={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="flex scroll-mt-20 flex-col justify-center border-t border-line py-14 lg:min-h-[88svh] lg:border-t-0 lg:py-0"
            >
              <div className="flex items-center gap-3">
                <span className="b-code text-accent">{s.code}</span>
                <span className="b-code text-fg">{s.name}</span>
                {"pending" in s && s.pending && <PendingTag />}
              </div>
              <h3 className="b-display mt-5 text-[1.9rem] md:text-[2.4rem]">{s.title}</h3>
              <ul className="mt-7 border-t border-line">
                {s.points.map((pt) => (
                  <li key={pt} className="flex gap-3 border-b border-line py-3.5 text-[0.95rem] text-fg/85">
                    <span aria-hidden className="mt-[0.55rem] h-px w-3 shrink-0 bg-accent" />
                    {pt}
                  </li>
                ))}
              </ul>
              <CLink concept="b" href={`/products/${s.product}/`} className="group mt-6 inline-flex items-center gap-3 text-sm text-mute hover:text-accent">
                <span className="font-mono text-xs">REF</span> {s.product.toUpperCase().replace("NVR-CS-VMS", "NVR C/S")} <ArrowB className="transition-transform group-hover:translate-x-1" />
              </CLink>
              <div className="mt-10 h-[340px] lg:hidden">
                <Visual id={s.id} />
              </div>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}
