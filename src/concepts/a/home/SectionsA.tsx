import type { ReactNode } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { Reveal } from "@/components/shared/Reveal";
import { productsIn, type CategoryId } from "@/data/catalog";
import { ENV, envSrcSet } from "@/data/visuals";
import { asset } from "@/lib/paths";
import { cn } from "@/lib/cn";
import { Arrow } from "../HeaderA";
import { Container } from "../ui";

/*
 * Revision 03 homepage bands 2–9 (client file Webpage_Layout_대강.xlsx, sheet 벤토그리드).
 * Each band follows the box sketch in the client file. Compact rhythm: 12px gaps, 48–64px band padding.
 * Hover language: lift = colour + translateY(-6px) + scale(1.015) · colour = colour change only.
 */

const pad = "py-12 md:py-16";

function BandHead({ label, title, id, aside, light }: { label: string; title: string; id: string; aside?: ReactNode; light?: boolean }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className={cn("a-label flex items-center gap-3", light ? "text-white/75" : "text-mute")}>
          <span aria-hidden className="h-px w-8 bg-accent" />
          {label}
        </p>
        <h2 id={id} className="a-display mt-3 text-[2.1rem] md:text-[2.8rem]">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}

function LearnMore({ light, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-[0.8rem] font-semibold", light ? "text-white" : "text-fg", className)}>
      <span className="relative">
        Learn More
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
      </span>
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  );
}

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Box used on image canvases (bands 3, 7, 8, 9). */
function CanvasBox({
  index,
  title,
  href,
  motion,
  icon,
  className,
}: {
  index: number;
  title: string;
  href: string;
  motion: "lift" | "colour";
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <CLink
      concept="a"
      href={href}
      className={cn(
        "group flex min-h-[124px] flex-col justify-between gap-4 bg-white/95 p-4 text-fg transition-[transform,background-color,color,box-shadow] duration-300 ease-out md:min-h-[140px] md:p-5",
        "hover:bg-fg hover:text-white focus-visible:bg-fg focus-visible:text-white",
        motion === "lift" && "hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,.55)] focus-visible:-translate-y-1.5",
        className,
      )}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="font-mono text-[0.7rem] text-accent-ink transition-colors group-hover:text-accent">{num(index)}</span>
        {icon}
      </span>
      <span>
        <span className="block text-[1.05rem] leading-snug font-semibold tracking-[-0.015em] md:text-[1.12rem]">{title}</span>
        <span className="mt-3 inline-flex items-center gap-2 text-[0.78rem] font-semibold">
          Learn More <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </span>
    </CLink>
  );
}

