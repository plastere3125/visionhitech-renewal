import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { Placeholder } from "@/components/shared/Placeholder";
import { productLine, relatedProducts, type Product } from "@/data/products";
import { techIdsFor } from "@/lib/techMap";
import { Arrow } from "../HeaderA";
import { ProductCardA } from "../ProductCardA";
import { btnGhost, btnPrimary, Container } from "../ui";
import { FeatureTabsA } from "./FeatureTabsA";

export function ProductDetailA({ product: p }: { product: Product }) {
  const { site, technologies } = getContent();
  const cat = site.categories[p.category];
  const techs = techIdsFor(p)
    .map((id) => technologies.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .slice(0, 6);
  const isSoftware = p.category === "software";
  const specRows = [
    ["Category", cat.label],
    ["Series", p.series],
    ["Type", p.form],
    ["Environment", p.environment],
  ].filter((r): r is [string, string] => Boolean(r[1]));

  return (
    <article>
      <Container className="pt-6">
        <nav aria-label="Breadcrumb" className="text-xs text-mute">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <CLink concept="a" href="/products/" className="hover:text-fg">
                Products
              </CLink>
            </li>
            <li aria-hidden>/</li>
            <li>
              <CLink concept="a" href={`/products/#${p.category}`} className="hover:text-fg">
                {cat.label}
              </CLink>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-fg">
              {p.model}
            </li>
          </ol>
        </nav>
      </Container>

      <Container className="grid gap-10 pt-6 pb-16 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="sticky top-24">
            <div className="relative aspect-square overflow-hidden bg-studio">
              <Img
                src={p.image}
                alt={`${p.model} — ${productLine(p)}`}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={isSoftware ? "object-contain p-10" : "scale-[1.08] object-contain"}
              />
              <span className="absolute top-4 left-4 bg-white px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.08em] uppercase">
                {cat.short} · {p.series}
              </span>
            </div>
            <p className="mt-3 text-xs text-mute">Product image: VISION HITECH</p>
          </div>
        </div>

        <div className="lg:col-span-5">
          {p.tier && <p className="a-label text-accent-ink">{p.tier}</p>}
          <h1 className="a-display mt-4 text-[2.8rem] md:text-[3.6rem]">{p.model}</h1>
          {p.modelVariant && <p className="mt-1 font-mono text-sm text-mute">{p.modelVariant}</p>}
          <p className="mt-4 text-[1.15rem] leading-snug text-fg/80">{p.title}</p>

          {p.highlights.length > 0 && (
            <ul className="mt-8 border-t border-line">
              {p.highlights.slice(0, 9).map((h) => (
                <li key={h} className="flex gap-3 border-b border-line py-3 text-[0.93rem]">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <InquiryButton model={p.model} className={btnPrimary}>
              {site.ui.productInquiry} <Arrow />
            </InquiryButton>
            <a href="#documents" className={btnGhost}>
              {site.ui.download}
            </a>
            <CLink concept="a" href="/support/#tech-support" className="inline-flex items-center py-3.5 text-sm font-semibold underline-offset-4 hover:underline sm:px-2">
              {site.ui.techSupport}
            </CLink>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line text-sm">
            {specRows.map(([k, v]) => (
              <div key={k} className="bg-white p-4">
                <dt className="text-xs text-mute">{k}</dt>
                <dd className="mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      {p.overview.length > 0 && (
        <section aria-labelledby="overview" className="border-t border-line bg-panel py-16 md:py-20">
          <Container className="grid gap-8 lg:grid-cols-12">
            <h2 id="overview" className="a-label text-mute lg:col-span-3">
              Overview
            </h2>
            <div className="max-w-3xl space-y-5 text-[1.02rem] leading-relaxed text-fg/80 lg:col-span-9">
              {p.overview.map((b, i) =>
                "h" in b ? (
                  <h3 key={i} className="pt-3 text-[1.25rem] font-semibold tracking-[-0.02em] text-fg">
                    {b.h}
                  </h3>
                ) : (
                  <p key={i}>{b.p}</p>
                ),
              )}
            </div>
          </Container>
        </section>
      )}

      <section aria-labelledby="features" className="py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-12">
          <h2 id="features" className="a-label text-mute lg:col-span-3">
            {isSoftware ? "Components" : "Key features"}
          </h2>
          <div className="lg:col-span-9">
            <FeatureTabsA
              groups={[
                { id: "key", label: isSoftware ? "Components" : "Key features", items: p.features.key },
                { id: "special", label: "Special features", items: p.features.special },
                { id: "general", label: isSoftware ? "Configurations" : "General features", items: p.features.general },
              ]}
            />
          </div>
        </Container>
      </section>

      {p.packages && (
        <section aria-labelledby="packages" className="border-t border-line py-16">
          <Container className="grid gap-8 lg:grid-cols-12">
            <h2 id="packages" className="a-label text-mute lg:col-span-3">
              Key package features
            </h2>
            <div className="overflow-x-auto lg:col-span-9">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-fg">
                    <th scope="col" className="py-3 font-medium text-mute">
                      Package
                    </th>
                    {p.packages.headers.map((h) => (
                      <th key={h} scope="col" className="py-3 font-semibold">
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
                        <td key={i} className="py-3 font-medium">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>
      )}

      {techs.length > 0 && (
        <section aria-labelledby="tech" className="border-t border-line py-16 md:py-20">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 id="tech" className="a-display text-[2rem] md:text-[2.6rem]">
                Technology inside
              </h2>
              <CLink concept="a" href="/solutions/technology/" className="hidden items-center gap-2 text-sm font-semibold md:inline-flex">
                All technologies <Arrow />
              </CLink>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {techs.map((t) => (
                <li key={t.id} className="border border-line bg-white p-6">
                  <p className="font-mono text-[0.68rem] tracking-wider text-mute uppercase">{t.group}</p>
                  <h3 className="mt-2 text-[1.15rem] font-semibold">{t.name}</h3>
                  <p className="mt-2 text-sm text-mute">{t.line}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section id="documents" aria-labelledby="docs" className="border-t border-line bg-panel py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 id="docs" className="a-label text-mute">
              Available documents
            </h2>
            <p className="mt-4 text-sm text-mute">
              {p.publicFiles ? "Public files from the current VISION HITECH website." : "Document types listed for this model. Files are provided by the VISION HITECH sales team on request."}
            </p>
          </div>
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
            {p.publicFiles
              ? p.publicFiles.map((f) => (
                  <li key={f.url} className="bg-white">
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 text-sm font-semibold hover:bg-panel">
                      {f.label}
                      <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))
              : p.documents.map((d) => (
                  <li key={d} className="flex items-center justify-between bg-white p-5">
                    <span className="text-sm font-semibold">{d}</span>
                    <InquiryButton model={p.model} className="text-xs font-semibold text-accent-ink underline-offset-4 hover:underline">
                      {site.ui.requestDocument}
                    </InquiryButton>
                  </li>
                ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="related" className="py-16 md:py-20">
        <Container>
          <h2 id="related" className="a-display text-[2rem] md:text-[2.6rem]">
            Related products
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {relatedProducts(p).map((r) => (
              <li key={r.slug}>
                <ProductCardA product={r} className="h-full" />
              </li>
            ))}
          </ul>
          <div className="mt-12 space-y-3">
            {p.notes.map((n) => (
              <Placeholder key={n} compact>
                Content note: {n}
              </Placeholder>
            ))}
            <p className="text-xs text-mute">
              {site.ui.sourceLabel}:{" "}
              <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                {p.sourceUrl.replace("https://", "")}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </article>
  );
}
