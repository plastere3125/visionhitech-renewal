import type { ReactNode } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { CompareSlider } from "@/components/shared/CompareSlider";
import { Img } from "@/components/shared/Img";
import { InquiryButton, InquiryForm } from "@/components/shared/Inquiry";
import { PendingTag, Placeholder } from "@/components/shared/Placeholder";
import { Reveal } from "@/components/shared/Reveal";
import type { Solution } from "@/content/en/solutions";
import { getProduct, type Product } from "@/data/products";
import { ProductCardB } from "../ProductCardB";
import { ArrowB, bBtn, Brackets, Code, Wrap } from "../ui";

export function PageHeroB({ code, title, body, children }: { code: string; title: ReactNode; body?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line pt-16">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_80%_at_85%_0%,rgba(111,143,191,0.14),transparent_70%)]" />
      <Wrap className="grid gap-8 pt-16 pb-14 md:pt-24 md:pb-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Code>{code}</Code>
          <h1 className="b-display mt-6 text-[2.8rem] md:text-[4.6rem]">{title}</h1>
        </div>
        {(body || children) && (
          <div className="flex flex-col justify-end gap-6 lg:col-span-4">
            {body && <p className="leading-relaxed text-fg/70">{body}</p>}
            {children}
          </div>
        )}
      </Wrap>
    </section>
  );
}

const STATUS = { verified: "VERIFIED", partial: "PARTIAL", pending: "PENDING" } as const;

/* ---------------- Solutions overview: indexed rows ---------------- */
export function SolutionsOverviewB() {
  const { solutions } = getContent();
  return (
    <>
      <PageHeroB code="Solutions · 05 areas" title="From technology to application." body="Each area separates verified VISION HITECH statements from content awaiting confirmation." />
      <Wrap className="py-10 md:py-16">
        <ol className="border-t border-line">
          {solutions.map((s) => (
            <li key={s.slug}>
              <CLink concept="b" href={`/solutions/${s.slug}/`} className="group grid grid-cols-[3rem_1fr] items-center gap-4 border-b border-line py-7 lg:grid-cols-[4rem_1.2fr_1fr_14rem_2rem] lg:gap-8 md:py-9">
                <span className="b-code text-accent">{s.index}</span>
                <h2 className="b-display text-[2rem] transition-colors group-hover:text-accent md:text-[3rem]">{s.name}</h2>
                <p className="col-start-2 text-sm text-mute lg:col-start-auto">{s.summary}</p>
                <div className="relative col-start-2 aspect-[16/10] max-w-sm overflow-hidden border border-line lg:col-start-auto lg:max-w-none">
                  <Img src={s.image.src} alt={s.image.alt} fill sizes="14rem" className="object-cover opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0" />
                  <span className="absolute top-2 left-2 font-mono text-[0.58rem] text-white">{STATUS[s.status]}</span>
                  {s.image.credit && <span className="absolute right-1.5 bottom-1 text-[0.5rem] text-white/75">Photo: {s.image.credit}</span>}
                </div>
                <ArrowB className="hidden text-mute transition-all group-hover:translate-x-1 group-hover:text-accent lg:block" />
              </CLink>
            </li>
          ))}
        </ol>
      </Wrap>
    </>
  );
}

