import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/shared/JsonLd";
import { ProductDetailB } from "@/concepts/b/pages/ProductDetailB";
import { getProduct, productLine, PRODUCTS } from "@/data/products";
import { productLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/concept-b/products/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.model} — ${productLine(p)} | VISION HITECH`,
    description: `${p.model}: ${p.title}. ${p.highlights.slice(0, 3).join(", ")}`.slice(0, 158),
    alternates: { canonical: `/concept-b/products/${p.slug}/` },
    openGraph: { images: [p.image] },
  };
}

export default async function ProductPage({ params }: PageProps<"/concept-b/products/[slug]">) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={productLd(p)} />
      <ProductDetailB product={p} />
    </>
  );
}
