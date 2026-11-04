"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { ENV, envSrcSet } from "@/data/visuals";
import { asset } from "@/lib/paths";
import { cn } from "@/lib/cn";
import { Arrow } from "../HeaderA";

const INTERVAL = 5000;

function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Revision 03 hero — full-bleed image canvas under a transparent white header.
 * Four client-defined solution slides rotate every 5 s: background, title, description and
 * visual emphasis change together. Pauses on hover / focus, has a pause button, and does not
 * autoplay when the user prefers reduced motion. Only the first background loads eagerly.
 */
export function HeroA() {
  const { homeA } = getContent();
  const h = homeA.r3.hero;
  const total = h.slides.length;
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([0, 1]);
  const [userPaused, setUserPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, () => false);
  const running = !userPaused && !hold && !reduced;

  const go = (i: number) => {
    const next = (i + total) % total;
    setIdx(next);
    setLoaded((l) => Array.from(new Set([...l, next, (next + 1) % total])));
  };

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      const next = (idx + 1) % total;
      setIdx(next);
      setLoaded((l) => Array.from(new Set([...l, next, (next + 1) % total])));
    }, INTERVAL);
    return () => window.clearTimeout(t);
  }, [idx, running, total]);

  const slide = h.slides[idx];
  const credit = ENV[slide.bg]?.credit;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={h.tabsLabel}
      className="relative -mt-16 h-svh min-h-[640px] overflow-hidden bg-[#0d1014] text-white lg:-mt-[76px] lg:min-h-[720px]"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false);
      }}
    >
      <h1 className="sr-only">{h.srTitle}</h1>

      {/* backgrounds — crossfade + slow scale */}
      <div aria-hidden className="absolute inset-0">
        {h.slides.map((s, i) =>
          loaded.includes(i) ? (
            // eslint-disable-next-line @next/next/no-img-element -- responsive srcset on a static export
            <img
              key={s.bg}
              src={asset(`/images/env/${s.bg}-1280.webp`)}
              srcSet={envSrcSet(s.bg, asset)}
              sizes="100vw"
              alt=""
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] ease-out",
                i === idx ? "scale-100 opacity-100 duration-[1200ms,7000ms]" : "scale-[1.06] opacity-0 duration-[1200ms,1200ms]",
              )}
            />
          ) : null,
        )}
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-black/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/5" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-linear-to-t from-black/75 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col px-5 pt-28 pb-6 md:px-10 lg:pt-36 lg:pb-10">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-12">
          {/* copy */}
          <div key={idx} className="lg:col-span-7" aria-live={running ? "off" : "polite"}>
            <p className="a-label flex items-center gap-3 text-white/75 animate-[hero-up_.7s_cubic-bezier(.2,.7,.2,1)_both]">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {h.label} {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <h2
              className="a-display mt-6 max-w-[15ch] origin-left text-[2.6rem] [text-shadow:0_2px_24px_rgba(0,0,0,.35)] animate-[hero-title_.9s_cubic-bezier(.2,.7,.2,1)_both] sm:text-[3.6rem] xl:text-[4.6rem] 2xl:text-[5.2rem]"
            >
              {slide.title}
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-white/80 animate-[hero-up_.8s_.15s_cubic-bezier(.2,.7,.2,1)_both] md:text-[1.15rem]">
              {slide.body}
            </p>
            <CLink
              concept="a"
              href={slide.href}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90 animate-[hero-up_.8s_.25s_cubic-bezier(.2,.7,.2,1)_both] hover:text-white"
            >
              <span className="border-b border-white/40 pb-0.5 group-hover:border-accent">Learn More</span>
              <Arrow className="transition-transform group-hover:translate-x-1" />
            </CLink>
          </div>

          {/* visual emphasis — real VISION HITECH assets */}
          <div key={`v${idx}`} aria-hidden className="hidden animate-[hero-up_.9s_.1s_cubic-bezier(.2,.7,.2,1)_both] lg:col-span-5 lg:block">
            <HeroVisual kind={slide.visual} />
          </div>
        </div>

        {/* bottom bar — indicators + CTA (client sketch: boxes 1–4 + button row, bottom-left) */}
        <div className="flex flex-col gap-5 border-t border-white/20 pt-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center gap-3">
            <div role="tablist" aria-label={h.tabsLabel} className="flex min-w-0 gap-1.5">
              {h.slides.map((s, i) => (
                <button
                  key={i}
                  role="tab"
                  type="button"
                  aria-selected={i === idx}
                  aria-label={`${String(i + 1).padStart(2, "0")} ${s.title}`}
                  onClick={() => go(i)}
                  className={cn(
                    "group relative flex h-12 flex-col justify-center overflow-hidden px-3 text-left transition-[width,background-color] duration-500",
                    i === idx ? "w-36 bg-white/15 sm:w-44" : "w-11 bg-white/5 hover:bg-white/10 sm:w-12",
                  )}
                >
                  <span className={cn("font-mono transition-all", i === idx ? "text-[0.7rem] text-accent" : "text-[0.78rem] text-white/70")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("truncate text-[0.78rem] font-semibold transition-opacity", i === idx ? "opacity-100" : "opacity-0")}>{s.short}</span>
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-white/15">
                    {i === idx && (
                      <span
                        key={`p${idx}-${running}`}
                        className="block h-full origin-left bg-accent"
                        style={{
                          animation: reduced ? undefined : `hero-progress ${INTERVAL}ms linear both`,
                          animationPlayState: running ? "running" : "paused",
                          transform: reduced ? "scaleX(1)" : undefined,
                        }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              aria-label={userPaused ? h.play : h.pause}
              className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/25 text-white/85 transition-colors hover:border-white hover:text-white"
            >
              {userPaused || reduced ? (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                  <path d="M2 1l9 5-9 5z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                  <path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <CLink
              concept="a"
              href="/products/"
              className="group inline-flex h-12 items-center gap-3 bg-accent px-6 text-[0.92rem] font-semibold text-fg transition-colors hover:bg-white"
            >
              {h.ctas.explore}
              <Arrow className="transition-transform group-hover:translate-x-1" />
            </CLink>
            <InquiryButton className="group inline-flex h-12 items-center gap-3 bg-white px-6 text-[0.92rem] font-semibold text-fg transition-colors hover:bg-fg hover:text-white">
              {h.ctas.inquiry}
              <Arrow className="transition-transform group-hover:translate-x-1" />
            </InquiryButton>
            <CLink
              concept="a"
              href="/support/#download"
              className="group inline-flex h-12 items-center gap-2.5 border border-white/45 px-5 text-[0.92rem] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="transition-transform group-hover:translate-y-0.5">
                <path d="M7 1v8M3.5 5.5 7 9l3.5-3.5M1.5 12.5h11" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              {h.ctas.download}
            </CLink>
          </div>
        </div>
        {credit && <span className="absolute right-3 bottom-1 text-[0.58rem] text-white/45">{credit}</span>}
      </div>

      <style>{`
        @keyframes hero-up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
        @keyframes hero-title{from{opacity:0;transform:translateY(18px) scale(.94)}to{opacity:1;transform:none}}
        @keyframes hero-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}
      `}</style>
    </section>
  );
}

const glass = "border border-white/20 bg-black/35 backdrop-blur-md";

function HeroVisual({ kind }: { kind: string }) {
  const { homeA } = getContent();
  if (kind === "chain") {
    const nodes = [
      { src: "/images/cutouts/vnv15lu4ar.webp", label: "Camera" },
      { src: "/images/cutouts/vr16s.webp", label: "NVR" },
      { src: "/images/site/vms-screen.webp", label: "VMS" },
    ];
    return (
      <div className="ml-auto grid max-w-[520px] grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        {nodes.map((n, i) => [
          <figure key={n.label} className={cn(glass, "flex aspect-[3/4] flex-col p-3")}>
            <div className="relative min-h-0 flex-1">
              <Img src={n.src} alt="" fill sizes="140px" className="object-contain" />
            </div>
            <figcaption className="mt-2 font-mono text-[0.68rem] tracking-wider text-white/80 uppercase">{n.label}</figcaption>
          </figure>,
          i < nodes.length - 1 ? <Arrow key={`a${i}`} className="text-accent" /> : null,
        ])}
      </div>
    );
  }
  if (kind === "lux") {
    const [a, b] = homeA.r3.solution.compareLabels;
    return (
      <div className={cn(glass, "ml-auto max-w-[460px] p-5")}>
        <div className="flex items-baseline gap-3">
          <span className="a-display text-[5rem] text-[#f7926a]">0.1</span>
          <span className="font-mono text-sm text-white/75">lux · full colour</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { src: "/images/site/lux-normal-01.webp", label: a },
            { src: "/images/site/lux-ustarlux-01.webp", label: b },
          ].map((c) => (
            <figure key={c.label}>
              <Img src={c.src} alt="" width={500} height={300} sizes="200px" className="aspect-[5/3] w-full object-cover" />
              <figcaption className="mt-1.5 font-mono text-[0.65rem] text-white/70">{c.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "zoom") {
    return (
      <div className="ml-auto flex max-w-[480px] items-end gap-4">
        <div className="relative aspect-square flex-1 bg-studio">
          <Img src="/images/products/vnp36d5var.webp" alt="" fill sizes="300px" className="scale-110 object-contain" />
        </div>
        <div className={cn(glass, "w-36 p-4")}>
          <p className="a-display text-[3.2rem] text-[#f7926a]">36×</p>
          <p className="mt-1 font-mono text-[0.68rem] text-white/80">6–216mm · AF</p>
          <p className="mt-3 font-mono text-[0.62rem] text-white/60 uppercase">VNP36D5VAR</p>
        </div>
      </div>
    );
  }
  return (
    <figure className={cn(glass, "ml-auto max-w-[500px] p-3")}>
      <Img src="/images/site/vms-screen.webp" alt="" width={600} height={450} sizes="480px" className="w-full" />
      <figcaption className="mt-3 flex flex-wrap gap-x-4 gap-y-1 px-1 font-mono text-[0.68rem] tracking-wider text-white/80 uppercase">
        <span>IP / HD analog</span>
        <span>NVR / DVR</span>
        <span>NVR C/S VMS</span>
      </figcaption>
    </figure>
  );
}