/* ---------------- Solution detail: signal-flow template ---------------- */
export function SolutionDetailB({ solution: s }: { solution: Solution }) {
  const { technologies, solutions } = getContent();
  const products = s.productSlugs.map((x) => getProduct(x)).filter((p): p is Product => Boolean(p));
  const techs = s.techIds.map((id) => technologies.find((t) => t.id === id)!).filter(Boolean);
  const proof = techs.find((t) => t.compare);
  const next = solutions[(solutions.findIndex((x) => x.slug === s.slug) + 1) % solutions.length];

  return (
    <>
      <section className="relative isolate min-h-[70svh] overflow-hidden border-b border-line pt-16">
        <Img src={s.image.src} alt={s.image.alt} fill priority sizes="100vw" className="-z-10 object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-bg via-bg/60 to-bg/30" />
        <Wrap className="flex min-h-[calc(70svh-4rem)] flex-col justify-end pb-14">
          <p className="b-code text-mute">
            <CLink concept="b" href="/solutions/" className="hover:text-fg">
              Solutions
            </CLink>{" "}
            / {s.index}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="b-code text-accent">{STATUS[s.status]}</span>
            {s.status !== "verified" && <PendingTag />}
          </div>
          <h1 className="b-display mt-4 text-[3rem] md:text-[5.4rem]">{s.name}</h1>
          <p className="mt-3 max-w-xl text-lg text-fg/75">{s.headline}</p>
        </Wrap>
        {s.image.credit && <span className="absolute right-3 bottom-2 text-[0.58rem] text-white/50">Photo: {s.image.credit}</span>}
      </section>

      {/* signal flow */}
      <section aria-labelledby="flow-b" className="border-b border-line py-16 md:py-20">
        <Wrap>
          <Code n="01">
            <span id="flow-b">System flow</span>
          </Code>
          <ol className="relative mt-10 grid gap-3 md:grid-cols-4 md:gap-0">
            <svg aria-hidden className="absolute top-[22px] left-0 hidden h-2 w-full md:block" viewBox="0 0 400 4" preserveAspectRatio="none">
              <line x1="12" y1="2" x2="388" y2="2" stroke="rgba(233,237,243,.15)" vectorEffect="non-scaling-stroke" />
              <line x1="12" y1="2" x2="388" y2="2" stroke="#f47b42" vectorEffect="non-scaling-stroke" className="b-signal-path" style={{ strokeWidth: 2 }} />
            </svg>
            {s.flow.map((f, i) => (
              <li key={f.step} className="relative border border-line bg-bg p-5 md:mr-4 md:border-0 md:bg-transparent md:p-0 md:pr-6">
                <span className="relative z-10 flex h-11 w-11 items-center justify-center border border-accent bg-bg font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-5 text-[1.2rem] font-medium">{f.step}</h2>
                <p className="mt-1.5 text-sm text-mute">{f.detail}</p>
              </li>
            ))}
          </ol>
        </Wrap>
      </section>

      <Wrap className="grid gap-12 border-b border-line py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Code n="02">Context</Code>
          <p className="mt-5 text-[1.05rem] leading-relaxed">{s.summary}</p>
          <p className="mt-4 text-sm leading-relaxed text-mute">{s.context}</p>
        </div>
        <ol className="min-w-0 space-y-3 lg:col-span-8">
          {s.evidence.map((e, i) => (
            <li key={e.text} className="relative border border-line bg-panel p-5 pl-16">
              <span className="absolute top-5 left-5 font-mono text-xs text-accent">E{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[0.98rem] leading-relaxed">{e.text}</p>
              <p className="mt-2 truncate font-mono text-[0.62rem] text-mute">SRC · {e.source.replace("https://", "")}</p>
            </li>
          ))}
        </ol>
      </Wrap>

      {proof?.compare && (
        <Wrap className="grid gap-10 border-b border-line py-16 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Code n="03">Technology proof</Code>
            <h2 className="b-display mt-5 text-[2rem]">{proof.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-mute">{proof.body}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {techs.map((t) => (
                <li key={t.id} className="border border-line px-2.5 py-1 font-mono text-[0.68rem] text-fg/80">
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative border border-line p-2 lg:col-span-8">
            <CompareSlider compare={proof.compare} />
            <Brackets className="-m-px" color="rgba(244,123,66,.6)" />
          </div>
        </Wrap>
      )}

      <Wrap className="border-b border-line py-16 md:py-20">
        <Code n="04">Related VISION HITECH products</Code>
        <ul className="mt-8 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.slug}>
              <ProductCardB product={p} className="h-full" />
            </li>
          ))}
        </ul>
      </Wrap>

      <Wrap className="grid gap-8 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Code n="05">Reserved content slots</Code>
          <p className="mt-4 text-sm text-mute">Filled only with official VISION HITECH information in production.</p>
        </div>
        <ul className="grid gap-2.5 sm:grid-cols-2 lg:col-span-8">
          {s.pending.map((x) => (
            <li key={x}>
              <Placeholder className="h-full">{x}</Placeholder>
            </li>
          ))}
        </ul>
      </Wrap>

      <Wrap className="flex flex-col gap-6 border-t border-line py-12 md:flex-row md:items-center md:justify-between">
        <InquiryButton className={bBtn}>
          Discuss a {s.name} project <ArrowB />
        </InquiryButton>
        <CLink concept="b" href={`/solutions/${next.slug}/`} className="group md:text-right">
          <span className="b-code block text-mute">Next · {next.index}</span>
          <span className="b-display inline-flex items-center gap-3 text-[2rem] group-hover:text-accent">
            {next.name} <ArrowB />
          </span>
        </CLink>
      </Wrap>
    </>
  );
}

