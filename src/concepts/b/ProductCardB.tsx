import { getContent } from "@/content";
import { CLink } from "@/components/shared/CLink";
import { Img } from "@/components/shared/Img";
import { InquiryButton } from "@/components/shared/Inquiry";
import { productLine, type CatalogItem } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { ArrowB } from "./ui";

/**
 * Concept B product card: dark frame, product photo shown untouched on a light "specimen plate"
 * (the studio background of the original photo), technical label strip.
 */
export function ProductCardB({ product: p, className }: { product: CatalogItem; className?: string }) {
  const { site } = getContent();
  const sw = p.category === "software";
  return (
    <article className={cn("group relative flex flex-col border border-line bg-panel p-2.5 transition-colors hover:border-fg/30", className)}>
      <div className="flex items-center justify-between px-1.5 pt-0.5 pb-2.5 font-mono text-[0.62rem] tracking-[0.08em] text-mute uppercase">
        <span>{site.categories[p.category].short}</span>
        <span>{p.series}</span>
      </div>
      <div className="relative aspect-[4/3.4] overflow-hidden bg-studio">
        <Img
          src={sw ? p.image : p.image.replace(".webp", "-sm.webp")}
          alt=""
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 50vw"
          className={cn("object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]", sw ? "p-6" : "scale-[1.12]")}
        />
      </div>
      <div className="flex flex-1 flex-col px-1.5 pt-4 pb-1.5">
        <h3 className="font-mono text-[0.95rem] font-medium tracking-[0.02em]">
          <CLink concept="b" href={`/products/${p.slug}/`} className="after:absolute after:inset-0 after:content-['']">
            {p.model}
          </CLink>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-snug text-mute">{productLine(p)}</p>
        <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-4 text-[0.75rem]">
          <InquiryButton model={p.model} className="text-mute underline-offset-4 hover:text-accent hover:underline">
            {site.ui.productInquiry}
          </InquiryButton>
          <ArrowB className="text-mute transition-all group-hover:translate-x-1 group-hover:text-accent" />
        </div>
      </div>
    </article>
  );
}
