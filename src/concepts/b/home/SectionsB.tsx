import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryForm } from "@/components/shared/Inquiry";
import { PendingTag } from "@/components/shared/Placeholder";
import { Reveal } from "@/components/shared/Reveal";
import { getSolution } from "@/content/en/solutions";
import { ArrowB, Brackets, Code, HeadB, Wrap } from "../ui";

export function AiB() {
  const { homeB, solutions } = getContent();
  const ai = solutions.find((s) => s.slug === "ai-vision")!;
  return (
    <section aria-labelledby="ai-b" className="border-t border-line py-24 md:py-32">
      <Wrap className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Code n="04">{homeB.ai.label}</Code>
          <h2 id="ai-b" className="b-display mt-5 text-[2.2rem] md:text-[3.1rem]">
            {homeB.ai.title}
          </h2>
          <p className="mt-6 text-[1rem] leading-relaxed text-fg/75">{homeB.ai.body}</p>
          <ul className="mt-8 border-t border-line">
            {ai.evidence.slice(0, 3).map((e) => (
              <li key={e.text} className="border-b border-line py-4 text-[0.9rem] text-fg/85">
                {e.text}
              </li>
            ))}
          </ul>
          <CLink concept="b" href="/solutions/ai-vision/" className="group mt-8 inline-flex items-center gap-3 text-sm hover:text-accent">
            AI Vision status <ArrowB className="transition-transform group-hover:translate-x-1" />
          </CLink>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <figure className="relative border border-line bg-panel p-2">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Img src="/images/site/uhd-street.webp" alt="VISION HITECH 4K demonstration image of a city street" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              <Brackets className="m-3" color="rgba(255,255,255,.6)" />
            </div>
            <figcaption className="px-1 pt-2 font-mono text-[0.6rem] text-mute">{homeB.ai.imageCaption}</figcaption>
          </figure>
          <p className="b-code mt-8 text-mute">{homeB.ai.slotsTitle}</p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {homeB.ai.slots.map((s) => (
              <li key={s} className="flex min-h-[84px] flex-col justify-between border border-dashed border-fg/20 p-3.5">
                <span className="text-sm text-fg/80">{s}</span>
                <PendingTag className="w-fit" />
              </li>
            ))}
          </ul>
        </div>
      </Wrap>
    </section>
  );
}

