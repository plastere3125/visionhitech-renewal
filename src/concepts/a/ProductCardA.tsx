import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { productLine, type CatalogItem } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { Arrow } from "./HeaderA";

/** CatalogItem tile: studio photo on the exact studio grey, model code as title (Hanwha/Milesight pattern). */
export function ProductCardA({ product, className, priority }: { product: CatalogItem; className?: string; priority?: boolean }) {
  const { site } = getContent();
  const isSoftware = product.category === "software";
  return (
    <article className={cn("group relative flex flex-col bg-white", className)}>
      <CLink concept="a" href={`/products/${product.slug}/`} className="relative block aspect-square overflow-hidden bg-studio" tabIndex={-1} aria-hidden>
        <Img
          src={isSoftware ? product.image : product.image.replace(".webp", "-sm.webp")}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 33vw, 50vw"
          className={cn("transition-transform duration-700 ease-out group-hover:scale-[1.06]", isSoftware ? "object-contain p-8" : "scale-[1.12] object-contain")}
        />
        <span className="absolute top-3 left-3 bg-white/85 px-2 py-1 font-mono text-[0.65rem] tracking-[0.08em] text-fg/70 uppercase">
          {site.categories[product.category].short} · {product.series}
        </span>
      </CLink>
      <div className="flex flex-1 flex-col border-x border-b border-line p-4 md:p-5">
        <h3 className="text-[1.05rem] font-semibold tracking-[-0.01em]">
          <CLink concept="a" href={`/products/${product.slug}/`} className="after:absolute after:inset-0 after:content-['']">
            {product.model}
          </CLink>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[0.84rem] leading-snug text-mute">{productLine(product)}</p>
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-4 text-[0.78rem] font-semibold [&>*]:whitespace-nowrap">
          <CLink concept="a" href={`/products/${product.slug}/`} className="inline-flex items-center gap-1.5 hover:text-accent-ink">
            {site.ui.viewProduct} <Arrow />
          </CLink>
          <InquiryButton model={product.model} className="ml-auto text-mute underline-offset-4 hover:text-fg hover:underline">
            {site.ui.productInquiry}
          </InquiryButton>
        </div>
      </div>
    </article>
  );
}
