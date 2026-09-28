import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { Reveal } from "@/components/shared/Reveal";
import { Arrow } from "../HeaderA";
import { Container, SectionHead } from "../ui";

export function WhyA() {
  const { homeA, company } = getContent();
  return (
    <section aria-labelledby="why-a" className="border-t border-line py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead label={homeA.why.label} title={<span id="why-a">{homeA.why.title}</span>} />
          <Reveal className="relative mt-10">
            <div className="relative aspect-[4/3] overflow-hidden bg-studio">
              <Img src="/images/site/production-line.webp" alt="VISION HITECH camera assemblies on the production line" fill sizes="(min-width:1024px) 38vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -right-3 -bottom-8 hidden w-[38%] border-8 border-white bg-white shadow-sm sm:block">
              <div className="relative aspect-[4/5]">
                <Img src="/images/site/test-chamber.webp" alt="Environmental test chamber used in VISION HITECH quality testing" fill sizes="15vw" className="object-contain" />
              </div>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-28">
          <ol className="divide-y divide-line border-y border-line">
            {homeA.why.pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 70} className="grid grid-cols-[3rem_1fr] gap-2 py-7">
                <span className="font-mono text-sm text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em]">{p.title}</h3>
                  <p className="mt-2 text-[0.93rem] text-mute">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10">
            <p className="a-label text-mute">Certifications & compliance (as stated by VISION HITECH)</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {company.quality.marks.map((m) => (
                <li key={m} className="border border-line px-3 py-2 text-[0.8rem] font-semibold tracking-wide">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function NewsA() {
  const { homeA, media } = getContent();
  return (
    <section aria-labelledby="news-a" className="bg-panel py-20 md:py-28">
      <Container>
        <SectionHead
          label={homeA.media.label}
          title={<span id="news-a">{homeA.media.title}</span>}
          aside={
            <CLink concept="a" href="/media/" className="group inline-flex items-center gap-2 text-sm font-semibold">
              {homeA.media.all} <Arrow className="transition-transform group-hover:translate-x-1" />
            </CLink>
          }
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {media.news.map((n, i) => (
            <Reveal as="li" key={n.title} delay={i * 70}>
              <article className="group">
                <div className="relative aspect-[10/7] overflow-hidden bg-studio">
                  <Img src={n.image} alt="" fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-5 flex gap-3 font-mono text-[0.72rem] text-mute">
                  <time dateTime={n.date}>{n.date}</time>
                  <span>{n.category}</span>
                </p>
                <h3 className="mt-2 text-[1.2rem] font-semibold tracking-[-0.02em]">{n.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-mute">{n.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>
        <p className="mt-10 border-t border-line pt-5 text-xs text-mute">{media.archiveNote}</p>
      </Container>
    </section>
  );
}

export function SupportA() {
  const { homeA } = getContent();
  return (
    <section aria-labelledby="support-a" className="py-20 md:py-28">
      <Container>
        <SectionHead label={homeA.support.label} title={<span id="support-a">{homeA.support.title}</span>} />
        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {homeA.support.cards.map((c, i) => (
            <li key={c.title} className="bg-white">
              <CLink concept="a" href={c.href} className="group flex h-full min-h-[220px] flex-col p-7 transition-colors hover:bg-panel">
                <span className="font-mono text-[0.7rem] text-mute">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-auto text-[1.35rem] font-semibold tracking-[-0.02em]">{c.title}</h3>
                <p className="mt-2 text-sm text-mute">{c.body}</p>
                <Arrow className="mt-5 transition-transform group-hover:translate-x-1.5" />
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
