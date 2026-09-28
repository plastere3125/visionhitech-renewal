import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { Reveal } from "@/components/shared/Reveal";
import { Arrow } from "../HeaderA";
import { Container, SectionHead } from "../ui";

/** Corporate proof — comes after product & technology: facts, pillars, facilities. */
export function WhyA() {
  const { homeA, company } = getContent();
  return (
    <section aria-labelledby="why-a" className="border-t border-line py-24 md:py-36">
      <Container>
        <SectionHead label={homeA.why.label} title={<span id="why-a">{homeA.why.title}</span>} />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[16/11] overflow-hidden bg-studio">
              <Img src="/images/site/production-line.webp" alt="VISION HITECH camera assemblies on the production line" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <div className="flex flex-col lg:col-span-5">
            <p className="text-[1.25rem] leading-snug font-medium tracking-[-0.015em] text-fg/85">{homeA.why.statement}</p>
            <dl className="mt-auto grid grid-cols-2 gap-x-6 gap-y-8 pt-12">
              {company.facts.map((f) => (
                <div key={f.label} className="border-t border-fg pt-4">
                  <dt className="font-mono text-[0.68rem] tracking-wider text-mute uppercase">{f.label}</dt>
                  <dd className="a-display mt-2 text-[1.9rem]">{f.value}</dd>
                  <dd className="mt-1 text-xs text-mute">{f.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <ol className="mt-20 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {homeA.why.pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 70}>
              <span className="font-mono text-xs text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[1.15rem] font-semibold tracking-[-0.015em]">{p.title}</h3>
              <p className="mt-2 text-sm text-mute">{p.body}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
          <p className="a-label text-mute">Certifications & compliance</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {company.quality.marks.map((m) => (
              <li key={m} className="text-[0.82rem] font-semibold tracking-wide text-fg/75">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** Media Center gateway — channel structure + representative posts (no archive commentary). */
export function NewsA() {
  const { homeA, media, site } = getContent();
  const channels = site.nav.find((g) => g.id === "media")!.links;
  return (
    <section aria-labelledby="news-a" className="bg-panel py-24 md:py-36">
      <Container>
        <SectionHead
          label={homeA.media.label}
          title={<span id="news-a">{homeA.media.title}</span>}
          aside={
            <nav aria-label="Media channels" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {channels.map((l) => (
                <CLink key={l.href} concept="a" href={l.href} className="text-mute hover:text-fg">
                  {l.label}
                </CLink>
              ))}
            </nav>
          }
        />
        <ul className="mt-16 grid gap-8 md:grid-cols-12">
          {media.news.map((n, i) => (
            <Reveal as="li" key={n.title} delay={i * 70} className={i === 0 ? "md:col-span-6" : "md:col-span-3"}>
              <CLink concept="a" href="/media/#notice" className="group block">
                <div className={`relative overflow-hidden bg-studio ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  <Img src={n.image} alt="" fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-5 font-mono text-[0.7rem] text-mute">{n.category}</p>
                <h3 className={`mt-2 font-semibold tracking-[-0.02em] ${i === 0 ? "text-[1.6rem]" : "text-[1.15rem]"}`}>{n.title}</h3>
                {i === 0 && <p className="mt-2 line-clamp-2 max-w-lg text-sm text-mute">{n.body}</p>}
              </CLink>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Support gateway — open columns, no boxes. */
export function SupportA() {
  const { homeA } = getContent();
  return (
    <section aria-labelledby="support-a" className="py-24 md:py-36">
      <Container>
        <SectionHead label={homeA.support.label} title={<span id="support-a">{homeA.support.title}</span>} />
        <ul className="mt-16 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {homeA.support.cards.map((c) => (
            <li key={c.title}>
              <CLink concept="a" href={c.href} className="group block border-t border-fg py-6">
                <h3 className="flex items-center justify-between text-[1.3rem] font-semibold tracking-[-0.02em]">
                  {c.title}
                  <Arrow className="transition-transform group-hover:translate-x-1.5" />
                </h3>
                <p className="mt-2 text-sm text-mute">{c.body}</p>
              </CLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function CtaA() {
  const { homeA, site } = getContent();
  return (
    <section aria-labelledby="cta-a" className="bg-fg text-white">
      <Container className="grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="a-label flex items-center gap-3 text-white/50">
            <span aria-hidden className="h-px w-8 bg-accent" /> Global / Product inquiry
          </p>
          <h2 id="cta-a" className="a-display mt-6 text-[2.4rem] md:text-[3.8rem]">
            {homeA.cta.title}
          </h2>
          <p className="mt-6 max-w-lg text-white/65">{homeA.cta.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <InquiryButton className="inline-flex items-center gap-2.5 bg-accent px-6 py-3.5 text-sm font-semibold text-fg transition-colors hover:bg-white">
              {homeA.cta.primary} <Arrow />
            </InquiryButton>
            <CLink concept="a" href="/contact/" className="inline-flex items-center gap-2.5 border border-white/25 px-6 py-3.5 text-sm font-semibold hover:border-white">
              {homeA.cta.secondary}
            </CLink>
          </div>
        </div>
        <dl className="grid gap-6 border-t border-white/15 pt-8 text-sm sm:grid-cols-2 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <div>
            <dt className="text-white/45">Sales</dt>
            <dd className="mt-1">
              <a href={`mailto:${site.contact.salesEmail}`} className="hover:underline">
                {site.contact.salesEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-white/45">Tel</dt>
            <dd className="mt-1">{site.contact.tel}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-white/45">{site.contact.hqLabel}</dt>
            <dd className="mt-1 leading-relaxed text-white/80">{site.contact.address}</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
