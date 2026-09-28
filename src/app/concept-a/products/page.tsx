import type { Metadata } from "next";
import { PageHeroA } from "@/concepts/a/pages/PagesA";
import { ProductsExplorerA } from "@/concepts/a/pages/ProductsA";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Products — IP Camera, NVR, HD Analog, DVR, Software | VISION HITECH",
  description: "VISION HITECH product line-up: IP cameras, NVRs, HD analog cameras, hybrid DVRs, NVR C/S VMS and installation accessories.",
  alternates: { canonical: "/concept-a/products/" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeroA label="Products" title="Products" body={`${PRODUCTS.length} models across six categories, from the current VISION HITECH catalogue.`} />
      <div className="py-12 md:py-16">
        <ProductsExplorerA />
      </div>
    </>
  );
}
