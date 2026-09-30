import type { Metadata } from "next";
import { PageHeroB } from "@/concepts/b/pages/PagesB";
import { ProductsExplorerB } from "@/concepts/b/pages/ProductsB";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Products — IP Camera, NVR, HD Analog, DVR, Zoom Modules, Software | VISION HITECH",
  description: "VISION HITECH product line-up: IP cameras, NVRs, HD analog cameras, hybrid DVRs, zoom modules, NVR C/S VMS and installation accessories.",
  alternates: { canonical: "/concept-b/products/" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeroB code={`Products · ${PRODUCTS.length} models`} title="Product index" body="IP cameras, recorders, HD analog cameras, zoom modules, software and accessories." />
      <div className="pt-10 md:pt-14">
        <ProductsExplorerB />
      </div>
    </>
  );
}
