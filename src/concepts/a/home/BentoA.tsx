import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { PendingTag } from "@/components/shared/Placeholder";
import { Reveal } from "@/components/shared/Reveal";
import { productsIn, seriesOf } from "@/data/products";
import { cn } from "@/lib/cn";
import { Arrow } from "../HeaderA";
import { Container, SectionHead } from "../ui";

export function IntroA() {
  const { homeA, company } = getContent();
  return (
    <section aria-labelledby="intro-a" className="border-y border-line bg-panel">
      <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="a-label flex items-center gap-3 text-mute">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {homeA.intro.label}
          </p>
        </Reveal>
        <Reveal className="lg:col-span-9" delay={80}>
          <h2 id="intro-a" className="text-[1.7rem] leading-[1.25] font-medium tracking-[-0.025em] text-balance md:text-[2.6rem]">
            {homeA.intro.statement}
          </h2>
          <dl className="mt-14 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
            {company.facts.map((f) => (
              <div key={f.label} className="bg-panel p-5 md:p-6">
                <dt className="a-label text-mute">{f.label}</dt>
                <dd className="a-display mt-3 text-[1.5rem] md:text-[1.75rem]">{f.value}</dd>
                <dd className="mt-2 text-xs leading-snug text-mute">{f.note}</dd>
              </div>
            ))}
          </dl>
          <CLink concept="a" href="/company/" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold">
            {homeA.intro.link} <Arrow className="transition-transform group-hover:translate-x-1" />
          </CLink>
        </Reveal>
      </Container>
    </section>
  );
}

function CardShell({
  href,
  className,
  children,
  label,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <CLink concept="a" href={href} aria-label={label} className={cn("group relative block overflow-hidden", className)}>
      {children}
    </CLink>
  );
}

function CardFoot({ cta, light }: { cta: string; light?: boolean }) {
  return (
    <span className={cn("mt-5 inline-flex items-center gap-2 text-[0.8rem] font-semibold", light ? "text-white" : "text-fg")}>
      <span className="relative">
        {cta}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
      </span>
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  );
}