export function ApplicationsB() {
  const { homeB } = getContent();
  const vs = getSolution("video-security")!;
  const tiles = [
    { img: "/images/env/env-city-night.webp", alt: "City at night from the air", code: "CITY", title: "City & public sites", body: "Public local government supply agreements for 2MP IP cameras and HD CCTV (2014).", credit: "Artem Svetlov, CC BY 2.0" },
    { img: "/images/site/wdr-on.webp", alt: "VISION HITECH WDR demonstration in a bright terminal", code: "WDR 120dB", title: "Terminals & lobbies", body: "Real WDR keeps faces readable against bright glass façades." },
    { img: "/images/site/corridor-hotel.webp", alt: "Hotel corridor — Corridor View example", code: "CORRIDOR VIEW", title: "Hallways", body: "Corridor View for lengthy hallways — school hallway, passenger boat, hotel." },
  ];
  return (
    <section aria-labelledby="apps-b" className="border-t border-line py-24 md:py-32">
      <Wrap>
        <HeadB n="05" label={homeB.applications.label} title={<span id="apps-b">{homeB.applications.title}</span>} aside={<p className="max-w-sm text-sm text-mute">{vs.summary}</p>} />
        <ul className="mt-14 grid gap-3 md:grid-cols-3">
          {tiles.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 80}>
              <CLink concept="b" href="/solutions/video-security/" className="group relative block aspect-[3/4] overflow-hidden border border-line">
                <Img src={t.img} alt={t.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover opacity-80 transition-[transform,opacity] duration-700 group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="b-code text-accent">{t.code}</p>
                  <h3 className="mt-2 text-[1.4rem] font-medium">{t.title}</h3>
                  <p className="mt-2 text-sm text-fg/75">{t.body}</p>
                </div>
                {t.credit && <span className="absolute top-2 right-2 text-[0.55rem] text-white/60">Photo: {t.credit}</span>}
              </CLink>
            </Reveal>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

export function MobilityB() {
  const { homeB } = getContent();
  const items = [getSolution("transportation")!, getSolution("vision-marine")!];
  return (
    <section aria-labelledby="mob-b" className="border-t border-line">
      <Wrap className="pt-24 md:pt-32">
        <Code n="06">{homeB.mobility.label}</Code>
        <h2 id="mob-b" className="b-display mt-5 text-[2.2rem] md:text-[3.1rem]">
          {homeB.mobility.title}
        </h2>
      </Wrap>
      <div className="mt-14 grid md:grid-cols-2">
        {items.map((s) => (
          <article key={s.slug} className="group relative isolate min-h-[560px] overflow-hidden border-t border-line md:min-h-[680px] md:border-l first:md:border-l-0">
            <Img src={s.image.src} alt={s.image.alt} fill sizes="50vw" className="-z-10 object-cover opacity-60 transition-transform duration-[1.5s] group-hover:scale-105" />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-bg via-bg/70 to-bg/20" />
            <div className="flex h-full min-h-[inherit] flex-col justify-end p-6 md:p-10">
              <div className="flex items-center gap-3">
                <span className="b-code text-accent">{s.index}</span>
                <PendingTag />
              </div>
              <h3 className="b-display mt-3 text-[2.4rem] md:text-[3.2rem]">{s.name}</h3>
              <p className="mt-2 text-fg/75">{s.headline}</p>
              <ul className="mt-6 max-w-lg border-t border-fg/15">
                {s.evidence.slice(0, 3).map((e) => (
                  <li key={e.text} className="border-b border-fg/15 py-3 text-sm text-fg/85">
                    {e.text}
                  </li>
                ))}
              </ul>
              <CLink concept="b" href={`/solutions/${s.slug}/`} className="group/l mt-6 inline-flex items-center gap-3 text-sm hover:text-accent">
                {s.name} <ArrowB className="transition-transform group-hover/l:translate-x-1" />
              </CLink>
            </div>
            {s.image.credit && <span className="absolute top-3 right-3 text-[0.55rem] text-white/55">Photo: {s.image.credit}</span>}
          </article>
        ))}
      </div>
    </section>
  );
}

export function SupportB() {
  const { homeB } = getContent();
  const cols = [
    { code: "DOC", title: "Technical Documents", items: ["Datasheet", "Manual", "Drawing", "F/W"], href: "/support/#technical-documents" },
    { code: "DL", title: "Download", items: ["IPScan Utility 1.1.5.1", "NVR C/S VMS catalogue & manual", "Product Guide 2021", "Compliance documents"], href: "/support/#download" },
    { code: "RMA", title: "Warranty", items: ["27 months — cameras, NVR / DVR", "15 months — PTZ camera", "9 months — zoom module", "DOA · RMA · repair TAT"], href: "/support/#warranty" },
  ];
  return (
    <section aria-labelledby="sup-b" className="border-t border-line py-24 md:py-32">
      <Wrap>
        <HeadB n="08" label={homeB.support.label} title={<span id="sup-b">{homeB.support.title}</span>} />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {cols.map((c) => (
            <CLink key={c.code} concept="b" href={c.href} className="group flex flex-col bg-bg p-7 transition-colors hover:bg-panel">
              <span className="b-code text-accent">{c.code}</span>
              <h3 className="mt-3 text-[1.4rem] font-medium">{c.title}</h3>
              <ul className="mt-6 space-y-2 font-mono text-[0.78rem] text-mute">
                {c.items.map((i) => (
                  <li key={i}>— {i}</li>
                ))}
              </ul>
              <ArrowB className="mt-8 text-mute transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </CLink>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

export function MediaB() {
  const { homeB, media } = getContent();
  return (
    <section aria-labelledby="media-b" className="border-t border-line py-24 md:py-32">
      <Wrap className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Code n="09">{homeB.media.label}</Code>
          <h2 id="media-b" className="b-display mt-5 text-[2.2rem] md:text-[3.1rem]">
            {homeB.media.title}
          </h2>
          <p className="mt-5 text-xs text-mute">{media.archiveNote}</p>
          <CLink concept="b" href="/media/" className="group mt-6 inline-flex items-center gap-3 text-sm hover:text-accent">
            Media Center <ArrowB />
          </CLink>
        </div>
        <ol className="relative border-l border-line lg:col-span-8">
          {media.news.map((n) => (
            <li key={n.title} className="relative grid gap-4 py-6 pl-8 sm:grid-cols-[1fr_9rem]">
              <span aria-hidden className="absolute top-8 -left-[4.5px] h-2 w-2 rounded-full bg-accent" />
              <div>
                <time dateTime={n.date} className="b-code text-mute">
                  {n.date}
                </time>
                <h3 className="mt-2 text-[1.25rem] font-medium">{n.title}</h3>
                <p className="mt-2 text-sm text-mute">{n.body}</p>
              </div>
              <div className="relative aspect-[10/7] overflow-hidden border border-line">
                <Img src={n.image} alt="" fill sizes="9rem" className="object-cover" />
              </div>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}

export function ContactB() {
  const { homeB, site } = getContent();
  return (
    <section id="contact" aria-labelledby="contact-b" className="relative border-t border-line bg-panel py-24 md:py-32">
      <Wrap className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Code n="10">{homeB.contact.label}</Code>
          <h2 id="contact-b" className="b-display mt-5 text-[2.2rem] md:text-[3.1rem]">
            {homeB.contact.title}
          </h2>
          <p className="mt-5 text-sm text-mute">{homeB.contact.body}</p>
          <dl className="mt-10 space-y-5 border-t border-line pt-6 text-sm">
            {[
              ["Sales", site.contact.salesEmail],
              ["Tel", site.contact.tel],
              [site.contact.hqLabel, site.contact.address],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="b-code text-mute">{k}</dt>
                <dd className="mt-1 text-fg/85">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <InquiryForm variant="b" />
        </div>
      </Wrap>
    </section>
  );
}
