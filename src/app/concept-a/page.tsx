import type { Metadata } from "next";
import { getContent } from "@/content";
import { JsonLd } from "@/components/shared/JsonLd";
import { BentoA, IntroA } from "@/concepts/a/home/BentoA";
import { HeroA } from "@/concepts/a/home/HeroA";
import { FeaturedA, SolutionsA, TechnologyA } from "@/concepts/a/home/InteractiveA";
import { CtaA, NewsA, SupportA, WhyA } from "@/concepts/a/home/StaticA";
import { organizationLd } from "@/lib/seo";

const { homeA } = getContent();

export const metadata: Metadata = {
  title: homeA.meta.title,
  description: homeA.meta.description,
  alternates: { canonical: "/concept-a/" },
  openGraph: { title: homeA.meta.title, description: homeA.meta.description, images: ["/images/products/vnn64lu4ar.webp"] },
};

export default function HomeA() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <HeroA />
      <IntroA />
      <BentoA />
      <FeaturedA />
      <TechnologyA />
      <SolutionsA />
      <WhyA />
      <NewsA />
      <SupportA />
      <CtaA />
    </>
  );
}
