import type { ReactNode } from "react";
import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { CompareSlider } from "@/components/shared/CompareSlider";
import { Img } from "@/components/shared/Img";
import { InquiryButton, InquiryForm } from "@/components/shared/Inquiry";
import { PendingTag, Placeholder } from "@/components/shared/Placeholder";
import { Reveal } from "@/components/shared/Reveal";
import { getProduct, type Product } from "@/data/products";
import type { Solution } from "@/content/en/solutions";
import { cn } from "@/lib/cn";
import { Arrow } from "../HeaderA";
import { ProductCardA } from "../ProductCardA";
import { btnPrimary, Container } from "../ui";

export function PageHeroA({ label, title, body, children }: { label: string; title: ReactNode; body?: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b border-line">
      <Container className="grid gap-8 pt-14 pb-12 md:pt-20 md:pb-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="a-label flex items-center gap-3 text-mute">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {label}
          </p>
          <h1 className="a-display mt-6 text-[2.8rem] md:text-[4.8rem]">{title}</h1>
        </div>
        {(body || children) && (
          <div className="flex flex-col justify-end gap-6 lg:col-span-4">
            {body && <p className="text-[1.02rem] leading-relaxed text-fg/70">{body}</p>}
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}

function statusLabel(s: Solution["status"]) {
  return s === "verified" ? "Verified content" : s === "partial" ? "Partially verified" : "Awaiting official content";
}

/* ---------------- Solutions overview ---------------- */
export function SolutionsOverviewA() {
  const { solutions } = getContent();
  return (
    <>
      <PageHeroA label="Solutions" title="Technology and where it works." body="Five solution areas from the VISION HITECH sitemap. Each page separates verified VISION HITECH statements from content still awaiting confirmation." />
      <Container className="py-16 md:py-20">
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
          {solutions.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 60} className={cn(i < 2 ? "lg:col-span-3" : "lg:col-span-2")}>
              <CLink concept="a" href={`/solutions/${s.slug}/`} className="group flex h-full flex-col border border-line bg-white">
                <div className={cn("relative overflow-hidden bg-studio", i < 2 ? "aspect-[16/9]" : "aspect-[4/3]")}>
                  <Img src={s.image.src} alt={s.image.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  {s.image.credit && <span className="absolute right-2 bottom-1.5 text-[0.58rem] text-white/80 drop-shadow">Photo: {s.image.credit}</span>}
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[0.7rem] text-mute">{s.index}</span>
                    {s.status !== "verified" && <PendingTag />}
                  </div>
                  <h2 className="a-display mt-3 text-[2rem]">{s.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{s.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold">
                    Explore <Arrow className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </CLink>
            </Reveal>
          ))}
        </ul>
      </Container>
    </>
  );
}

/* ---------------- Solution detail (EdgeDX-style depth template) ---------------- */
export function SolutionDetailA({ solution: s }: { solution: Solution }) {
  const { technologies, solutions } = getContent();
  const products = s.productSlugs.map((x) => getProduct(x)).filter((p): p is Product => Boolean(p));
  const techs = s.techIds.map((id) => technologies.find((t) => t.id === id)!).filter(Boolean);
  const compareTech = techs.find((t) => t.compare);
  const next = solutions[(solutions.findIndex((x) => x.slug === s.slug) + 1) % solutions.length];
  return (
    <>
      <section className="relative isolate overflow-hidden bg-fg text-white">
        <Img src={s.image.src} alt={s.image.alt} fill priority sizes="100vw" className="-z-10 object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/85 via-black/50 to-black/10" />
        <Container className="pt-16 pb-16 md:pt-24 md:pb-24">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60">
            <CLink concept="a" href="/solutions/" className="hover:text-white">
              Solutions
            </CLink>{" "}
            / <span aria-current="page">{s.name}</span>
          </nav>
          <p className="a-label mt-10 flex items-center gap-3 text-white/60">
            <span aria-hidden className="h-px w-8 bg-accent" /> {s.index} · {statusLabel(s.status)}
          </p>
          <h1 className="a-display mt-5 max-w-[16ch] text-[2.8rem] md:text-[5rem]">{s.name}</h1>
          <p className="mt-5 max-w-xl text-[1.15rem] text-white/75">{s.headline}</p>
        </Container>
        {s.image.credit && <span className="absolute right-3 bottom-2 text-[0.6rem] text-white/55">Photo: {s.image.credit}</span>}
      </section>

      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="a-label text-mute">Context</p>
          <p className="mt-4 text-[1.05rem] leading-relaxed">{s.summary}</p>
          <p className="mt-4 text-sm leading-relaxed text-mute">{s.context}</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="a-label text-mute">Verified by VISION HITECH sources</p>
          <ol className="mt-4 border-t border-line">
            {s.evidence.map((e, i) => (
              <li key={e.text} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2 border-b border-line py-5">
                <span className="font-mono text-xs text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <p className="text-[0.98rem] leading-relaxed">{e.text}</p>
                  <p className="mt-1.5 truncate text-xs text-mute">Source: {e.source.replace("https://", "")}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      <section aria-labelledby="flow" className="border-y border-line bg-panel py-16 md:py-20">
        <Container>
          <h2 id="flow" className="a-display text-[2rem] md:text-[2.6rem]">
            System flow
          </h2>
          <ol className="mt-10 grid gap-px bg-line md:grid-cols-4">
            {s.flow.map((f, i) => (
              <li key={f.step} className="relative bg-panel p-6 md:p-7">
                <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-[1.25rem] font-semibold">{f.step}</h3>
                <p className="mt-2 text-sm text-mute">{f.detail}</p>
                {i < s.flow.length - 1 && <Arrow className="absolute top-7 right-6 hidden text-accent-ink md:block" />}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {compareTech?.compare && (
        <Container className="grid gap-10 py-16 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="a-label text-mute">Technology proof</p>
            <h2 className="mt-4 text-[1.8rem] font-semibold tracking-[-0.02em]">{compareTech.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-mute">{compareTech.body}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {techs.map((t) => (
                <li key={t.id} className="border border-line px-3 py-1.5 text-xs font-medium">
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <CompareSlider compare={compareTech.compare} />
          </div>
        </Container>
      )}

      <section aria-labelledby="related-products" className="border-t border-line py-16 md:py-20">
        <Container>
          <h2 id="related-products" className="a-display text-[2rem] md:text-[2.6rem]">
            Related VISION HITECH products
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {products.map((p) => (
              <li key={p.slug}>
                <ProductCardA product={p} className="h-full" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="pending" className="border-t border-line py-16">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="pending" className="a-label text-mute">
              Content slots for production
            </h2>
            <p className="mt-3 text-sm text-mute">Reserved in the layout; filled only with official VISION HITECH information.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {s.pending.map((x) => (
              <li key={x}>
                <Placeholder className="h-full">{x}</Placeholder>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="flex flex-col gap-6 border-t border-line py-12 md:flex-row md:items-center md:justify-between">
        <InquiryButton className={btnPrimary}>
          Discuss a {s.name} project <Arrow />
        </InquiryButton>
        <CLink concept="a" href={`/solutions/${next.slug}/`} className="group text-right">
          <span className="block text-xs text-mute">Next solution</span>
          <span className="a-display inline-flex items-center gap-3 text-[1.8rem]">
            {next.name} <Arrow className="transition-transform group-hover:translate-x-1" />
          </span>
        </CLink>
      </Container>
    </>
  );
}

/* ---------------- Support ---------------- */
export function SupportPageA() {
  const { support, site } = getContent();
  return (
    <>
      <PageHeroA label="Support" title="Support" body={support.intro}>
        <div className="flex flex-wrap gap-3">
          <InquiryButton className={btnPrimary}>{site.ui.techSupport}</InquiryButton>
        </div>
      </PageHeroA>
      <Container className="py-6">
        <nav aria-label="Support sections" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line">
          {[...support.sections.slice(0, 5), { id: "warranty", title: "Warranty" }, ...support.sections.slice(5)].map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 px-3 py-3 text-sm text-mute hover:text-fg">
              {s.title}
            </a>
          ))}
        </nav>
      </Container>
      <Container className="grid gap-4 py-10 md:grid-cols-2">
        {support.sections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28 border border-line p-7 md:p-9">
            <div className="flex items-start justify-between gap-4">
              <h2 id={`${s.id}-h`} className="text-[1.5rem] font-semibold tracking-[-0.02em]">
                {s.title}
              </h2>
              {s.status !== "verified" && <PendingTag />}
            </div>
            <p className="mt-3 text-sm text-mute">{s.body}</p>
            {s.items.length > 0 ? (
              <ul className="mt-6 border-t border-line">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center justify-between gap-4 border-b border-line py-3 text-[0.9rem]">
                    {it}
                    <InquiryButton className="shrink-0 text-xs font-semibold text-accent-ink hover:underline">{site.ui.requestDocument}</InquiryButton>
                  </li>
                ))}
              </ul>
            ) : (
              <Placeholder className="mt-6">{s.title} content will be provided by VISION HITECH.</Placeholder>
            )}
          </section>
        ))}
      </Container>

      <section id="warranty" aria-labelledby="warranty-h" className="scroll-mt-28 border-t border-line bg-panel py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="a-label text-mute">Warranty</p>
            <h2 id="warranty-h" className="a-display mt-4 text-[2.4rem]">
              {support.warranty.title}
            </h2>
            <p className="mt-3 text-sm text-mute">{support.warranty.updated}</p>
            <a href={support.warranty.rmaForm} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">
              RMA form (xlsx) ↓
            </a>
          </div>
          <div className="lg:col-span-8">
            <table className="w-full text-left">
              <caption className="sr-only">Warranty period by product</caption>
              <thead>
                <tr className="border-b border-fg text-xs text-mute">
                  <th scope="col" className="py-3 font-medium">
                    Period
                  </th>
                  <th scope="col" className="py-3 font-medium">
                    Product
                  </th>
                </tr>
              </thead>
              <tbody>
                {support.warranty.rows.map((r) => (
                  <tr key={r.period} className="border-b border-line">
                    <td className="a-display py-5 pr-6 text-[1.8rem] whitespace-nowrap">{r.period}</td>
                    <td className="py-5 text-[0.95rem]">{r.product}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-mute">{support.warranty.footnote}</p>
            <ol className="mt-10 grid gap-px bg-line sm:grid-cols-2">
              {support.warranty.process.map((p, i) => (
                <li key={p.step} className="bg-panel p-5">
                  <span className="font-mono text-xs text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-semibold">{p.step}</h3>
                  <p className="mt-1 text-sm text-mute">{p.detail}</p>
                </li>
              ))}
            </ol>
            <Placeholder compact className="mt-6">
              {support.warranty.confirmNote}
            </Placeholder>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ---------------- Company ---------------- */
export function CompanyPageA() {
  const { company, site } = getContent();
  return (
    <>
      <PageHeroA label="Company" title={<>Visionhitech Co., Ltd.</>} body={company.intro} />
      <section className="relative">
        <div className="relative h-[300px] bg-studio md:h-[560px]">
          <Img src="/images/site/hq-building.webp" alt="VISION HITECH head office and factory, Bucheon" fill sizes="100vw" className="object-cover" />
        </div>
      </section>

      <section id="mission" aria-labelledby="mission-h" className="scroll-mt-28 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <p className="a-label text-mute lg:col-span-3">Our Mission</p>
          <div className="lg:col-span-9">
            <h2 id="mission-h" className="a-display text-[2.6rem] md:text-[4.2rem]">
              {company.philosophy.title}
            </h2>
            <p className="mt-3 text-lg text-accent-ink">{company.philosophy.line}</p>
            <p className="mt-8 max-w-3xl text-[1.15rem] leading-relaxed text-fg/80">{company.mission}</p>
            <blockquote className="mt-10 border-l-2 border-accent pl-6">
              <p className="text-[1.05rem] leading-relaxed">“{company.ceoMessage.excerpt}”</p>
              <footer className="mt-3 text-sm text-mute">— {company.ceoMessage.title}</footer>
            </blockquote>
          </div>
        </Container>
      </section>

      <section id="vision" aria-labelledby="vision-h" className="scroll-mt-28 border-y border-line bg-panel py-16 md:py-20">
        <Container>
          <h2 id="vision-h" className="a-label text-mute">
            Vision
          </h2>
          <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {company.vision.map((v, i) => (
              <li key={v} className="bg-panel p-7">
                <span className="font-mono text-xs text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-8 text-[1.35rem] leading-tight font-semibold tracking-[-0.02em]">{v}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="a-label text-mute">Strategy</h3>
              <ul className="mt-4 space-y-2">
                {company.strategy.map((s) => (
                  <li key={s} className="text-lg font-medium">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="a-label text-mute">Core values</h3>
              <ul className="mt-4 space-y-3 text-sm text-fg/75">
                {company.coreValues.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="history" aria-labelledby="history-h" className="scroll-mt-28 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="a-label text-mute">History</p>
              <h2 id="history-h" className="a-display mt-4 text-[2.6rem] md:text-[3.6rem]">
                1997 — 2020
              </h2>
              <p className="mt-4 text-sm text-mute">Milestones as published on the current VISION HITECH website. Entries after 2020 awaiting official content.</p>
            </div>
          </div>
          <ol className="lg:col-span-8">
            {company.history.map((h) => (
              <li key={h.year} className="grid grid-cols-[5rem_1fr] gap-4 border-t border-line py-6 md:grid-cols-[8rem_1fr]">
                <span className="a-display text-[1.6rem] md:text-[2.2rem]">{h.year}</span>
                <ul className="space-y-1.5 pt-1.5 text-[0.95rem]">
                  {h.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="quality-h" className="border-t border-line bg-panel py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="a-label text-mute">Quality</p>
            <h2 id="quality-h" className="a-display mt-4 text-[2.2rem]">
              {company.quality.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mute">{company.quality.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {company.quality.marks.map((m) => (
                <li key={m} className="border border-line bg-white px-3 py-1.5 text-xs font-semibold">
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-px bg-line sm:grid-cols-2 lg:col-span-7">
            {company.quality.tests.map((t) => (
              <li key={t.name} className="bg-panel p-6">
                <h3 className="font-semibold">{t.name}</h3>
                <p className="mt-2 text-sm text-mute">{t.detail}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="organization" aria-labelledby="org-h" className="scroll-mt-28 py-16">
        <Container className="grid gap-8 lg:grid-cols-12">
          <h2 id="org-h" className="a-label text-mute lg:col-span-3">
            Organization
          </h2>
          <Placeholder className="lg:col-span-9">{company.organizationPending}</Placeholder>
        </Container>
      </section>

      <section id="location" aria-labelledby="loc-h" className="scroll-mt-28 border-t border-line py-16 md:py-20">
        <Container>
          <h2 id="loc-h" className="a-display text-[2.2rem] md:text-[3rem]">
            Location
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {company.facilities.map((f) => (
              <figure key={f.name}>
                <div className="relative aspect-[7/4] overflow-hidden bg-studio">
                  <Img src={f.image} alt={f.alt} fill sizes="33vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 text-sm font-semibold">{f.name}</figcaption>
              </figure>
            ))}
          </div>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {site.contact.sites.map((s) => (
              <li key={s.label} className="bg-white p-5">
                <p className="text-sm font-semibold">{s.label}</p>
                <p className="mt-2 text-sm text-mute">{s.address}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

/* ---------------- Contact ---------------- */
export function ContactPageA() {
  const { site } = getContent();
  return (
    <>
      <PageHeroA label="Contact" title="Contact VISION HITECH" body="Product inquiries, quotations, documents and technical questions." />
      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="a-label text-mute">Send a message</h2>
          <div className="mt-6">
            <InquiryForm variant="a" />
          </div>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <dl className="divide-y divide-line border-y border-line">
            {[
              ["Sales", <a key="s" href={`mailto:${site.contact.salesEmail}`} className="hover:underline">{site.contact.salesEmail}</a>],
              ["General", <a key="g" href={`mailto:${site.contact.generalEmail}`} className="hover:underline">{site.contact.generalEmail}</a>],
              ["Tel", site.contact.tel],
              ["Fax", site.contact.fax],
              [site.contact.hqLabel, site.contact.address],
            ].map(([k, v]) => (
              <div key={String(k)} className="py-5">
                <dt className="text-xs text-mute">{k}</dt>
                <dd className="mt-1.5 text-[0.98rem]">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-studio">
            <Img src="/images/site/hq-building.webp" alt="VISION HITECH head office, Bucheon" fill sizes="30vw" className="object-cover" />
          </div>
          <Placeholder compact className="mt-4">
            Map embed and regional sales contacts — to be confirmed.
          </Placeholder>
        </aside>
      </Container>
    </>
  );
}

/* ---------------- Media ---------------- */
export function MediaPageA() {
  const { media } = getContent();
  return (
    <>
      <PageHeroA label="Media Center" title="Media Center" body={media.intro} />
      <Container id="notice" className="scroll-mt-28 py-16">
        <h2 className="a-label text-mute">Notice</h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {media.news.map((n) => (
            <li key={n.title} className="grid gap-5 py-6 md:grid-cols-[12rem_1fr_10rem] md:items-center">
              <div className="relative aspect-[10/7] overflow-hidden bg-studio">
                <Img src={n.image} alt="" fill sizes="12rem" className="object-cover" />
              </div>
              <div>
                <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em]">{n.title}</h3>
                <p className="mt-2 text-sm text-mute">{n.body}</p>
              </div>
              <time dateTime={n.date} className="font-mono text-xs text-mute md:text-right">
                {n.date}
              </time>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-mute">{media.archiveNote}</p>
      </Container>
      <Container className="grid gap-4 pb-20 sm:grid-cols-2 lg:grid-cols-4">
        {media.channels.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-28 border border-line p-6">
            <h2 className="text-lg font-semibold">{c.label}</h2>
            <Placeholder compact className="mt-4">
              {c.id === "youtube" || c.id === "linkedin" ? "Official channel URL" : `${c.label} content`}
            </Placeholder>
          </section>
        ))}
      </Container>
    </>
  );
}