/* ---------------- Support ---------------- */
export function SupportPageB() {
  const { support, site } = getContent();
  return (
    <>
      <PageHeroB code="Support · Technical hub" title="Documentation & service." body={support.intro}>
        <InquiryButton className={bBtn}>
          {site.ui.techSupport} <ArrowB />
        </InquiryButton>
      </PageHeroB>
      <Wrap className="grid gap-10 py-14 lg:grid-cols-12">
        <nav aria-label="Support sections" className="lg:col-span-3">
          <ol className="lg:sticky lg:top-24">
            {[...support.sections.map((s) => ({ id: s.id, title: s.title })), { id: "warranty", title: "Warranty" }].map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="flex gap-3 border-b border-line py-2.5 text-sm text-fg/75 hover:text-accent">
                  <span className="font-mono text-[0.68rem] text-mute">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="space-y-3 lg:col-span-9">
          {support.sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24 border border-line bg-panel p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 id={`${s.id}-h`} className="text-[1.4rem] font-medium">
                  {s.title}
                </h2>
                {s.status !== "verified" ? <PendingTag /> : <span className="b-code text-mute">Verified</span>}
              </div>
              <p className="mt-2 text-sm text-mute">{s.body}</p>
              {s.items.length ? (
                <ul className="mt-5 grid gap-x-8 border-t border-line sm:grid-cols-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center justify-between gap-3 border-b border-line py-3 text-sm">
                      <span className="text-fg/85">{it}</span>
                      <InquiryButton className="shrink-0 font-mono text-[0.65rem] text-accent uppercase hover:underline">Request</InquiryButton>
                    </li>
                  ))}
                </ul>
              ) : (
                <Placeholder className="mt-5">{s.title} content will be provided by VISION HITECH.</Placeholder>
              )}
            </section>
          ))}
          <section id="warranty" aria-labelledby="warranty-b" className="scroll-mt-24 border border-accent/40 bg-panel p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="warranty-b" className="text-[1.4rem] font-medium">
                {support.warranty.title}
              </h2>
              <span className="b-code text-mute">{support.warranty.updated}</span>
            </div>
            <div className="mt-6 grid gap-px bg-line sm:grid-cols-3">
              {support.warranty.rows.map((r) => (
                <div key={r.period} className="bg-bg p-5">
                  <p className="b-display text-[2.2rem] text-accent">{r.period.replace(" months", "")}</p>
                  <p className="font-mono text-[0.65rem] text-mute uppercase">months</p>
                  <p className="mt-3 text-sm text-fg/80">{r.product}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-mute">{support.warranty.footnote}</p>
            <ol className="mt-8 grid gap-3 md:grid-cols-4">
              {support.warranty.process.map((p, i) => (
                <li key={p.step} className="border-t border-accent/60 pt-3">
                  <span className="font-mono text-[0.65rem] text-accent">STEP {i + 1}</span>
                  <h3 className="mt-1 font-medium">{p.step}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-mute">{p.detail}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={support.warranty.rmaForm} className="font-mono text-xs text-accent uppercase hover:underline">
                RMA form (xlsx) ↓
              </a>
            </div>
            <Placeholder compact className="mt-5">
              {support.warranty.confirmNote}
            </Placeholder>
          </section>
        </div>
      </Wrap>
    </>
  );
}

/* ---------------- Company ---------------- */
export function CompanyPageB() {
  const { company, site } = getContent();
  return (
    <>
      <PageHeroB code="Company · Since 1997" title="Visionhitech Co., Ltd." body={company.intro} />
      <section id="mission" aria-labelledby="mission-b" className="scroll-mt-20 border-b border-line py-20 md:py-28">
        <Wrap className="grid gap-10 lg:grid-cols-12">
          <Code n="01" className="lg:col-span-3">
            Our Mission
          </Code>
          <div className="lg:col-span-9">
            <h2 id="mission-b" className="b-display text-[2.6rem] md:text-[4rem]">
              {company.philosophy.title}
            </h2>
            <p className="b-code mt-4 text-accent">{company.philosophy.line}</p>
            <p className="mt-8 max-w-3xl text-[1.1rem] leading-relaxed text-fg/80">{company.mission}</p>
          </div>
        </Wrap>
      </section>

      <section id="vision" aria-labelledby="vision-b" className="scroll-mt-20 border-b border-line bg-panel py-16 md:py-20">
        <Wrap>
          <Code n="02">
            <span id="vision-b">Vision</span>
          </Code>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {company.vision.map((v, i) => (
              <li key={v} className="relative border border-line bg-bg p-6">
                <Brackets className="-m-px" color="rgba(244,123,66,.45)" />
                <span className="font-mono text-xs text-accent">V{i + 1}</span>
                <p className="mt-10 text-[1.25rem] leading-tight font-medium">{v}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <p className="b-code text-mute">Strategy</p>
              <p className="mt-3 text-lg">{company.strategy.join(" · ")}</p>
            </div>
            <div>
              <p className="b-code text-mute">Core values</p>
              <ul className="mt-3 space-y-2 text-sm text-fg/75">
                {company.coreValues.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </Wrap>
      </section>

      <section id="history" aria-labelledby="history-b" className="scroll-mt-20 border-b border-line py-20">
        <Wrap>
          <Code n="03">
            <span id="history-b">History · 1997 — 2020</span>
          </Code>
          <ol className="relative mt-12 md:ml-[9rem]">
            <span aria-hidden className="absolute top-0 bottom-0 left-[5px] w-px bg-line md:left-0" />
            {company.history.map((h) => (
              <Reveal as="li" key={h.year} className="relative grid gap-2 pb-10 pl-8 md:pl-10">
                <span aria-hidden className="absolute top-2 left-0 h-[11px] w-[11px] -translate-x-0 rounded-full border border-accent bg-bg md:-translate-x-[5px]" />
                <span className="b-display text-[1.8rem] text-accent md:absolute md:top-0 md:-left-[9rem] md:w-[7rem] md:text-right">{h.year}</span>
                <ul className="space-y-1.5 text-[0.95rem] text-fg/85">
                  {h.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
          <p className="font-mono text-[0.65rem] text-mute md:ml-[9rem]">Entries after 2020 — awaiting official content.</p>
        </Wrap>
      </section>

      <section aria-labelledby="quality-b" className="border-b border-line bg-panel py-16 md:py-20">
        <Wrap className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Code n="04">Quality</Code>
            <h2 id="quality-b" className="b-display mt-5 text-[2rem]">
              {company.quality.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mute">{company.quality.body}</p>
            <p className="mt-6 font-mono text-xs text-fg/80">{company.quality.marks.join("  ·  ")}</p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden border border-line">
              <Img src="/images/site/production-line.webp" alt="VISION HITECH camera assemblies on the production line" fill sizes="35vw" className="object-cover" />
            </div>
          </div>
          <ul className="grid content-start gap-3 lg:col-span-6 lg:col-start-7">
            {company.quality.tests.map((t) => (
              <li key={t.name} className="border border-line bg-bg p-5">
                <h3 className="font-medium">{t.name}</h3>
                <p className="mt-1.5 text-sm text-mute">{t.detail}</p>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      <section id="organization" className="scroll-mt-20 border-b border-line py-14">
        <Wrap className="grid gap-6 lg:grid-cols-12">
          <Code n="05" className="lg:col-span-3">
            Organization
          </Code>
          <Placeholder className="lg:col-span-9">{company.organizationPending}</Placeholder>
        </Wrap>
      </section>

      <section id="location" aria-labelledby="loc-b" className="scroll-mt-20 py-16 md:py-20">
        <Wrap>
          <Code n="06">
            <span id="loc-b">Location</span>
          </Code>
          <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {site.contact.sites.map((s, i) => {
              const f = company.facilities.find((x) => x.name === s.label || (s.label === "Head Office" && x.name === "Head Office"));
              return (
                <li key={s.label} className="border border-line bg-panel">
                  <div className="relative aspect-[7/4] overflow-hidden bg-panel-2">
                    {f ? <Img src={f.image} alt={f.alt} fill sizes="25vw" className="object-cover opacity-85" /> : <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.65rem] text-mute">PHOTO · TO BE CONFIRMED</span>}
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[0.65rem] text-accent">SITE {String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-1 font-medium">{s.label}</p>
                    <p className="mt-2 text-sm text-mute">{s.address}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Wrap>
      </section>
    </>
  );
}

/* ---------------- Contact ---------------- */
export function ContactPageB() {
  const { site } = getContent();
  return (
    <>
      <PageHeroB code="Contact" title="Talk to VISION HITECH." body="Product inquiries, quotations, documents and technical questions." />
      <Wrap className="grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="relative border border-line bg-panel p-6 md:p-8 lg:col-span-7">
          <Brackets className="-m-px" color="rgba(244,123,66,.5)" />
          <Code>Send a message</Code>
          <div className="mt-6">
            <InquiryForm variant="b" />
          </div>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <dl className="border-t border-line">
            {[
              ["Sales", site.contact.salesEmail],
              ["General", site.contact.generalEmail],
              ["Tel", site.contact.tel],
              ["Fax", site.contact.fax],
              [site.contact.hqLabel, site.contact.address],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-line py-4">
                <dt className="b-code text-mute">{k}</dt>
                <dd className="mt-1.5">{v.includes("@") ? <a href={`mailto:${v}`} className="hover:text-accent">{v}</a> : v}</dd>
              </div>
            ))}
          </dl>
          <Placeholder compact className="mt-6">
            Map embed and regional sales contacts — to be confirmed.
          </Placeholder>
        </aside>
      </Wrap>
    </>
  );
}

/* ---------------- Media ---------------- */
export function MediaPageB() {
  const { media } = getContent();
  return (
    <>
      <PageHeroB code="Media Center" title="Updates" body={media.intro} />
      <Wrap id="notice" className="scroll-mt-20 py-16">
        <Code n="01">Notice</Code>
        <ol className="mt-8 grid gap-3 md:grid-cols-3">
          {media.news.map((n) => (
            <li key={n.title} className="border border-line bg-panel">
              <div className="relative aspect-[10/7] overflow-hidden">
                <Img src={n.image} alt="" fill sizes="33vw" className="object-cover" />
              </div>
              <div className="p-5">
                <time dateTime={n.date} className="b-code text-accent">
                  {n.date}
                </time>
                <h2 className="mt-2 text-[1.2rem] font-medium">{n.title}</h2>
                <p className="mt-2 text-sm text-mute">{n.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 font-mono text-[0.65rem] text-mute">{media.archiveNote}</p>
      </Wrap>
      <Wrap className="grid gap-3 pb-20 sm:grid-cols-2 lg:grid-cols-4">
        {media.channels.map((c, i) => (
          <section key={c.id} id={c.id} className="scroll-mt-20 border border-line p-5">
            <Code n={String(i + 2).padStart(2, "0")}>{c.label}</Code>
            <Placeholder compact className="mt-4">
              {c.id === "youtube" || c.id === "linkedin" ? "Official channel URL" : `${c.label} content`}
            </Placeholder>
          </section>
        ))}
      </Wrap>
    </>
  );
}
