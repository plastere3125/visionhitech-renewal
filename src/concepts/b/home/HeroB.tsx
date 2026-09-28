import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { CUTOUT } from "@/data/visuals";
import { ArrowB, bBtn, bBtnLine, Brackets, Code } from "../ui";

export function HeroB() {
  const { homeB } = getContent();
  const steps = homeB.chain.steps;
  return (
    <section aria-labelledby="hero-b" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16">
      {/* single controlled light source */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_72%_42%,rgba(111,143,191,0.18),transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-0 top-[58%] -z-10 h-px bg-linear-to-r from-transparent via-fg/10 to-transparent" />

      <div className="mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-10 px-5 py-10 md:px-10 lg:grid-cols-12 lg:py-0">
        <div className="relative z-10 lg:col-span-6">
          <Code n="00">{homeB.hero.eyebrow}</Code>
          <h1 id="hero-b" className="b-display mt-6 text-[2.7rem] sm:text-[3.8rem] xl:text-[5rem]">
            {homeB.hero.title[0]}
            <br />
            <span className="text-mute">{homeB.hero.title[1]}</span>
          </h1>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-fg/70">{homeB.hero.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#chain" className={bBtn}>
              {homeB.hero.primary} <ArrowB />
            </a>
            <InquiryButton className={bBtnLine}>{homeB.hero.secondary}</InquiryButton>
          </div>
        </div>

        <div className="relative h-[380px] sm:h-[480px] lg:col-span-6 lg:h-[620px]">
          {/* brand arc — echoes the arc above the lens in the VISION logo */}
          <svg aria-hidden viewBox="0 0 600 600" className="absolute top-1/2 left-1/2 w-[110%] max-w-[640px] -translate-x-1/2 -translate-y-[54%] opacity-80">
            <circle cx="300" cy="300" r="230" fill="none" stroke="rgba(233,237,243,0.08)" />
            <circle cx="300" cy="300" r="170" fill="none" stroke="rgba(233,237,243,0.05)" />
            <path d="M88 212 A230 230 0 0 1 512 212" fill="none" stroke="#f47b42" strokeWidth="1.5" strokeLinecap="round" className="b-signal-path" style={{ strokeDasharray: "40 560" }} />
          </svg>
          <Img
            src={CUTOUT("vnv15lu4ar")}
            alt="VNV15LU4AR Ultra HD 4K outdoor dome IP camera"
            width={531}
            height={494}
            priority
            sizes="(min-width: 1024px) 34vw, 70vw"
            className="absolute top-[46%] left-1/2 w-[62%] max-w-[440px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
          />
          <p className="b-code absolute top-[8%] left-0 hidden text-mute md:block">
            VNV15LU4AR
            <span className="block text-fg/60 normal-case">Ultra HD 4K Outdoor Dome</span>
          </p>

          {/* demo feed — VISION HITECH's own Advanced ROI test image */}
          <figure className="absolute right-0 bottom-[2%] w-[58%] max-w-[340px] border border-line bg-panel p-1.5 shadow-2xl sm:bottom-[6%]">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Img src="/images/site/roi-advanced.webp" alt="VISION HITECH Advanced ROI demonstration frame" fill sizes="340px" className="object-cover" />
              <Brackets className="m-2" color="rgba(255,255,255,.7)" />
              <span className="absolute top-2.5 right-3 flex items-center gap-1.5 font-mono text-[0.58rem] text-white">
                <span className="h-1.5 w-1.5 animate-[b-blink_1.6s_steps(1)_infinite] rounded-full bg-[#ff4d3d]" /> REC
              </span>
            </div>
            <figcaption className="flex justify-between px-1 pt-1.5 font-mono text-[0.58rem] text-mute">
              <span>{homeB.hero.feedLabel}</span>
              <span>Advanced ROI · 1Mbps</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* chain ticker */}
      <div className="border-t border-line">
        <ol className="mx-auto grid max-w-[1400px] grid-cols-2 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.id} className="relative border-line px-5 py-5 md:border-l md:px-6 first:md:border-l-0 [&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-t-0">
              <a href={`#chain-${s.id}`} className="group block">
                <span className="b-code text-accent">{s.code}</span>
                <span className="mt-1 block text-[0.95rem] font-medium group-hover:text-accent">{s.name}</span>
              </a>
              {i < steps.length - 1 && (
                <svg aria-hidden className="absolute top-1/2 right-0 hidden h-2 w-full translate-x-1/2 md:block" viewBox="0 0 120 8" preserveAspectRatio="none">
                  <line x1="60" y1="4" x2="120" y2="4" stroke="rgba(244,123,66,.8)" strokeWidth="1" className="b-signal-path" style={{ animationDelay: `${i * 0.6}s` }} />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ChainLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <CLink concept="b" href={href} className="group inline-flex items-center gap-3 text-sm text-fg hover:text-accent">
      {children} <ArrowB className="transition-transform group-hover:translate-x-1" />
    </CLink>
  );
}