/** Image canvas with title on top and boxes on the lower edge. */
function Canvas({
  bg,
  id,
  label,
  title,
  credit,
  children,
  tone = "dark",
  minH = "min-h-[520px]",
}: {
  bg: string | null;
  id: string;
  label: string;
  title: string;
  credit?: string | null;
  children: ReactNode;
  tone?: "dark" | "light";
  minH?: string;
}) {
  const env = bg ? ENV[bg] : null;
  return (
    <div className={cn("relative flex flex-col justify-between gap-10 overflow-hidden p-3 md:p-4", minH, tone === "dark" ? "bg-[#14171c] text-white" : "bg-[#eceef1] text-fg")}>
      {bg && (
        // eslint-disable-next-line @next/next/no-img-element -- responsive srcset on a static export
        <img
          src={asset(`/images/env/${bg}-1280.webp`)}
          srcSet={envSrcSet(bg, asset)}
          sizes="(min-width: 1440px) 1360px, 100vw"
          alt={env?.alt ?? ""}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {tone === "dark" && <div aria-hidden className="absolute inset-0 bg-linear-to-b from-black/60 via-black/15 to-black/60" />}
      <div className="relative px-2 pt-3 md:px-4 md:pt-5">
        <p className={cn("a-label flex items-center gap-3", tone === "dark" ? "text-white/80" : "text-mute")}>
          <span aria-hidden className="h-px w-8 bg-accent" />
          {label}
        </p>
        <h2 id={id} className="a-display mt-3 text-[2.1rem] [text-shadow:0_2px_18px_rgba(0,0,0,.25)] md:text-[2.8rem]">
          {title}
        </h2>
      </div>
      <div className="relative">{children}</div>
      {credit && <span className={cn("absolute right-2 bottom-0.5 text-[0.56rem]", tone === "dark" ? "text-white/55" : "text-fg/45")}>{credit}</span>}
    </div>
  );
}

/* ── 2 · SOLUTION ─────────────────────────────────────────────────────────── */

function SolutionGraphic({ i }: { i: number }) {
  const { homeA } = getContent();
  if (i === 0)
    return (
      <div className="flex h-full items-center justify-center gap-1.5 bg-studio px-4">
        {[
          { src: "/images/cutouts/vnv15lu4ar.webp", w: 900, h: 900, label: "Camera" },
          { src: "/images/cutouts/vr16s.webp", w: 652, h: 274, label: "NVR" },
          { src: "/images/site/vms-screen.webp", w: 600, h: 450, label: "VMS" },
        ].map((n, k) => (
          <div key={n.label} className="flex flex-1 items-center gap-1.5">
            <figure className="flex flex-1 flex-col items-center gap-2">
              <Img src={n.src} alt="" width={n.w} height={n.h} sizes="90px" className="w-full object-contain transition-transform duration-500 group-hover:-translate-y-1" />
              <figcaption className="font-mono text-[0.6rem] text-mute uppercase">{n.label}</figcaption>
            </figure>
            {k < 2 && <Arrow className="shrink-0 text-accent-ink" />}
          </div>
        ))}
      </div>
    );
  if (i === 1) {
    const [a, b] = homeA.r3.solution.compareLabels;
    return (
      <div className="grid h-full grid-rows-2 gap-px bg-fg">
        {[
          { src: "/images/site/lux-normal-01.webp", label: a },
          { src: "/images/site/lux-ustarlux-01.webp", label: b },
        ].map((c) => (
          <figure key={c.label} className="relative overflow-hidden">
            <Img src={c.src} alt={`${c.label} — VISION HITECH test footage`} fill sizes="(min-width:1024px) 22vw, 80vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <figcaption className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 font-mono text-[0.62rem] text-white">{c.label}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  if (i === 2)
    return (
      <div className="relative h-full bg-studio">
        <Img src="/images/products/vnp36d5var.webp" alt="VNP36D5VAR — 36× AF zoom IP PTZ camera" fill sizes="(min-width:1024px) 22vw, 80vw" className="scale-[1.08] object-contain transition-transform duration-700 group-hover:scale-[1.14]" />
        <span className="a-display absolute top-3 right-4 text-[2.2rem] text-accent-ink">36×</span>
      </div>
    );
  return (
    <div className="relative h-full overflow-hidden bg-[#0e1116]">
      {/* abstract night-city scene — no detection overlays (no AI functions are claimed) */}
      {/* eslint-disable-next-line @next/next/no-img-element -- static export asset */}
      <img src={asset("/images/env/env-city-night-768.webp")} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-1000 group-hover:scale-105" />
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <span className="absolute inset-x-0 top-0 h-1/3 animate-[a-scan_4.5s_linear_infinite] bg-linear-to-b from-transparent via-[#f47b42]/25 to-transparent" />
      </div>
      <div aria-hidden className="absolute inset-4 border border-white/20" />
    </div>
  );
}

export function SolutionBandA() {
  const { homeA } = getContent();
  const s = homeA.r3.solution;
  return (
    <section aria-labelledby="sol-a" className={cn("bg-white", pad)}>
      <Container>
        <BandHead label={s.label} title={s.title} id="sol-a" />
        <ul className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:mt-8 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-4">
          {s.cards.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 60} className="w-[80%] shrink-0 snap-start sm:w-auto">
              <CLink
                concept="a"
                href={c.href}
                className="group flex h-full flex-col border border-line bg-white transition-[border-color,box-shadow] duration-300 hover:border-fg/40 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,.5)]"
              >
                <div className="aspect-[4/3.6] overflow-hidden">
                  <SolutionGraphic i={i} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-mono text-[0.7rem] text-accent-ink">{num(i)}</span>
                  <h3 className="mt-2 text-[1.2rem] leading-snug font-semibold tracking-[-0.02em] md:text-[1.3rem]">{c.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-mute">{c.body}</p>
                  <LearnMore className="mt-auto pt-5" />
                </div>
              </CLink>
            </Reveal>
          ))}
        </ul>
      </Container>
      <style>{`@keyframes a-scan{0%{transform:translateY(-100%)}100%{transform:translateY(300%)}}`}</style>
    </section>
  );
}

/* ── 3 · WHY VISIONHITECH ─────────────────────────────────────────────────── */

export function WhyBandA() {
  const { homeA } = getContent();
  const w = homeA.r3.why;
  return (
    <section aria-labelledby="why-a" className={cn("bg-panel", pad)}>
      <Container>
        <div className="relative">
          {/* HQ photo — 1400px source, so the canvas carries it as a framed image rather than a full-bleed band */}
          <div className="relative flex min-h-[560px] flex-col justify-between overflow-hidden bg-[#14171c] p-3 text-white md:p-4">
            <Img src="/images/site/hq-building.webp" alt="VISION HITECH head office and factory, Bucheon" fill sizes="(min-width:1440px) 1360px, 100vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-linear-to-b from-black/65 via-black/10 to-black/55" />
            <div className="relative px-2 pt-3 md:px-4 md:pt-5">
              <p className="a-label flex items-center gap-3 text-white/80">
                <span aria-hidden className="h-px w-8 bg-accent" />
                {w.label}
              </p>
              <h2 id="why-a" className="a-display mt-3 text-[2.1rem] [text-shadow:0_2px_18px_rgba(0,0,0,.25)] md:text-[2.8rem]">
                {w.title}
              </h2>
            </div>
            <ul className="relative grid grid-cols-2 gap-3 lg:grid-cols-4">
              {w.items.map((it, i) => (
                <li key={it.title}>
                  <CanvasBox index={i} title={it.title} href={it.href} motion="lift" className="h-full md:min-h-[168px]" />
                </li>
              ))}
            </ul>
            <span className="absolute right-2 bottom-0.5 text-[0.56rem] text-white/55">{w.caption}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── 4 · NETWORK PRODUCTS ─────────────────────────────────────────────────── */

const CAT_VISUAL: Partial<Record<CategoryId, { src: string; w: number; h: number; fit: string }>> = {
  "ip-camera": { src: "/images/products/vnn64lu4ar.webp", w: 800, h: 800, fit: "scale-[1.18]" },
  nvr: { src: "/images/products/vr16s.webp", w: 800, h: 800, fit: "scale-[1.1]" },
  "zoom-module": { src: "/images/products/vnp36d5var.webp", w: 800, h: 800, fit: "scale-[1.05]" },
  accessory: { src: "/images/products/vba130.webp", w: 800, h: 800, fit: "scale-100" },
  "hd-analog-camera": { src: "/images/products/vtn64184er.webp", w: 800, h: 800, fit: "scale-[1.15]" },
  dvr: { src: "/images/products/vd16t.webp", w: 800, h: 800, fit: "scale-[1.1]" },
};

function ModelCount({ cat }: { cat: CategoryId }) {
  const { site } = getContent();
  const count = productsIn(cat).length;
  return (
    <span className="font-mono text-[0.68rem] whitespace-nowrap text-mute">
      {count} {count === 1 ? "model" : site.ui.models}
    </span>
  );
}

function ProductVisual({ cat, alt, sizes, screen }: { cat: CategoryId; alt: string; sizes: string; screen?: string }) {
  if (screen)
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Img src={screen} alt={alt} width={600} height={450} sizes={sizes} className="w-full max-w-[330px] shadow-[0_12px_30px_-18px_rgba(0,0,0,.45)] transition-transform duration-500 group-hover:-translate-y-1" />
      </div>
    );
  const v = CAT_VISUAL[cat]!;
  return <Img src={v.src} alt={alt} fill sizes={sizes} className={cn("object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06]", v.fit)} />;
}

export function NetworkBandA() {
  const { homeA } = getContent();
  const n = homeA.r3.network;
  const [ip, nvr, sw, zoom, acc] = n.cards;
  const card = "group relative flex h-full flex-col overflow-hidden bg-studio transition-[box-shadow] duration-300 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,.5)]";
  const text = (c: (typeof n.cards)[number], i: number) => (
    <div className="relative z-10 flex items-end justify-between gap-4 p-5 md:p-6">
      <div className="min-w-0">
        <span className="font-mono text-[0.7rem] text-accent-ink">{num(i)}</span>
        <h3 className="mt-1.5 text-[1.35rem] font-semibold tracking-[-0.02em] md:text-[1.5rem]">{c.title}</h3>
        <p className="mt-1.5 max-w-[30ch] text-[0.86rem] leading-relaxed text-mute">{c.body}</p>
        <LearnMore className="mt-4" />
      </div>
      <ModelCount cat={c.cat as CategoryId} />
    </div>
  );
  return (
    <section aria-labelledby="net-a" className={cn("bg-white", pad)}>
      <Container>
        <BandHead
          label={n.label}
          title={n.title}
          id="net-a"
          aside={
            <CLink concept="a" href="/products/" className="group inline-flex items-center gap-2 text-sm font-semibold">
              All products <Arrow className="transition-transform group-hover:translate-x-1" />
            </CLink>
          }
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-8 lg:grid-cols-3">
          {[ip, nvr, sw].map((c, i) => (
            <Reveal key={c.title} delay={i * 60} className={i === 2 ? "sm:col-span-2 lg:col-span-1" : undefined}>
              <CLink concept="a" href={c.href} className={card}>
                <div className="relative h-[230px] md:h-[260px]">
                  <ProductVisual
                    cat={c.cat as CategoryId}
                    alt={`${c.title} — VISION HITECH`}
                    sizes="(min-width:1024px) 30vw, 90vw"
                    screen={c.cat === "software" ? "/images/site/vms-screen.webp" : undefined}
                  />
                </div>
                {text(c, i)}
              </CLink>
            </Reveal>
          ))}
          <Reveal className="sm:col-span-2">
            <CLink concept="a" href={zoom.href} className={cn(card, "sm:flex-row")}>
              <div className="flex flex-1 flex-col justify-end">{text(zoom, 3)}</div>
              <div className="relative h-[220px] sm:h-auto sm:w-[46%]">
                <ProductVisual cat="zoom-module" alt="VNP36D5VAR — VHT zoom module" sizes="(min-width:1024px) 30vw, 90vw" />
              </div>
            </CLink>
          </Reveal>
          <Reveal delay={60} className="sm:col-span-2 lg:col-span-1">
            <CLink concept="a" href={acc.href} className={cn(card, "flex-row")}>
              <div className="flex flex-1 flex-col justify-end">{text(acc, 4)}</div>
              <div className="relative w-[34%] min-w-[110px]">
                <ProductVisual cat="accessory" alt="VBA130 junction box with adaptor" sizes="200px" />
              </div>
            </CLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ── 5 · HD ANALOG PRODUCTS ───────────────────────────────────────────────── */

export function AnalogBandA() {
  const { homeA } = getContent();
  const a = homeA.r3.analog;
  const visual: Record<number, { src: string; alt: string; screen?: boolean }> = {
    0: { src: "/images/products/vtn64184er.webp", alt: "VTN64184ER 5MP HD analog bullet camera" },
    1: { src: "/images/products/vd16t.webp", alt: "VD16T 16 channel hybrid DVR" },
    2: { src: "/images/site/vms-e-map.webp", alt: "NVR C/S VMS e-map screen", screen: true },
    3: { src: "/images/products/wtx-1200a.webp", alt: "WTX-1200A PTZ controller" },
  };
  return (
    <section aria-labelledby="hd-a" className={cn("bg-panel", pad)}>
      <Container>
        <BandHead label={a.label} title={a.title} id="hd-a" />
        <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-2">
          {a.cards.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 60}>
              <CLink
                concept="a"
                href={c.href}
                className="group flex h-full min-h-[190px] overflow-hidden bg-white transition-[box-shadow] duration-300 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,.5)]"
              >
                <div className="relative w-[38%] shrink-0 bg-studio">
                  {visual[i].screen ? (
                    <div className="flex h-full items-center p-4">
                      <Img src={visual[i].src} alt={visual[i].alt} width={600} height={400} sizes="220px" className="w-full transition-transform duration-500 group-hover:-translate-y-1" />
                    </div>
                  ) : (
                    <Img src={visual[i].src} alt={visual[i].alt} fill sizes="(min-width:768px) 18vw, 38vw" className="scale-[1.12] object-contain transition-transform duration-700 group-hover:scale-[1.2]" />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-5 md:p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[0.7rem] text-accent-ink">{num(i)}</span>
                    <ModelCount cat={c.cat as CategoryId} />
                  </div>
                  <h3 className="mt-2 text-[1.25rem] font-semibold tracking-[-0.02em] md:text-[1.35rem]">{c.title}</h3>
                  <p className="mt-1.5 text-[0.86rem] leading-relaxed text-mute">{c.body}</p>
                  <LearnMore className="mt-auto pt-4" />
                </div>
              </CLink>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── 6 · SPECIAL CAMERA ───────────────────────────────────────────────────── */

export function SpecialBandA() {
  const { homeA } = getContent();
  const s = homeA.r3.special;
  return (
    <section aria-labelledby="sp-a" className={cn("bg-white", pad)}>
      <Container>
        <BandHead label={s.label} title={s.title} id="sp-a" />
        <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-2">
          {s.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <CLink concept="a" href={c.href} className="group relative flex h-full min-h-[440px] flex-col justify-end overflow-hidden bg-[#14171c] text-white md:min-h-[500px]">
                {/* eslint-disable-next-line @next/next/no-img-element -- responsive srcset on a static export */}
                <img
                  src={asset(`/images/env/${c.bg}-1280.webp`)}
                  srcSet={envSrcSet(c.bg, asset)}
                  sizes="(min-width:768px) 50vw, 100vw"
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10" />
                {/* real VISION HITECH product placed in the environment */}
                <figure className="absolute top-4 right-4 w-[34%] max-w-[190px] bg-studio p-2 shadow-[0_16px_40px_-18px_rgba(0,0,0,.7)] transition-transform duration-500 group-hover:-translate-y-1 md:top-5 md:right-5">
                  <div className="relative aspect-square overflow-hidden">
                    <Img src={`/images/products/${c.product}.webp`} alt={c.productNote} fill sizes="190px" className="scale-110 object-contain" />
                  </div>
                  <figcaption className="mt-1.5 px-0.5 font-mono text-[0.6rem] leading-snug text-fg/70">{c.productNote}</figcaption>
                </figure>
                <div className="relative p-6 md:p-8">
                  <span className="font-mono text-[0.7rem] text-accent">{num(i)}</span>
                  <h3 className="a-display mt-2 text-[2rem] md:text-[2.6rem]">{c.title}</h3>
                  <p className="mt-2 max-w-[42ch] text-[0.92rem] leading-relaxed text-white/80">{c.body}</p>
                  <LearnMore light className="mt-5" />
                </div>
                <span className="absolute right-2 bottom-0.5 text-[0.56rem] text-white/55">{c.credit}</span>
              </CLink>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── 7 · APPLICATION ──────────────────────────────────────────────────────── */

export function ApplicationBandA() {
  const { homeA } = getContent();
  const a = homeA.r3.application;
  return (
    <section aria-labelledby="app-a" className={cn("bg-panel", pad)}>
      <Container>
        <Canvas bg="env-marine-night" id="app-a" label={a.label} title={a.title} credit={a.credit}>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {a.items.map((it, i) => (
              <li key={it.title} className={i === 4 ? "col-span-2 sm:col-span-1" : undefined}>
                <CanvasBox index={i} title={it.title} href={it.href} motion="lift" className="h-full" />
              </li>
            ))}
          </ul>
        </Canvas>
      </Container>
    </section>
  );
}

/* ── 8 · SUPPORT ──────────────────────────────────────────────────────────── */

export function SupportBandA() {
  const { homeA, site } = getContent();
  const s = homeA.r3.support;
  const links = site.nav.find((g) => g.id === "support")!.links;
  return (
    <section aria-labelledby="sup-a" className={cn("bg-white", pad)}>
      <Container>
        <div className="relative overflow-hidden bg-[#eef0f2]">
          {/* minimal technical canvas: grid lines + a real product cut */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(22,24,27,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,24,27,.06)_1px,transparent_1px)] [background-size:48px_48px]"
          />
          <Img src="/images/cutouts/vnn63lu4ar.webp" alt="" width={900} height={900} sizes="40vw" className="pointer-events-none absolute -top-[18%] -right-[8%] hidden w-[46%] max-w-[620px] opacity-[0.16] grayscale lg:block" />
          <div className="relative flex min-h-[480px] flex-col justify-between gap-10 p-3 md:p-4">
            <div className="px-2 pt-3 md:px-4 md:pt-5">
              <p className="a-label flex items-center gap-3 text-mute">
                <span aria-hidden className="h-px w-8 bg-accent" />
                {s.label}
              </p>
              <h2 id="sup-a" className="a-display mt-3 text-[2.1rem] md:text-[2.8rem]">
                {s.title}
              </h2>
            </div>
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {links.map((l, i) => (
                <li key={l.href}>
                  <CanvasBox index={i} title={l.label} href={l.href} motion="colour" className="h-full bg-white" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── 9 · WHAT'S NEW ───────────────────────────────────────────────────────── */

export function NewsBandA() {
  const { homeA, site } = getContent();
  const n = homeA.r3.news;
  const links = site.nav.find((g) => g.id === "media")!.links;
  const icon = (label: string) =>
    label === "Youtube" ? (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="currentColor" className="opacity-70 group-hover:opacity-100">
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
      </svg>
    ) : label === "LinkedIn" ? (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="currentColor" className="opacity-70 group-hover:opacity-100">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5c0-1.2-.02-2.73-1.66-2.73-1.66 0-1.92 1.3-1.92 2.64V21h-4V9.75Z" />
      </svg>
    ) : undefined;
  return (
    <section aria-labelledby="new-a" className={cn("bg-panel", pad)}>
      <Container>
        <Canvas bg="env-glass" id="new-a" label={n.label} title={n.title} credit={n.credit}>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {links.map((l, i) => (
              <li key={l.href} className={i === 4 ? "col-span-2 sm:col-span-1" : undefined}>
                <CanvasBox index={i} title={l.label} href={l.href} motion="lift" icon={icon(l.label)} className="h-full" />
              </li>
            ))}
          </ul>
        </Canvas>
      </Container>
    </section>
  );
}
