import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { Reveal } from "@/components/shared/Reveal";
import { CATEGORY_ORDER, productsIn, seriesOf, type CategoryId } from "@/data/products";
import { CATEGORY_IMAGE } from "@/data/visuals";
import { cn } from "@/lib/cn";
import { Arrow } from "../HeaderA";
import { Container, SectionHead } from "../ui";

/**
 * Open product section — full-bleed studio grey. Product photos share the exact studio
 * background, so the hardware floats on the page with no card frames (scale-contrast:
 * three large families + four compact ones).
 */
export function IntroA() {
  const { homeA, site } = getContent();
  const primary: CategoryId[] = ["ip-camera", "nvr", "hd-analog-camera"];
  const secondary = CATEGORY_ORDER.filter((c) => !primary.includes(c));
  return (
    <section aria-labelledby="line-a" className="bg-studio py-24 md:py-36">
      <Container>
        <SectionHead
          label={homeA.intro.label}
          title={<span id="line-a">{homeA.intro.title}</span>}
          lead={homeA.intro.lead}
          aside={
            <CLink concept="a" href="/products/" className="group inline-flex items-center gap-2 text-sm font-semibold">
              {homeA.intro.link} <Arrow className="transition-transform group-hover:translate-x-1" />
            </CLink>
          }
        />
        <ul className="mt-12 grid gap-x-8 gap-y-14 md:mt-14 md:grid-cols-3">
          {primary.map((c, i) => (
            <Reveal as="li" key={c} delay={i * 80}>
              <CLink concept="a" href={`/products/#${c}`} className="group block">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Img
                    src={CATEGORY_IMAGE[c]}
                    alt={`${site.categories[c].label} — VISION HITECH`}
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="scale-[1.3] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.38]"
                  />
                </div>
                <div className="mt-2 flex items-baseline justify-between border-t border-fg/15 pt-5">
                  <h3 className="a-display text-[1.9rem] md:text-[2.3rem]">{site.categories[c].label}</h3>
                  <span className="font-mono text-xs text-mute">
                    {productsIn(c).length} {site.ui.models}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm text-mute group-hover:text-fg">
                  {seriesOf(c).slice(0, 5).join(" · ")}
                  <Arrow className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </p>
              </CLink>
            </Reveal>
          ))}
        </ul>
        <ul className="mt-16 grid border-t border-fg/15 sm:grid-cols-2 lg:grid-cols-4">
          {secondary.map((c) => (
            <li key={c}>
              <CLink concept="a" href={`/products/#${c}`} className="group flex items-center gap-5 py-6 sm:pr-6">
                <span className="relative h-20 w-24 shrink-0">
                  <Img src={CATEGORY_IMAGE[c]} alt="" fill sizes="96px" className={cn("object-contain transition-transform duration-500 group-hover:scale-110", c !== "software" && "scale-125")} />
                </span>
                <span>
                  <span className="block text-[1.1rem] font-semibold tracking-[-0.01em]">{site.categories[c].label}</span>
                  <span className="font-mono text-xs text-mute">
                    {productsIn(c).length} {site.ui.models}
                  </span>
                </span>
                <Arrow className="ml-auto text-mute transition-transform group-hover:translate-x-1 group-hover:text-fg" />
              </CLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function CardShell({ href, className, children, label }: { href: string; className?: string; children: React.ReactNode; label: string }) {
  return (
    <CLink concept="a" href={href} aria-label={label} className={cn("group relative block h-full overflow-hidden", className)}>
      {children}
    </CLink>
  );
}

function Cta({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-[0.8rem] font-semibold", light ? "text-white" : "text-fg")}>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
      </span>
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  );
}

/**
 * Bento — each card has a different visual function:
 * LARGE product canvas · TALL technology visual · SMALL product cut · SMALL diagram ·
 * WIDE environment photo · MEDIUM image-dominant · MEDIUM environment.
 */
export function BentoA() {
  const { homeA, site } = getContent();
  const c = homeA.bento.cards;

  return (
    <section aria-labelledby="bento-a" className="py-24 md:py-36">
      <Container>
        <SectionHead label={homeA.bento.label} title={<span id="bento-a">{homeA.bento.title}</span>} />
        <div className="mt-16 grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-4 md:grid-cols-6 lg:auto-rows-[300px] lg:grid-cols-12 lg:gap-5">
          {/* LARGE — IP Camera: product canvas, oversized hardware */}
          <Reveal className="md:col-span-6 md:row-span-2 lg:col-span-7">
            <CardShell href="/products/#ip-camera" label={c.ipCamera.title} className="min-h-[520px] bg-studio">
              <div className="relative z-10 p-8 md:p-10">
                <h3 className="a-display text-[3.4rem] md:text-[5.2rem]">{c.ipCamera.title}</h3>
                <p className="mt-3 max-w-[16rem] text-[0.95rem] text-mute">{c.ipCamera.body}</p>
              </div>
              <Img
                src="/images/products/vnn63lu4ar.webp"
                alt="VNN63LU4AR UHD 4K outdoor bullet IP camera"
                width={800}
                height={800}
                sizes="(min-width: 1024px) 45vw, 95vw"
                className="absolute right-[-8%] bottom-[2%] w-[78%] max-w-[760px] transition-transform duration-700 ease-out group-hover:-translate-x-3 group-hover:scale-[1.03] sm:bottom-[-16%] sm:right-[-10%] md:w-[84%]"
              />
              <div className="absolute bottom-8 left-8 z-10 md:bottom-10 md:left-10">
                <p className="mb-4 hidden font-mono text-[0.7rem] text-mute sm:block">
                  {productsIn("ip-camera").length} {site.ui.models} · {seriesOf("ip-camera").join(" · ")}
                </p>
                <Cta>{c.ipCamera.cta}</Cta>
              </div>
            </CardShell>
          </Reveal>

          {/* TALL — AI Vision: technology visual (VISION HITECH 4K demo + scan motion) */}
          <Reveal delay={60} className="md:col-span-3 md:row-span-2 lg:col-span-3">
            <CardShell href="/solutions/ai-vision/" label={c.aiVision.title} className="min-h-[520px] rounded-[3px] bg-[#0e1116] text-white">
              <Img src="/images/site/uhd-street.webp" alt="VISION HITECH 4K demonstration image" fill sizes="25vw" className="object-cover opacity-55 transition-transform duration-1000 group-hover:scale-105" />
              <div aria-hidden className="absolute inset-0 overflow-hidden">
                <span className="absolute inset-x-0 top-0 h-1/3 animate-[a-scan_4.5s_linear_infinite] bg-linear-to-b from-transparent via-[#f47b42]/25 to-transparent" />
              </div>
              <div aria-hidden className="absolute inset-6 border border-white/15" />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#0e1116] via-[#0e1116]/85 to-transparent p-7 pt-24">
                <h3 className="a-display text-[2.4rem]">{c.aiVision.title}</h3>
                <p className="mt-2 text-[0.88rem] text-white/65">{c.aiVision.body}</p>
                <div className="mt-5">
                  <Cta light>{c.aiVision.cta}</Cta>
                </div>
              </div>
            </CardShell>
          </Reveal>

          {/* SMALL — NVR: product cut */}
          <Reveal delay={120} className="md:col-span-3 lg:col-span-2">
            <CardShell href="/products/#nvr" label={c.nvr.title} className="flex flex-col border border-line bg-white p-6">
              <h3 className="text-[1.5rem] font-semibold tracking-[-0.02em]">{c.nvr.title}</h3>
              <p className="text-[0.8rem] text-mute">{c.nvr.body}</p>
              <Img src="/images/cutouts/vr16s.webp" alt="VR16S 16 channel NVR" width={652} height={274} sizes="18vw" className="mt-auto w-full transition-transform duration-500 group-hover:-translate-y-1.5" />
            </CardShell>
          </Reveal>

          {/* SMALL — Technology: lux-scale diagram */}
          <Reveal delay={160} className="md:col-span-3 lg:col-span-2">
            <CardShell href="/solutions/technology/" label={c.technology.title} className="flex flex-col bg-fg p-6 text-white">
              <p className="font-mono text-[0.65rem] tracking-wider text-white/50 uppercase">{c.technology.title}</p>
              <p className="a-display mt-auto text-[3rem] text-[#f7926a]">0.1</p>
              <p className="font-mono text-xs text-white/60">lux · full colour</p>
              <div aria-hidden className="mt-5">
                <div className="h-1.5 w-full bg-linear-to-r from-white/80 via-white/35 to-[#f47b42]" />
                <div className="mt-1.5 flex justify-between font-mono text-[0.58rem] text-white/45">
                  <span>1.0</span>
                  <span>0.5</span>
                  <span className="text-[#f7926a]">0.1</span>
                </div>
              </div>
            </CardShell>
          </Reveal>

          {/* WIDE — Transportation: environment photography */}
          <Reveal className="md:col-span-6 lg:col-span-6">
            <CardShell href="/solutions/transportation/" label={c.transportation.title} className="min-h-[300px] rounded-[3px] bg-black text-white">
              <Img src="/images/env/env-crossroads.webp" alt="Night-time long exposure of a road interchange" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover opacity-80 transition-transform duration-1000 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/25 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
                <h3 className="a-display text-[2.6rem] md:text-[3rem]">{c.transportation.title}</h3>
                <p className="mt-1 text-[0.9rem] text-white/70">{c.transportation.body}</p>
                <div className="mt-5">
                  <Cta light>{c.transportation.cta}</Cta>
                </div>
              </div>
              <span className="absolute right-3 bottom-2 text-[0.58rem] text-white/45">Photo: Adam Meek, CC BY 2.0</span>
            </CardShell>
          </Reveal>

          {/* MEDIUM — Video Security: image dominant, VISION HITECH WDR footage */}
          <Reveal delay={60} className="md:col-span-3 lg:col-span-3">
            <CardShell href="/solutions/video-security/" label={c.videoSecurity.title} className="min-h-[300px] bg-studio">
              <Img src="/images/site/wdr-on.webp" alt="WDR demonstration: travellers in a bright terminal" fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-white px-6 py-5">
                <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em]">{c.videoSecurity.title}</h3>
                <p className="text-[0.8rem] text-mute">{c.videoSecurity.body}</p>
              </div>
            </CardShell>
          </Reveal>

          {/* MEDIUM — Vision Marine: application environment */}
          <Reveal delay={120} className="md:col-span-3 lg:col-span-3">
            <CardShell href="/solutions/vision-marine/" label={c.marine.title} className="min-h-[300px] bg-[#dfe6ea]">
              <Img src="/images/env/env-marine-day.webp" alt="Container ship at anchor off the coast" fill sizes="25vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-x-0 top-0 bg-linear-to-b from-white/85 to-transparent p-6 pb-14">
                <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em]">{c.marine.title}</h3>
                <p className="text-[0.8rem] text-fg/70">{c.marine.body}</p>
              </div>
              <span className="absolute right-3 bottom-2 text-[0.58rem] text-white/85 drop-shadow">Photo: Martin Dörsch, CC0</span>
            </CardShell>
          </Reveal>
        </div>
      </Container>
      <style>{`@keyframes a-scan{0%{transform:translateY(-100%)}100%{transform:translateY(300%)}}`}</style>
    </section>
  );
}
