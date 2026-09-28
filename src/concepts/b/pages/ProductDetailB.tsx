import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { productLine, relatedProducts, type Product } from "@/data/products";
import { techIdsFor } from "@/lib/techMap";
import { ProductCardB } from "../ProductCardB";
import { ArrowB, bBtn, bBtnLine, Brackets, Code, Wrap } from "../ui";

/** Concept B product detail — spec-sheet layout with a sticky section index. */
export function ProductDetailB({ product: p }: { product: Product }) {
  const { site, technologies } = getContent();
  const cat = site.categories[p.category];
  const sw = p.category === "software";
  const techs = techIdsFor(p)
    .map((id) => technologies.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const featureGroups = [
    { id: "key", label: sw ? "Components" : "Key features", items: p.features.key },
    { id: "special", label: "Special features", items: p.features.special },
    { id: "general", label: sw ? "Configurations" : "General features", items: p.features.general },
  ].filter((g) => g.items.length);
  const sections = [
    p.overview.length && ["overview", "Overview"],
    featureGroups.length && ["features", "Features"],
    p.packages && ["packages", "Packages"],
    techs.length && ["technology", "Technology"],
    ["documents", "Documents"],
    ["related", "Related"],
  ].filter(Boolean) as Array<[string, string]>;

  return (
    <article className="pt-16">
      <Wrap className="pt-8">
        <nav aria-label="Breadcrumb" className="b-code text-mute">
          <CLink concept="b" href="/products/" className="hover:text-fg">
            Products
          </CLink>{" "}
          /{" "}
          <CLink concept="b" href={`/products/#${p.category}`} className="hover:text-fg">
            {cat.label}
          </CLink>{" "}
          / <span className="text-fg">{p.model}</span>
        </nav>
      </Wrap>

      <Wrap className="grid gap-10 py-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <div className="relative border border-line bg-panel p-3">
            <div className="relative aspect-square overflow-hidden bg-studio">
              <Img src={p.image} alt={`${p.model} — ${productLine(p)}`} fill priority sizes="(min-width:1024px) 45vw, 100vw" className={sw ? "object-contain p-8" : "scale-[1.06] object-contain"} />
            </div>
            <Brackets className="-m-px" color="rgba(244,123,66,.7)" />
            <div className="flex justify-between px-1 pt-3 font-mono text-[0.62rem] text-mute">
              <span>{cat.short} · {p.series}</span>
              <span>IMG · VISION HITECH</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          {p.tier && <Code>{p.tier}</Code>}
          <h1 className="mt-4 font-mono text-[2.4rem] leading-none font-medium tracking-tight md:text-[3.4rem]">{p.model}</h1>
          <p className="mt-4 text-[1.1rem] text-fg/80">{p.title}</p>
          <dl className="mt-8 border-t border-line">
            {[
              ["Category", cat.label],
              ["Series", p.series],
              ["Type", p.form],
              ["Environment", p.environment],
            ]
              .filter((r) => r[1])
              .map(([k, v]) => (
                <div key={k} className="grid grid-cols-[9rem_1fr] border-b border-line py-2.5 text-sm">
                  <dt className="font-mono text-xs text-mute uppercase">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            {p.highlights.slice(0, 8).map((h, i) => (
              <div key={h} className="grid grid-cols-[9rem_1fr] border-b border-line py-2.5 text-sm">
                <dt className="font-mono text-xs text-mute">SPEC {String(i + 1).padStart(2, "0")}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <InquiryButton model={p.model} className={bBtn}>
              {site.ui.productInquiry} <ArrowB />
            </InquiryButton>
            <a href="#documents" className={bBtnLine}>
              {site.ui.download}
            </a>
            <CLink concept="b" href="/support/#tech-support" className="inline-flex items-center px-2 text-sm text-mute hover:text-accent">
              {site.ui.techSupport}
            </CLink>
          </div>
        </div>
      </Wrap>

      <div className="sticky top-16 z-20 border-y border-line bg-bg/92 backdrop-blur">
        <Wrap>
          <nav aria-label="Product sections" className="no-scrollbar flex gap-6 overflow-x-auto">
            {sections.map(([id, label], i) => (
              <a key={id} href={`#${id}`} className="shrink-0 py-3.5 font-mono text-[0.7rem] tracking-wider text-mute uppercase hover:text-accent">
                {String(i + 1).padStart(2, "0")} {label}
              </a>
            ))}
          </nav>
        </Wrap>
      </div>

      {p.overview.length > 0 && (
        <section id="overview" aria-label="Overview" className="scroll-mt-32 border-b border-line py-16">
          <Wrap className="grid gap-8 lg:grid-cols-12">
            <Code className="lg:col-span-3">Overview</Code>
            <div className="max-w-3xl space-y-5 leading-relaxed text-fg/80 lg:col-span-9">
              {p.overview.map((b, i) =>
                "h" in b ? (
                  <h2 key={i} className="pt-2 text-[1.3rem] font-medium text-fg">
                    {b.h}
                  </h2>
                ) : (
                  <p key={i}>{b.p}</p>
                ),
              )}
            </div>
          </Wrap>
        </section>
      )}

      {featureGroups.length > 0 && (
        <section id="features" aria-label="Features" className="scroll-mt-32 border-b border-line py-16">
          <Wrap className="grid gap-10 lg:grid-cols-3">
            {featureGroups.map((g) => (
              <div key={g.id}>
                <Code>
                  {g.label} · {String(g.items.length).padStart(2, "0")}
                </Code>
                <ul className="mt-4 border-t border-line">
                  {g.items.map((f) => (
                    <li key={f} className="border-b border-line py-2.5 text-[0.9rem] text-fg/85">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Wrap>
        </section>
      )}

      {p.packages && (
        <section id="packages" aria-label="Packages" className="scroll-mt-32 border-b border-line py-16">
          <Wrap className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-fg/40 font-mono text-xs text-mute uppercase">
                  <th scope="col" className="py-3 font-normal">
                    Package
                  </th>
                  {p.packages.headers.map((h) => (
                    <th key={h} scope="col" className="py-3 font-normal text-accent">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.packages.rows.map((r) => (
                  <tr key={r.label} className="border-b border-line">
                    <th scope="row" className="py-3 pr-4 font-normal text-fg/75">
                      {r.label}
                    </th>
                    {r.values.map((v, i) => (
                      <td key={i} className="py-3 font-mono">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Wrap>
        </section>
      )}

      {techs.length > 0 && (
        <section id="technology" aria-label="Technology" className="scroll-mt-32 border-b border-line py-16">
          <Wrap>
            <Code>Technology in this model</Code>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {techs.map((t) => (
                <li key={t.id} className="border border-line bg-bg p-5">
                  <p className="font-mono text-[0.62rem] text-accent uppercase">{t.group}</p>
                  <h3 className="mt-2 font-medium">{t.name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-mute">{t.line}</p>
                </li>
              ))}
            </ul>
          </Wrap>
        </section>
      )}

      <section id="documents" aria-label="Documents" className="scroll-mt-32 border-b border-line bg-panel py-16">
        <Wrap className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Code>Documents</Code>
            <p className="mt-4 text-sm text-mute">{p.publicFiles ? "Download the files below." : "Document types listed for this model — provided by the sales team on request."}</p>
          </div>
          <ul className="border-t border-line lg:col-span-8">
            {p.publicFiles
              ? p.publicFiles.map((f) => (
                  <li key={f.url} className="border-b border-line">
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-4 font-mono text-sm hover:text-accent">
                      {f.label} <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))
              : p.documents.map((d) => (
                  <li key={d} className="flex items-center justify-between border-b border-line py-4">
                    <span className="font-mono text-sm">{d}</span>
                    <InquiryButton model={p.model} className="font-mono text-xs text-accent uppercase hover:underline">
                      Request
                    </InquiryButton>
                  </li>
                ))}
          </ul>
        </Wrap>
      </section>

      <section id="related" aria-label="Related products" className="scroll-mt-32 py-16">
        <Wrap>
          <Code>Related</Code>
          <ul className="mt-6 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {relatedProducts(p).map((r) => (
              <li key={r.slug}>
                <ProductCardB product={r} className="h-full" />
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-3">
          </div>
        </Wrap>
      </section>
    </article>
  );
}