export function BentoA() {
  const { homeA, site } = getContent();
  const c = homeA.bento.cards;
  const ipCount = productsIn("ip-camera").length;

  return (
    <section aria-labelledby="bento-a" className="py-20 md:py-28">
      <Container>
        <SectionHead label={homeA.bento.label} title={<span id="bento-a">{homeA.bento.title}</span>} />
        <div className="mt-12 grid auto-rows-[minmax(230px,auto)] grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12 lg:auto-rows-[270px]">
          {/* LARGE — IP Camera: actual product + large type */}
          <Reveal className="md:col-span-6 md:row-span-2 lg:col-span-7">
            <CardShell href="/products/#ip-camera" label={c.ipCamera.title} className="h-full min-h-[460px] bg-studio">
              <div className="relative z-10 p-7 md:p-9">
                <p className="font-mono text-[0.7rem] text-mute">01 · {ipCount} {site.ui.models}</p>
                <h3 className="a-display mt-3 text-[3rem] md:text-[4.6rem]">{c.ipCamera.title}</h3>
                <p className="mt-3 max-w-xs text-[0.95rem] text-fg/70">{c.ipCamera.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {seriesOf("ip-camera").map((s) => (
                    <li key={s} className="border border-fg/15 bg-white/60 px-2.5 py-1 text-xs font-medium">
                      {s}
                    </li>
                  ))}
                </ul>
                <CardFoot cta={c.ipCamera.cta} />
              </div>
              <Img
                src="/images/products/vnn63lu4ar.webp"
                alt="VNN63LU4AR UHD 4K outdoor bullet IP camera"
                width={800}
                height={800}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="absolute right-[-8%] bottom-[-14%] w-[82%] max-w-[640px] transition-transform duration-700 ease-out group-hover:-translate-x-3 group-hover:scale-[1.03] md:w-[70%]"
              />
            </CardShell>
          </Reveal>

          {/* TALL — AI Vision: VISION HITECH demo image, honest status */}
          <Reveal delay={60} className="md:col-span-3 md:row-span-2 lg:col-span-3">
            <CardShell href="/solutions/ai-vision/" label={c.aiVision.title} className="flex h-full min-h-[460px] flex-col bg-fg text-white">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Img src="/images/site/uhd-street.webp" alt="VISION HITECH 4K demonstration image" fill sizes="25vw" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute top-3 left-3 bg-black/60 px-2 py-1 font-mono text-[0.62rem] tracking-wider text-white/80 uppercase">4K demo · VISION HITECH</span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="font-mono text-[0.7rem] text-white/50">02</p>
                <h3 className="a-display mt-3 text-[2.3rem]">{c.aiVision.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-white/70">{c.aiVision.body}</p>
                <div className="mt-auto pt-5">
                  <PendingTag className="text-[#f7926a]" />
                  <div>
                    <CardFoot cta={c.aiVision.cta} light />
                  </div>
                </div>
              </div>
            </CardShell>
          </Reveal>

          {/* SMALL — NVR product */}
          <Reveal delay={120} className="md:col-span-3 lg:col-span-2">
            <CardShell href="/products/#nvr" label={c.nvr.title} className="flex h-full flex-col border border-line bg-white p-6">
              <p className="font-mono text-[0.7rem] text-mute">03</p>
              <h3 className="a-display mt-2 text-[1.9rem]">{c.nvr.title}</h3>
              <p className="mt-1 text-[0.82rem] text-mute">{c.nvr.body}</p>
              <Img src="/images/cutouts/vr16s.webp" alt="VR16S 16 channel NVR" width={652} height={274} sizes="18vw" className="mt-auto w-full transition-transform duration-500 group-hover:-translate-y-1" />
            </CardShell>
          </Reveal>

          {/* SMALL — Technology: split low-light proof */}
          <Reveal delay={160} className="md:col-span-3 lg:col-span-2">
            <CardShell href="/solutions/technology/" label={c.technology.title} className="flex h-full flex-col bg-[#101216] text-white">
              <div className="relative h-[55%] min-h-[120px] w-full">
                <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                  <Img src="/images/site/lux-normal-01.webp" alt="Normal camera at 0.1 lux" fill sizes="10vw" className="object-cover object-left" />
                </div>
                <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                  <Img src="/images/site/lux-ustarlux-01.webp" alt="Ultra STARLUX camera at 0.1 lux" fill sizes="10vw" className="object-cover object-right" />
                </div>
                <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-white/80" />
                <span className="absolute bottom-2 left-2 font-mono text-[0.6rem] text-white/70">NORMAL</span>
                <span className="absolute right-2 bottom-2 font-mono text-[0.6rem] text-[#f7926a]">U-STARLUX</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{c.technology.title}</h3>
                <p className="a-display mt-1 text-[1.6rem] text-[#f7926a]">0.1 lux</p>
              </div>
            </CardShell>
          </Reveal>

          {/* WIDE — Transportation photography */}
          <Reveal className="md:col-span-6 lg:col-span-6">
            <CardShell href="/solutions/transportation/" label={c.transportation.title} className="h-full min-h-[270px] bg-black text-white">
              <Img src="/images/env/env-crossroads.webp" alt="Night-time long exposure of a road interchange" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover opacity-75 transition-transform duration-1000 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-transparent" />
              <div className="relative flex h-full max-w-md flex-col justify-end p-7 md:p-9">
                <p className="font-mono text-[0.7rem] text-white/60">04</p>
                <h3 className="a-display mt-2 text-[2.4rem]">{c.transportation.title}</h3>
                <p className="mt-2 text-[0.9rem] text-white/75">{c.transportation.body}</p>
                <CardFoot cta={c.transportation.cta} light />
              </div>
              <span className="absolute right-3 bottom-2 text-[0.6rem] text-white/50">Photo: Adam Meek, CC BY 2.0</span>
            </CardShell>
          </Reveal>

          {/* MEDIUM — Video Security: WDR demo image */}
          <Reveal delay={60} className="md:col-span-3 lg:col-span-3">
            <CardShell href="/solutions/video-security/" label={c.videoSecurity.title} className="flex h-full flex-col border border-line bg-white">
              <div className="relative h-[52%] min-h-[130px] overflow-hidden">
                <Img src="/images/site/wdr-on.webp" alt="WDR demonstration: travellers in a bright terminal" fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[0.7rem] text-mute">05</p>
                <h3 className="mt-1 text-[1.35rem] font-semibold tracking-[-0.02em]">{c.videoSecurity.title}</h3>
                <p className="mt-1 text-[0.85rem] text-mute">{c.videoSecurity.body}</p>
              </div>
            </CardShell>
          </Reveal>

          {/* MEDIUM — Vision Marine environment */}
          <Reveal delay={120} className="md:col-span-3 lg:col-span-3">
            <CardShell href="/solutions/vision-marine/" label={c.marine.title} className="h-full min-h-[270px] bg-[#dfe6ea]">
              <Img src="/images/env/env-marine-day.webp" alt="Container ship at anchor off the coast" fill sizes="25vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-x-0 top-0 bg-linear-to-b from-white/85 via-white/50 to-transparent p-6 pb-16">
                <p className="font-mono text-[0.7rem] text-fg/60">06</p>
                <h3 className="mt-1 text-[1.35rem] font-semibold tracking-[-0.02em]">{c.marine.title}</h3>
                <p className="mt-1 text-[0.85rem] text-fg/75">{c.marine.body}</p>
              </div>
              <span className="absolute right-3 bottom-2 text-[0.6rem] text-white/80 drop-shadow">Photo: Martin Dörsch, CC0</span>
            </CardShell>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
