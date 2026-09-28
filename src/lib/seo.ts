import { getContent } from "@/content";
import type { Product } from "@/data/products";
import { SITE_URL } from "./paths";

/** Organization structured data — verified fields only. */
export function organizationLd() {
  const { site } = getContent();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand.legalName,
    alternateName: "VISION HITECH",
    foundingDate: "1997",
    url: "https://visionhitechsecurity.com/",
    logo: `${SITE_URL}/brand/vision-logo_P-01.svg`,
    email: site.contact.generalEmail,
    telephone: site.contact.tel,
    faxNumber: site.contact.fax,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vision Bldg., 31 Bucheon-ro 36beon-gil, Wonmi-gu",
      addressLocality: "Bucheon-si",
      addressRegion: "Gyeonggi-do",
      postalCode: "14640",
      addressCountry: "KR",
    },
  };
}

/** Product structured data — no price/offer (B2B, not published). */
export function productLd(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.model,
    description: p.subtitle ?? p.title,
    sku: p.model,
    brand: { "@type": "Brand", name: "VISION HITECH" },
    manufacturer: { "@type": "Organization", name: "Visionhitech Co., Ltd." },
    image: `${SITE_URL}${p.image}`,
    category: p.category,
  };
}
