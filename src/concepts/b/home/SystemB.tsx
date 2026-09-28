"use client";

import { useState } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { Reveal } from "@/components/shared/Reveal";
import { productsIn, type CategoryId } from "@/data/catalog";
import { CATEGORY_IMAGE } from "@/data/visuals";
import { cn } from "@/lib/cn";
import { ArrowB, Brackets, HeadB, Wrap } from "../ui";

/* ---------------- Technology bento ---------------- */
export function TechBentoB() {
  const { homeB } = getContent();
  return (
    <section aria-labelledby="tech-b" className="border-t border-line py-24 md:py-32">
      <Wrap>
        <HeadB n="02" label={homeB.bento.label} title={<span id="tech-b">{homeB.bento.title}</span>} aside={<CLinkB href="/solutions/technology/">All technologies</CLinkB>} />
        <div className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12 lg:auto-rows-[minmax(250px,auto)]">
          {/* LARGE: Ultra STARLUX — automatic wipe between VISION HITECH test frames */}
          <Reveal className="md:col-span-6 lg:col-span-7 lg:row-span-2">
            <CLinkCard href="/solutions/technology/" className="h-full min-h-[420px]">
              <div className="absolute inset-0">
                <Img src="/images/site/lux-normal-01.webp" alt="Normal camera at 0.1 lux" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 animate-[b-wipe_7s_ease-in-out_infinite]">
                  <Img src="/images/site/lux-ustarlux-01.webp" alt="Ultra STARLUX camera at 0.1 lux" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/30 to-transparent" />
              </div>
              <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
                <div className="flex justify-between font-mono text-[0.62rem] text-white/75 uppercase">
                  <span>Normal cam at 0.1 lux</span>
                  <span>U-Starlux cam at 0.1 lux</span>
                </div>
                <div>
                  <p className="b-code text-accent">Low light</p>
                  <h3 className="b-display mt-2 text-[2.4rem] md:text-[3.4rem]">Ultra STARLUX</h3>
                  <p className="mt-2 max-w-md text-sm text-fg/75">Full colour down to 0.1 lux. True Day/Night B/W with IR below that.</p>
                </div>
              </div>
            </CLinkCard>
          </Reveal>

          {/* WIDE-SHORT: Advanced ROI — bit rate readout */}
          <Reveal delay={60} className="md:col-span-6 lg:col-span-5">
            <CLinkCard href="/solutions/technology/" className="h-full p-6">
              <div className="grid h-full grid-cols-[1fr_44%] gap-5">
                <div className="flex flex-col">
                  <p className="b-code text-accent">Streaming</p>
                  <h3 className="mt-2 text-[1.5rem] font-medium">Advanced ROI</h3>
                  <dl className="mt-auto space-y-2 font-mono text-xs">
                    {[
                      ["Normal", 10],
                      ["Adv. ROI", 1],
                    ].map(([k, v]) => (
                      <div key={String(k)}>
                        <div className="flex justify-between text-mute">
                          <dt>{k}</dt>
                          <dd className="text-fg">{v}Mbps</dd>
                        </div>
                        <div className="mt-1 h-1 bg-fg/10">
                          <div className="h-full bg-accent" style={{ width: `${Number(v) * 10}%` }} />
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="relative overflow-hidden border border-line">
                  <Img src="/images/site/roi-advanced.webp" alt="Advanced ROI demonstration" fill sizes="20vw" className="object-cover" />
                </div>
              </div>
            </CLinkCard>
          </Reveal>

          {/* SMALL: Smart IR */}
          <Reveal delay={100} className="md:col-span-3 lg:col-span-3">
            <CLinkCard href="/solutions/technology/" className="h-full min-h-[220px]">
              <Img src="/images/site/smartir-on.webp" alt="Smart IR demonstration" fill sizes="25vw" className="object-cover opacity-70" />
              <div className="relative flex h-full flex-col justify-end bg-linear-to-t from-bg/90 to-transparent p-6">
                <p className="b-code text-accent">Low light</p>
                <h3 className="mt-1 text-[1.3rem] font-medium">Smart IR</h3>
                <p className="mt-1 text-xs text-fg/70">IR adjusted to object distance.</p>
              </div>
            </CLinkCard>
          </Reveal>

          {/* SMALL: NDAA — typographic */}
          <Reveal delay={140} className="md:col-span-3 lg:col-span-2">
            <CLinkCard href="/support/#certificate-compliance" className="flex h-full min-h-[220px] flex-col justify-between bg-panel-2 p-6">
              <p className="b-code text-mute">Compliance</p>
              <div>
                <p className="b-display text-[2.6rem] text-fg">NDAA</p>
                <p className="mt-1 text-xs leading-snug text-mute">Korean-origin design and manufacture.</p>
              </div>
            </CLinkCard>
          </Reveal>

          {/* WIDE: Color-Night — 3-frame strip */}
          <Reveal className="md:col-span-6 lg:col-span-8">
            <CLinkCard href="/solutions/technology/" className="flex h-full flex-col p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-[1.3rem] font-medium">Color-Night</h3>
                <p className="b-code text-accent">Low light</p>
              </div>
              <ol className="mt-4 grid flex-1 grid-cols-3 gap-1.5">
                {[
                  ["/images/site/colornight-normal.webp", "Normal night color"],
                  ["/images/site/colornight-ir.webp", "IR image"],
                  ["/images/site/colornight-on.webp", "Color-Night"],
                ].map(([src, l], i) => (
                  <li key={src} className="relative min-h-[110px] overflow-hidden border border-line">
                    <Img src={src} alt={l} fill sizes="20vw" className="object-cover" />
                    <span className={cn("absolute bottom-1.5 left-2 font-mono text-[0.58rem]", i === 2 ? "text-accent" : "text-white/80")}>{l}</span>
                  </li>
                ))}
              </ol>
            </CLinkCard>
          </Reveal>

          {/* MEDIUM: Smart hardware list */}
          <Reveal delay={60} className="md:col-span-6 lg:col-span-4">
            <CLinkCard href="/solutions/technology/" className="h-full p-6">
              <p className="b-code text-accent">Hardware</p>
              <ul className="mt-3 divide-y divide-line text-[0.9rem]">
                {["Enhanced Heat Dissipation", "Anti-condensation Sensor & Heater", "Waterproof SD-Card Slot", "Anti-IR Reflection", "Quick & Precise AF Zoom"].map((x) => (
                  <li key={x} className="flex items-center justify-between py-2.5">
                    {x}
                    <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                  </li>
                ))}
              </ul>
            </CLinkCard>
          </Reveal>
        </div>
      </Wrap>
      <style>{`@keyframes b-wipe{0%,12%{clip-path:inset(0 0 0 100%)}45%,62%{clip-path:inset(0 0 0 0)}95%,100%{clip-path:inset(0 0 0 100%)}}`}</style>
    </section>
  );
}

function CLinkCard({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <CLink concept="b" href={href} className={cn("group relative block overflow-hidden border border-line bg-panel transition-colors hover:border-fg/30", className)}>
      {children}
    </CLink>
  );
}

function CLinkB({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <CLink concept="b" href={href} className="group inline-flex items-center gap-3 text-sm hover:text-accent">
      {children} <ArrowB className="transition-transform group-hover:translate-x-1" />
    </CLink>
  );
}

/* ---------------- CatalogItem ecosystem diagram ---------------- */
type NodeId = CategoryId | "operator";
const NODES: Array<{ id: NodeId; x: number; y: number; col: string }> = [
  { id: "ip-camera", x: 12, y: 26, col: "Capture" },
  { id: "hd-analog-camera", x: 12, y: 70, col: "Capture" },
  { id: "accessory", x: 12, y: 96, col: "Install" },
  { id: "nvr", x: 42, y: 26, col: "Record" },
  { id: "dvr", x: 42, y: 70, col: "Record" },
  { id: "software", x: 70, y: 48, col: "Manage" },
  { id: "operator", x: 92, y: 48, col: "Respond" },
];
const EDGES: Array<[NodeId, NodeId]> = [
  ["ip-camera", "nvr"],
  ["hd-analog-camera", "dvr"],
  ["accessory", "ip-camera"],
  ["nvr", "software"],
  ["dvr", "software"],
  ["software", "operator"],
  ["ip-camera", "software"],
];

export function EcosystemB() {
  const { homeB, site } = getContent();
  const [sel, setSel] = useState<NodeId>("ip-camera");
  const label = (id: NodeId) => (id === "operator" ? "Operator" : site.categories[id].label);
  const pos = (id: NodeId) => NODES.find((n) => n.id === id)!;
  const lit = (a: NodeId, b: NodeId) => a === sel || b === sel;

  return (
    <section aria-labelledby="eco-b" className="border-t border-line bg-panel py-24 md:py-32">
      <Wrap>
        <HeadB n="03" label={homeB.ecosystem.label} title={<span id="eco-b">{homeB.ecosystem.title}</span>} aside={<p className="max-w-xs text-sm text-mute">{homeB.ecosystem.body}</p>} />
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* diagram */}
          <div className="relative hidden aspect-[16/9] border border-line bg-bg lg:col-span-8 lg:block">
            <div className="absolute inset-x-0 top-3 flex justify-around px-6 font-mono text-[0.6rem] text-mute uppercase">
              {["Capture", "Record", "Manage", "Respond"].map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {EDGES.map(([a, b]) => {
                const A = pos(a);
                const B = pos(b);
                const on = lit(a, b);
                return (
                  <g key={`${a}-${b}`}>
                    <line x1={A.x} y1={A.y * 0.82 + 8} x2={B.x} y2={B.y * 0.82 + 8} stroke={on ? "rgba(244,123,66,.9)" : "rgba(233,237,243,.12)"} strokeWidth={on ? 0.35 : 0.2} vectorEffect="non-scaling-stroke" style={{ strokeWidth: on ? 1.5 : 1 }} />
                    {on && (
                      <line x1={A.x} y1={A.y * 0.82 + 8} x2={B.x} y2={B.y * 0.82 + 8} stroke="#f47b42" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 3 }} className="b-signal-path" />
                    )}
                  </g>
                );
              })}
            </svg>
            {NODES.map((n) => {
              const on = n.id === sel || EDGES.some(([a, b]) => (a === sel && b === n.id) || (b === sel && a === n.id));
              return (
                <button
                  key={n.id}
                  type="button"
                  aria-pressed={n.id === sel}
                  onClick={() => setSel(n.id)}
                  onMouseEnter={() => setSel(n.id)}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 border px-3.5 py-2 text-left text-[0.82rem] transition-colors",
                    n.id === sel ? "border-accent bg-accent text-[#10141c]" : on ? "border-accent/60 bg-panel text-fg" : "border-line bg-panel text-fg/70 hover:text-fg",
                  )}
                  style={{ left: `${n.x}%`, top: `${n.y * 0.82 + 8}%` }}
                >
                  <span className="block font-mono text-[0.58rem] opacity-70">{n.id === "operator" ? "WEB · PC · MOBILE" : `${productsIn(n.id).length} MODELS`}</span>
                  {label(n.id)}
                </button>
              );
            })}
          </div>

          {/* mobile list version */}
          <ul className="grid grid-cols-2 gap-2 lg:hidden">
            {NODES.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  aria-pressed={n.id === sel}
                  onClick={() => setSel(n.id)}
                  className={cn("w-full border px-3 py-3 text-left text-sm", n.id === sel ? "border-accent text-fg" : "border-line text-fg/70")}
                >
                  <span className="block font-mono text-[0.6rem] text-mute uppercase">{n.col}</span>
                  {label(n.id)}
                </button>
              </li>
            ))}
          </ul>

          {/* detail */}
          <div className="relative border border-line bg-bg p-6 lg:col-span-4" aria-live="polite">
            <Brackets className="-m-px" color="rgba(244,123,66,.6)" />
            {sel === "operator" ? (
              <>
                <p className="b-code text-accent">Respond</p>
                <h3 className="b-display mt-3 text-[1.8rem]">Operator access</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  Remote viewing via RMS, Web, Mac OSX, Android and iOS; dynamic event push to iOS and Android (VR series NVR). NVR C/S Client Live supports up to 128 cameras (Unlimited package).
                </p>
                <div className="relative mt-6 aspect-[4/3] bg-[#e9ecef]">
                  <Img src="/images/site/vms-e-map.webp" alt="NVR C/S e-map screen" fill sizes="30vw" className="object-contain" />
                </div>
              </>
            ) : (
              <>
                <p className="b-code text-accent">{NODES.find((n) => n.id === sel)!.col}</p>
                <h3 className="b-display mt-3 text-[1.8rem]">{site.categories[sel].label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{site.categories[sel].blurb}</p>
                <div className="relative mt-6 aspect-[4/3] overflow-hidden bg-studio">
                  <Img key={sel} src={CATEGORY_IMAGE[sel]} alt="" fill sizes="30vw" className={cn("animate-[bfade_.4s_ease] object-contain", sel === "software" ? "p-4" : "scale-110")} />
                </div>
                <CLink concept="b" href={`/products/#${sel}`} className="group mt-5 inline-flex items-center gap-3 text-sm hover:text-accent">
                  {productsIn(sel).length} models <ArrowB className="transition-transform group-hover:translate-x-1" />
                </CLink>
              </>
            )}
          </div>
        </div>
      </Wrap>
      <style>{`@keyframes bfade{from{opacity:0}to{opacity:1}}`}</style>
    </section>
  );
}
